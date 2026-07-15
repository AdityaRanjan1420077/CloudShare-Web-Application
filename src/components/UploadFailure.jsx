import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  WifiOff,
  CreditCard,
  Lock,
  FileWarning,
  ServerCrash,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

const UploadFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    errorType = "server",
    reason = "Something went wrong while uploading your file.",
  } = location.state || {};

  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/upload");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const getFailureDetails = () => {
    switch (errorType) {
      case "network":
        return {
          title: "Network Error",
          icon: <WifiOff size={60} className="text-red-500" />,
          bg: "bg-red-100",
        };

      case "credits":
        return {
          title: "Not Enough Credits",
          icon: <CreditCard size={60} className="text-orange-500" />,
          bg: "bg-orange-100",
        };

      case "unauthorized":
        return {
          title: "Unauthorized",
          icon: <Lock size={60} className="text-red-500" />,
          bg: "bg-red-100",
        };

      case "fileSize":
        return {
          title: "File Too Large",
          icon: <FileWarning size={60} className="text-yellow-500" />,
          bg: "bg-yellow-100",
        };

      default:
        return {
          title: "Upload Failed",
          icon: <ServerCrash size={60} className="text-red-500" />,
          bg: "bg-red-100",
        };
    }
  };

  const failure = getFailureDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-10">

        {/* Failure Icon */}
        <div className="flex justify-center">
          <div
            className={`w-28 h-28 rounded-full ${failure.bg} flex items-center justify-center`}
          >
            {failure.icon}
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-red-600 mt-8">
          {failure.title}
        </h1>

        {/* Message */}
        <p className="text-center text-gray-600 mt-4 text-lg">
          {reason}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/upload")}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 flex justify-center items-center gap-2 transition-all"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <button
            onClick={() => navigate("/my-files")}
            className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-3 flex justify-center items-center gap-2 transition-all"
          >
            <FolderOpen size={18} />
            My Files
          </button>

        </div>

        {/* Countdown */}
        <p className="text-center text-gray-500 mt-8">
          Redirecting to{" "}
          <span className="font-semibold text-purple-600">
            Upload
          </span>{" "}
          in{" "}
          <span className="font-bold text-red-600 text-lg">
            {countdown}
          </span>{" "}
          second{countdown !== 1 ? "s" : ""}...
        </p>

      </div>

    </div>
  );
};

export default UploadFailure;