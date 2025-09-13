         
// // import React from 'react';

// // const AccommodationCombinations: React.FC = () => {
// //   return (
// //     <div className="p-6">
// //       <h1>Accommodation Combinations</h1>
// //     </div>
// //   );
// // };

// // export default AccommodationCombinations;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaBed, FaUserFriends, FaEuroSign, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

// // The base URL for your API
// const BASE_URL = 'http://localhost:8906';

// // Define the structure of an accommodation option
// interface AccommodationOption {
//   id: number;
//   nights: number;
//   guests: number;
//   price: number;
// }

// const AccommodationCombinations: React.FC = () => {
//   // --- STATE MANAGEMENT ---
//   const [accommodations, setAccommodations] = useState<AccommodationOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
//   // State for inline editing
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editPrice, setEditPrice] = useState<string>('');
//   const [isSaving, setIsSaving] = useState(false);

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     fetchAccommodations();
//   }, []);
  
//   // Effect to automatically clear the success message after 3 seconds
//   useEffect(() => {
//     if (successMsg) {
//       const timer = setTimeout(() => setSuccessMsg(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMsg]);

//   /**
//    * Fetches the list of accommodation combinations for the 'nursing' website.
//    */
//   const fetchAccommodations = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const endpoint = `${BASE_URL}/admin/api/admin/accommodation/nursing`;
//       const response = await axios.get<AccommodationOption[]>(endpoint);
//       setAccommodations(response.data);
//     } catch (err) {
//       setError('Failed to load accommodation data. Please try again later.');
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- EVENT HANDLERS ---
//   /**
//    * Enters edit mode for a specific row.
//    * @param acc The accommodation object to edit.
//    */
//   const handleEdit = (acc: AccommodationOption) => {
//     setEditId(acc.id);
//     setEditPrice(acc.price.toString());
//   };

//   /**
//    * Cancels the edit mode.
//    */
//   const handleCancel = () => {
//     setEditId(null);
//     setEditPrice('');
//   };

//   /**
//    * Saves the updated price for an accommodation.
//    * @param accToSave The original accommodation object being saved.
//    */
//   const handleSave = async (accToSave: AccommodationOption) => {
//     const newPrice = parseFloat(editPrice);
//     if (isNaN(newPrice) || newPrice < 0) {
//       setError('Please enter a valid price.');
//       return;
//     }
  
//     setIsSaving(true);
//     setError(null);
//     setSuccessMsg(null);
  
//     try {
//       const endpoint = `${BASE_URL}/admin/api/admin/accommodation/edit/nursing/${accToSave.id}`;
//       // The backend expects all fields, so we send the original nights/guests with the new price
//       const payload = {
//         nights: accToSave.nights,
//         guests: accToSave.guests,
//         price: newPrice,
//       };
      
//       await axios.post(endpoint, payload);
      
//       setSuccessMsg('Price updated successfully!');
//       handleCancel(); // Exit edit mode
//       await fetchAccommodations(); // Refresh the data
//     } catch (err) {
//       setError('Failed to update price. Please try again.');
//       console.error("Save error:", err);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // --- RENDER LOGIC ---
//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="flex items-center justify-center h-40">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           <span className="ml-3 text-gray-700">Loading Accommodations...</span>
//         </div>
//       );
//     }

//     if (error) {
//       return <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-semibold">{error}</div>;
//     }

//     return (
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
//         <table className="min-w-full bg-white">

//           {/* <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2"><FaBed /> Nights</th>
//               <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2"><FaUserFriends /> Guests</th>
//               <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2"><FaEuroSign /> Price</th>
//               <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//             </tr>

            
//           </thead> */}


//             <thead className="bg-gray-50">
//   <tr>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
//       <div className="flex items-center gap-2">
//         <FaBed /> Nights
//       </div>
//     </th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
//       <div className="flex items-center gap-2">
//         <FaUserFriends /> Guests
//       </div>
//     </th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
//       <div className="flex items-center gap-2">
//         <FaEuroSign /> Price
//       </div>
//     </th>
//     <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
//       Actions
//     </th>
//   </tr>
// </thead>



//           <tbody className="divide-y divide-gray-200">
//             {accommodations.map((acc) => (
//               <tr key={acc.id} className="hover:bg-gray-50">
//                 <td className="py-3 px-4 text-gray-700 font-medium">{acc.nights}</td>
//                 <td className="py-3 px-4 text-gray-700 font-medium">{acc.guests}</td>
//                 <td className="py-3 px-4">
//                   {editId === acc.id ? (
//                     <input
//                       type="number"
//                       value={editPrice}
//                       onChange={(e) => setEditPrice(e.target.value)}
//                       className="w-28 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                       min="0"
//                       step="0.01"
//                       autoFocus
//                     />
//                   ) : (
//                     <span className="font-semibold text-green-600">€{acc.price.toFixed(2)}</span>
//                   )}
//                 </td>
//                 <td className="py-3 px-4">
//                   {editId === acc.id ? (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleSave(acc)}
//                         disabled={isSaving}
//                         className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-600 disabled:bg-green-300 flex items-center gap-1"
//                       >
//                         <FaSave /> {isSaving ? 'Saving...' : 'Save'}
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         disabled={isSaving}
//                         className="bg-gray-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-gray-600 flex items-center gap-1"
//                       >
//                         <FaTimes /> Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleEdit(acc)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-blue-600 flex items-center gap-1"
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//        <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Accommodation Prices</h1>
//         <p className="text-gray-600 mb-6">Manage accommodation prices for the Nursing conference.</p>

//         {successMsg && (
//             <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 text-center font-semibold shadow">
//                 {successMsg}
//             </div>
//         )}
        
//         {renderContent()}
//        </div>
//     </div>
//   );
// };

// export default AccommodationCombinations;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBed, FaUserFriends, FaEuroSign, FaEdit, FaSave, FaTimes, FaTrashAlt } from 'react-icons/fa';

const BASE_URL = 'http://localhost:8906';

interface AccommodationOption {
  id: number;
  nights: number;
  guests: number;
  price: number;
}

const AccommodationCombinations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<AccommodationOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchAccommodations = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = `${BASE_URL}/admin/api/admin/accommodation/nursing`;
      const response = await axios.get<AccommodationOption[]>(endpoint);
      setAccommodations(response.data);
    } catch (err) {
      setError('Failed to load accommodation data. Please try again later.');
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (acc: AccommodationOption) => {
    setEditId(acc.id);
    setEditPrice(acc.price.toString());
  };

  const handleCancel = () => {
    setEditId(null);
    setEditPrice('');
  };

  const handleSave = async (accToSave: AccommodationOption) => {
    const newPrice = parseFloat(editPrice);
    if (isNaN(newPrice) || newPrice < 0) {
      setError('Please enter a valid price.');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const endpoint = `${BASE_URL}/admin/api/admin/accommodation/edit/nursing/${accToSave.id}`;
      const payload = {
        nights: accToSave.nights,
        guests: accToSave.guests,
        price: newPrice,
      };
      await axios.post(endpoint, payload);

      setSuccessMsg('Price updated successfully!');
      handleCancel();
      await fetchAccommodations();
    } catch (err) {
      setError('Failed to update price. Please try again.');
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    setError(null);
    try {
      const endpoint = `${BASE_URL}/admin/api/admin/accommodation/delete/nursing/${deleteId}`;
      await axios.post(endpoint);
      setSuccessMsg('Accommodation deleted successfully!');
      setDeleteId(null);
      await fetchAccommodations();
    } catch (err) {
      setError('Failed to delete accommodation. Please try again.');
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-700">Loading Accommodations...</span>
        </div>
      );
    }

    if (error) {
      return <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-semibold">{error}</div>;
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaBed /> Nights
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaUserFriends /> Guests
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaEuroSign /> Price
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accommodations.map((acc) => (
              <tr key={acc.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 font-medium">{acc.nights}</td>
                <td className="py-3 px-4 text-gray-700 font-medium">{acc.guests}</td>
                <td className="py-3 px-4">
                  {editId === acc.id ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-28 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                      autoFocus
                    />
                  ) : (
                    <span className="font-semibold text-green-600">€{acc.price.toFixed(2)}</span>
                  )}
                </td>
                <td className="py-3 px-4 flex gap-2 justify-center">
                  {editId === acc.id ? (
                    <>
                      <button
                        onClick={() => handleSave(acc)}
                        disabled={isSaving}
                        className="bg-green-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-green-600 disabled:bg-green-300 flex items-center gap-1"
                      >
                        <FaSave /> {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-gray-600 flex items-center gap-1"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(acc)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-blue-600 flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(acc.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold hover:bg-red-600 flex items-center gap-1"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Accommodation Prices</h1>
        <p className="text-gray-600 mb-6">Manage accommodation prices for the Nursing conference.</p>

        {successMsg && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 text-center font-semibold shadow">
            {successMsg}
          </div>
        )}

        {renderContent()}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this accommodation option?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationCombinations;
