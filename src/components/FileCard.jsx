import React, { useState } from 'react'
import {
    FileText,
    Image,
    FileSpreadsheet,
    FileArchive,
    FileVideo,
    FileAudio,
    FileCode,
    File,
    Globe,
    Lock,
    Copy,
    Eye,
    Download,
    Trash2
  } from "lucide-react";

const FileCard = ({file, onDelete, onTogglePublic, onDownload, onShareLink}) => {
    console.log("FileCard rendered", file);
    const[showActions, setShowActions] = useState();
    const getFileIcon = () => {
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

    const formatFileSize = (bytes) => {
        if (bytes < 1024) {
            return bytes + " B";
        }
    
        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(2) + " KB";
        }
    
        if (bytes < 1024 * 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        }
    
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    };

    const formatDate = (date) => {
        if (!date) return "";
    
        return new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };
    
    return (
        <div onMouseEnter={()=>setShowActions(true)} onMouseLeave={()=>setShowActions(false)} className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            {/* File Preview Area */}
            <div className='h-32 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4'>
                {getFileIcon(file)}
                
            </div>
            {/* Public /Private baddge */}
            <div className="absolute top-2 right-2">
                <div className={`rounded-full p-1.5 ${file.isPublic ? "bg-green-200":"bg-gray-200"}`} title={file.isPublic?"Public":"Private"}>
                    {file.isPublic ?(
                        <Globe size={14} className='text-green-600'/>
                    ):(
                        <Lock size={14} className='text-gray-600'/>
                    )}
                </div>
            </div>
            {/* File Info */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="overflow-hidden">
                        <h3 className="font-medium text-gray-900 truncate">
                            {file.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatFileSize(file.size)} . {formatDate(file.uploadedAt)}
                        </p>
                    </div>
                </div>
            </div>
            {/* Action Button */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end justify-center p-4 transition-opacity duration-300 ${showActions ?"opacity-100":"opacity-0"}`}>
                    <div className="flex gap-3 w-full justify-center">
                        {file.isPublic && (
                            <button onClick={()=>onShareLink(file.id)} title='Share Link' className='cursor-pointer p-3 bg-white/90 rounded-full hover:bg-white transition-colors text-purple-500 hover:text-purple-600'>
                                <Copy size={18}/>
                            </button>
                        )}
                        {file.isPublic && (
                            <a href={`/file/${file.id}`} title='View File' target='_blank' rel='noreferrer' className='p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-gray-700 hover:text-gray-900'>
                                <Eye size={18}/>
                            </a>
                        )}
                        <button onClick={()=>onDownload(file)} title='Download' className='cursor-pointer p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-green-600 hover:text-green-700'>
                        <Download size={18}/>

                        </button>
                        <button onClick={()=>onTogglePublic(file)} title={file.isPublic?"Make Private":"Make Public"} className='cursor-pointer p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-amber-600 hover:text-amber-700'>
                            {file.isPublic?<Lock size={18}/>:<Globe size={18}/>}

                        </button>
                        <button onClick={()=>onDelete(file.id)} title='Delete' className='cursor-pointer p-2 bg-white/90 rounded-full hover:bg-white transition-colors text-red-600 hover:text-red-700'>
                            <Trash2 size={18}/>
                        </button>
                    </div>
            </div>

          {/* {getFileIcon()}
          <span>{formatFileSize(file.size)}</span>
          <span>{formatDate(file.uploadedAt)}</span> */}
        </div>
      );
}

export default FileCard
