import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import  apiEndPoints  from "../../src/util/apiEndPoints";

import {
  Copy,
  Download,
  Eye,
  File,
  Globe,
  Grid,
  List,
  Lock,
  Trash2,
  Image,
  FileText,
  FileSpreadsheet,
  FileArchive,
  FileVideo,
  FileAudio,
  FileCode
} from "lucide-react";
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import FileCard from '../components/FileCard';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LinkShareModal from '../components/LinkShareModal';

const MyFiles = () => {
  const[files, setFiles] = useState([]);
  const[viewMode, setViewMode] = useState("list");
  const{getToken} = useAuth();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen:false,
    fileId: null
  });
  const[shareModal, setShareModal] = useState({
    isOpen:false,
    fileId:null,
    link:""
  })


  //Open the share link modal
  const openShareModal=(fileId)=>{
    const link = `${window.location.origin}/file/${fileId}`;
    setShareModal({
      isOpen:true,
      fileId,
      link

    });
  }


  //Close the share link modal
  const closeShareModal = ()=>{
    setShareModal({
      isOpen:false,
      fileId:null,
      link:""
    });
  }


  const [dateFormat, setDateFormat] = useState("long");
  const getFileIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    console.log("The extension of the file is ", extension);
    switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "webp":
          return <Image size={24}className="text-purple-500" />;
    
        case "pdf":
          return <FileText size={24} className="text-red-500" />;
    
        case "doc":
        case "docx":
          return <FileText size={24} className="text-blue-700" />;
    
        case "xls":
        case "xlsx":
          return <FileSpreadsheet size={24} className="text-green-600" />;
    
        case "zip":
        case "rar":
          return <FileArchive size={24} className="text-yellow-500" />;
    
        case "mp4":
        case "mov":
          return <FileVideo size={24} className="text-purple-600" />;
    
        case "mp3":
        case "wav":
          return <FileAudio size={24} className="text-pink-600" />;
    
        case "java":
        case "js":
        case "jsx":
        case "ts":
        case "tsx":
        case "py":
        case "cpp":
        case "c":
          return <FileCode size={24} className="text-orange-500" />;
    
        default:
          return <File size={24} className="text-gray-500" />;
      }
}

  // Fetching files for the logged in user
  const fetchFiles =async()=>{
    try{
      const token = await getToken();
      console.log(token)
      const response = await axios.get(
        apiEndPoints.FETCH_FILES,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 200) {
        console.log("================FILE FOUND===================")
        console.log(response.data)
        setFiles(response.data);
      }

    }catch(error) {
      console.log("Error fetching the files from the server", error);
      toast.error("Error fetching the files from the server", error.messsage);

    }

  }

  // Toggle the public/ private status of the file
  const togglePublic=async(fileToUpdate)=>{
    try{
      const token = await getToken();
      await axios.patch(
        apiEndPoints.TOGGLE_FILE(fileToUpdate.id),
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
      setFiles(files.map((file)=>file.id===fileToUpdate.id ?{...file, isPublic:!file.isPublic} : file));
      console.log("Toggle has been successfully done")

    }catch(error) {
      console.log("=============ERROR IN TOGGLING THE PRIVATE/PUBLIC FILES===============")
      console.error("Error toggling file status");
      toast.error("Error toggling file status", error.messsage);

    }


  }


  //Handling file Download Button
  const handleDownload = async(file)=>{
    try {
      const token = await getToken();
  
      const response = await axios.get(
        apiEndPoints.DOWNLOAD_FILE(file.id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
  
      // Create download URL
      const url = window.URL.createObjectURL(response.data);
  
      // Create temporary link
      const link = document.createElement("a");
      link.href = url;
      // link.download = file.name;
      link.setAttribute("download", file.name);
  
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(url);

    }catch(error) {
      console.log("==============ERRRO IN DOWNLOADING THE FILE==============")
      toast.error("Error Encountered during the download of the file", error.messsage)
    }
  }
// Closes the delete confirmation
  const closeDeleteConfirmation=()=>{
    setDeleteConfirmation({
      isOpen:false,
      fileId:null
    })
  }

  // Open the delete confirmation modal
  const openDeleteConfirmation=(fileId)=>{
    setDeleteConfirmation({
      isOpen:true,
      fileId
    })
  }

  //Delete a file after confirmation
  const handleDelete = async () => {
    const fileId = deleteConfirmation.fileId;

    if (!fileId) return;

    try {
        const token = await getToken();
        console.log("DELETE TOKEN:", token);

        await axios.delete(
            apiEndPoints.DELETE_FILE(fileId),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
       
        setFiles(files.filter(file => file.id !== fileId));

        closeDeleteConfirmation();
        console.log("===============FILE DELETED SUCCESSFULLY==============")
        toast.success("File deleted successfully");

        

        

        
    } catch (error) {
       console.log(error.response);
    console.log(error.response?.status);
    console.log(error.response?.data);

    // toast.error(error.response?.data || error.message);
        console.log("=============FILE DELETED Failed===================");
        console.error(error.message);
        toast.error(error.response?.data?.message || error.message);
    }
};
  useEffect(()=>{
    fetchFiles();

  },[getToken]);
  return (
    <DashboardLayout activeMenu="My Files">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Files {files.length}</h2>
          <div className="flex items-center gap-3">
            <List onClick={()=>setViewMode("list")} size={24} className={`cursor-pointer transition-colors ${viewMode ==="list" ?'text-blue-600':'text-gray-500 hover:text-gray-600'}`}/>
            <Grid size={24} onClick={()=>setViewMode("grid")} className={`cursor-pointer transition-colors ${viewMode ==="grid"?"text-blue-600" : "text-gray-500 hover:text-gray-600"}`}/>
          </div>
        </div>
        {files.length === 0 ?(
          <div className='bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center'>
            <File size={60} className="text-purple-300 mb-4"/>
            <h3 className='text-xl font-medium text-gray-700 mb-2'>No Files Uploaded Yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">Start Uploading files to see them listed here. You can upload documents, images, and other files to share and manage them securely.</p>
            <button onClick={()=>navigate("/upload")} className='px-4 py-2  bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors'>
              Go to Upload
            </button>

          </div>
        ):viewMode ==="grid" ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {files.map((file)=>(
              <FileCard key={file.id} file={file} onDelete={openDeleteConfirmation} onTogglePublic={togglePublic} onDownload={handleDownload} onShareLink={openShareModal}/>
            ))}
          </div>
        ):(
          <div className='overflow-x-auto bg-white rounded-lg shadow'>
            <table className='min-w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Size</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Uploaded Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Sharing</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {files.map((file)=>(
                  <tr key={file.id} className='hover:bg-gray-50 transition-colors '>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          {/* <File size={20} className='text-blue-600'/> */}
                          {getFileIcon(file)}
                          {file.name}

                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {(file.size/1024).toFixed(1)} KB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {/* {new Date(file.uploadedAt).toLocaleDateString()} */}
                      {new Date(file.uploadedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      <div className="flex items-center gap-4">
                        <button onClick={()=>togglePublic(file)} className="flex items-center gap-2 cursor-pointer group">
                          {file.isPublic?(
                           <>
                            <Globe size={16} className='text-green-500'/>
                            <span className="group-hover:underline">Public</span></>
                          ):(
                            <>
                              <Lock size={16} className='text-gray-500'/>
                              <span className="group-hover:underline">Private</span></>
                          
                          )}
                        </button>
                        {file.isPublic && (
                          <button onClick={()=>openShareModal(file.id)} className="flex items-center gap-2 cursor-pointer group text-blue-600">
                            <Copy size={16}/>
                            <span className="group-hover:underline">Share Link</span>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex justify-center">
                          <button onClick={()=>handleDownload(file)} title='Download' className='text-gray-500 hover:text-blue-600'>
                            <Download size={18}/>
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button onClick={()=>openDeleteConfirmation(file.id)} title='Delete' className='text-gray-500 hover:text-red-600'>
                            <Trash2 size={18}/>
                          </button>
                        </div>
                        <div className='flex justify-center'>
                          {file.isPublic ?(
                            <a href={`/file/${file.id}`} className='text-gray-500 hover:text-blue-600' title='View File' target='_blank' rel='noreferrer'>
                              <Eye size={18}/>

                            </a>
                          ):(
                            <span className='w-[18px]'></span>
                          )}

                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog onClose={closeDeleteConfirmation} isOpen={deleteConfirmation.isOpen}  title="Delete File" message='Are you sure that you want to delete this file? This action cannot be undone.' confirmText='Delete' cancelText='Cancel' onConfirm={handleDelete}  confirmationButtonClass='bg-purple-600 hover:bg-purple-700'/>
      </div>

      {/* Share Link Modal */}
      <LinkShareModal 
          isOpen={shareModal.isOpen}
          onClose={closeShareModal}
          link={shareModal.link}
          title="Share File"/>
    </DashboardLayout>
  )
}

export default MyFiles
