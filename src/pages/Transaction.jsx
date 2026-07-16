// import React, { useEffect, useState } from 'react'
// import DashboardLayout from '../layout/DashboardLayout'
// import { useAuth } from '@clerk/clerk-react';
// import axios from 'axios';
// import apiEndPoints from '../util/apiEndPoints';
// import { AlertCircle, Loader2, Receipt } from 'lucide-react';

// const Transaction = () => {
//   const[transactions, setTransactions] = useState([]);
//   const[loading, setLoading] = useState(false);
//   const[error, setError] = useState(null);
//   const{getToken} = useAuth();
//   useEffect(()=>{
//     const fetchTransactions = async()=>{
//       try {
//         setLoading(true);
//         const token = await getToken();
//         const response = await axios.get(apiEndPoints.TRANSACTIONS,
//           {
//             headers:{
//               "Authorization":`Bearer ${token}`,
//             },
//           }
//         );
//         setTransactions(response.data);
//         setError(null);
//       }catch(error) {
//         console.error("Error fetching transactions:", error);
//         setError("Failed to load your transaction history. Please try again later.");
//       }finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();

//   },[getToken]);

//   const formatDate= (dateString)=>{
//     const options={
//       year:"numeric",
//       month:"long",
//       day:"numeric",
//       hour:"2-digit",
//       minute:"2-digit",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
//   const formatAmount =(amountInPaise)=>{
//     return `₹${(amountInPaise/100).toFixed(2)}`;
//   }
//    return (
//     <DashboardLayout activeMenu="Transactions">
//       <div className="p-6">
//         <div className="flex items-center gap-2 mb-6">
//           <Receipt className='text-blue-600'/>
//           <h1 className='text-2xl font-bold'>Transaction History</h1>
//         </div>

//         {error && (
//           <div className='mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center'>
//             <AlertCircle size={20}/>
//             <span>{error}</span>

//           </div>
//         )}
//         {loading ?(
//           <div className='flex justify-center items-center h-64'>
//             <Loader2 className='animate-spin mr-2 ' size={24}/>
//             <span>Loading Transactions...</span>

//           </div>
//         ):transactions.length === 0 ?(
//           <div className='bg-gray-50 p-8 rounded-lg text-center'>
//             <Receipt size={48} className='mx-auto mb-4 text-gray-400'/>
//             <h3 className="text-lg font-medium text-gray-700 mb-2">No Transactions Yet</h3>
//             <p className='text-gray-500'>You have'nt made any credit purchase yet. Visit the Subscription page to buy credits.</p>

//           </div>
//         ):(
//           <div className='overflow-x-auto'>
//             <table className='min-w-full bg-white rounded-lg overflow-hidden shadow'>
//               <thead className='bg-gray-50'>
//                 <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//   Date
// </th>

// <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//   Plan
// </th>

// <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//   Amount
// </th>

// <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//   Credits Added
// </th>

// <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//   Payment ID
// </th>
//                 </tr>

//               </thead>
//               <tbody className='divide-y divide-gray-200'>
//                 {transactions.map((transaction, index)=>(
//                   <tr key={transaction.id} className='hover:bg-gray-200'>
//                     <td className='px-6 y-4 whitespace-nowrap text-sm text-gray-900 '>
//                       {formatDate(transaction.transactionDate)}
//                     </td>
//                     <td className='px-6 y-4 whitespace-nowrap text-sm text-gray-900'>
//                       {transaction.planId==="premium"
//                         ? "Premium Plan"
//                         : transaction.planId ==="ultimate"
//                             ? "Ultimate Plan"
//                             :"Basic Plan"}

//                     </td>
//                     <td className='px-6 y-4 whitespace-nowrap text-sm text-gray-900'>
//                       {formatAmount(transaction.amount)}
//                     </td>
//                     <td className='px-6 y-4 whitespace-nowrap text-sm text-gray-900'>
//                       {transaction.creditsAdded}
//                     </td>
//                     <td className='px-6 y-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
//                       {transaction.paymentId?transaction.paymentId:"NA"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Transaction
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";

import apiEndPoints from "../util/apiEndPoints";

import {
  AlertCircle,
  Loader2,
  Receipt,
  Eye,
  CheckCircle,
} from "lucide-react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const token = await getToken();

        const response = await axios.get(apiEndPoints.TRANSACTIONS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data);
        setError(null);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load your transaction history. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [getToken]);

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

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6">

        {/* Header */}

        <div className="flex items-center gap-3 mb-8">
          <Receipt className="text-purple-600" size={30} />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Transaction History
            </h1>

            <p className="text-gray-500">
              View all your payment history.
            </p>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            <AlertCircle />
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-72">
            <Loader2
              size={40}
              className="animate-spin text-purple-600"
            />

            <p className="mt-4 text-gray-600">
              Loading Transactions...
            </p>
          </div>
        ) : transactions.length === 0 ? (
          /* Empty */

          <div className="bg-white rounded-xl shadow-md p-10 text-center">

            <Receipt
              size={60}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 text-xl font-semibold text-gray-700">
              No Transactions Yet
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't purchased any credits yet.
            </p>

          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Plan
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Credits
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Payment ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs uppercase text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center text-xs uppercase text-gray-500">
                      Receipt
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-200">

                  {transactions.map((transaction) => (

                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition"
                    >

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatDate(transaction.transactionDate)}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {getPlanName(transaction.planId)}
                      </td>

                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatAmount(transaction.amount)}
                      </td>

                      <td className="px-6 py-4">
                        {transaction.creditsAdded}
                      </td>

                      <td className="px-6 py-4 font-mono text-xs">
                        {transaction.paymentId}
                      </td>

                      <td className="px-6 py-4">

                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-green-700 text-xs font-semibold">

                          <CheckCircle size={14} />

                          {transaction.status}

                        </span>

                      </td>

                      <td className="px-6 py-4 text-center">

                        <Link
                          to={`/receipt/${transaction.id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
                        >
                          <Eye size={16} />
                          View
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transaction;