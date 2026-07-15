import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import apiEndPoints from "../util/apiEndPoints";
import LinkShareModal from "../components/LinkShareModal";

import {
  Copy,
  Download,
  Info,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FileCode,
  Share2,
  Loader2,
  AlertCircle,
} from "lucide-react";

const PublicFileView = () => {
  const { fileId } = useParams();

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [shareModal, setShareModal] = useState({
    isOpen: false,
    link: "",
  });

  useEffect(() => {
    const getFile = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          apiEndPoints.PUBLIC_FILE_VIEW(fileId)
        );

        setFile(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching file:", error);

        setError(
          "Could not retrieve the file. The link may be invalid or the file has been removed."
        );
      } finally {
        setIsLoading(false);
      }
    };

    getFile();
  }, [fileId]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        apiEndPoints.DOWNLOAD_FILE(fileId),
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = file.name;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Download started.");
    } catch (error) {
      console.error(error);
      toast.error("Sorry, the file could not be downloaded.");
    }
  };

  const openShareModal = () => {
    setShareModal({
      isOpen: true,
      link: window.location.href,
    });
  };

  const closeShareModal = () => {
    setShareModal({
      isOpen: false,
      link: "",
    });
  };
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  const getFileIcon = (fileName) => {
    if (!fileName) {
      return <File size={46} className="text-gray-500" />;
    }
  
    const extension = fileName.split(".").pop().toLowerCase();
  
    switch (extension) {
  
      // PDF
      case "pdf":
        return <FileText size={46} className="text-red-500" />;
  
      // Word
      case "doc":
      case "docx":
        return <FileText size={46} className="text-blue-600" />;
  
      // Excel
      case "xls":
      case "xlsx":
      case "csv":
        return (
          <FileSpreadsheet
            size={46}
            className="text-green-600"
          />
        );
  
      // Images
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        return (
          <FileImage
            size={46}
            className="text-pink-500"
          />
        );
  
      // Videos
      case "mp4":
      case "mov":
      case "avi":
      case "mkv":
      case "webm":
        return (
          <FileVideo
            size={46}
            className="text-purple-600"
          />
        );
  
      // Audio
      case "mp3":
      case "wav":
      case "aac":
      case "ogg":
        return (
          <FileAudio
            size={46}
            className="text-orange-500"
          />
        );
  
      // Archives
      case "zip":
      case "rar":
      case "7z":
      case "tar":
        return (
          <FileArchive
            size={46}
            className="text-yellow-600"
          />
        );
  
      // Code Files
      case "java":
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "html":
      case "css":
      case "json":
      case "xml":
      case "py":
      case "cpp":
      case "c":
        return (
          <FileCode
            size={46}
            className="text-indigo-600"
          />
        );
  
      default:
        return <File size={46} className="text-gray-500" />;
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={40}
            className="animate-spin text-blue-600"
          />

          <p className="text-gray-600 text-lg">
            Loading file...
          </p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <AlertCircle
            size={50}
            className="mx-auto text-red-500 mb-4"
          />

          <h2 className="text-2xl font-bold text-red-600">
            Unable to Load File
          </h2>

          <p className="mt-3 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!file) return null;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <Share2 className="text-blue-600" />

            <span className="font-bold text-2xl text-gray-800">
              CloudShare
            </span>
          </div>

          <button
            onClick={openShareModal}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <Copy size={18} />
            Share Link
          </button>

        </div>
      </header>

      {/* Main */}

      <main className="container mx-auto px-4 py-10 flex justify-center">

        <div className="w-full max-w-3xl">

          <div className="bg-white rounded-xl shadow-lg p-8">

            <div className="flex justify-center">

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

              {getFileIcon(file.name)}

              </div>

            </div>

            <h1 className="text-3xl font-bold text-center mt-6 break-words">
              {file.name}
            </h1>

            <p className="text-center text-gray-500 mt-3">
              {(file.size / 1024).toFixed(2)} KB
              <span className="mx-2">•</span>
              
              {/* {new Date(file.uploadedAt).toLocaleDateString()} */}
              Shared on {formatDateTime(file.uploadedAt)}
            </p>

            <div className="flex justify-center mt-5">

              <span className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full">
                {file.type || "Unknown"}
              </span>

            </div>

            <div className="flex justify-center mt-8">

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition"
              >
                <Download size={18} />

                Download File
              </button>

            </div>

            <hr className="my-8" />

            <h3 className="text-xl font-semibold mb-5">
              File Information
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  File Name
                </span>

                <span className="font-medium break-all">
                  {file.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  File Type
                </span>

                <span className="font-medium">
                  {file.type || "Unknown"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  File Size
                </span>

                <span className="font-medium">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Shared At
                </span>

                <span className="font-medium">
                 {formatDateTime(file.uploadedAt)}
                </span>
              </div>

            </div>

          </div>

          {/* Info Box */}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-3">

            <Info
              size={22}
              className="text-blue-600 mt-1"
            />

            <p className="text-blue-800 text-sm">
              This file has been shared publicly.
              Anyone with this link can view and
              download this file.
            </p>

          </div>

        </div>

      </main>

      <LinkShareModal
        isOpen={shareModal.isOpen}
        onClose={closeShareModal}
        link={shareModal.link}
      />

    </div>
  );
};

export default PublicFileView;