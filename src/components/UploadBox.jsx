import React, { useRef } from "react";
import { UploadCloud, File, X } from "lucide-react";

const UploadBox = ({
  files,
  uploading,
  maxFiles = 10,
  onFileChange,
  onRemoveFile,
  onUpload,
  remainingCredits = 0,
  isUploadDisabled = false
}) => {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);

    const event = {
      target: {
        files: droppedFiles,
      },
    };

    onFileChange(event);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* Upload Area */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="cursor-pointer border-2 border-dashed border-purple-300 rounded-2xl bg-white hover:bg-purple-50 transition p-10 flex flex-col items-center justify-center"
      >
        <UploadCloud
          size={60}
          className="text-purple-600 mb-4"
        />

        <h2 className="text-2xl font-semibold text-gray-800">
          Drag & Drop your files here
        </h2>

        <p className="text-gray-500 mt-2">
          or click to browse your computer
        </p>

        <button
          type="button"
          className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
        >
          Browse Files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={onFileChange}
        />
      </div>

      {/* Max Files */}
      <p className="text-sm text-gray-500 mt-3">
        Maximum {maxFiles} files can be uploaded.
      </p>
      <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium w-40">
        Remaining Credits: {remainingCredits}
    </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow p-5">

          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">
              Selected Files ({files.length})
            </h3>
          </div>

          <div className="space-y-3">

            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">

                  <File
                    size={22}
                    className="text-purple-600"
                  />

                  <div>
                    <p className="font-medium">
                      {file.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>

                </div>

                <button
                  disabled={uploading}
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>

              </div>
            ))}

          </div>

          <button
            onClick={onUpload}
            disabled={uploading || files.length === 0}
            className="w-full mt-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {uploading
              ? "Uploading..."
              : `Upload ${files.length} File${files.length > 1 ? "s" : ""}`}
          </button>

        </div>
      )}

    </div>
  );
};

export default UploadBox;