import React from "react";
import {
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";

const RecentFiles = ({ files }) => {

  const getFileIcon = (fileName) => {
    if (!fileName) {
      return <File className="text-gray-500" size={26} />;
    }

    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {

      // PDF
      case "pdf":
        return <FileText className="text-red-500" size={26} />;

      // Word
      case "doc":
      case "docx":
        return <FileText className="text-blue-600" size={26} />;

      // Excel
      case "xls":
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="text-green-600" size={26} />;

      // Images
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        return <FileImage className="text-pink-500" size={26} />;

      // Videos
      case "mp4":
      case "mov":
      case "avi":
      case "mkv":
      case "webm":
        return <FileVideo className="text-purple-600" size={26} />;

      // Audio
      case "mp3":
      case "wav":
      case "aac":
      case "ogg":
        return <FileAudio className="text-orange-500" size={26} />;

      // Archives
      case "zip":
      case "rar":
      case "7z":
      case "tar":
        return <FileArchive className="text-yellow-600" size={26} />;

      // Code Files
      case "java":
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
      case "json":
      case "xml":
      case "html":
      case "css":
      case "py":
      case "cpp":
      case "c":
        return <FileCode className="text-indigo-600" size={26} />;

      default:
        return <File className="text-gray-500" size={26} />;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Recent Files
        </h2>

        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
          {files.length} Files
        </span>

      </div>

      {files.length === 0 ? (
        <div className="text-center py-16">

          <File
            size={60}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Files Uploaded
          </h3>

          <p className="text-gray-500 mt-2">
            Upload your first file to see it here.
          </p>

        </div>
      ) : (

        <div className="space-y-4">

          {files.slice(0, 5).map((file) => (

            <div
              key={file.id}
              className="flex justify-between items-center border rounded-xl p-4 hover:shadow-md hover:border-purple-300 transition-all duration-300"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">

                  {getFileIcon(file.name)}

                </div>

                <div>

                  <h3 className="font-semibold text-gray-800 break-all">
                    {file.name}
                  </h3>

                  <p className="text-sm text-gray-500">

                    {(file.size / 1024).toFixed(2)} KB

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-sm font-medium text-gray-700">
                  {formatDate(file.uploadedAt)}
                </p>

                <span className="text-xs text-gray-400">
                  Uploaded
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentFiles;