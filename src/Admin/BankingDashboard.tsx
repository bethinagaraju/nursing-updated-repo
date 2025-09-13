// // import React, { useEffect, useState } from 'react';
// // import { FaUserEdit, FaTrash, FaPlus } from 'react-icons/fa';
// // import axios from 'axios';

// // // const BASE_URL = 'https://polytest.marketingzynlogic.com';
// // const BASE_URL = 'http://localhost:8906';
// // const API_BASE = `${BASE_URL}/api/speakers`;

// // type Speaker = {
// //   id?: string | number;
// //   name: string;
// //   university?: string;
// //   bio?: string;
// //   imageUrl?: string;
// //   type?: string;
// // };

// // const BankingDashboard = () => {
// //   const [speakers, setSpeakers] = useState<Speaker[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [editSpeaker, setEditSpeaker] = useState<Speaker | null>(null);
// //   const [showForm, setShowForm] = useState(false);

// //   useEffect(() => {
// //     fetchSpeakers();
// //   }, []);

// //   const fetchSpeakers = async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       // Removed token check
// //       const res = await axios.get(`${API_BASE}/nursing`);
// //       setSpeakers(res.data);
// //     } catch (e) {
// //       setError('Failed to fetch speakers');
// //     }
// //     setLoading(false);
// //   };

// //   const handleEdit = (speaker: Speaker) => {
// //     setEditSpeaker(speaker);
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (speaker: Speaker) => {
// //     if (!window.confirm('Delete this speaker?')) return;
// //     try {
// //       // Removed token check
// //       const config = { data: speaker };
// //       await axios.delete(`${API_BASE}/nursing/delete`, config);
// //       fetchSpeakers();
// //     } catch (e) {
// //       setError('Delete failed');
// //     }
// //   };

// //   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     const form = e.currentTarget;

// //     const formData = new FormData();
// //     formData.append('name', (form.elements.namedItem('name') as HTMLInputElement)?.value || '');
// //     formData.append('university', (form.elements.namedItem('university') as HTMLInputElement)?.value || '');
// //     formData.append('bio', (form.elements.namedItem('bio') as HTMLTextAreaElement)?.value || '');
// //     formData.append('type', (form.elements.namedItem('type') as HTMLInputElement)?.value || '');
// //     const imageInput = form.elements.namedItem('image') as HTMLInputElement;
// //     if (imageInput && imageInput.files && imageInput.files.length > 0) {
// //       formData.append('image', imageInput.files[0]);
// //     }
// //     if (editSpeaker) {
// //       formData.append('id', editSpeaker.id?.toString() || '');
// //       try {
// //         // Removed token check
// //         await axios.put(`${API_BASE}/nursing/edit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
// //         setShowForm(false);
// //         setEditSpeaker(null);
// //         fetchSpeakers();
// //       } catch (e) {
// //         setError('Save failed');
// //       }
// //     } else {
// //       try {
// //         // Removed token check
// //         await axios.post(`${API_BASE}/nursing/add`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
// //         setShowForm(false);
// //         setEditSpeaker(null);
// //         fetchSpeakers();
// //       } catch (e) {
// //         setError('Save failed');
// //       }
// //     }
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-black text-white">
// //       {/* Sidebar removed for simplicity */}
// //       <main className="p-8 w-full">
// //         <h1 className="text-3xl font-bold mb-6 text-green-400">Manage Nursing Speakers</h1>
// //         <div className="mb-6 flex gap-4">
// //           <button
// //             className="ml-auto bg-blue-600 px-4 py-2 rounded text-white flex items-center gap-2"
// //             onClick={() => { setEditSpeaker(null); setShowForm(true); }}
// //           >
// //             <FaPlus /> Add Speaker
// //           </button>
// //         </div>
// //         {error && <div className="text-red-400 mb-4">{error}</div>}
// //         {loading ? <div>Loading...</div> : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {speakers.map(speaker => (
// //               <div key={speaker.id} className="bg-[#1a1a1a] p-6 rounded-xl shadow border border-green-700">
// //                 <img src={speaker.imageUrl} alt={speaker.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-green-400" />
// //                 <h2 className="text-xl font-bold text-green-300 mb-1">{speaker.name}</h2>
// //                 <div className="text-gray-300 mb-2">{speaker.university}</div>
// //                 <div className="text-gray-400 text-sm mb-2">{speaker.bio}</div>
// //                 <div className="flex gap-2 mt-4">
// //                   <button className="bg-blue-600 px-3 py-1 rounded text-white flex items-center gap-1" onClick={() => handleEdit(speaker)}><FaUserEdit /> Edit</button>
// //                   <button className="bg-red-600 px-3 py-1 rounded text-white flex items-center gap-1" onClick={() => handleDelete(speaker)}><FaTrash /> Delete</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //         {showForm && (
// //           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
// //             <form className="bg-[#222] p-8 rounded-xl w-full max-w-lg shadow-xl" onSubmit={handleFormSubmit} encType="multipart/form-data">
// //               <h2 className="text-2xl font-bold text-green-400 mb-4">{editSpeaker ? 'Edit Speaker' : 'Add Speaker'}</h2>
// //               <div className="mb-4">
// //                 <label className="block mb-1 text-green-300">Name</label>
// //                 <input name="name" defaultValue={editSpeaker?.name || ''} required className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1 text-green-300">University</label>
// //                 <input name="university" defaultValue={editSpeaker?.university || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
// //                 <div className="mb-4">
// //                   <label className="block mb-1 text-green-300">Type</label>
// //                   <input name="type" defaultValue={editSpeaker?.type || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
// //                 </div>
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1 text-green-300">Bio</label>
// //                 <textarea name="bio" defaultValue={editSpeaker?.bio || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block mb-1 text-green-300">Image</label>
// //                 <input name="image" type="file" accept="image/*" className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
// //                 {editSpeaker?.imageUrl && (
// //                   <img src={editSpeaker.imageUrl} alt="Current" className="w-24 h-24 rounded-full mt-2 border-2 border-green-400" />
// //                 )}
// //               </div>
// //               <div className="flex gap-4 mt-6">
// //                 <button type="submit" className="bg-green-600 px-6 py-2 rounded text-white font-bold">{editSpeaker ? 'Update' : 'Add'}</button>
// //                 <button type="button" className="bg-gray-700 px-6 py-2 rounded text-white" onClick={() => { setShowForm(false); setEditSpeaker(null); }}>Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default BankingDashboard;




// import React, { useEffect, useState } from 'react';
// import { FaUserEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import axios from 'axios';

// // const BASE_URL = 'https://polytest.marketingzynlogic.com';
// const BASE_URL = 'http://localhost:8906';
// const API_BASE = `${BASE_URL}/api/speakers`;

// type Speaker = {
//   id?: string | number;
//   name: string;
//   email?: string;
//   affiliation?: string; // New field to combine university, address, etc.
//   bio?: string;
//   researchInterest?: string; // New field for Research Interest
//   imageUrl?: string;
//   type?: string;
// };

// const BankingDashboard = () => {
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [editSpeaker, setEditSpeaker] = useState<Speaker | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesToShow, setEntriesToShow] = useState(10);


//   useEffect(() => {
//     fetchSpeakers();
//   }, []);

//   const fetchSpeakers = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get(`${API_BASE}/nursing`);
//       setSpeakers(res.data);
//     } catch (e) {
//       setError('Failed to fetch speakers');
//     }
//     setLoading(false);
//   };

//   const handleEdit = (speaker: Speaker) => {
//     setEditSpeaker(speaker);
//     setShowForm(true);
//   };

//   const handleDelete = async (speaker: Speaker) => {
//     if (!window.confirm('Delete this speaker?')) return;
//     try {
//       const config = { data: speaker };
//       await axios.delete(`${API_BASE}/nursing/delete`, config);
//       fetchSpeakers();
//     } catch (e) {
//       setError('Delete failed');
//     }
//   };

//   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     const form = e.currentTarget;

//     const formData = new FormData();
//     formData.append('name', (form.elements.namedItem('name') as HTMLInputElement)?.value || '');
//     formData.append('email', (form.elements.namedItem('email') as HTMLInputElement)?.value || '');
//     formData.append('affiliation', (form.elements.namedItem('affiliation') as HTMLTextAreaElement)?.value || '');
//     formData.append('bio', (form.elements.namedItem('bio') as HTMLTextAreaElement)?.value || '');
//     formData.append('researchInterest', (form.elements.namedItem('researchInterest') as HTMLTextAreaElement)?.value || '');

//     const imageInput = form.elements.namedItem('image') as HTMLInputElement;
//     if (imageInput && imageInput.files && imageInput.files.length > 0) {
//       formData.append('image', imageInput.files[0]);
//     }
//     if (editSpeaker) {
//       formData.append('id', editSpeaker.id?.toString() || '');
//       try {
//         await axios.put(`${API_BASE}/nursing/edit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//         setShowForm(false);
//         setEditSpeaker(null);
//         fetchSpeakers();
//       } catch (e) {
//         setError('Save failed');
//       }
//     } else {
//       try {
//         await axios.post(`${API_BASE}/nursing/add`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//         setShowForm(false);
//         setEditSpeaker(null);
//         fetchSpeakers();
//       } catch (e) {
//         setError('Save failed');
//       }
//     }
//     setLoading(false);
//   };

//   const filteredSpeakers = speakers.filter(speaker =>
//     speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     speaker.affiliation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     speaker.bio?.toLowerCase().includes(searchTerm.toLowerCase())
//   ).slice(0, entriesToShow);

//   return (
//     <div className="min-h-screen flex bg-black text-white">
//       <main className="p-8 w-full">
//         <h1 className="text-3xl font-bold mb-6 text-green-400">Manage Nursing Speakers</h1>
//         <div className="mb-6 flex justify-between items-center">
//           <div className="flex gap-4 items-center">
//             <label>Show</label>
//             <select value={entriesToShow} onChange={(e) => setEntriesToShow(Number(e.target.value))} className="bg-[#1a1a1a] p-2 rounded">
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <label>entries</label>
//           </div>
//           <div className="flex items-center gap-2">
//             <label>Search:</label>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-[#1a1a1a] px-3 py-2 rounded text-white"
//             />
//           </div>
//           <button
//             className="bg-blue-600 px-4 py-2 rounded text-white flex items-center gap-2"
//             onClick={() => { setEditSpeaker(null); setShowForm(true); }}
//           >
//             <FaPlus /> Add Plenary
//           </button>
//         </div>
//         {error && <div className="text-red-400 mb-4">{error}</div>}
//         {loading ? <div>Loading...</div> : (
//           <div className="bg-[#1a1a1a] rounded-lg shadow overflow-x-auto">
//             <table className="w-full text-left table-auto">
//               <thead className="bg-[#111] text-teal-400">
//                 <tr>
//                   <th className="px-4 py-3 border-b border-gray-700">Sno</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Name</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Affiliation</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Photo</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Biography</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Edit</th>
//                   <th className="px-4 py-3 border-b border-gray-700">Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredSpeakers.map((speaker, index) => (
//                   <tr key={speaker.id} className="border-b border-gray-700 hover:bg-[#222]">
//                     <td className="px-4 py-3">{index + 1}</td>
//                     <td className="px-4 py-3">{speaker.name}</td>
//                     <td className="px-4 py-3">{speaker.affiliation || speaker.university}</td>
//                     <td className="px-4 py-3">
//                       <img src={speaker.imageUrl} alt={speaker.name} className="w-12 h-12 rounded-full object-cover" />
//                     </td>
//                     <td className="px-4 py-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{speaker.bio}</td>
//                     <td className="px-4 py-3">
//                       <button onClick={() => handleEdit(speaker)} className="text-blue-500 hover:text-blue-400"><FaUserEdit /></button>
//                   </td>
//                   <td className="px-4 py-3">
//                     <button onClick={() => handleDelete(speaker)} className="text-red-500 hover:text-red-400"><FaTrash /></button>
//                   </td>
//                 </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//             <form className="bg-[#222] p-8 rounded-xl w-full max-w-3xl shadow-xl" onSubmit={handleFormSubmit} encType="multipart/form-data">
//               <h2 className="text-2xl font-bold text-green-400 mb-4">ADD / EDIT Plenary</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <div className="mb-4">
//                     <label className="block mb-1 text-green-300">Name</label>
//                     <input name="name" defaultValue={editSpeaker?.name || ''} required className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-1 text-green-300">Affiliation / Address / Tel / Fax:</label>
//                     <textarea name="affiliation" defaultValue={editSpeaker?.affiliation || editSpeaker?.university || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600 resize-none h-24" />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-1 text-green-300">Research Interest:</label>
//                     <textarea name="researchInterest" defaultValue={editSpeaker?.researchInterest || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600 resize-none h-24" />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="mb-4">
//                     <label className="block mb-1 text-green-300">Email</label>
//                     <input name="email" defaultValue={editSpeaker?.email || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600" />
//                   </div>
//                   <div className="mb-4">
//                     <div className="flex justify-between items-center mb-1">
//                       <label className="block text-green-300">Photo:</label>
//                       <input name="image" type="file" accept="image/*" className="hidden" id="file-upload" />
//                       <label htmlFor="file-upload" className="bg-blue-600 px-4 py-1 rounded text-white cursor-pointer hover:bg-blue-700">Browse...</label>
//                     </div>
//                     <span className="text-gray-400 text-sm">No file selected.</span>
//                     {editSpeaker?.imageUrl && (
//                       <img src={editSpeaker.imageUrl} alt="Current" className="w-32 h-32 rounded-full mt-2 border-2 border-green-400 object-cover" />
//                     )}
//                   </div>
//                   <div className="mb-4">
//                     <label className="block mb-1 text-green-300">Biography</label>
//                     <textarea name="bio" defaultValue={editSpeaker?.bio || ''} className="w-full px-3 py-2 rounded bg-black text-white border border-green-600 resize-none h-40" />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-4 mt-6 justify-center">
//                 <button type="submit" className="bg-blue-600 px-6 py-2 rounded text-white font-bold">{editSpeaker ? 'Update' : 'Submit'}</button>
//                 <button type="button" className="bg-red-600 px-6 py-2 rounded text-white font-bold" onClick={() => { setShowForm(false); setEditSpeaker(null); }}>Reset</button>
//               </div>
//             </form>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BankingDashboard;










import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';

// const BASE_URL = 'https://polytest.marketingzynlogic.com';
const BASE_URL = 'http://localhost:8906';
const API_BASE = `${BASE_URL}/api/speakers`;

type Speaker = {
  id?: string | number;
  name: string;
  university?: string;
  bio?: string;
  imageUrl?: string;
  type?: string;
};

const BankingDashboard = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editSpeaker, setEditSpeaker] = useState<Speaker | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/nursing`);
      setSpeakers(res.data);
    } catch (e) {
      setError('Failed to fetch speakers');
    }
    setLoading(false);
  };

  const handleEdit = (speaker: Speaker) => {
    setEditSpeaker(speaker);
    setShowForm(true);
  };

  const handleDelete = async (speaker: Speaker) => {
    if (!window.confirm('Delete this speaker?')) return;
    try {
      const config = { data: speaker };
      await axios.delete(`${API_BASE}/nursing/delete`, config);
      fetchSpeakers();
    } catch (e) {
      setError('Delete failed');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = e.currentTarget;

    const formData = new FormData();
    formData.append('name', (form.elements.namedItem('name') as HTMLInputElement)?.value || '');
    formData.append('university', (form.elements.namedItem('university') as HTMLInputElement)?.value || '');
    formData.append('bio', (form.elements.namedItem('bio') as HTMLTextAreaElement)?.value || '');
    formData.append('type', (form.elements.namedItem('type') as HTMLInputElement)?.value || '');
    const imageInput = form.elements.namedItem('image') as HTMLInputElement;
    if (imageInput && imageInput.files && imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
    }

    try {
      if (editSpeaker) {
        formData.append('id', editSpeaker.id?.toString() || '');
        await axios.put(`${API_BASE}/nursing/edit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post(`${API_BASE}/nursing/add`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setShowForm(false);
      setEditSpeaker(null);
      fetchSpeakers();
    } catch (e) {
      setError('Save failed');
    }
    setLoading(false);
  };

  // Filtered speakers based on search
  const filteredSpeakers = speakers.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.university?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="p-8 w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Manage Nursing Speakers</h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search by name or university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            className="bg-blue-600 px-4 py-2 rounded text-white flex items-center gap-2"
            onClick={() => { setEditSpeaker(null); setShowForm(true); }}
          >
            <FaPlus /> Add Speaker
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpeakers.map(speaker => (
              <div key={speaker.id} className="bg-white p-6 rounded-xl shadow border">
                <img
                  src={speaker.imageUrl}
                  alt={speaker.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-400"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{speaker.name}</h2>
                <div className="text-gray-600 text-center mb-2">{speaker.university}</div>
                <div className="text-gray-500 text-sm mb-2">{speaker.bio}</div>
                <div className="text-gray-700 text-center font-medium mb-2">Type: {speaker.type}</div>
                <div className="flex justify-center gap-2 mt-4">
                  <button
                    className="bg-blue-600 px-3 py-1 rounded text-white flex items-center gap-1"
                    onClick={() => handleEdit(speaker)}
                  >
                    <FaUserEdit /> Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white flex items-center gap-1"
                    onClick={() => handleDelete(speaker)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form
              className="bg-white p-8 rounded-xl w-full max-w-lg shadow-xl"
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                {editSpeaker ? 'Edit Speaker' : 'Add Speaker'}
              </h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  name="name"
                  defaultValue={editSpeaker?.name || ''}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">University</label>
                <input
                  name="university"
                  defaultValue={editSpeaker?.university || ''}
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Type</label>
                <input
                  name="type"
                  defaultValue={editSpeaker?.type || ''}
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Bio</label>
                <textarea
                  name="bio"
                  defaultValue={editSpeaker?.bio || ''}
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
                {editSpeaker?.imageUrl && (
                  <img
                    src={editSpeaker.imageUrl}
                    alt="Current"
                    className="w-24 h-24 rounded-full mt-2 border-2 border-blue-400"
                  />
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 px-6 py-2 rounded text-white font-bold"
                >
                  {editSpeaker ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  className="bg-gray-400 px-6 py-2 rounded text-white"
                  onClick={() => { setShowForm(false); setEditSpeaker(null); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default BankingDashboard;
