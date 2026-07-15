import React from "react";
import {
  UploadCloud,
  Trash2,
  Loader2,
  FileText,
  HardDrive,
  CreditCard,
} from "lucide-react";

const DashboardUpload = ({
  files,
  onFileChange,
  onUpload,
  uploading,
  onRemoveFile,
  remainingUploads,
  remainingCredits,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

      {/* Header */}

      <h2 className="text-2xl font-bold text-gray-800">
        Upload Files
      </h2>

      <p className="text-gray-500 mt-1">
        Upload documents securely to CloudShare.
      </p>

      {/* Credits */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-purple-50 rounded-xl p-4">

          <div className="flex items-center gap-2">

            <CreditCard className="text-purple-600" />

            <span className="text-sm text-gray-600">
              Credits
            </span>

          </div>

          <p className="text-2xl font-bold text-purple-600 mt-2">
            {remainingCredits}
          </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-4">

          <div className="flex items-center gap-2">

            <HardDrive className="text-blue-600" />

            <span className="text-sm text-gray-600">
              Slots Left
            </span>

          </div>

          <p className="text-2xl font-bold text-blue-600 mt-2">
            {remainingUploads}
          </p>

        </div>

      </div>

      {/* Upload Area */}

      <label
        className="mt-8 flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl bg-purple-50 hover:bg-purple-100 transition cursor-pointer p-10"
      >

        <UploadCloud
          size={60}
          className="text-purple-600"
        />

        <h3 className="mt-4 text-lg font-semibold">
          Drag & Drop Files
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          or click to browse
        </p>

        <input
          type="file"
          multiple
          hidden
          onChange={onFileChange}
        />

      </label>

      {/* Selected Files */}

      {files.length > 0 && (

        <div className="mt-8">

          <h3 className="font-semibold text-lg mb-4">
            Selected Files ({files.length})
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto">

            {files.map((file, index) => (

              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 border rounded-xl p-4"
              >

                <div className="flex items-center gap-3">

                  <div className="bg-purple-100 p-3 rounded-lg">

                    <FileText
                      size={22}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <p className="font-medium break-all">
                      {file.name}
                    </p>

                    <p className="text-xs text-gray-500">

                      {(file.size / 1024).toFixed(2)} KB

                    </p>

                  </div>

                </div>

                <button
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >

                  <Trash2 size={20} />

                </button>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Upload Button */}

      <button
        disabled={uploading || files.length === 0}
        onClick={onUpload}
        className={`w-full mt-8 rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition
        ${
          uploading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >

        {uploading ? (
          <>
            <Loader2
              className="animate-spin"
              size={20}
            />

            Uploading...

          </>
        ) : (
          <>
            <UploadCloud size={20} />

            Upload Files

          </>
        )}

      </button>

    </div>
  );
};

export default DashboardUpload;