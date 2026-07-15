import { PartyPopper } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const checkTimer = setTimeout(() => {
      setShowCheck(true);
    }, 900);
  
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1400);
  
    // Countdown Timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          navigate("/my-files");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => {
      clearTimeout(checkTimer);
      clearTimeout(contentTimer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 flex items-center justify-center p-6">

<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

{/* Success Animation */}
<div className="flex justify-center">

  <svg width="120" height="120" viewBox="0 0 120 120">

    {/* Circle */}
    <circle
      cx="60"
      cy="60"
      r="50"
      fill="none"
      stroke="#22c55e"
      strokeWidth="6"
      strokeLinecap="round"
      style={{
        strokeDasharray: 314,
        strokeDashoffset: 314,
        animation: "drawCircle 0.9s ease forwards",
      }}
    />

    {/* Tick */}
    {showCheck && (
      <polyline
        points="38,63 53,78 84,46"
        fill="none"
        stroke="#22c55e"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 80,
          strokeDashoffset: 80,
          animation: "drawCheck .45s ease forwards",
        }}
      />
    )}

  </svg>

</div>

{/* Content */}
<div
  className={`transition-all duration-700 ${
    showContent
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5"
  }`}
>
<h1 className="mt-8 flex items-center justify-center gap-3 text-3xl font-bold text-green-600">
  

  Congratulations!

  <PartyPopper
    size={30}
    className=" animate-bounce text-pink-500"
  />
</h1>
  

  <p className="text-center text-gray-600 text-lg mt-4">
    Your file has been uploaded successfully.
  </p>

  <div className="border-t border-gray-200 my-8"></div>

  <p className="text-center text-gray-400">
    Redirecting to <span className="font-semibold">My Files in {countdown} seconds</span>
  </p>
</div>

</div>
</div>

  );
};

export default UploadSuccess;