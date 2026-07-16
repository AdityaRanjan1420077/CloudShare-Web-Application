import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import QRCode from "react-qr-code";
import axios from "axios";
// import ShareImage from "../../public/share.png"
import ShareImage from "../../public/share.png";
import {
  Loader2,
  Printer,
  ArrowLeft,
  CheckCircle,
  Receipt,
} from "lucide-react";

import apiEndPoints from "../util/apiEndPoints";

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const { getToken } = useAuth();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const token = await getToken();

        const response = await axios.get(
          apiEndPoints.TRANSACTION_BY_ID(transactionId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransaction(response.data);
      } catch (error) {
        console.error("Error fetching receipt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [transactionId, getToken]);

  const formatDate = (date) => {
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

  const formatAmount = (amount) => {
    return `₹${(amount / 100).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  const generateReceiptId = () => {
    const initials = transaction.userName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  
    const date = new Date(transaction.transactionDate);
  
    const formattedDate =
      date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0");
  
    const lastFour = transaction.id.slice(-4).toUpperCase();
  
    return `CS-${initials}-${formattedDate}-${lastFour}`;
  };

  const getPlanName = (plan) => {
    switch (plan?.toLowerCase()) {
      case "premium":
        return "Premium Plan";
      case "ultimate":
        return "Ultimate Plan";
      default:
        return "Basic Plan";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 size={45} className="animate-spin text-purple-600" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Receipt not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
  
      {/* Top Buttons */}
  
      <div className="max-w-5xl mx-auto flex justify-between mb-6 print:hidden">
  
        <Link
          to="/transactions"
          className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900"
        >
          <ArrowLeft size={20} />
          Back to Transactions
        </Link>
  
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
        >
          <Printer size={20} />
          Print Receipt
        </button>
  
      </div>
  
      {/* Receipt */}
  
      <div
        id="receipt"
        className="relative bg-white max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
      >
  
        {/* Header */}
  
        <div className="bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 px-10 py-8">
  
          <div className="flex justify-between items-center">
  
            {/* Logo */}
  
            <div className="flex items-center gap-4">
  
              <img
                src="/share.png"
                alt="CloudShare"
                className="w-16 h-16 rounded-xl bg-white p-2 shadow-md"
              />
  
              <div>
  
                <h1 className="text-4xl font-extrabold text-white">
                  CloudShare
                </h1>
  
                <p className="text-purple-100 mt-1">
                  Secure Cloud Storage Platform
                </p>
  
              </div>
  
            </div>
  
            {/* Receipt Details */}
  
            <div className="text-right text-white">
  
              <h2 className="text-3xl font-bold">
                PAYMENT RECEIPT
              </h2>
  
              <p className="mt-4 text-purple-100">
                Receipt No.
              </p>
  
              <p className="font-semibold text-lg">
                {/* {transaction.id} */}
                {generateReceiptId()}
              </p>
  
              <p className="mt-3 text-purple-100">
                {formatDate(transaction.transactionDate)}
              </p>
  
            </div>
  
          </div>
  
        </div>
        {/* ================= Success Banner ================= */}

<div className="px-10 py-8">

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300      rounded-2xl p-6 flex items-center gap-5 shadow">

    <div className="bg-green-600 rounded-full p-4">

        <CheckCircle
            size={38}
            className="text-white"
        />

    </div>

    <div>

        <h2 className="text-2xl font-bold text-green-700">

            Payment Successful

        </h2>

        <p className="text-green-600 mt-2">

            Your payment has been verified successfully.
            Your CloudShare credits have been added to your account.

        </p>

    </div>

</div>

</div>

{/* ================= Customer & Summary ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 pb-10">

    {/* Customer Details */}

    <div className="bg-white rounded-2xl border shadow-md p-6">

        <h2 className="text-xl font-bold text-purple-700 mb-6">

            Customer Details

        </h2>

        <div className="space-y-5">

            <div className="flex justify-between">

                <span className="text-gray-500">
                    Name
                </span>

                <span className="font-semibold">
                    {transaction.userName}
                </span>

            </div>

            <hr />

            <div className="flex justify-between">

                <span className="text-gray-500">
                    Email
                </span>

                <span className="font-semibold break-all">
                    {transaction.userEmail}
                </span>

            </div>

            <hr />

            <div className="flex justify-between">

                <span className="text-gray-500">
                    User ID
                </span>

                <span className="text-sm font-medium break-all">
                    {transaction.clerkId}
                </span>

            </div>

        </div>

    </div>

    {/* Payment Summary */}

    <div className="bg-white rounded-2xl border shadow-md p-6">

        <h2 className="text-xl font-bold text-purple-700 mb-6">

            Payment Summary

        </h2>

        <div className="grid grid-cols-2 gap-4">

            <div className="bg-purple-50 rounded-xl p-5 text-center">

                <p className="text-gray-500 text-sm">
                    Amount Paid
                </p>

                <h3 className="text-2xl font-bold text-purple-700 mt-3">
                    {formatAmount(transaction.amount)}
                </h3>

            </div>

            <div className="bg-blue-50 rounded-xl p-5 text-center">

                <p className="text-gray-500 text-sm">
                    Credits
                </p>

                <h3 className="text-2xl font-bold text-blue-700 mt-3">
                    {transaction.creditsAdded}
                </h3>

            </div>

            <div className="bg-yellow-50 rounded-xl p-5 text-center">

                <p className="text-gray-500 text-sm">
                    Plan
                </p>

                <h3 className="text-lg font-bold text-yellow-700 mt-3">
                    {getPlanName(transaction.planId)}
                </h3>

            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center">

                <p className="text-gray-500 text-sm">
                    Status
                </p>

                <h3 className="text-lg font-bold text-green-700 mt-3">
                    {transaction.status}
                </h3>

            </div>

        </div>

    </div>

</div>


{/* ================= Transaction Details ================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 pb-10">

  {/* Left Card */}

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

    <h2 className="text-2xl font-bold text-purple-700 mb-6">
      Transaction Details
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">
        <span className="text-gray-500">Order ID</span>
        <span className="font-mono text-sm break-all">
          {transaction.orderId}
        </span>
      </div>

      <hr />

      <div className="flex justify-between items-center">
        <span className="text-gray-500">Payment ID</span>
        <span className="font-mono text-sm break-all">
          {transaction.paymentId}
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">Receipt ID</span>
        <span className="font-mono text-sm">
          {/* {transaction.id} */}
          {generateReceiptId()}
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">Currency</span>
        <span className="font-semibold">
          {transaction.currency}
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">Transaction Date</span>
        <span className="font-semibold">
          {formatDate(transaction.transactionDate)}
        </span>
      </div>

    </div>

  </div>

  {/* Right Card */}

  <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-700 rounded-2xl shadow-xl text-white p-7">

    {/* Decorative circles */}

    <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>

    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-white/10 rounded-full"></div>

    <h2 className="text-2xl font-bold mb-6 relative">
      Purchased Plan
    </h2>

    <div className="relative">

      <h3 className="text-3xl font-bold">

        {getPlanName(transaction.planId)}

      </h3>

      <p className="text-purple-100 mt-2">

        Thank you for upgrading your CloudShare account.

      </p>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <CheckCircle size={20} />

          <span>

            {transaction.creditsAdded} Credits Added

          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle size={20} />

          <span>

            Secure Cloud Storage

          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle size={20} />

          <span>

            Public File Sharing

          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle size={20} />

          <span>

            Instant Downloads

          </span>

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle size={20} />

          <span>

            Priority Support

          </span>

        </div>

      </div>

    </div>

  </div>

</div>


{/* ================= QR Code & Company ================= */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 pb-10">

  {/* QR Code */}

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center">

    <h2 className="text-2xl font-bold text-purple-700 mb-6">
      Verify Receipt
    </h2>

    <div className="bg-white p-4 rounded-xl shadow">

      <QRCode
        size={170}
        value={JSON.stringify({
          receiptId: transaction.id,
          paymentId: transaction.paymentId,
          orderId: transaction.orderId,
          amount: transaction.amount,
          user: transaction.userEmail,
        })}
      />

    </div>

    <p className="text-gray-500 text-sm text-center mt-5">
      Scan this QR code to verify this receipt and
      payment information.
    </p>

  </div>

  {/* Company */}

  <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-6">

    <h2 className="text-2xl font-bold text-purple-700 mb-6">
      Company Information
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between">
        <span className="text-gray-500">
          Company
        </span>

        <span className="font-semibold">
          CloudShare
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">
          Website
        </span>

        <span className="font-semibold text-purple-700">
          cloudshare.vercel.app
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">
          Email
        </span>

        <span className="font-semibold">
          support@cloudshare.com
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">
          Generated On
        </span>

        <span className="font-semibold">
          {formatDate(new Date())}
        </span>
      </div>

      <hr />

      <div className="flex justify-between">
        <span className="text-gray-500">
          Payment Gateway
        </span>

        <span className="font-semibold">
          Razorpay
        </span>
      </div>

    </div>

  </div>

</div>
{/* ================= VERIFIED STAMP ================= */}

<div className="relative px-10 pb-10">

  <div className="flex justify-end">

    <div
      className="
        relative
        w-56
        h-56
        rounded-full
        border-[8px]
        border-green-600
        flex
        items-center
        justify-center
        rotate-[-18deg]
        opacity-60
      "
    >

      {/* Inner Circle */}

      <div
        className="
          w-44
          h-44
          rounded-full
          border-[3px]
          border-green-700 shadow-[0_0_30px_rgba(22,163,74,0.25)]
          flex
          flex-col
          items-center
          justify-center
        "
      >

        <CheckCircle
          size={42}
          className="text-green-600 mb-3"
        />

        <h2 className="text-green-700 text-xl font-black tracking-[0.35em] uppercase">
          PAYMENT
        </h2>

        <h2 className="text-green-700 text-xl font-black tracking-[0.35em] uppercase">
          VERIFIED
        </h2>

        <p className="mt-3 text-xs font-bold tracking-[0.25em] text-green-700 uppercase">
          CLOUDSHARE
        </p>

      </div>

    </div>

  </div>

</div>
  
      </div>
  
    </div>
    
  );
}

export default ReceiptPage