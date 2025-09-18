// // // import React from 'react';

// // // const Bookings = () => {
// // //   return <h1>bookings</h1>;
// // // };

// // // export default Bookings;



// // import { useEffect, useState } from 'react';
// // import { FaSearch, FaBed, FaUserFriends, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaClipboard, FaSpinner } from 'react-icons/fa';

// // // New Base URL for the nursing backend
// // const API_BASE_URL = 'https://nursing.marketingzynlogic.com';

// // // Utility function for consistent currency formatting
// // const formatCurrency = (amount: number, currency: string = 'EUR') => {
// //   if (amount === null || amount === undefined) return '€0.00';
// //   return new Intl.NumberFormat('en-EU', {
// //     style: 'currency',
// //     currency: currency,
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   }).format(amount);
// // };

// // // Data types remain the same for clarity
// // type PaymentRecord = {
// //   id: number;
// // };

// // type Booking = {
// //   id: number;
// //   name: string;
// //   phone: string;
// //   email: string;
// //   country: string;
// //   instituteOrUniversity: string;
// //   amountPaid: number;
// //   paymentRecord: PaymentRecord;
// //   pricingConfig: {
// //     id: number;
// //     presentationType: {
// //       id: number;
// //       type: string;
// //       price: number;
// //     };
// //     accommodationOption?: {
// //       id: number;
// //       nights: number;
// //       guests: number;
// //       price: number;
// //     };
// //     processingFeePercent: number;
// //     totalPrice: number;
// //   };
// // };

// // type PaymentDetails = {
// //   id: number;
// //   sessionId: string;
// //   paymentIntentId?: string;
// //   customerEmail: string;
// //   amountTotal: number;
// //   amountTotalEuros: number;
// //   amountTotalCents: number;
// //   currency: string;
// //   status: string;
// //   paymentStatus: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   stripeCreatedAt?: string;
// //   stripeExpiresAt?: string;
// // };

// // // Helper function to handle API calls without auth headers
// // const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
// //   const url = `${API_BASE_URL}${endpoint}`;
// //   const response = await fetch(url, options);
// //   if (!response.ok) {
// //     throw new Error(`API Error: ${response.status} ${response.statusText}`);
// //   }
// //   return response.json();
// // };

// // // --- Main AdminBookingsNursing Component ---
// // const Bookings = () => {
// //   const [bookings, setBookings] = useState<Booking[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [view, setView] = useState<'with' | 'without'>('with');
// //   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
// //   const [loadingPayment, setLoadingPayment] = useState(false);
// //   const [universalSearch, setUniversalSearch] = useState('');
// //   const [bookingPaymentStatuses, setBookingPaymentStatuses] = useState<{[key: number]: PaymentDetails | null}>({});
// //   const [showCopyMessage, setShowCopyMessage] = useState(false);

// //   // Function to fetch all bookings and their payment statuses
// //   useEffect(() => {
// //     const fetchAllData = async () => {
// //       try {
// //         setLoading(true);
// //         // Fetch bookings for the nursing website
// //         const bookingRes = await apiCall('/admin/api/admin/registration-forms/nursing', {
// //           method: 'POST',
// //           body: JSON.stringify({}),
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         });
// //         setBookings(bookingRes);

// //         // Fetch all payments for status and revenue calculation
// //         const allPaymentsData = await apiCall('/api/payments/all/nursing');
        
// //         // Fetch individual payment statuses for all bookings with payment records
// //         const paymentStatusPromises = bookingRes
// //           .filter((booking: Booking) => booking.paymentRecord?.id)
// //           .map(async (booking: Booking) => {
// //             try {
// //               const paymentData = allPaymentsData.find((p: PaymentDetails) => p.id === booking.paymentRecord.id);
// //               if (paymentData) {
// //                 return { bookingId: booking.id, paymentData };
// //               }
// //               // If not found in the initial fetch, try individual fetch as a fallback
// //               const fallbackPaymentData = await apiCall(`/api/payments/nursing/${booking.paymentRecord.id}`);
// //               return { bookingId: booking.id, paymentData: fallbackPaymentData };
// //             } catch (err) {
// //               console.error(`Failed to fetch payment for booking ${booking.id}:`, err);
// //               return { bookingId: booking.id, paymentData: null };
// //             }
// //           });

// //         const paymentResults = await Promise.all(paymentStatusPromises);
// //         const statusMap: {[key: number]: PaymentDetails | null} = {};
// //         paymentResults.forEach(result => {
// //           statusMap[result.bookingId] = result.paymentData;
// //         });
// //         setBookingPaymentStatuses(statusMap);
// //       } catch (err: any) {
// //         setError(err.message || 'Error fetching bookings');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAllData();
// //   }, []);

// //   // Handle clicking on a booking to show payment details modal
// //   const handleBookingClick = async (booking: Booking, event?: React.MouseEvent) => {
// //     if (event) {
// //       event.preventDefault();
// //       event.stopPropagation();
// //     }
    
// //     setSelectedBooking(booking);
// //     setPaymentDetails(null); // Reset payment details
// //     setShowDetailsModal(true); // Show modal immediately
    
// //     if (booking.paymentRecord?.id) {
// //       setLoadingPayment(true);
// //       try {
// //         const paymentData = await apiCall(`/api/payments/nursing/${booking.paymentRecord.id}`);
// //         setPaymentDetails(paymentData);
// //       } catch (error) {
// //         console.error('Failed to fetch payment details:', error);
// //         setPaymentDetails(null);
// //       } finally {
// //         setLoadingPayment(false);
// //       }
// //     } else {
// //       setLoadingPayment(false);
// //     }
// //   };

// //   // Helper for payment status color
// //   const getPaymentStatusColor = (booking: Booking, paymentDetails?: PaymentDetails | null) => {
// //     if (!booking.paymentRecord?.id) {
// //       return 'bg-gray-500 text-gray-200';
// //     }
// //     if (paymentDetails) {
// //       switch (paymentDetails.status) {
// //         case 'COMPLETED': return 'bg-green-500 text-green-900';
// //         case 'PENDING': return 'bg-yellow-500 text-yellow-900';
// //         case 'FAILED':
// //         case 'CANCELLED': return 'bg-red-500 text-red-900';
// //         case 'EXPIRED': return 'bg-orange-500 text-orange-900';
// //         default: return 'bg-gray-500 text-gray-200';
// //       }
// //     }
// //     return 'bg-yellow-500 text-yellow-900';
// //   };

// //   // Helper for payment status text
// //   const getPaymentStatusText = (booking: Booking, paymentDetails?: PaymentDetails | null) => {
// //     if (!booking.paymentRecord?.id) {
// //       return '❌ No Payment Record';
// //     }
// //     if (paymentDetails) {
// //       switch (paymentDetails.status) {
// //         case 'COMPLETED': return '✅ Paid';
// //         case 'PENDING': return '⏳ Pending';
// //         case 'FAILED': return '❌ Failed';
// //         case 'CANCELLED': return '🚫 Cancelled';
// //         case 'EXPIRED': return '⏰ Expired';
// //         default: return '❓ Unknown';
// //       }
// //     }
// //     return '🔄 Click to Check Status';
// //   };

// //   // Filtered bookings based on search query
// //   const filterByUniversalSearch = (booking: Booking) => {
// //     if (!universalSearch.trim()) return true;
// //     const search = universalSearch.trim().toLowerCase();
// //     return (
// //       booking.name?.toLowerCase().includes(search) ||
// //       booking.email?.toLowerCase().includes(search) ||
// //       booking.phone?.toLowerCase().includes(search) ||
// //       booking.country?.toLowerCase().includes(search) ||
// //       booking.instituteOrUniversity?.toLowerCase().includes(search) ||
// //       (booking.paymentRecord?.id?.toString() || '').includes(search) ||
// //       booking.pricingConfig?.presentationType?.type?.toLowerCase().includes(search) ||
// //       (booking.pricingConfig?.accommodationOption?.nights?.toString() || '').includes(search) ||
// //       (booking.pricingConfig?.accommodationOption?.guests?.toString() || '').includes(search)
// //     );
// //   };

// //   const bookingsWithAccommodation = bookings.filter(b => b.pricingConfig?.accommodationOption);
// //   const bookingsWithoutAccommodation = bookings.filter(b => !b.pricingConfig?.accommodationOption);
// //   const filteredBookingsWithAccommodation = bookingsWithAccommodation.filter(filterByUniversalSearch);
// //   const filteredBookingsWithoutAccommodation = bookingsWithoutAccommodation.filter(filterByUniversalSearch);

// //   // Payment statistics
// //   const paidBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'COMPLETED');
// //   const pendingBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'PENDING' || (b.paymentRecord?.id && !bookingPaymentStatuses[b.id]));
// //   const unpaidBookings = bookings.filter(b => !b.paymentRecord?.id);

// //   const totalPaidRevenue = paidBookings.reduce((sum, b) => {
// //     const paymentStatus = bookingPaymentStatuses[b.id];
// //     return sum + (paymentStatus?.amountTotalEuros || paymentStatus?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0);
// //   }, 0);

// //   const paidWithAcc = paidBookings.filter(b => b.pricingConfig?.accommodationOption);
// //   const totalWithAccRevenue = paidWithAcc.reduce((sum, b) => {
// //     const paymentStatus = bookingPaymentStatuses[b.id];
// //     return sum + (paymentStatus?.amountTotalEuros || paymentStatus?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0);
// //   }, 0);

// //   const paidWithoutAcc = paidBookings.filter(b => !b.pricingConfig?.accommodationOption);
// //   const totalWithoutAccRevenue = paidWithoutAcc.reduce((sum, b) => {
// //     const paymentStatus = bookingPaymentStatuses[b.id];
// //     return sum + (paymentStatus?.amountTotalEuros || paymentStatus?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0);
// //   }, 0);

// //   // Section Component (nested within AdminBookingsNursing)
// //   const Section = ({
// //     title,
// //     bookings,
// //     hasAccommodation,
// //     onBookingClick
// //   }: {
// //     title: string;
// //     bookings: Booking[];
// //     hasAccommodation: boolean;
// //     onBookingClick: (booking: Booking, event?: React.MouseEvent) => void;
// //   }) => (
// //     <section>
// //       <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
// //       {bookings.length === 0 ? (
// //         <p className="text-gray-500">No bookings {hasAccommodation ? 'with' : 'without'} accommodation.</p>
// //       ) : (
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead className="bg-gray-50 border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presentation</th>
// //                   {hasAccommodation && (
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accommodation</th>
// //                   )}
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {bookings.map((b) => {
// //                   const paymentStatus = bookingPaymentStatuses[b.id];
// //                   const isPaid = paymentStatus?.status === 'COMPLETED';
// //                   const isPending = paymentStatus?.status === 'PENDING' || (b.paymentRecord?.id && !paymentStatus);
// //                   const hasNoPayment = !b.paymentRecord?.id;

// //                   return (
// //                     <tr
// //                       key={b.id}
// //                       className="hover:bg-gray-50 cursor-pointer transition-colors"
// //                       onClick={(event) => onBookingClick(b, event)}
// //                       title="Click to view payment details"
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="flex items-center">
// //                           <div>
// //                             <div className="text-sm font-medium text-gray-900">{b.name}</div>
// //                             <div className="text-sm text-gray-500">{b.instituteOrUniversity}</div>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-900">{b.email}</div>
// //                         <div className="text-sm text-gray-500">{b.phone}</div>
// //                         <div className="text-sm text-gray-500">{b.country}</div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-900">{b.pricingConfig.presentationType.type}</div>
// //                         <div className="text-sm text-gray-500">€{(b.pricingConfig.presentationType.price || 0).toFixed(2)}</div>
// //                       </td>
// //                       {hasAccommodation && (
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-gray-900">
// //                             {b.pricingConfig.accommodationOption?.guests} Guest(s)
// //                           </div>
// //                           <div className="text-sm text-gray-500">
// //                             {b.pricingConfig.accommodationOption?.nights} Night(s)
// //                           </div>
// //                           <div className="text-sm text-gray-500">
// //                             €{(b.pricingConfig.accommodationOption?.price || 0).toFixed(2)}
// //                           </div>
// //                         </td>
// //                       )}
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-gray-900">
// //                           €{(b.pricingConfig.totalPrice || b.amountPaid || 0).toFixed(2)}
// //                         </div>
// //                         {b.paymentRecord?.id && (
// //                           <div className="text-xs text-gray-500">ID: #{b.paymentRecord.id}</div>
// //                         )}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(b, paymentStatus)}`}>
// //                           {getPaymentStatusText(b, paymentStatus)}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
// //                         <button
// //                           onClick={(event) => onBookingClick(b, event)}
// //                           className="text-blue-600 hover:text-blue-900 transition-colors"
// //                         >
// //                           View Details
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );

// //   return (
// //     <div className="min-h-screen bg-white text-gray-900">
// //       {/* Sidebar Placeholder */}
// //       <div className="fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg p-6 flex flex-col items-center">
// //         <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
// //         <nav>
// //           <ul className="space-y-4">
// //             <li>
// //               <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
// //                 <FaClipboard /> Bookings
// //               </a>
// //             </li>
// //             {/* Add more sidebar links if needed */}
// //           </ul>
// //         </nav>
// //       </div>

// //       {/* Main content */}
// //       <main className="ml-64 p-8 overflow-y-auto">
// //         <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">All Registrations (Nursing)</h1>
// //         <p className="text-center text-gray-600 mb-8">Base URL: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">{API_BASE_URL}</code></p>

// //         {/* Summary Statistics */}
// //         {!loading && !error && (
// //           <div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaClipboard /> Total Bookings</h3>
// //                 <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
// //               </div>
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Paid</h3>
// //                 <p className="text-2xl font-bold text-green-600">{paidBookings.length}</p>
// //               </div>
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaSpinner className="animate-spin text-yellow-600" /> Pending</h3>
// //                 <p className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</p>
// //               </div>
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaTimesCircle className="text-gray-600" /> No Payment</h3>
// //                 <p className="text-2xl font-bold text-gray-600">{unpaidBookings.length}</p>
// //               </div>
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaMoneyBillWave /> Total Revenue</h3>
// //                 <p className="text-2xl font-bold text-gray-900">
// //                   <span>{formatCurrency(totalPaidRevenue, 'EUR')}</span><br />
// //                   <span className="text-xs text-gray-600">With Accommodation: {formatCurrency(totalWithAccRevenue, 'EUR')}</span><br />
// //                   <span className="text-xs text-gray-600">Without Accommodation: {formatCurrency(totalWithoutAccRevenue, 'EUR')}</span>
// //                 </p>
// //                 <p className="text-xs text-gray-500">Only completed payments</p>
// //               </div>
// //             </div>

// //             {/* Accommodation Breakdown */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaBed /> With Accommodation</h3>
// //                 <p className="text-2xl font-bold text-gray-900">{bookingsWithAccommodation.length}</p>
// //               </div>
// //               <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaUserFriends /> Without Accommodation</h3>
// //                 <p className="text-2xl font-bold text-gray-900">{bookingsWithoutAccommodation.length}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
        
// //         {/* View and Search */}
// //         <div className="flex justify-center gap-4 mb-8">
// //           <button
// //             onClick={() => setView('with')}
// //             className={`px-5 py-2 rounded-lg font-semibold transition ${
// //               view === 'with'
// //                 ? 'bg-green-500 text-black'
// //                 : 'bg-gray-800 hover:bg-green-600 text-white'
// //             }`}
// //           >
// //             With Accommodation
// //           </button>
// //           <button
// //             onClick={() => setView('without')}
// //             className={`px-5 py-2 rounded-lg font-semibold transition ${
// //               view === 'without'
// //                 ? 'bg-green-500 text-black'
// //                 : 'bg-gray-800 hover:bg-green-600 text-white'
// //             }`}
// //           >
// //             Without Accommodation
// //           </button>
// //         </div>

// //         {/* Universal Search Bar */}
// //         <div className="flex items-center gap-2 mb-6">
// //           <div className="relative w-full">
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// //               <FaSearch />
// //             </span>
// //             <input
// //               type="text"
// //               value={universalSearch}
// //               onChange={e => setUniversalSearch(e.target.value)}
// //               placeholder="Search all fields (name, email, phone, country, etc.)..."
// //               className="bg-white border border-gray-300 rounded-lg px-10 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
// //             />
// //           </div>
// //           <button
// //             onClick={() => setUniversalSearch('')}
// //             className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 transition-colors"
// //           >
// //             <FaTimesCircle /> Reset
// //           </button>
// //         </div>

// //         {loading && <p className="text-gray-300 text-center">Loading bookings...</p>}
// //         {error && <p className="text-red-400 text-center">Error: {error}</p>}

// //         {!loading && !error && (
// //           <Section
// //             title={view === 'with' ? 'With Accommodation' : 'Without Accommodation'}
// //             bookings={view === 'with' ? filteredBookingsWithAccommodation : filteredBookingsWithoutAccommodation}
// //             hasAccommodation={view === 'with'}
// //             onBookingClick={handleBookingClick}
// //           />
// //         )}
// //       </main>

// //       {/* Complete Payment Details Modal */}
// //       {showDetailsModal && selectedBooking && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
// //           <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border-2 border-green-600 shadow-2xl w-[95%] max-w-6xl max-h-[95vh] overflow-y-auto">
// //             <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-600">
// //               <div>
// //                 <h2 className="text-3xl font-bold text-green-400 mb-2">
// //                   📋 Complete Booking & Payment Details
// //                 </h2>
// //                 <p className="text-gray-300">
// //                   Customer: <span className="font-semibold text-white">{selectedBooking.name}</span> | 
// //                   Booking ID: <span className="font-mono text-blue-300">#{selectedBooking.id}</span>
// //                   {selectedBooking.paymentRecord?.id && (
// //                     <> | Payment Record: <span className="font-mono text-green-300">#{selectedBooking.paymentRecord.id}</span></>
// //                   )}
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={() => {
// //                   setShowDetailsModal(false);
// //                   setSelectedBooking(null);
// //                   setPaymentDetails(null);
// //                   setShowCopyMessage(false);
// //                 }}
// //                 className="text-gray-400 hover:text-white text-4xl font-bold transition-colors"
// //                 title="Close modal"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             {/* Customer Information */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                 <h3 className="text-green-300 font-semibold mb-2">👤 Customer Info</h3>
// //                 <div className="space-y-2">
// //                   <p><strong>Name:</strong> {selectedBooking.name}</p>
// //                   <p><strong>Email:</strong> {selectedBooking.email}</p>
// //                   <p><strong>Phone:</strong> {selectedBooking.phone}</p>
// //                   <p><strong>Country:</strong> {selectedBooking.country}</p>
// //                   <p><strong>Institute:</strong> {selectedBooking.instituteOrUniversity}</p>
// //                 </div>
// //               </div>
// //               <div className="bg-[#2a2a2a] rounded-lg p-4">
// //                 <h3 className="text-green-300 font-semibold mb-2">💰 Pricing Details</h3>
// //                 <div className="space-y-2">
// //                   <p><strong>Presentation:</strong> {selectedBooking.pricingConfig.presentationType.type}</p>
// //                   <p><strong>Presentation Fee:</strong> €{(selectedBooking.pricingConfig.presentationType.price || 0).toFixed(2)}</p>
// //                   {selectedBooking.pricingConfig.accommodationOption && (
// //                     <>
// //                       <p><strong>Accommodation:</strong> {selectedBooking.pricingConfig.accommodationOption.nights} nights, {selectedBooking.pricingConfig.accommodationOption.guests} guests</p>
// //                       <p><strong>Accommodation Fee:</strong> €{(selectedBooking.pricingConfig.accommodationOption.price || 0).toFixed(2)}</p>
// //                     </>
// //                   )}
// //                   <p><strong>Processing Fee:</strong> {selectedBooking.pricingConfig.processingFeePercent}%</p>
// //                   <p className="text-sm text-gray-400">Processing Fee Amount: €{(((selectedBooking.pricingConfig.presentationType.price || 0) + (selectedBooking.pricingConfig.accommodationOption?.price || 0)) * (selectedBooking.pricingConfig.processingFeePercent || 0) / 100).toFixed(2)}</p>
// //                   <p className="text-lg"><strong>Total Amount:</strong> <span className="text-green-400">€{(selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}</span></p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Complete Payment Information */}
// //             <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
// //               <h3 className="text-green-300 font-semibold mb-6 text-xl">💳 Complete Payment Details</h3>
// //               {loadingPayment ? (
// //                 <div className="text-center text-green-400 py-8">
// //                   <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-green-400 rounded-full" role="status" aria-label="loading">
// //                     <span className="sr-only">Loading...</span>
// //                   </div>
// //                   <p className="mt-4">🔄 Loading complete payment details...</p>
// //                 </div>
// //               ) : paymentDetails && paymentDetails.id ? (
// //                 <div className="space-y-6">
// //                   {/* Payment Status Header */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
// //                     <div className="flex items-center justify-between">
// //                       <div>
// //                         <h4 className="text-lg font-bold text-white">Payment #{paymentDetails.id}</h4>
// //                         <p className="text-gray-400">Session: {paymentDetails.sessionId}</p>
// //                       </div>
// //                       <span className={`px-4 py-2 rounded-full text-sm font-bold ${
// //                         paymentDetails.status === 'COMPLETED' 
// //                           ? 'bg-green-500 text-green-900' 
// //                           : paymentDetails.status === 'PENDING'
// //                           ? 'bg-yellow-500 text-yellow-900'
// //                           : 'bg-red-500 text-red-900'
// //                       }`}>
// //                         {paymentDetails.status}
// //                       </span>
// //                     </div>
// //                   </div>

// //                   {/* Financial Details */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4">
// //                     <h5 className="text-green-300 font-semibold mb-3">💰 Financial Information</h5>
// //                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Total Amount</label>
// //                         <p className="text-2xl font-bold text-green-400">€{(paymentDetails.amountTotal || selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}</p>
// //                         <p className="text-sm text-gray-400">{paymentDetails.currency || 'EUR'}</p>
// //                       </div>
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Customer Email</label>
// //                         <p className="text-white">{paymentDetails.customerEmail}</p>
// //                       </div>
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Processing Fee</label>
// //                         <p className="text-white font-bold">{selectedBooking.pricingConfig.processingFeePercent}%</p>
// //                         <p className="text-sm text-gray-400">€{(((selectedBooking.pricingConfig.presentationType.price || 0) + (selectedBooking.pricingConfig.accommodationOption?.price || 0)) * (selectedBooking.pricingConfig.processingFeePercent || 0) / 100).toFixed(2)}</p>
// //                       </div>
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Total Amount</label>
// //                         <p className="text-white font-bold">€{(selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}</p>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Payment Status Details */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4">
// //                     <h5 className="text-blue-300 font-semibold mb-3">📊 Status Information</h5>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Payment Status</label>
// //                         <p className="text-white font-medium">{paymentDetails.status}</p>
// //                       </div>
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Stripe Payment Status</label>
// //                         <p className="text-white font-medium">{paymentDetails.paymentStatus}</p>
// //                       </div>
// //                       {paymentDetails.paymentIntentId && (
// //                         <div className="md:col-span-2">
// //                           <label className="block text-gray-400 text-sm mb-1">Payment Intent ID</label>
// //                           <p className="text-white font-mono text-sm break-all">{paymentDetails.paymentIntentId}</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Timing Information */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4">
// //                     <h5 className="text-purple-300 font-semibold mb-3">⏰ Timing Details</h5>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Payment Created</label>
// //                         <p className="text-white">{new Date(paymentDetails.createdAt).toLocaleString()}</p>
// //                       </div>
// //                       <div>
// //                         <label className="block text-gray-400 text-sm mb-1">Last Updated</label>
// //                         <p className="text-white">{new Date(paymentDetails.updatedAt).toLocaleString()}</p>
// //                       </div>
// //                       {paymentDetails.stripeCreatedAt && (
// //                         <div>
// //                           <label className="block text-gray-400 text-sm mb-1">Stripe Created</label>
// //                           <p className="text-white">{new Date(paymentDetails.stripeCreatedAt).toLocaleString()}</p>
// //                         </div>
// //                       )}
// //                       {paymentDetails.stripeExpiresAt && (
// //                         <div>
// //                           <label className="block text-gray-400 text-sm mb-1">Stripe Expires</label>
// //                           <p className="text-white">{new Date(paymentDetails.stripeExpiresAt).toLocaleString()}</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Session Details */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4">
// //                     <h5 className="text-yellow-300 font-semibold mb-3">🔗 Session Information</h5>
// //                     <div>
// //                       <label className="block text-gray-400 text-sm mb-1">Session ID</label>
// //                       <div className="flex items-center space-x-2">
// //                         <p className="text-white font-mono text-sm break-all flex-1">{paymentDetails.sessionId}</p>
// //                         <button
// //                           onClick={() => {
// //                             navigator.clipboard.writeText(paymentDetails.sessionId);
// //                             setShowCopyMessage(true);
// //                             setTimeout(() => setShowCopyMessage(false), 2000);
// //                           }}
// //                           className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors"
// //                           title="Copy to clipboard"
// //                         >
// //                           📋 Copy
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Copy message for alert replacement */}
// //                   {showCopyMessage && (
// //                     <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-green-500 text-black px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
// //                       Details copied to clipboard!
// //                     </div>
// //                   )}

// //                   {/* Additional Actions */}
// //                   <div className="bg-[#1a1a1a] rounded-lg p-4">
// //                     <h5 className="text-orange-300 font-semibold mb-3">🔧 Actions</h5>
// //                     <div className="flex flex-wrap gap-2">
// //                       <button
// //                         onClick={() => {
// //                           const fullPaymentInfo = `
// // 🔍 COMPLETE PAYMENT DETAILS

// // Payment ID: #${paymentDetails.id}
// // Session ID: ${paymentDetails.sessionId}
// // ${paymentDetails.paymentIntentId ? `Payment Intent: ${paymentDetails.paymentIntentId}` : ''}

// // 💰 FINANCIAL DETAILS
// // Amount: €${(paymentDetails.amountTotal || selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)} ${paymentDetails.currency || 'EUR'}
// // Customer: ${paymentDetails.customerEmail}
// // Total Amount: €${(selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}

// // 📊 STATUS INFORMATION
// // Payment Status: ${paymentDetails.status}
// // Stripe Status: ${paymentDetails.paymentStatus}

// // ⏰ TIMING DETAILS
// // Created: ${new Date(paymentDetails.createdAt).toLocaleString()}
// // Updated: ${new Date(paymentDetails.updatedAt).toLocaleString()}
// // ${paymentDetails.stripeCreatedAt ? `Stripe Created: ${new Date(paymentDetails.stripeCreatedAt).toLocaleString()}` : ''}
// // ${paymentDetails.stripeExpiresAt ? `Stripe Expires: ${new Date(paymentDetails.stripeExpiresAt).toLocaleString()}` : ''}

// // 📝 BOOKING ASSOCIATION
// // Booking ID: #${selectedBooking.id}
// // Customer: ${selectedBooking.name}
// // Email: ${selectedBooking.email}
// // Phone: ${selectedBooking.phone}
// // Country: ${selectedBooking.country}
// //                           `;
// //                           navigator.clipboard.writeText(fullPaymentInfo);
// //                           setShowCopyMessage(true);
// //                           setTimeout(() => setShowCopyMessage(false), 2000);
// //                         }}
// //                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
// //                       >
// //                         📋 Copy All Details
// //                       </button>
// //                       <button
// //                         onClick={() => {
// //                           navigator.clipboard.writeText(paymentDetails.id.toString());
// //                           setShowCopyMessage(true);
// //                           setTimeout(() => setShowCopyMessage(false), 2000);
// //                         }}
// //                         className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded text-sm transition-colors"
// //                       >
// //                         Copy Payment ID
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ) : selectedBooking.paymentRecord?.id ? (
// //                 <div className="text-center py-8">
// //                   <div className="text-red-400 text-lg mb-2">❌ Payment Details Unavailable</div>
// //                   <p className="text-gray-400">Failed to load payment details for Payment Record ID: #{selectedBooking.paymentRecord.id}</p>
// //                   <div className="mt-4 bg-gray-700 rounded-lg p-4">
// //                     <h4 className="text-white font-semibold mb-2">Available Information:</h4>
// //                     <p className="text-sm text-gray-300">Payment Record exists with ID: #{selectedBooking.paymentRecord.id}</p>
// //                     <p className="text-sm text-gray-300">Total Amount: €{(selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}</p>
// //                     <p className="text-sm text-gray-300">Customer: {selectedBooking.email}</p>
// //                   </div>
// //                   <button
// //                     onClick={() => handleBookingClick(selectedBooking)}
// //                     className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors"
// //                   >
// //                     🔄 Retry Loading
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-8">
// //                   <div className="text-gray-400 text-lg mb-2">❌ No Payment Record</div>
// //                   <p className="text-gray-500">This booking does not have an associated payment record.</p>
// //                   <div className="mt-4 bg-gray-700 rounded-lg p-4">
// //                     <p className="text-sm text-gray-300">
// //                       This could mean the booking was created but payment was never initiated or completed.
// //                     </p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Close Button */}
// //             <div className="flex justify-between items-center pt-4 border-t border-gray-600">
// //               <p className="text-sm text-gray-400">
// //                 💡 All payment and booking details are displayed above
// //               </p>
// //               <button
// //                 onClick={() => {
// //                   setShowDetailsModal(false);
// //                   setSelectedBooking(null);
// //                   setPaymentDetails(null);
// //                   setShowCopyMessage(false);
// //                 }}
// //                 className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg transition-colors font-bold text-lg"
// //               >
// //                 ✓ Close Details
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Bookings;



// import { useEffect, useState } from 'react';
// import { FaSearch, FaBed, FaUserFriends, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaClipboard, FaSpinner } from 'react-icons/fa';

// const API_BASE_URL = 'https://nursing.marketingzynlogic.com';
// const formatCurrency = (amount, currency = 'EUR') => {
//   if (amount === null || amount === undefined) return '€0.00';
//   return new Intl.NumberFormat('en-EU', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
// };

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [view, setView] = useState('with');
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [loadingPayment, setLoadingPayment] = useState(false);
//   const [universalSearch, setUniversalSearch] = useState('');
//   const [bookingPaymentStatuses, setBookingPaymentStatuses] = useState({});
//   const [showCopyMessage, setShowCopyMessage] = useState(false);

//   useEffect(() => {
//     const apiCall = async (endpoint, options = {}) => {
//       const url = `${API_BASE_URL}${endpoint}`;
//       const response = await fetch(url, options);
//       if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
//       return response.json();
//     };
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         const bookingRes = await apiCall('/admin/api/admin/registration-forms/nursing', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
//         setBookings(bookingRes);
//         const allPaymentsData = await apiCall('/api/payments/all/nursing');
//         const paymentStatusPromises = bookingRes.filter(b => b.paymentRecord?.id).map(async b => {
//           try {
//             const paymentData = allPaymentsData.find(p => p.id === b.paymentRecord.id);
//             if (paymentData) return { bookingId: b.id, paymentData };
//             const fallbackPaymentData = await apiCall(`/api/payments/nursing/${b.paymentRecord.id}`);
//             return { bookingId: b.id, paymentData: fallbackPaymentData };
//           } catch { return { bookingId: b.id, paymentData: null }; }
//         });
//         const paymentResults = await Promise.all(paymentStatusPromises);
//         const statusMap = {};
//         paymentResults.forEach(result => { statusMap[result.bookingId] = result.paymentData; });
//         setBookingPaymentStatuses(statusMap);
//       } catch (err) { setError(err.message || 'Error fetching bookings'); }
//       finally { setLoading(false); }
//     };
//     fetchAllData();
//   }, []);

//   const getPaymentStatusColor = (booking, paymentDetails) => {
//     if (!booking.paymentRecord?.id) return 'bg-gray-100 text-gray-400';
//     if (paymentDetails) {
//       switch (paymentDetails.status) {
//         case 'COMPLETED': return 'bg-green-50 text-green-700';
//         case 'PENDING': return 'bg-yellow-50 text-yellow-700';
//         case 'FAILED': case 'CANCELLED': return 'bg-red-50 text-red-600';
//         case 'EXPIRED': return 'bg-orange-50 text-orange-700';
//         default: return 'bg-gray-100 text-gray-400';
//       }
//     }
//     return 'bg-yellow-50 text-yellow-700';
//   };

//   const getPaymentStatusText = (booking, paymentDetails) => {
//     if (!booking.paymentRecord?.id) return '❌ No Payment';
//     if (paymentDetails) {
//       switch (paymentDetails.status) {
//         case 'COMPLETED': return '✓ Paid';
//         case 'PENDING': return '⏳ Pending';
//         case 'FAILED': return '✕ Failed';
//         case 'CANCELLED': return '🚫 Cancelled';
//         case 'EXPIRED': return '⏰ Expired';
//         default: return '? Unknown';
//       }
//     }
//     return 'Check Status';
//   };

//   const filterByUniversalSearch = booking => {
//     if (!universalSearch.trim()) return true; const search = universalSearch.trim().toLowerCase();
//     return (
//       booking.name?.toLowerCase().includes(search)
//       || booking.email?.toLowerCase().includes(search)
//       || booking.phone?.toLowerCase().includes(search)
//       || booking.country?.toLowerCase().includes(search)
//       || booking.instituteOrUniversity?.toLowerCase().includes(search)
//       || (booking.paymentRecord?.id?.toString() || '').includes(search)
//       || booking.pricingConfig?.presentationType?.type?.toLowerCase().includes(search)
//       || (booking.pricingConfig?.accommodationOption?.nights?.toString() || '').includes(search)
//       || (booking.pricingConfig?.accommodationOption?.guests?.toString() || '').includes(search));
//   };

//   const bookingsWithAccommodation = bookings.filter(b => b.pricingConfig?.accommodationOption);
//   const bookingsWithoutAccommodation = bookings.filter(b => !b.pricingConfig?.accommodationOption);
//   const filteredBookingsWithAccommodation = bookingsWithAccommodation.filter(filterByUniversalSearch);
//   const filteredBookingsWithoutAccommodation = bookingsWithoutAccommodation.filter(filterByUniversalSearch);

//   const paidBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'COMPLETED');
//   const pendingBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'PENDING' || (b.paymentRecord?.id && !bookingPaymentStatuses[b.id]));
//   const unpaidBookings = bookings.filter(b => !b.paymentRecord?.id);

//   const totalPaidRevenue = paidBookings.reduce((sum, b) => {
//     const p = bookingPaymentStatuses[b.id];
//     return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);
//   const paidWithAcc = paidBookings.filter(b => b.pricingConfig?.accommodationOption);
//   const totalWithAccRevenue = paidWithAcc.reduce((sum, b) => {
//     const p = bookingPaymentStatuses[b.id];
//     return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);
//   const paidWithoutAcc = paidBookings.filter(b => !b.pricingConfig?.accommodationOption);
//   const totalWithoutAccRevenue = paidWithoutAcc.reduce((sum, b) => {
//     const p = bookingPaymentStatuses[b.id];
//     return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);

//   const StatCard = ({ icon, label, value, color }) => (
//     <div className="rounded-2xl bg-white shadow-md flex flex-col py-8 px-8 items-start min-w-[180px] min-h-[140px] justify-between" style={{border: '1.5px solid #f2f3f7'}}>
//       <div className="flex items-center gap-2 text-base font-medium text-gray-500 mb-1">{icon} {label}</div>
//       <div className={`text-3xl font-bold ${color || 'text-gray-900'} mb-2`}>{value}</div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center py-12">
//       <div className="w-full max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-2 mt-4 tracking-tight">All Registrations (Nursing)</h1>
//         <div className="text-center text-gray-500 text-base mb-8">Base URL: <span className="bg-gray-100 px-2 py-1 rounded font-mono">{API_BASE_URL}</span></div>
//         {/* Stats Bar */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-between mb-8 w-full">
//             <StatCard icon={<FaClipboard className="text-slate-400" />} label="Total Bookings" value={bookings.length} />
//             <StatCard icon={<FaCheckCircle className="text-green-500" />} label="Paid" value={paidBookings.length} color="text-green-600" />
//             <StatCard icon={<FaSpinner className="text-yellow-400 animate-spin" />} label="Pending" value={pendingBookings.length} color="text-yellow-500" />
//             <StatCard icon={<FaTimesCircle className="text-gray-400" />} label="No Payment" value={unpaidBookings.length} color="text-gray-500" />
//             <div className="rounded-2xl bg-white shadow-md py-8 px-8 flex flex-col min-w-[200px] min-h-[140px] justify-between border border-[#f2f3f7]">
//               <div className="flex gap-2 items-center font-medium text-base text-gray-500 mb-1"><FaMoneyBillWave /> Total Revenue</div>
//               <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(totalPaidRevenue)}</div>
//               <div className="text-xs text-slate-400">
//                 With Acc: {formatCurrency(totalWithAccRevenue)}<br />
//                 Without Acc: {formatCurrency(totalWithoutAccRevenue)}<br />
//                 <span className="text-gray-300">Only completed payments</span>
//               </div>
//             </div>
//           </div>
//         )}
//         {/* Accommodation Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
//           <StatCard icon={<FaBed className="text-blue-400" />} label="With Accommodation" value={bookingsWithAccommodation.length} color="text-blue-500" />
//           <StatCard icon={<FaUserFriends className="text-purple-400" />} label="Without Accommodation" value={bookingsWithoutAccommodation.length} color="text-purple-500" />
//         </div>
//         {/* Tabs & Search */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           <button
//             onClick={() => setView('with')}
//             className={`px-7 py-2 rounded-xl font-bold transition text-base shadow-sm ${view === 'with' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>
//             With Accommodation
//           </button>
//           <button
//             onClick={() => setView('without')}
//             className={`px-7 py-2 rounded-xl font-bold transition text-base shadow-sm ${view === 'without' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-purple-100'}`}>
//             Without Accommodation
//           </button>
//         </div>
//         <div className="mb-8 flex items-center justify-center w-full">
//           <div className="relative w-full max-w-xl">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="text"
//               value={universalSearch}
//               onChange={e => setUniversalSearch(e.target.value)}
//               placeholder="Search (name, email, accommodation, etc.)"
//               className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-gray-900"
//             />
//           </div>
//           {universalSearch && (
//             <button onClick={() => setUniversalSearch('')} className="ml-3 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex gap-2 items-center text-sm">
//               <FaTimesCircle /> Reset
//             </button>
//           )}
//         </div>
//         {/* Section Table */}
//         <div className="mt-4">
//           {loading && <p className="text-slate-400 text-center my-6">Loading bookings…</p>}
//           {error && <p className="text-red-400 text-center my-6">Error: {error}</p>}
//           {!loading && !error && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
//                 <thead>
//                   <tr className="bg-[#f8fafc] border-b border-gray-200">
//                     <th className="py-4 px-5 text-left font-semibold text-gray-500">Name</th>
//                     <th className="py-4 px-5 text-left font-semibold text-gray-500">Contact</th>
//                     <th className="py-4 px-5 text-left font-semibold text-gray-500">Presentation</th>
//                     {view === 'with' && <th className="py-4 px-5 text-left font-semibold text-gray-500">Accommodation</th>}
//                     <th className="py-4 px-5 text-left font-semibold text-gray-500">Amount</th>
//                     <th className="py-4 px-5 text-left font-semibold text-gray-500">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(view === 'with' ? filteredBookingsWithAccommodation : filteredBookingsWithoutAccommodation).map(b => {
//                     const paymentStatus = bookingPaymentStatuses[b.id];
//                     return (
//                       <tr
//                         key={b.id}
//                         className="hover:bg-blue-50 transition-all cursor-pointer"
//                         onClick={e => {
//                           setSelectedBooking(b); setShowDetailsModal(true);
//                         }}
//                       >
//                         <td className="py-4 px-5">
//                           <div className="font-bold">{b.name}</div>
//                           <div className="text-xs text-gray-400">{b.instituteOrUniversity}</div>
//                         </td>
//                         <td className="py-4 px-5 text-sm">
//                           <div>{b.email}</div>
//                           <div className="text-xs text-gray-400">{b.phone}, {b.country}</div>
//                         </td>
//                         <td className="py-4 px-5 text-sm">
//                           {b.pricingConfig.presentationType.type}<br />
//                           <span className="text-xs text-gray-400">€{b.pricingConfig.presentationType.price.toFixed(2)}</span>
//                         </td>
//                         {view === 'with' && (
//                           <td className="py-4 px-5 text-sm">
//                             {b.pricingConfig.accommodationOption?.guests} Guests,
//                             {b.pricingConfig.accommodationOption?.nights} Nights<br />
//                             <span className="text-xs text-gray-400">€{b.pricingConfig.accommodationOption?.price.toFixed(2)}</span>
//                           </td>
//                         )}
//                         <td className="py-4 px-5 font-semibold text-base text-slate-900">
//                           €{(b.pricingConfig.totalPrice || b.amountPaid || 0).toFixed(2)}
//                         </td>
//                         <td className="py-4 px-5">
//                           <div className={`${getPaymentStatusColor(b, paymentStatus)} rounded-lg px-3 py-1 text-xs font-bold inline-flex items-center`}>
//                             {getPaymentStatusText(b, paymentStatus)}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   {(view === 'with' ? filteredBookingsWithAccommodation : filteredBookingsWithoutAccommodation).length === 0 && (
//                     <tr><td colSpan={view === 'with' ? 6 : 5} className="text-center py-8 text-gray-400">No bookings in this category.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* -- Optionally: Insert your modal/details panel here below this line */}
//     </div>
//   );
// };

// export default Bookings;

import { useEffect, useState } from 'react';
import { FaSearch, FaBed, FaUserFriends, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaClipboard, FaSpinner, FaEnvelope, FaPhoneAlt, FaUniversity, FaGlobe, FaEuroSign, FaIdBadge } from 'react-icons/fa';
import { useLoginContext } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'https://nursing.marketingzynlogic.com';
const formatCurrency = (amount, currency = 'EUR') => {
  if (amount === null || amount === undefined) return '€0.00';
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('with');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [universalSearch, setUniversalSearch] = useState('');
  const [bookingPaymentStatuses, setBookingPaymentStatuses] = useState({});
  const [showCopyMessage, setShowCopyMessage] = useState(false);

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

  useEffect(() => {
    const apiCall = async (endpoint, options = {}) => {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
      return response.json();
    };
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const bookingRes = await apiCall('/admin/api/admin/registration-forms/nursing', { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
        setBookings(bookingRes);
        const allPaymentsData = await apiCall('/api/payments/all/nursing');
        const paymentStatusPromises = bookingRes.filter(b => b.paymentRecord?.id).map(async b => {
          try {
            const paymentData = allPaymentsData.find(p => p.id === b.paymentRecord.id);
            if (paymentData) return { bookingId: b.id, paymentData };
            const fallbackPaymentData = await apiCall(`/api/payments/nursing/${b.paymentRecord.id}`);
            return { bookingId: b.id, paymentData: fallbackPaymentData };
          } catch { return { bookingId: b.id, paymentData: null }; }
        });
        const paymentResults = await Promise.all(paymentStatusPromises);
        const statusMap = {};
        paymentResults.forEach(result => { statusMap[result.bookingId] = result.paymentData; });
        setBookingPaymentStatuses(statusMap);
      } catch (err) { setError(err.message || 'Error fetching bookings'); }
      finally { setLoading(false); }
    };
    fetchAllData();
  }, []);

  // Modal payment details fetch
  const openDetailsModal = async (booking) => {
    setSelectedBooking(booking); setShowDetailsModal(true); setPaymentDetails(null); setLoadingPayment(false); setShowCopyMessage(false);
    if (booking.paymentRecord?.id) {
      setLoadingPayment(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/payments/nursing/${booking.paymentRecord.id}`);
        const data = await response.json();
        setPaymentDetails(data);
      } catch { setPaymentDetails(null); }
      setLoadingPayment(false);
    }
  };

  const closeModal = () => {
    setShowDetailsModal(false); setSelectedBooking(null); setPaymentDetails(null); setShowCopyMessage(false);
  };

  const getPaymentStatusColor = (booking, paymentDetails) => {
    if (!booking.paymentRecord?.id) return 'bg-gray-100 text-gray-400';
    if (paymentDetails) {
      switch (paymentDetails.status) {
        case 'COMPLETED': return 'bg-green-50 text-green-700';
        case 'PENDING': return 'bg-yellow-50 text-yellow-700';
        case 'FAILED': case 'CANCELLED': return 'bg-red-50 text-red-600';
        case 'EXPIRED': return 'bg-orange-50 text-orange-700';
        default: return 'bg-gray-100 text-gray-400';
      }
    }
    return 'bg-yellow-50 text-yellow-700';
  };

  const getPaymentStatusText = (booking, paymentDetails) => {
    if (!booking.paymentRecord?.id) return '❌ No Payment';
    if (paymentDetails) {
      switch (paymentDetails.status) {
        case 'COMPLETED': return '✓ Paid';
        case 'PENDING': return '⏳ Pending';
        case 'FAILED': return '✕ Failed';
        case 'CANCELLED': return '🚫 Cancelled';
        case 'EXPIRED': return '⏰ Expired';
        default: return '? Unknown';
      }
    }
    return 'Check Status';
  };

  const filterByUniversalSearch = booking => {
    if (!universalSearch.trim()) return true; const search = universalSearch.trim().toLowerCase();
    return (
      booking.name?.toLowerCase().includes(search)
      || booking.email?.toLowerCase().includes(search)
      || booking.phone?.toLowerCase().includes(search)
      || booking.country?.toLowerCase().includes(search)
      || booking.instituteOrUniversity?.toLowerCase().includes(search)
      || (booking.paymentRecord?.id?.toString() || '').includes(search)
      || booking.pricingConfig?.presentationType?.type?.toLowerCase().includes(search)
      || (booking.pricingConfig?.accommodationOption?.nights?.toString() || '').includes(search)
      || (booking.pricingConfig?.accommodationOption?.guests?.toString() || '').includes(search));
  };

  const bookingsWithAccommodation = bookings.filter(b => b.pricingConfig?.accommodationOption);
  const bookingsWithoutAccommodation = bookings.filter(b => !b.pricingConfig?.accommodationOption);
  const filteredBookingsWithAccommodation = bookingsWithAccommodation.filter(filterByUniversalSearch);
  const filteredBookingsWithoutAccommodation = bookingsWithoutAccommodation.filter(filterByUniversalSearch);

  const paidBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'COMPLETED');
  const pendingBookings = bookings.filter(b => bookingPaymentStatuses[b.id]?.status === 'PENDING' || (b.paymentRecord?.id && !bookingPaymentStatuses[b.id]));
  const unpaidBookings = bookings.filter(b => !b.paymentRecord?.id);

  const totalPaidRevenue = paidBookings.reduce((sum, b) => {
    const p = bookingPaymentStatuses[b.id];
    return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);
  const paidWithAcc = paidBookings.filter(b => b.pricingConfig?.accommodationOption);
  const totalWithAccRevenue = paidWithAcc.reduce((sum, b) => {
    const p = bookingPaymentStatuses[b.id];
    return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);
  const paidWithoutAcc = paidBookings.filter(b => !b.pricingConfig?.accommodationOption);
  const totalWithoutAccRevenue = paidWithoutAcc.reduce((sum, b) => {
    const p = bookingPaymentStatuses[b.id];
    return sum + (p?.amountTotalEuros || p?.amountTotal || b.pricingConfig.totalPrice || b.amountPaid || 0); }, 0);

  const StatCard = ({ icon, label, value, color }) => (
    <div className="rounded-2xl bg-white shadow-md flex flex-col py-8 px-8 items-start min-w-[180px] min-h-[140px] justify-between" style={{border: '1.5px solid #f2f3f7'}}>
      <div className="flex items-center gap-2 text-base font-medium text-gray-500 mb-1">{icon} {label}</div>
      <div className={`text-3xl font-bold ${color || 'text-gray-900'} mb-2`}>{value}</div>
    </div>
  );

  // ---- Start of component ----
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center py-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-2 mt-4 tracking-tight">All Registrations</h1>
        <br/>
        {/* <div className="text-center text-gray-500 text-base mb-8">Base URL: <span className="bg-gray-100 px-2 py-1 rounded font-mono">{API_BASE_URL}</span></div> */}
        {/* Stats Bar */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-between mb-8 w-full">
            <StatCard icon={<FaClipboard className="text-slate-400" />} label="Total Bookings" value={bookings.length} />
            <StatCard icon={<FaCheckCircle className="text-green-500" />} label="Paid" value={paidBookings.length} color="text-green-600" />
            <StatCard icon={<FaSpinner className="text-yellow-400 animate-spin" />} label="Pending" value={pendingBookings.length} color="text-yellow-500" />
            <StatCard icon={<FaTimesCircle className="text-gray-400" />} label="No Payment" value={unpaidBookings.length} color="text-gray-500" />
            <div className="rounded-2xl bg-white shadow-md py-8 px-8 flex flex-col min-w-[200px] min-h-[140px] justify-between border border-[#f2f3f7]">
              <div className="flex gap-2 items-center font-medium text-base text-gray-500 mb-1"><FaMoneyBillWave /> Total Revenue</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(totalPaidRevenue)}</div>
              <div className="text-xs text-slate-400">
                With Acc: {formatCurrency(totalWithAccRevenue)}<br />
                Without Acc: {formatCurrency(totalWithoutAccRevenue)}<br />
                <span className="text-gray-300">Only completed payments</span>
              </div>
            </div>
          </div>
        )}
        {/* Accommodation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
          <StatCard icon={<FaBed className="text-blue-400" />} label="With Accommodation" value={bookingsWithAccommodation.length} color="text-blue-500" />
          <StatCard icon={<FaUserFriends className="text-purple-400" />} label="Without Accommodation" value={bookingsWithoutAccommodation.length} color="text-purple-500" />
        </div>
        {/* Tabs & Search */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setView('with')}
            className={`px-7 py-2 rounded-xl font-bold transition text-base shadow-sm ${view === 'with' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>
            With Accommodation
          </button>
          <button
            onClick={() => setView('without')}
            className={`px-7 py-2 rounded-xl font-bold transition text-base shadow-sm ${view === 'without' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-purple-100'}`}>
            Without Accommodation
          </button>
        </div>
        <div className="mb-8 flex items-center justify-center w-full">
          <div className="relative w-full max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={universalSearch}
              onChange={e => setUniversalSearch(e.target.value)}
              placeholder="Search (name, email, accommodation, etc.)"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-gray-900"
            />
          </div>
          {universalSearch && (
            <button onClick={() => setUniversalSearch('')} className="ml-3 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex gap-2 items-center text-sm">
              <FaTimesCircle /> Reset
            </button>
          )}
        </div>
        {/* Section Table */}
        <div className="mt-4">
          {loading && <p className="text-slate-400 text-center my-6">Loading bookings…</p>}
          {error && <p className="text-red-400 text-center my-6">Error: {error}</p>}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-gray-200">
                    <th className="py-4 px-5 text-left font-semibold text-gray-500">Name</th>
                    <th className="py-4 px-5 text-left font-semibold text-gray-500">Contact</th>
                    <th className="py-4 px-5 text-left font-semibold text-gray-500">Presentation</th>
                    {view === 'with' && <th className="py-4 px-5 text-left font-semibold text-gray-500">Accommodation</th>}
                    <th className="py-4 px-5 text-left font-semibold text-gray-500">Amount</th>
                    <th className="py-4 px-5 text-left font-semibold text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(view === 'with' ? filteredBookingsWithAccommodation : filteredBookingsWithoutAccommodation).map(b => {
                    const paymentStatus = bookingPaymentStatuses[b.id];
                    return (
                      <tr
                        key={b.id}
                        className="hover:bg-blue-50 transition-all cursor-pointer"
                        onClick={() => openDetailsModal(b)}
                      >
                        <td className="py-4 px-5">
                          <div className="font-bold">{b.name}</div>
                          <div className="text-xs text-gray-400">{b.instituteOrUniversity}</div>
                        </td>
                        <td className="py-4 px-5 text-sm">
                          <div className="flex items-center gap-1"><FaEnvelope className="text-gray-400" /> {b.email}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-400"><FaPhoneAlt /> {b.phone} <FaGlobe />  {b.country}</div>
                        </td>
                        <td className="py-4 px-5 text-sm">
                          {b.pricingConfig.presentationType.type}<br />
                          <span className="text-xs text-gray-400">€{b.pricingConfig.presentationType.price.toFixed(2)}</span>
                        </td>
                        {view === 'with' && (
                          <td className="py-4 px-5 text-sm">
                            {b.pricingConfig.accommodationOption?.guests} Guests,
                            {b.pricingConfig.accommodationOption?.nights} Nights<br />
                            <span className="text-xs text-gray-400">€{b.pricingConfig.accommodationOption?.price.toFixed(2)}</span>
                          </td>
                        )}
                        <td className="py-4 px-5 font-semibold text-base text-slate-900">
                          €{(b.pricingConfig.totalPrice || b.amountPaid || 0).toFixed(2)}
                        </td>
                        <td className="py-4 px-5">
                          <div className={`${getPaymentStatusColor(b, paymentStatus)} rounded-lg px-3 py-1 text-xs font-bold inline-flex items-center`}>
                            {getPaymentStatusText(b, paymentStatus)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {(view === 'with' ? filteredBookingsWithAccommodation : filteredBookingsWithoutAccommodation).length === 0 && (
                    <tr><td colSpan={view === 'with' ? 6 : 5} className="text-center py-8 text-gray-400">No bookings in this category.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ---------- MODAL ---------- */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-white max-w-2xl w-full mx-2 rounded-2xl shadow-2xl p-8 relative animate-[fadeIn_0.2s_ease]">
            <button
              className="absolute top-5 right-7 text-3xl text-gray-300 hover:text-gray-600 transition"
              onClick={closeModal}
              title="Close"
            >×</button>
            {/* Header */}
            <h2 className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-2">
              <FaClipboard /> Booking & Payment Details
            </h2>
            <div className="text-sm text-gray-400 mb-4">
              <span>Booking ID: <b className="font-mono text-blue-500">#{selectedBooking.id}</b></span>
              {selectedBooking.paymentRecord?.id &&
                <> &bull; Payment Record: <b className="font-mono text-green-600">#{selectedBooking.paymentRecord.id}</b></>
              }
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              {/* Customer Info */}
              <div className="bg-[#f5f7fa] rounded-xl p-5">
                <div className="flex flex-col gap-2 text-gray-700 text-sm">
                  <div className="flex items-center gap-2"><FaIdBadge /> <span className="font-semibold">Name:</span> {selectedBooking.name}</div>
                  <div className="flex items-center gap-2"><FaEnvelope /> {selectedBooking.email}</div>
                  <div className="flex items-center gap-2"><FaPhoneAlt /> {selectedBooking.phone}</div>
                  <div className="flex items-center gap-2"><FaGlobe /> {selectedBooking.country}</div>
                  <div className="flex items-center gap-2"><FaUniversity /> {selectedBooking.instituteOrUniversity}</div>
                </div>
              </div>
              {/* Pricing Info */}
              <div className="bg-[#f5f7fa] rounded-xl p-5">
                <div className="flex flex-col gap-2 text-gray-700 text-sm">
                  <div><span className="font-semibold">Presentation:</span> {selectedBooking.pricingConfig.presentationType.type}</div>
                  <div className="flex items-center gap-2"><FaEuroSign /> <span className="font-semibold">Presentation Fee:</span> €{(selectedBooking.pricingConfig.presentationType.price || 0).toFixed(2)}</div>
                  {selectedBooking.pricingConfig.accommodationOption && (
                    <>
                      <div><span className="font-semibold">Accommodation:</span> {selectedBooking.pricingConfig.accommodationOption.nights} nights, {selectedBooking.pricingConfig.accommodationOption.guests} guests</div>
                      <div className="flex items-center gap-2"><FaEuroSign /> <span className="font-semibold">Accommodation Fee:</span> €{(selectedBooking.pricingConfig.accommodationOption.price || 0).toFixed(2)}</div>
                    </>
                  )}
                  <div><span className="font-semibold">Processing Fee:</span> {selectedBooking.pricingConfig.processingFeePercent}%</div>
                  <div className="text-base mt-2"><span className="font-bold">Total Amount:</span> <span className="text-green-600 font-extrabold">€{(selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}</span></div>
                </div>
              </div>
            </div>
            {/* Payment Info */}
            <div className="bg-[#f5f7fa] rounded-xl p-6 mb-4">
              <h3 className="text-lg text-blue-700 font-bold mb-3 flex items-center gap-2"><FaMoneyBillWave /> Payment Details</h3>
              {loadingPayment ? (
                <div className="animate-spin text-blue-500 text-lg">⟳ Loading…</div>
              ) : paymentDetails && paymentDetails.id ? (
                <div className="grid md:grid-cols-2 gap-5 text-sm text-gray-700">
                  <div><b>Payment Status:</b> <span className={getPaymentStatusColor(selectedBooking, paymentDetails) + " px-2 py-1 rounded text-xs ml-2"}>{getPaymentStatusText(selectedBooking, paymentDetails)}</span></div>
                  <div><b>Stripe Status:</b> {paymentDetails.paymentStatus}</div>
                  <div><b>Total:</b> €{(paymentDetails.amountTotal || selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)} {paymentDetails.currency || 'EUR'}</div>
                  <div><b>Customer Email:</b> {paymentDetails.customerEmail}</div>
                  <div><b>Session ID:</b> <span className="font-mono text-gray-400">{paymentDetails.sessionId}</span></div>
                  {paymentDetails.paymentIntentId &&
                    <div><b>Payment Intent:</b> <span className="font-mono text-gray-400">{paymentDetails.paymentIntentId}</span></div>
                  }
                  <div><b>Created:</b> {new Date(paymentDetails.createdAt).toLocaleString()}</div>
                  <div><b>Updated:</b> {new Date(paymentDetails.updatedAt).toLocaleString()}</div>
                </div>
              ) : selectedBooking.paymentRecord?.id ? (
                <div className="text-gray-400">Payment details unavailable for payment record #{selectedBooking.paymentRecord.id}.</div>
              ) : (
                <div className="text-gray-400">No payment record found.</div>
              )}
            </div>
            {/* Copy All */}
            {paymentDetails && paymentDetails.id && (
              <div className="flex flex-wrap gap-3 mb-3">
                <button
                  onClick={() => {
                    const txt = `Payment ID: #${paymentDetails.id}\nSession: ${paymentDetails.sessionId}\nCustomer: ${paymentDetails.customerEmail}\nStatus: ${paymentDetails.status}\nAmount: €${(paymentDetails.amountTotal || selectedBooking.pricingConfig.totalPrice || selectedBooking.amountPaid || 0).toFixed(2)}\n\nBooking ID: #${selectedBooking.id}\nName: ${selectedBooking.name}`;
                    navigator.clipboard.writeText(txt); setShowCopyMessage(true); setTimeout(() => setShowCopyMessage(false), 1800);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold shadow">Copy All Details</button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paymentDetails.id.toString());
                    setShowCopyMessage(true); setTimeout(() => setShowCopyMessage(false), 1500);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold shadow">Copy Payment ID</button>
                {showCopyMessage && <div className="text-green-600 text-sm px-3 py-1 mt-2 rounded bg-green-50 border border-green-100">Copied!</div>}
              </div>
            )}
            <div className="flex justify-end">
              <button className="mt-3 px-8 py-2 rounded-xl bg-blue-500 text-white font-bold shadow hover:bg-blue-600" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;

