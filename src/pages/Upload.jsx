import React, { useContext, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useAuth } from '@clerk/clerk-react';
import { UserCreditsContext } from '../context/UserCreditsContext';
import { AlertCircle } from 'lucide-react';
import UploadBox from '../components/UploadBox';
import axios from 'axios';
import apiEndPoints from '../util/apiEndPoints';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const[uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[message, setMessage] = useState("");
  const[messageType, setMessageType]= useState("");
  const navigate = useNavigate();
  const{getToken} = useAuth();
  const{credits, setCredits} = useContext(UserCreditsContext);
  const MAX_FILES=5;
  const isUploadDisabled = uploading || credits <= 0 || files.length===0 || files.length>MAX_FILES || files.length > credits;
  // const handleFileChange=(e)=>{
  //   const files = Array.from(e.target.files);
  //   if(files.length + selectedFiles.length>MAX_FILES) {
  //     setMessage(`You can only upload a maximum of maximum of ${MAX_FILES} files at once.`);
  //     setMessageType("error")
  //     return;

  //   }
  //   setFiles((prevFiles)=>[...prevFiles, selectedFiles]);
  //   setMessage("");
  //   setMessageType("");
  //   // setSelectedFiles(files);

  // }
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (files.length + newFiles.length > MAX_FILES) {
        setMessage(`You can upload a maximum of ${MAX_FILES} files at a time.`);
        setMessageType("error");
        return;
    }

    setFiles((prev) => [...prev, ...newFiles]);

    setMessage("");
    setMessageType("");
};

  const handleRemoveFile=(index)=>{
    setFiles((prevFiles)=>prevFiles.filter((_, i)=>i!==index));
    setMessage("");
    setMessageType("");
    

  }

  const handleUpload= async()=>{
    if(files.length ===0){
      setMessageType("error");
      setMessage("Please select atleast one file to upload.")
      return;
    }

    if(files.length > MAX_FILES) {
      setMessage(`You can only upload a maximum of maximum of ${MAX_FILES} files at once.`);
      setMessageType("error");
    }
    setUploading(true)
    setMessage("Uploading files...");
    setMessageType("info");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
  });

  try {
    const token = await getToken();

    const response = await axios.post(
        apiEndPoints.FILE_UPLOAD,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
    if(response.data && response.data.remainingCredits!==undefined) {
      setCredits(response.data.remainingCredits);
      setMessage("Files uploaded successfully.");
      setMessageType("success");
      navigate("/upload-success", {
        state: {
            files,
            remainingCredits: response.data.remainingCredits,
        },
    });
    
      setFiles([]);

    }

    // if (response.status === 200) {
    //     setCredits(response.data.remainingCredits);
    //     setFiles([]);
    //     setMessage("Files uploaded successfully.");
    //     setMessageType("success");
    // }

} catch (error) {
  let errorType = "server";
    let reason = "Something went wrong while uploading.";

    if (!error.response) {

        errorType = "network";
        reason = "Check your internet connection and try again.";

    } else if (error.response.status === 401) {

        errorType = "unauthorized";
        reason = "Please sign in again.";

    } else if (error.response.status === 403) {

        errorType = "credits";
        reason = "You don't have enough upload credits.";

    } else if (error.response.status === 413) {

        errorType = "fileSize";
        reason = "The selected file exceeds the allowed size.";

    } else if (error.response.status >= 500) {

        errorType = "server";
        reason = "Our server encountered an issue.";

    } else {

        reason =
            error.response?.data?.message ||
            "Something went wrong while uploading.";

    }

    navigate("/upload-failed", {
        state: {
            errorType,
            reason,
        },
    });
    console.error(error);
    console.log("============ERROR UPLOADING IN THE FILE============")
    toast.error("Error in Uploading the files:", error.message);

    setMessage(
        error.response?.data?.message || "Error uploading files.Please try again!"
    );
    setMessageType("error");
} finally {
    setUploading(false);
}

  }
  return (
    <DashboardLayout activeMenu="Upload">
      <div className='p-6'>
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType==='error'?"bg-red-50 text-red-700":messageType==="success" ? "bg-green-50 text-green-700":"bg-blue-50 text-blue-700"}`}>
            {messageType==="error" && <AlertCircle size={20}/>}
            {message}

          </div>
        )}
        <UploadBox files={files}
    uploading={uploading}
    maxFiles={MAX_FILES}
    onFileChange={handleFileChange}
    onRemoveFile={handleRemoveFile}
    onUpload={handleUpload}
    remainingCredits={credits}
    isUploadDisabled={isUploadDisabled}/>

      </div>
    </DashboardLayout>
      
    
  )
}

export default Upload
