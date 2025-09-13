// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface PresentationType {
//   id: number;
//   type: string;
//   price: number;
// }

// const RegistrationTypes: React.FC = () => {
//   const [types, setTypes] = useState<PresentationType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editPrice, setEditPrice] = useState<string>('');
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   // Hardcoded BASE_URL for nursing
//   const BASE_URL = 'http://localhost:8906';

//   // Get JWT token from localStorage (or your auth context)
//   const token = localStorage.getItem('adminToken') || localStorage.getItem('jwt');

//   useEffect(() => {
//     fetchTypes();
//   }, []);

//   const fetchTypes = async () => {
//     setLoading(true);
//     setError(null);
//     if (!token) {
//       setError('No admin token found. Please log in as admin.');
//       setLoading(false);
//       return;
//     }
//     try {
//       const endpoint = '/admin/api/admin/presentation-types/nursing';
//       const res = await axios.get(`${BASE_URL}${endpoint}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setTypes(res.data);
//     } catch (err: any) {
//       if (err.response && err.response.status === 403) {
//         setError('Forbidden: You do not have permission to view registration types.');
//       } else {
//         setError('Failed to load presentation types.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (id: number, price: number) => {
//     setEditId(id);
//     setEditPrice(price.toString());
//   };

//   const handleSave = async (id: number) => {
//     setError(null);
//     setSuccessMsg(null);
//     if (!token) {
//       setError('No admin token found. Please log in as admin.');
//       return;
//     }
//     try {
//       const endpoint = `/admin/api/admin/presentation-type/edit/nursing/${id}/${editPrice}`;
//       await axios.post(
//         `${BASE_URL}${endpoint}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       setSuccessMsg('Price updated successfully.');
//       setEditId(null);
//       fetchTypes();
//     } catch (err: any) {
//       if (err.response && err.response.status === 403) {
//         setError('Forbidden: You do not have permission to edit registration types.');
//       } else {
//         setError('Failed to update price.');
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Types</h1>
//       <p className="text-gray-600 mb-8">Manage and update the prices for all available registration/presentation types.</p>
//       {loading ? (
//         <div className="flex items-center justify-center h-40">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
//           <span className="text-blue-600 text-lg">Loading registration types...</span>
//         </div>
//       ) : error ? (
//         <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center mb-4">{error}</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="py-3 px-4 text-left text-gray-700 text-lg font-semibold">ID</th>
//                 <th className="py-3 px-4 text-left text-gray-700 text-lg font-semibold">Type</th>
//                 <th className="py-3 px-4 text-left text-gray-700 text-lg font-semibold">Price (€)</th>
//                 <th className="py-3 px-4 text-left text-gray-700 text-lg font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {types.map((type, idx) => (
//                 <tr key={type.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
//                   <td className="py-2 px-4 font-semibold text-gray-900">{type.id}</td>
//                   <td className="py-2 px-4 font-medium text-gray-800">{type.type}</td>
//                   <td className="py-2 px-4">
//                     {editId === type.id ? (
//                       <input
//                         type="number"
//                         value={editPrice}
//                         onChange={e => setEditPrice(e.target.value)}
//                         className="bg-gray-100 text-gray-900 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
//                         min="0"
//                         step="0.01"
//                       />
//                     ) : (
//                       <span className="text-green-600 font-bold">€{type.price}</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4">
//                     {editId === type.id ? (
//                       <div className="flex gap-2">
//                         <button
//                           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold transition-all"
//                           onClick={() => handleSave(type.id)}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold transition-all"
//                           onClick={() => setEditId(null)}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-all"
//                         onClick={() => handleEdit(type.id, type.price)}
//                       >
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {successMsg && <div className="bg-green-100 text-green-800 p-3 rounded-lg mt-6 text-center font-semibold shadow">{successMsg}</div>}
//     </div>
//   );
// };

// export default RegistrationTypes;











import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for the data structure of a presentation type
interface PresentationType {
  id: number;
  type: string;
  price: number;
}

/**
 * A component to manage and display registration/presentation types and their prices.
 * It allows a user to view and edit the price for each type.
 */
const RegistrationTypes: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [types, setTypes] = useState<PresentationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // State for inline editing
  const [editId, setEditId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  // --- CONFIGURATION ---
  // Hardcoded BASE_URL for the API endpoint
  const BASE_URL = 'http://localhost:8906';

  // --- DATA FETCHING ---
  // Fetch all presentation types when the component mounts
  useEffect(() => {
    fetchTypes();
  }, []);

  // Effect to automatically clear the success message after 3 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [successMsg]);


  /**
   * Fetches the list of presentation types from the API.
   */
  const fetchTypes = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = '/admin/api/admin/presentation-types/nursing';
      const response = await axios.get<PresentationType[]>(`${BASE_URL}${endpoint}`);
      setTypes(response.data);
    } catch (err: any) {
      setError('An error occurred while fetching presentation types.');
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- EVENT HANDLERS ---
  /**
   * Sets the component state to "edit mode" for a specific type.
   * @param id The ID of the type to edit.
   * @param price The current price of the type.
   */
  const handleEdit = (id: number, price: number) => {
    setEditId(id);
    setEditPrice(price.toString());
  };

  /**
   * Cancels the edit mode and resets the edit state.
   */
  const handleCancel = () => {
    setEditId(null);
    setEditPrice('');
  };

  /**
   * Saves the updated price for a specific type to the API.
   * @param id The ID of the type being saved.
   */
  const handleSave = async (id: number) => {
    setError(null);
    setSuccessMsg(null);
    setIsSaving(true);
    
    // Validate price
    const newPrice = parseFloat(editPrice);
    if (isNaN(newPrice) || newPrice < 0) {
        setError('Please enter a valid, non-negative price.');
        setIsSaving(false);
        return;
    }

    try {
      const endpoint = `/admin/api/admin/presentation-type/edit/nursing/${id}/${newPrice}`;
      await axios.post(
        `${BASE_URL}${endpoint}`,
        {}, // Empty body as per API design
      );
      setSuccessMsg('Price updated successfully!');
      setEditId(null);
      // Re-fetch data to show the latest state
      await fetchTypes(); 
    } catch (err: any) {
      setError('Failed to update the price. Please try again.');
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-60 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-lg text-gray-700">Loading Registration Types...</span>
        </div>
      );
    }

    if (error) {
      return <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center font-semibold">{error}</div>;
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Price (€)</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {types.map((type) => (
              <tr key={type.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-3 px-4 font-medium text-gray-700">{type.id}</td>
                <td className="py-3 px-4 text-gray-800">{type.type}</td>
                <td className="py-3 px-4">
                  {editId === type.id ? (
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="bg-white text-gray-900 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 shadow-sm"
                      min="0"
                      step="0.01"
                      autoFocus
                    />
                  ) : (
                    <span className="text-green-700 font-semibold text-base">€{type.price.toFixed(2)}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {editId === type.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold transition-all shadow-sm disabled:bg-green-300 disabled:cursor-not-allowed flex items-center"
                        onClick={() => handleSave(type.id)}
                        disabled={isSaving}
                      >
                        {isSaving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-semibold transition-all shadow-sm"
                        onClick={handleCancel}
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-all shadow-sm"
                      onClick={() => handleEdit(type.id, type.price)}
                    >
                      Edit
                    </button>
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Registration Types</h1>
        <p className="text-gray-600 mb-6">Manage and update prices for the available presentation types.</p>
        
        {/* Success Message Toast */}
        {successMsg && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 text-center font-semibold shadow animate-fade-in-down">
            {successMsg}
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default RegistrationTypes;
