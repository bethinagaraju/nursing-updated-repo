// // // // import React from 'react';

// // // // const Payments = () => {
// // // //   return <h1>payments</h1>;
// // // // };

// // // // export default Payments;


// // // import React, { useState, useEffect } from 'react';
// // // import { FaMoneyBillWave, FaCheckCircle, FaSpinner, FaTimesCircle, FaClock, FaSearch, FaClipboard, FaCopy } from 'react-icons/fa';

// // // // Simulated AdminPaymentService, replace this with real import or a proper API wrapper
// // // const AdminPaymentService = {
// // //   getPaymentStats: async () => {
// // //     // Fetch stats for nursing
// // //     const res = await fetch('http://localhost:8906/api/payments/nursing/statistics');
// // //     return res.json();
// // //   },
// // //   getAllPayments: async () => {
// // //     const res = await fetch('http://localhost:8906/api/payments/all/nursing');
// // //     return res.json();
// // //   },
// // //   getPaymentsByStatus: async (status: string) => {
// // //     const res = await fetch(`http://localhost:8906/api/payments/nursing/status/${status}`);
// // //     return res.json();
// // //   },
// // //   searchByEmail: async (email: string) => {
// // //     const res = await fetch(`http://localhost:8906/api/payments/nursing/customer/${encodeURIComponent(email)}`);
// // //     return res.json();
// // //   },
// // // };

// // // const formatDate = (dateString?: string) => dateString ? new Date(dateString).toLocaleString() : '';
// // // const formatCurrency = (amount?: number, currency: string = 'EUR') => {
// // //   if (amount === undefined || amount === null) return '€0.00';
// // //   return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);
// // // };

// // // const Payments: React.FC = () => {
// // //   const [stats, setStats] = useState<any>(null);
// // //   const [payments, setPayments] = useState<any[]>([]);
// // //   const [allPayments, setAllPayments] = useState<any[]>([]);
// // //   const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
// // //   const [searchEmail, setSearchEmail] = useState<string>('');
// // //   const [loading, setLoading] = useState<boolean>(false);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
// // //   const [showModal, setShowModal] = useState<boolean>(false);

// // //   const fetchStats = async () => {
// // //     try {
// // //       const data = await AdminPaymentService.getPaymentStats();
// // //       setStats(data);
// // //     } catch {
// // //       setError('Failed to fetch payment stats');
// // //     }
// // //   };

// // //   const fetchPayments = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await AdminPaymentService.getAllPayments();
// // //       setPayments(data);
// // //       setAllPayments(data);
// // //       setError(null);
// // //     } catch {
// // //       setError('Failed to fetch payments');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchPaymentsByStatus = async (status: string) => {
// // //     if (status === 'ALL') {
// // //       fetchPayments();
// // //       return;
// // //     }
// // //     try {
// // //       setLoading(true);
// // //       const data = await AdminPaymentService.getPaymentsByStatus(status);
// // //       setPayments(Array.isArray(data) ? data : []);
// // //       setError(null);
// // //     } catch {
// // //       setError('Failed to fetch payments by status');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const searchByEmail = async () => {
// // //     if (!searchEmail.trim()) {
// // //       setError(null);
// // //       setSelectedStatus('ALL');
// // //       fetchPayments();
// // //       return;
// // //     }
// // //     setSelectedStatus('ALL');
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       let data = await AdminPaymentService.searchByEmail(searchEmail.trim());
// // //       if (!Array.isArray(data)) data = data ? [data] : [];
// // //       // fallback filter on allPayments on empty results
// // //       if (data.length === 0 && allPayments.length > 0) {
// // //         const searchLower = searchEmail.trim().toLowerCase();
// // //         data = allPayments.filter(p => p.customerEmail?.toLowerCase().includes(searchLower));
// // //       }
// // //       setPayments(data);
// // //       if (data.length === 0) setError(`No payments found for email: ${searchEmail}`);
// // //     } catch {
// // //       setError(`Failed to search payments for email: ${searchEmail}`);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchStats();
// // //     fetchPayments();
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchPaymentsByStatus(selectedStatus);
// // //   }, [selectedStatus]);

// // //   const openModal = (payment: any) => { setSelectedPayment(payment); setShowModal(true); };
// // //   const closeModal = () => { setSelectedPayment(null); setShowModal(false); };

// // //   const getStatusClass = (status: string) => {
// // //     switch (status) {
// // //       case 'COMPLETED': return 'bg-green-500 text-green-900';
// // //       case 'PENDING': return 'bg-yellow-500 text-yellow-900';
// // //       case 'FAILED': return 'bg-red-500 text-red-900';
// // //       case 'CANCELLED': return 'bg-gray-500 text-gray-900';
// // //       case 'EXPIRED': return 'bg-orange-500 text-orange-900';
// // //       default: return 'bg-gray-400 text-gray-900';
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-black text-white p-8 max-w-7xl mx-auto">
// // //       {/* Header */}
// // //       <header className="mb-8">
// // //         <h1 className="text-4xl font-bold text-green-400 flex items-center gap-2">
// // //           <FaMoneyBillWave /> Payment Records
// // //         </h1>
// // //         <p className="text-gray-400">Manage and monitor all payment transactions</p>
// // //       </header>

// // //       {/* Stats cards */}
// // //       {stats && (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
// // //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// // //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// // //               <FaClipboard /> Total Payments
// // //             </h3>
// // //             <p className="text-3xl font-bold">{stats.totalRecords}</p>
// // //             <p className="text-xs text-gray-400">All status types</p>
// // //           </div>
// // //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// // //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// // //               <FaMoneyBillWave /> Total Revenue
// // //             </h3>
// // //             <p className="text-3xl font-bold">
// // //               {formatCurrency(
// // //                 allPayments
// // //                   .filter((p) => p.status === 'COMPLETED')
// // //                   .reduce((sum, p) => sum + (p.amountTotalEuros || 0), 0),
// // //                 'EUR'
// // //               )}
// // //             </p>
// // //             <p className="text-xs text-gray-400">Completed payments only</p>
// // //           </div>
// // //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// // //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// // //               <FaCheckCircle className="text-green-400" /> Completed
// // //             </h3>
// // //             <p className="text-3xl font-bold text-green-400">{stats.completedPayments}</p>
// // //             <p className="text-xs text-gray-400">Successfully paid</p>
// // //           </div>
// // //           <div className="bg-[#1a1a1a] border border-yellow-600 rounded-xl p-6">
// // //             <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-2">
// // //               <FaSpinner className="animate-spin" /> Pending
// // //             </h3>
// // //             <p className="text-3xl font-bold text-yellow-400">{stats.pendingPayments}</p>
// // //             <p className="text-xs text-gray-400">Awaiting payment</p>
// // //           </div>
// // //           <div className="bg-[#1a1a1a] border border-red-600 rounded-xl p-6">
// // //             <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-2">
// // //               <FaTimesCircle /> Failed
// // //             </h3>
// // //             <p className="text-3xl font-bold text-red-400">{stats.failedPayments}</p>
// // //             <p className="text-xs text-gray-400">Failed transactions</p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Controls */}
// // //       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// // //           {/* Status Filter */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-green-300 mb-2">
// // //               Status
// // //             </label>
// // //             <select
// // //               value={selectedStatus}
// // //               onChange={(e) => setSelectedStatus(e.target.value)}
// // //               className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// // //             >
// // //               <option value="ALL">All Statuses</option>
// // //               <option value="COMPLETED">Completed</option>
// // //               <option value="PENDING">Pending</option>
// // //               <option value="FAILED">Failed</option>
// // //               <option value="CANCELLED">Cancelled</option>
// // //               <option value="EXPIRED">Expired</option>
// // //             </select>
// // //           </div>

// // //           {/* Email Search */}
// // //           <div>
// // //             <label className="block text-sm font-medium text-green-300 mb-2">
// // //               Search by Email
// // //             </label>
// // //             <div className="flex">
// // //               <input
// // //                 type="email"
// // //                 value={searchEmail}
// // //                 onChange={(e) => {
// // //                   setSearchEmail(e.target.value);
// // //                   setError(null);
// // //                 }}
// // //                 onKeyDown={(e) => {
// // //                   if (e.key === 'Enter') searchByEmail();
// // //                 }}
// // //                 placeholder="customer@example.com"
// // //                 className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// // //               />
// // //               <button
// // //                 onClick={searchByEmail}
// // //                 className="ml-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg flex items-center justify-center"
// // //                 title="Search by Email"
// // //                 type="button"
// // //               >
// // //                 <FaSearch />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Error */}
// // //       {error && (
// // //         <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
// // //       )}

// // //       {/* Payments Table */}
// // //       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8 overflow-x-auto">
// // //         {loading ? (
// // //           <div className="text-center py-8">
// // //             <FaSpinner className="animate-spin text-3xl text-green-400 mx-auto mb-2" />
// // //             <p className="text-green-300">Loading payments...</p>
// // //           </div>
// // //         ) : payments.length > 0 ? (
// // //           <>
// // //             <table className="min-w-full divide-y divide-green-800">
// // //               <thead>
// // //                 <tr>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// // //                     Customer Details
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// // //                     Amount & Currency
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// // //                     Status
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// // //                     Session ID
// // //                   </th>
// // //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// // //                     Actions
// // //                   </th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="bg-[#181818] divide-y divide-green-900">
// // //                 {payments.map((payment) => (
// // //                   <tr key={payment.id}>
// // //                     <td className="px-6 py-4 text-sm">
// // //                       <div className="text-white font-medium">{payment.customerEmail}</div>
// // //                       {payment.customerName && (
// // //                         <div className="text-green-300 text-sm mt-1">{payment.customerName}</div>
// // //                       )}
// // //                       {payment.customerInstitute && (
// // //                         <div className="text-xs text-gray-400">{payment.customerInstitute}</div>
// // //                       )}
// // //                       {payment.customerCountry && (
// // //                         <div className="text-xs text-blue-300 mt-1">{payment.customerCountry}</div>
// // //                       )}
// // //                       {payment.paymentIntentId && (
// // //                         <div className="text-xs text-blue-300 mt-1">
// // //                           Intent: {payment.paymentIntentId.substring(0, 20)}...
// // //                         </div>
// // //                       )}
// // //                       {payment.pricingConfigId && (
// // //                         <div className="text-xs text-purple-300 mt-1">
// // //                           Config: #{payment.pricingConfigId}
// // //                         </div>
// // //                       )}
// // //                     </td>

// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                       <div className="text-white font-bold text-lg">
// // //                         {formatCurrency(payment.amountTotalEuros, payment.currency)}
// // //                       </div>
// // //                       <div className="text-xs text-gray-400">{payment.currency.toUpperCase()}</div>
// // //                       {payment.pricingConfigTotalPrice && (
// // //                         <div className="text-xs text-yellow-300 mt-1">
// // //                           Config: €{payment.pricingConfigTotalPrice.toFixed(2)}
// // //                         </div>
// // //                       )}
// // //                     </td>

// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                       <div
// // //                         className={`px-3 py-1 rounded-full text-xs font-bold mb-2 flex items-center gap-1 ${getStatusClass(
// // //                           payment.status
// // //                         )}`}
// // //                       >
// // //                         {payment.status === 'COMPLETED' && <FaCheckCircle className="mr-1" />} 
// // //                         {payment.status === 'PENDING' && <FaSpinner className="animate-spin mr-1" />} 
// // //                         {payment.status === 'FAILED' && <FaTimesCircle className="mr-1" />} 
// // //                         {payment.status === 'CANCELLED' && <FaTimesCircle className="mr-1" />} 
// // //                         {payment.status === 'EXPIRED' && <FaClock className="mr-1" />} 
// // //                         {payment.status}
// // //                       </div>
// // //                     </td>

// // //                     <td className="px-6 py-4 text-sm">
// // //                       <div className="text-white font-mono text-xs mb-1">{payment.sessionId.substring(0, 25)}...</div>
// // //                       <button
// // //                         onClick={() => {
// // //                           navigator.clipboard.writeText(payment.sessionId);
// // //                           alert('Session ID copied!');
// // //                         }}
// // //                         className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
// // //                         title="Copy full session ID"
// // //                       >
// // //                         <FaCopy /> Copy Full ID
// // //                       </button>
// // //                     </td>

// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                       <div className="flex flex-col space-y-1">
// // //                         <button
// // //                           onClick={() => openModal(payment)}
// // //                           className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
// // //                           title="View Complete Details"
// // //                         >
// // //                           <FaClipboard /> Full Details
// // //                         </button>
// // //                         <button
// // //                           onClick={() => {
// // //                             const fullDetails = `
// // // PAYMENT DETAILS #${payment.id}
// // // Session: ${payment.sessionId}
// // // Customer: ${payment.customerEmail}
// // // Amount: ${formatCurrency(payment.amountTotalEuros, payment.currency)}
// // // Status: ${payment.status}
// // // Stripe Status: ${payment.paymentStatus}
// // // Created: ${formatDate(payment.createdAt)}
// // // ${payment.customerName ? `\nCustomer Name: ${payment.customerName}` : ''}
// // // ${payment.customerInstitute ? `\nInstitute: ${payment.customerInstitute}` : ''}
// // // ${payment.paymentIntentId ? `\nPayment Intent: ${payment.paymentIntentId}` : ''}
// // // `;
// // //                             navigator.clipboard.writeText(fullDetails);
// // //                             alert('Payment details copied to clipboard!');
// // //                           }}
// // //                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
// // //                           title="Copy All Details"
// // //                         >
// // //                           <FaCopy /> Copy All
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>

// // //             <div className="bg-[#2a2a2a] px-6 py-3 flex items-center justify-between">
// // //               <div className="text-sm text-gray-400">
// // //                 Showing {payments.length} payment{payments.length !== 1 ? 's' : ''}
// // //               </div>
// // //               <button
// // //                 onClick={fetchPayments}
// // //                 className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-black transition-colors"
// // //               >
// // //                 Refresh
// // //               </button>
// // //             </div>
// // //           </>
// // //         ) : (
// // //           <div className="text-center py-12">
// // //             <p className="text-gray-400 text-xl">No payment records found</p>
// // //             <button
// // //               onClick={() => {
// // //                 setSelectedStatus('ALL');
// // //                 setSearchEmail('');
// // //                 fetchPayments();
// // //               }}
// // //               className="mt-4 bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg transition-colors"
// // //             >
// // //               Reset Filters...
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Payment Details Modal */}
// // //       {showModal && selectedPayment && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
// // //             <div className="flex items-center justify-between p-6 border-b border-gray-700">
// // //               <h2 className="text-2xl font-bold text-green-400">
// // //                 💳 Payment Details #{selectedPayment.id}
// // //               </h2>
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="text-gray-400 hover:text-white text-2xl font-bold"
// // //                 aria-label="Close modal"
// // //               >
// // //                 ×
// // //               </button>
// // //             </div>

// // //             <div className="p-6 space-y-6">
// // //               {/* Payment Status */}
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// // //                   <h3 className="text-green-300 font-semibold mb-2">Payment Status</h3>
// // //                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedPayment.status)}`}>
// // //                     {selectedPayment.status}
// // //                   </span>
// // //                 </div>
// // //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// // //                   <h3 className="text-green-300 font-semibold mb-2">Stripe Status</h3>
// // //                   <span className="text-white">{selectedPayment.paymentStatus}</span>
// // //                 </div>
// // //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// // //                   <h3 className="text-green-300 font-semibold mb-2">Amount</h3>
// // //                   <span className="text-white text-lg font-bold">
// // //                     {formatCurrency(selectedPayment.amountTotalEuros, selectedPayment.currency)}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               {/* Customer Information */}
// // //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// // //                 <h3 className="text-green-300 font-semibold mb-4">Customer Information</h3>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-gray-400 text-sm mb-1">Email</label>
// // //                     <p className="text-white">{selectedPayment.customerEmail}</p>
// // //                   </div>
// // //                   {selectedPayment.customerName && (
// // //                     <div>
// // //                       <label className="block text-gray-400 text-sm mb-1">Name</label>
// // //                       <p className="text-white">{selectedPayment.customerName}</p>
// // //                     </div>
// // //                   )}
// // //                   {selectedPayment.customerInstitute && (
// // //                     <div>
// // //                       <label className="block text-gray-400 text-sm mb-1">Institute</label>
// // //                       <p className="text-white">{selectedPayment.customerInstitute}</p>
// // //                     </div>
// // //                   )}
// // //                   {selectedPayment.customerCountry && (
// // //                     <div>
// // //                       <label className="block text-gray-400 text-sm mb-1">Country</label>
// // //                       <p className="text-white">{selectedPayment.customerCountry}</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Stripe Information */}
// // //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// // //                 <h3 className="text-green-300 font-semibold mb-4">Stripe Information</h3>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div>
// // //                     <label className="block text-gray-400 text-sm mb-1">Session ID</label>
// // //                     <div className="flex items-center">
// // //                       <p className="text-white font-mono text-sm break-all">{selectedPayment.sessionId}</p>
// // //                       <button
// // //                         onClick={() => {
// // //                           navigator.clipboard.writeText(selectedPayment.sessionId);
// // //                           alert('Session ID copied to clipboard');
// // //                         }}
// // //                         className="ml-2 text-green-400 hover:text-green-300"
// // //                         title="Copy Session ID"
// // //                       >
// // //                         📋
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                   {selectedPayment.paymentIntentId && (
// // //                     <div>
// // //                       <label className="block text-gray-400 text-sm mb-1">Payment Intent ID</label>
// // //                       <div className="flex items-center">
// // //                         <p className="text-white font-mono text-sm break-all">{selectedPayment.paymentIntentId}</p>
// // //                         <button
// // //                           onClick={() => {
// // //                             navigator.clipboard.writeText(selectedPayment.paymentIntentId);
// // //                             alert('Payment Intent ID copied to clipboard');
// // //                           }}
// // //                           className="ml-2 text-blue-400 hover:text-blue-300"
// // //                           title="Copy Payment Intent ID"
// // //                         >
// // //                           📋
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Pricing & Timing info could be added similarly if needed */}

// // //             </div>

// // //             <div className="flex justify-end p-6 border-t border-gray-700">
// // //               <button
// // //                 onClick={closeModal}
// // //                 className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg transition-colors"
// // //               >
// // //                 Close
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Payments;





// // import React, { useState, useEffect } from 'react';
// // import { FaMoneyBillWave, FaCheckCircle, FaSpinner, FaTimesCircle, FaClock, FaSearch, FaClipboard, FaCopy } from 'react-icons/fa';

// // // Simulated AdminPaymentService, replace this with real import or a proper API wrapper
// // const AdminPaymentService = {
// //   getPaymentStats: async () => {
// //     // Fetch stats for nursing
// //     const res = await fetch('http://localhost:8906/api/payments/nursing/statistics');
// //     return res.json();
// //   },
// //   getAllPayments: async () => {
// //     const res = await fetch('http://localhost:8906/api/payments/all/nursing');
// //     return res.json();
// //   },
// //   getPaymentsByStatus: async (status: string) => {
// //     const res = await fetch(`http://localhost:8906/api/payments/nursing/status/${status}`);
// //     return res.json();
// //   },
// //   searchByEmail: async (email: string) => {
// //     const res = await fetch(`http://localhost:8906/api/payments/nursing/customer/${encodeURIComponent(email)}`);
// //     return res.json();
// //   },
// // };

// // const formatDate = (dateString?: string) => dateString ? new Date(dateString).toLocaleString() : '';
// // const formatCurrency = (amount?: number, currency: string = 'EUR') => {
// //   if (amount === undefined || amount === null) return '€0.00';
// //   return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);
// // };

// // const Payments: React.FC = () => {
// //   const [stats, setStats] = useState<any>(null);
// //   const [payments, setPayments] = useState<any[]>([]);
// //   const [allPayments, setAllPayments] = useState<any[]>([]);
// //   const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
// //   const [searchEmail, setSearchEmail] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
// //   const [showModal, setShowModal] = useState<boolean>(false);

// //   const fetchStats = async () => {
// //     try {
// //       const data = await AdminPaymentService.getPaymentStats();
// //       setStats(data);
// //     } catch {
// //       setError('Failed to fetch payment stats');
// //     }
// //   };

// //   const fetchPayments = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await AdminPaymentService.getAllPayments();
// //       setPayments(data);
// //       setAllPayments(data);
// //       setError(null);
// //     } catch {
// //       setError('Failed to fetch payments');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchPaymentsByStatus = async (status: string) => {
// //     if (status === 'ALL') {
// //       fetchPayments();
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       const data = await AdminPaymentService.getPaymentsByStatus(status);
// //       setPayments(Array.isArray(data) ? data : []);
// //       setError(null);
// //     } catch {
// //       setError('Failed to fetch payments by status');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const searchByEmail = async () => {
// //     if (!searchEmail.trim()) {
// //       setError(null);
// //       setSelectedStatus('ALL');
// //       fetchPayments();
// //       return;
// //     }
// //     setSelectedStatus('ALL');
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       let data = await AdminPaymentService.searchByEmail(searchEmail.trim());
// //       if (!Array.isArray(data)) data = data ? [data] : [];
// //       // fallback filter on allPayments on empty results
// //       if (data.length === 0 && allPayments.length > 0) {
// //         const searchLower = searchEmail.trim().toLowerCase();
// //         data = allPayments.filter(p => p.customerEmail?.toLowerCase().includes(searchLower));
// //       }
// //       setPayments(data);
// //       if (data.length === 0) setError(`No payments found for email: ${searchEmail}`);
// //     } catch {
// //       setError(`Failed to search payments for email: ${searchEmail}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStats();
// //     fetchPayments();
// //   }, []);

// //   useEffect(() => {
// //     fetchPaymentsByStatus(selectedStatus);
// //   }, [selectedStatus]);

// //   const openModal = (payment: any) => { setSelectedPayment(payment); setShowModal(true); };
// //   const closeModal = () => { setSelectedPayment(null); setShowModal(false); };

// //   const getStatusClass = (status: string) => {
// //     switch (status) {
// //       case 'COMPLETED': return 'bg-green-500 text-green-900';
// //       case 'PENDING': return 'bg-yellow-500 text-yellow-900';
// //       case 'FAILED': return 'bg-red-500 text-red-900';
// //       case 'CANCELLED': return 'bg-gray-500 text-gray-900';
// //       case 'EXPIRED': return 'bg-orange-500 text-orange-900';
// //       default: return 'bg-gray-400 text-gray-900';
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white p-8 max-w-7xl mx-auto">
// //       {/* Header */}
// //       <header className="mb-8">
// //         <h1 className="text-4xl font-bold text-green-400 flex items-center gap-2">
// //           <FaMoneyBillWave /> Payment Records
// //         </h1>
// //         <p className="text-gray-400">Manage and monitor all payment transactions</p>
// //       </header>

// //       {/* Stats cards */}
// //       {stats && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
// //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// //               <FaClipboard /> Total Payments
// //             </h3>
// //             <p className="text-3xl font-bold">{stats.totalRecords}</p>
// //             <p className="text-xs text-gray-400">All status types</p>
// //           </div>
// //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// //               <FaMoneyBillWave /> Total Revenue
// //             </h3>
// //             <p className="text-3xl font-bold">
// //               {formatCurrency(
// //                 allPayments
// //                   .filter((p) => p.status === 'COMPLETED')
// //                   .reduce((sum, p) => sum + (p.amountTotalEuros || 0), 0),
// //                 'EUR'
// //               )}
// //             </p>
// //             <p className="text-xs text-gray-400">Completed payments only</p>
// //           </div>
// //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
// //             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
// //               <FaCheckCircle className="text-green-400" /> Completed
// //             </h3>
// //             <p className="text-3xl font-bold text-green-400">{stats.completedPayments}</p>
// //             <p className="text-xs text-gray-400">Successfully paid</p>
// //           </div>
// //           <div className="bg-[#1a1a1a] border border-yellow-600 rounded-xl p-6">
// //             <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-2">
// //               <FaSpinner className="animate-spin" /> Pending
// //             </h3>
// //             <p className="text-3xl font-bold text-yellow-400">{stats.pendingPayments}</p>
// //             <p className="text-xs text-gray-400">Awaiting payment</p>
// //           </div>
// //           <div className="bg-[#1a1a1a] border border-red-600 rounded-xl p-6">
// //             <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-2">
// //               <FaTimesCircle /> Failed
// //             </h3>
// //             <p className="text-3xl font-bold text-red-400">{stats.failedPayments}</p>
// //             <p className="text-xs text-gray-400">Failed transactions</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Controls */}
// //       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {/* Status Filter */}
// //           <div>
// //             <label className="block text-sm font-medium text-green-300 mb-2">
// //               Status
// //             </label>
// //             <select
// //               value={selectedStatus}
// //               onChange={(e) => setSelectedStatus(e.target.value)}
// //               className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// //             >
// //               <option value="ALL">All Statuses</option>
// //               <option value="COMPLETED">Completed</option>
// //               <option value="PENDING">Pending</option>
// //               <option value="FAILED">Failed</option>
// //               <option value="CANCELLED">Cancelled</option>
// //               <option value="EXPIRED">Expired</option>
// //             </select>
// //           </div>

// //           {/* Email Search */}
// //           <div>
// //             <label className="block text-sm font-medium text-green-300 mb-2">
// //               Search by Email
// //             </label>
// //             <div className="flex">
// //               <input
// //                 type="email"
// //                 value={searchEmail}
// //                 onChange={(e) => {
// //                   setSearchEmail(e.target.value);
// //                   setError(null);
// //                 }}
// //                 onKeyDown={(e) => {
// //                   if (e.key === 'Enter') searchByEmail();
// //                 }}
// //                 placeholder="customer@example.com"
// //                 className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
// //               />
// //               <button
// //                 onClick={searchByEmail}
// //                 className="ml-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg flex items-center justify-center"
// //                 title="Search by Email"
// //                 type="button"
// //               >
// //                 <FaSearch />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Error */}
// //       {error && (
// //         <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
// //       )}

// //       {/* Payments Table */}
// //       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8 overflow-x-auto">
// //         {loading ? (
// //           <div className="text-center py-8">
// //             <FaSpinner className="animate-spin text-3xl text-green-400 mx-auto mb-2" />
// //             <p className="text-green-300">Loading payments...</p>
// //           </div>
// //         ) : payments.length > 0 ? (
// //           <>
// //             <table className="min-w-full divide-y divide-green-800">
// //               <thead>
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// //                     Customer Details
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// //                     Amount & Currency
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// //                     Session ID
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-[#181818] divide-y divide-green-900">
// //                 {payments.map((payment) => (
// //                   <tr key={payment.id}>
// //                     <td className="px-6 py-4 text-sm">
// //                       <div className="text-white font-medium">{payment.customerEmail}</div>
// //                       {payment.customerName && (
// //                         <div className="text-green-300 text-sm mt-1">{payment.customerName}</div>
// //                       )}
// //                       {payment.customerInstitute && (
// //                         <div className="text-xs text-gray-400">{payment.customerInstitute}</div>
// //                       )}
// //                       {payment.customerCountry && (
// //                         <div className="text-xs text-blue-300 mt-1">{payment.customerCountry}</div>
// //                       )}
// //                       {payment.paymentIntentId && (
// //                         <div className="text-xs text-blue-300 mt-1">
// //                           Intent: {payment.paymentIntentId.substring(0, 20)}...
// //                         </div>
// //                       )}
// //                       {payment.pricingConfigId && (
// //                         <div className="text-xs text-purple-300 mt-1">
// //                           Config: #{payment.pricingConfigId}
// //                         </div>
// //                       )}
// //                     </td>

// //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                       <div className="text-white font-bold text-lg">
// //                         {formatCurrency(payment.amountTotalEuros, payment.currency)}
// //                       </div>
// //                       <div className="text-xs text-gray-400">{payment.currency.toUpperCase()}</div>
// //                       {payment.pricingConfigTotalPrice && (
// //                         <div className="text-xs text-yellow-300 mt-1">
// //                           Config: €{payment.pricingConfigTotalPrice.toFixed(2)}
// //                         </div>
// //                       )}
// //                     </td>

// //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                       <div
// //                         className={`px-3 py-1 rounded-full text-xs font-bold mb-2 flex items-center gap-1 ${getStatusClass(
// //                           payment.status
// //                         )}`}
// //                       >
// //                         {payment.status === 'COMPLETED' && <FaCheckCircle className="mr-1" />} 
// //                         {payment.status === 'PENDING' && <FaSpinner className="animate-spin mr-1" />} 
// //                         {payment.status === 'FAILED' && <FaTimesCircle className="mr-1" />} 
// //                         {payment.status === 'CANCELLED' && <FaTimesCircle className="mr-1" />} 
// //                         {payment.status === 'EXPIRED' && <FaClock className="mr-1" />} 
// //                         {payment.status}
// //                       </div>
// //                     </td>

// //                     <td className="px-6 py-4 text-sm">
// //                       <div className="text-white font-mono text-xs mb-1">{payment.sessionId.substring(0, 25)}...</div>
// //                       <button
// //                         onClick={() => {
// //                           navigator.clipboard.writeText(payment.sessionId);
// //                           alert('Session ID copied!');
// //                         }}
// //                         className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
// //                         title="Copy full session ID"
// //                       >
// //                         <FaCopy /> Copy Full ID
// //                       </button>
// //                     </td>

// //                     <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                       <div className="flex flex-col space-y-1">
// //                         <button
// //                           onClick={() => openModal(payment)}
// //                           className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
// //                           title="View Complete Details"
// //                         >
// //                           <FaClipboard /> Full Details
// //                         </button>
// //                         <button
// //                           onClick={() => {
// //                             const fullDetails = `
// // PAYMENT DETAILS #${payment.id}
// // Session: ${payment.sessionId}
// // Customer: ${payment.customerEmail}
// // Amount: ${formatCurrency(payment.amountTotalEuros, payment.currency)}
// // Status: ${payment.status}
// // Stripe Status: ${payment.paymentStatus}
// // Created: ${formatDate(payment.createdAt)}
// // ${payment.customerName ? `\nCustomer Name: ${payment.customerName}` : ''}
// // ${payment.customerInstitute ? `\nInstitute: ${payment.customerInstitute}` : ''}
// // ${payment.paymentIntentId ? `\nPayment Intent: ${payment.paymentIntentId}` : ''}
// // `;
// //                             navigator.clipboard.writeText(fullDetails);
// //                             alert('Payment details copied to clipboard!');
// //                           }}
// //                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
// //                           title="Copy All Details"
// //                         >
// //                           <FaCopy /> Copy All
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             <div className="bg-[#2a2a2a] px-6 py-3 flex items-center justify-between">
// //               <div className="text-sm text-gray-400">
// //                 Showing {payments.length} payment{payments.length !== 1 ? 's' : ''}
// //               </div>
// //               <button
// //                 onClick={fetchPayments}
// //                 className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-black transition-colors"
// //               >
// //                 Refresh
// //               </button>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="text-center py-12">
// //             <p className="text-gray-400 text-xl">No payment records found</p>
// //             <button
// //               onClick={() => {
// //                 setSelectedStatus('ALL');
// //                 setSearchEmail('');
// //                 fetchPayments();
// //               }}
// //               className="mt-4 bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg transition-colors"
// //             >
// //               Reset Filters...
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Payment Details Modal */}
// //       {showModal && selectedPayment && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="flex items-center justify-between p-6 border-b border-gray-700">
// //               <h2 className="text-2xl font-bold text-green-400">
// //                 💳 Payment Details #{selectedPayment.id}
// //               </h2>
// //               <button
// //                 onClick={closeModal}
// //                 className="text-gray-400 hover:text-white text-2xl font-bold"
// //                 aria-label="Close modal"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             <div className="p-6 space-y-6">
// //               {/* Payment Status */}
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                   <h3 className="text-green-300 font-semibold mb-2">Payment Status</h3>
// //                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(selectedPayment.status)}`}>
// //                     {selectedPayment.status}
// //                   </span>
// //                 </div>
// //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                   <h3 className="text-green-300 font-semibold mb-2">Stripe Status</h3>
// //                   <span className="text-white">{selectedPayment.paymentStatus}</span>
// //                 </div>
// //                 <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                   <h3 className="text-green-300 font-semibold mb-2">Amount</h3>
// //                   <span className="text-white text-lg font-bold">
// //                     {formatCurrency(selectedPayment.amountTotalEuros, selectedPayment.currency)}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Customer Information */}
// //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                 <h3 className="text-green-300 font-semibold mb-4">Customer Information</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-gray-400 text-sm mb-1">Email</label>
// //                     <p className="text-white">{selectedPayment.customerEmail}</p>
// //                   </div>
// //                   {selectedPayment.customerName && (
// //                     <div>
// //                       <label className="block text-gray-400 text-sm mb-1">Name</label>
// //                       <p className="text-white">{selectedPayment.customerName}</p>
// //                     </div>
// //                   )}
// //                   {selectedPayment.customerInstitute && (
// //                     <div>
// //                       <label className="block text-gray-400 text-sm mb-1">Institute</label>
// //                       <p className="text-white">{selectedPayment.customerInstitute}</p>
// //                     </div>
// //                   )}
// //                   {selectedPayment.customerCountry && (
// //                     <div>
// //                       <label className="block text-gray-400 text-sm mb-1">Country</label>
// //                       <p className="text-white">{selectedPayment.customerCountry}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Stripe Information */}
// //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                 <h3 className="text-green-300 font-semibold mb-4">Stripe Information</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-gray-400 text-sm mb-1">Session ID</label>
// //                     <div className="flex items-center">
// //                       <p className="text-white font-mono text-sm break-all">{selectedPayment.sessionId}</p>
// //                       <button
// //                         onClick={() => {
// //                           navigator.clipboard.writeText(selectedPayment.sessionId);
// //                           alert('Session ID copied to clipboard');
// //                         }}
// //                         className="ml-2 text-green-400 hover:text-green-300"
// //                         title="Copy Session ID"
// //                       >
// //                         📋
// //                       </button>
// //                     </div>
// //                   </div>
// //                   {selectedPayment.paymentIntentId && (
// //                     <div>
// //                       <label className="block text-gray-400 text-sm mb-1">Payment Intent ID</label>
// //                       <div className="flex items-center">
// //                         <p className="text-white font-mono text-sm break-all">{selectedPayment.paymentIntentId}</p>
// //                         <button
// //                           onClick={() => {
// //                             navigator.clipboard.writeText(selectedPayment.paymentIntentId);
// //                             alert('Payment Intent ID copied to clipboard');
// //                           }}
// //                           className="ml-2 text-blue-400 hover:text-blue-300"
// //                           title="Copy Payment Intent ID"
// //                         >
// //                           📋
// //                         </button>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Pricing & Timing info could be added similarly if needed */}

// //             </div>

// //             <div className="flex justify-end p-6 border-t border-gray-700">
// //               <button
// //                 onClick={closeModal}
// //                 className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg transition-colors"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Payments;








// import React, { useState, useEffect } from 'react';
// import { FaMoneyBillWave, FaCheckCircle, FaSpinner, FaTimesCircle, FaClock, FaSearch, FaClipboard, FaCopy } from 'react-icons/fa';

// const AdminPaymentService = {
//   getPaymentStats: async () => {
//     const res = await fetch('http://localhost:8906/api/payments/nursing/statistics');
//     return res.json();
//   },
//   getAllPayments: async () => {
//     const res = await fetch('http://localhost:8906/api/payments/all/nursing');
//     return res.json();
//   },
//   getPaymentsByStatus: async (status: string) => {
//     const res = await fetch(`http://localhost:8906/api/payments/nursing/status/${status}`);
//     return res.json();
//   },
//   searchByEmail: async (email: string) => {
//     const res = await fetch(`http://localhost:8906/api/payments/nursing/customer/${encodeURIComponent(email)}`);
//     return res.json();
//   },
// };

// const formatDate = (dateString?: string) =>
//   dateString ? new Date(dateString).toLocaleString() : '';

// const formatCurrency = (amount?: number, currency: string = 'EUR') => {
//   if (amount === undefined || amount === null) return '€0.00';
//   return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);
// };

// const Payments: React.FC = () => {
//   const [stats, setStats] = useState<any>(null);
//   const [payments, setPayments] = useState<any[]>([]);
//   const [allPayments, setAllPayments] = useState<any[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
//   const [searchEmail, setSearchEmail] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const fetchStats = async () => {
//     try {
//       const data = await AdminPaymentService.getPaymentStats();
//       setStats(data);
//     } catch {
//       setError('Failed to fetch payment stats');
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const data = await AdminPaymentService.getAllPayments();
//       setPayments(data);
//       setAllPayments(data);
//       setError(null);
//     } catch {
//       setError('Failed to fetch payments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaymentsByStatus = async (status: string) => {
//     if (status === 'ALL') {
//       fetchPayments();
//       return;
//     }
//     try {
//       setLoading(true);
//       const data = await AdminPaymentService.getPaymentsByStatus(status);
//       setPayments(Array.isArray(data) ? data : []);
//       setError(null);
//     } catch {
//       setError('Failed to fetch payments by status');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchByEmail = async () => {
//     if (!searchEmail.trim()) {
//       setError(null);
//       setSelectedStatus('ALL');
//       fetchPayments();
//       return;
//     }
//     setSelectedStatus('ALL');
//     try {
//       setLoading(true);
//       setError(null);
//       let data = await AdminPaymentService.searchByEmail(searchEmail.trim());
//       if (!Array.isArray(data)) data = data ? [data] : [];
//       if (data.length === 0 && allPayments.length > 0) {
//         const searchLower = searchEmail.trim().toLowerCase();
//         data = allPayments.filter(p => p.customerEmail?.toLowerCase().includes(searchLower));
//       }
//       setPayments(data);
//       if (data.length === 0) setError(`No payments found for email: ${searchEmail}`);
//     } catch {
//       setError(`Failed to search payments for email: ${searchEmail}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchPayments();
//   }, []);

//   useEffect(() => {
//     fetchPaymentsByStatus(selectedStatus);
//   }, [selectedStatus]);

//   const openModal = (payment: any) => { setSelectedPayment(payment); setShowModal(true); };
//   const closeModal = () => { setSelectedPayment(null); setShowModal(false); };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case 'COMPLETED': return 'bg-green-500 text-green-900';
//       case 'PENDING': return 'bg-yellow-500 text-yellow-900';
//       case 'FAILED': return 'bg-red-500 text-red-900';
//       case 'CANCELLED': return 'bg-gray-500 text-gray-900';
//       case 'EXPIRED': return 'bg-orange-500 text-orange-900';
//       default: return 'bg-gray-400 text-gray-900';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold text-green-400 flex items-center gap-2">
//           <FaMoneyBillWave /> Payment Records
//         </h1>
//         <p className="text-gray-400">Manage and monitor all payment transactions</p>
//       </header>

//       {/* Stats cards */}
//       {stats && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
//               <FaClipboard /> Total Payments
//             </h3>
//             <p className="text-3xl font-bold">{stats.totalRecords}</p>
//             <p className="text-xs text-gray-400">All status types</p>
//           </div>
//           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
//               <FaMoneyBillWave /> Total Revenue
//             </h3>
//             <p className="text-3xl font-bold">
//               {formatCurrency(
//                 allPayments
//                   .filter((p) => p.status === 'COMPLETED')
//                   .reduce((sum, p) => sum + (p.amountTotalEuros || 0), 0),
//                 'EUR'
//               )}
//             </p>
//             <p className="text-xs text-gray-400">Completed payments only</p>
//           </div>
//           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2 mb-2">
//               <FaCheckCircle className="text-green-400" /> Completed
//             </h3>
//             <p className="text-3xl font-bold text-green-400">{stats.completedPayments}</p>
//             <p className="text-xs text-gray-400">Successfully paid</p>
//           </div>
//           <div className="bg-[#1a1a1a] border border-yellow-600 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2 mb-2">
//               <FaSpinner className="animate-spin" /> Pending
//             </h3>
//             <p className="text-3xl font-bold text-yellow-400">{stats.pendingPayments}</p>
//             <p className="text-xs text-gray-400">Awaiting payment</p>
//           </div>
//           <div className="bg-[#1a1a1a] border border-red-600 rounded-xl p-6">
//             <h3 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-2">
//               <FaTimesCircle /> Failed
//             </h3>
//             <p className="text-3xl font-bold text-red-400">{stats.failedPayments}</p>
//             <p className="text-xs text-gray-400">Failed transactions</p>
//           </div>
//         </div>
//       )}

//       {/* Controls */}
//       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-green-300 mb-2">
//               Status
//             </label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="COMPLETED">Completed</option>
//               <option value="PENDING">Pending</option>
//               <option value="FAILED">Failed</option>
//               <option value="CANCELLED">Cancelled</option>
//               <option value="EXPIRED">Expired</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-green-300 mb-2">
//               Search by Email
//             </label>
//             <div className="flex">
//               <input
//                 type="email"
//                 value={searchEmail}
//                 onChange={(e) => {
//                   setSearchEmail(e.target.value);
//                   setError(null);
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') searchByEmail();
//                 }}
//                 placeholder="customer@example.com"
//                 className="w-full bg-[#2a2a2a] border border-green-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//               <button
//                 onClick={searchByEmail}
//                 className="ml-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg flex items-center justify-center"
//                 title="Search by Email"
//                 type="button"
//               >
//                 <FaSearch />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
//       )}

//       {/* Payments Table */}
//       <div className="bg-[#1a1a1a] border border-green-600 rounded-xl p-6 mb-8 overflow-x-auto">
//         {loading ? (
//           <div className="text-center py-8">
//             <FaSpinner className="animate-spin text-3xl text-green-400 mx-auto mb-2" />
//             <p className="text-green-300">Loading payments...</p>
//           </div>
//         ) : payments.length > 0 ? (
//           <>
//             <table className="min-w-full divide-y divide-green-800">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Session ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[#181818] divide-y divide-green-900">
//                 {payments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td className="px-6 py-4 text-sm">
//                       <div className="text-white font-medium">{payment.customerEmail}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm">{formatCurrency(payment.amountTotalEuros, payment.currency)}</td>
//                     <td className="px-6 py-4 text-sm">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(payment.status)}`}>
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm">{payment.sessionId.substring(0, 20)}...</td>
//                     <td className="px-6 py-4 text-sm">
//                       <button
//                         onClick={() => openModal(payment)}
//                         className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded text-xs"
//                       >
//                         <FaClipboard /> Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-xl">No payment records found</p>
//           </div>
//         )}
//       </div>

//       {/* Payment Details Modal */}
//       {showModal && selectedPayment && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#1a1a1a] border border-green-600 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-700">
//               <h2 className="text-2xl font-bold text-green-400">
//                 💳 Payment Details #{selectedPayment.id}
//               </h2>
//               <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl font-bold">×</button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {Object.entries(selectedPayment).map(([key, value]) => (
//                   <div key={key} className="bg-[#2a2a2a] rounded-lg p-4">
//                     <label className="block text-green-300 text-sm font-semibold mb-1">
//                       {key}
//                     </label>
//                     <p className="text-white text-sm break-words">
//                       {value === null || value === undefined
//                         ? "—"
//                         : typeof value === "number" && key.toLowerCase().includes("amount")
//                         ? formatCurrency(value, selectedPayment.currency)
//                         : typeof value === "string" && value.includes("T")
//                         ? formatDate(value)
//                         : String(value)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end p-6 border-t border-gray-700">
//               <button
//                 onClick={closeModal}
//                 className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payments;





import React, { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaSearch,
  FaClipboard,
  FaCopy,
} from "react-icons/fa";
import { useLoginContext } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";

const AdminPaymentService = {
  getPaymentStats: async () => {
    const res = await fetch(
      "http://localhost:8906/api/payments/nursing/statistics"
    );
    return res.json();
  },
  getAllPayments: async () => {
    const res = await fetch("http://localhost:8906/api/payments/all/nursing");
    return res.json();
  },
  getPaymentsByStatus: async (status: string) => {
    const res = await fetch(
      `http://localhost:8906/api/payments/nursing/status/${status}`
    );
    return res.json();
  },
  searchByEmail: async (email: string) => {
    const res = await fetch(
      `http://localhost:8906/api/payments/nursing/customer/${encodeURIComponent(
        email
      )}`
    );
    return res.json();
  },
};

const formatDate = (dateString?: string) =>
  dateString ? new Date(dateString).toLocaleString() : "";

const formatCurrency = (amount?: number, currency: string = "EUR") => {
  if (amount === undefined || amount === null) return "€0.00";
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
  }).format(amount);
};

const Payments: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

    const { isLogin } = useLoginContext();
  const navigate = useNavigate();

    useEffect(() => {
      if (!isLogin) {
        navigate('/workflow');
      }
    }, [isLogin, navigate]);
    
     if (!isLogin) {
      return null;
    }

  const fetchStats = async () => {
    try {
      const data = await AdminPaymentService.getPaymentStats();
      setStats(data);
    } catch {
      setError("Failed to fetch payment stats");
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await AdminPaymentService.getAllPayments();
      setPayments(data);
      setAllPayments(data);
      setError(null);
    } catch {
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentsByStatus = async (status: string) => {
    if (status === "ALL") {
      fetchPayments();
      return;
    }
    try {
      setLoading(true);
      const data = await AdminPaymentService.getPaymentsByStatus(status);
      setPayments(Array.isArray(data) ? data : []);
      setError(null);
    } catch {
      setError("Failed to fetch payments by status");
    } finally {
      setLoading(false);
    }
  };

  const searchByEmail = async () => {
    if (!searchEmail.trim()) {
      setError(null);
      setSelectedStatus("ALL");
      fetchPayments();
      return;
    }
    setSelectedStatus("ALL");
    try {
      setLoading(true);
      setError(null);
      let data = await AdminPaymentService.searchByEmail(searchEmail.trim());
      if (!Array.isArray(data)) data = data ? [data] : [];
      if (data.length === 0 && allPayments.length > 0) {
        const searchLower = searchEmail.trim().toLowerCase();
        data = allPayments.filter((p) =>
          p.customerEmail?.toLowerCase().includes(searchLower)
        );
      }
      setPayments(data);
      if (data.length === 0)
        setError(`No payments found for email: ${searchEmail}`);
    } catch {
      setError(`Failed to search payments for email: ${searchEmail}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPayments();
  }, []);

  useEffect(() => {
    fetchPaymentsByStatus(selectedStatus);
  }, [selectedStatus]);

  const openModal = (payment: any) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedPayment(null);
    setShowModal(false);
  };

  const copyDetails = (payment: any) => {
    const text = JSON.stringify(payment, null, 2);
    navigator.clipboard.writeText(text);
    alert("Payment details copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          💳 Payments Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and monitor all payment transactions
        </p>
      </header>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Payments</p>
            <h2 className="text-2xl font-bold">{stats.totalRecords}</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-2xl font-bold text-green-600">
              {formatCurrency(
                allPayments
                  .filter((p) => p.status === "COMPLETED")
                  .reduce((sum, p) => sum + (p.amountTotalEuros || 0), 0),
                "EUR"
              )}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-2xl font-bold text-green-600">
              {stats.completedPayments}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-2xl font-bold text-yellow-500">
              {stats.pendingPayments}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Failed</p>
            <h2 className="text-2xl font-bold text-red-500">
              {stats.failedPayments}
            </h2>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-col md:flex-row gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="ALL">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>

        <div className="flex-1 flex items-center border rounded px-2">
          <FaSearch className="text-gray-400" />
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => {
              setSearchEmail(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchByEmail();
            }}
            placeholder="Search by email..."
            className="w-full px-2 py-1 text-sm outline-none"
          />
        </div>

        <button
          onClick={searchByEmail}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 mb-4 text-center font-semibold">{error}</div>
      )}

      {/* Payments Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : payments.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Session ID</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-3">{payment.customerEmail}</td>
                  <td className="px-6 py-3">
                    {formatCurrency(payment.amountTotalEuros, payment.currency)}
                  </td>
                  <td className="px-6 py-3">{payment.status}</td>
                  <td className="px-6 py-3">
                    {payment.sessionId.substring(0, 12)}...
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => openModal(payment)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaClipboard /> Details
                    </button>
                    <button
                      onClick={() => copyDetails(payment)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaCopy /> Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No payment records found
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-700">
                Payment #{selectedPayment.id}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedPayment).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded p-3">
                  <label className="text-xs font-semibold text-gray-500">
                    {key}
                  </label>
                  <p className="text-gray-800 text-sm break-words">
                    {value === null || value === undefined
                      ? "—"
                      : typeof value === "number" &&
                        key.toLowerCase().includes("amount")
                      ? formatCurrency(value, selectedPayment.currency)
                      : typeof value === "string" && value.includes("T")
                      ? formatDate(value)
                      : String(value)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
