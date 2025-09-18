// // // import React from 'react';

// // // const AgendaManagement: React.FC = () => {
// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-2xl font-bold">Agenda Management</h1>
// // //     </div>
// // //   );
// // // };

// // // export default AgendaManagement;









// // import React, { useState, useEffect } from "react";

// // interface Session {
// //   time: string;
// //   title: string;
// //   description: string;
// //   speaker?: string;
// // }

// // interface Agenda {
// //   [day: string]: {
// //     date: string;
// //     sessions: Session[];
// //   };
// // }

// // const AgendaManagement: React.FC = () => {
// //   const [agenda, setAgenda] = useState<Agenda>({});
// //   const [loading, setLoading] = useState(true);

// //   const [newDay, setNewDay] = useState("");
// //   const [newDate, setNewDate] = useState("");

// //   const [selectedDay, setSelectedDay] = useState("");
// //   const [session, setSession] = useState<Session>({
// //     time: "",
// //     title: "",
// //     description: "",
// //     speaker: "",
// //   });

// //   // Fetch agenda on load
// //   const fetchAgenda = async () => {
// //     try {
// //       const res = await fetch("https://nursing.marketingzynlogic.com/api/nursing-agenda");
// //       if (res.ok) {
// //         const data = await res.json();
// //         const parsedAgenda = JSON.parse(data.agendaData);
// //         setAgenda(parsedAgenda);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching agenda:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAgenda();
// //   }, []);

// //   // Add a new day
// //   const handleAddDay = async () => {
// //     if (!newDay || !newDate) return;

// //     try {
// //       const res = await fetch("https://nursing.marketingzynlogic.com/api/nursing-agenda/addDay", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ day: newDay, date: newDate }),
// //       });

// //       if (res.ok) {
// //         await fetchAgenda();
// //         setNewDay("");
// //         setNewDate("");
// //       }
// //     } catch (err) {
// //       console.error("Error adding day:", err);
// //     }
// //   };

// //   // Add a new session to a day
// //   const handleAddSession = async () => {
// //     if (!selectedDay || !session.title || !session.time) return;

// //     try {
// //       const res = await fetch(
// //         `https://nursing.marketingzynlogic.com/api/nursing-agenda/addSession/${encodeURIComponent(
// //           selectedDay
// //         )}`,
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(session),
// //         }
// //       );

// //       if (res.ok) {
// //         await fetchAgenda();
// //         setSession({ time: "", title: "", description: "", speaker: "" });
// //       }
// //     } catch (err) {
// //       console.error("Error adding session:", err);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-5xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-6">Agenda Management</h1>

// //       {/* Loading */}
// //       {loading ? (
// //         <p>Loading agenda...</p>
// //       ) : (
// //         <>
// //           {/* Existing Agenda */}
// //           <div className="mb-10">
// //             <h2 className="text-xl font-semibold mb-3">Current Agenda</h2>
// //             {Object.keys(agenda).length === 0 ? (
// //               <p className="text-gray-600">No agenda found.</p>
// //             ) : (
// //               Object.entries(agenda).map(([day, { date, sessions }]) => (
// //                 <div key={day} className="mb-6 border p-4 rounded bg-white shadow">
// //                   <h3 className="font-bold text-lg">
// //                     {day} – {date}
// //                   </h3>
// //                   <ul className="mt-2 space-y-2">
// //                     {sessions.map((s, idx) => (
// //                       <li key={idx} className="p-2 border rounded bg-gray-50">
// //                         <p className="font-medium">
// //                           {s.time}: {s.title}
// //                         </p>
// //                         <p className="text-sm text-gray-600">{s.description}</p>
// //                         {s.speaker && (
// //                           <p className="text-xs text-gray-500 italic">
// //                             Speaker: {s.speaker}
// //                           </p>
// //                         )}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           {/* Add Day Form */}
// //           <div className="mb-10 border p-4 rounded bg-white shadow">
// //             <h2 className="text-xl font-semibold mb-3">Add New Day</h2>
// //             <div className="flex space-x-2 mb-3">
// //               <input
// //                 type="text"
// //                 placeholder="Day (e.g., Day 3)"
// //                 value={newDay}
// //                 onChange={(e) => setNewDay(e.target.value)}
// //                 className="border p-2 rounded flex-1"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Date (e.g., May 17, 2026)"
// //                 value={newDate}
// //                 onChange={(e) => setNewDate(e.target.value)}
// //                 className="border p-2 rounded flex-1"
// //               />
// //               <button
// //                 onClick={handleAddDay}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded"
// //               >
// //                 Add Day
// //               </button>
// //             </div>
// //           </div>

// //           {/* Add Session Form */}
// //           <div className="border p-4 rounded bg-white shadow">
// //             <h2 className="text-xl font-semibold mb-3">Add Session</h2>
// //             <div className="mb-3">
// //               <select
// //                 value={selectedDay}
// //                 onChange={(e) => setSelectedDay(e.target.value)}
// //                 className="border p-2 rounded w-full"
// //               >
// //                 <option value="">Select Day</option>
// //                 {Object.keys(agenda).map((day) => (
// //                   <option key={day} value={day}>
// //                     {day}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
// //               <input
// //                 type="text"
// //                 placeholder="Time (e.g., 09:00 - 10:00)"
// //                 value={session.time}
// //                 onChange={(e) => setSession({ ...session, time: e.target.value })}
// //                 className="border p-2 rounded"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Title"
// //                 value={session.title}
// //                 onChange={(e) => setSession({ ...session, title: e.target.value })}
// //                 className="border p-2 rounded"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Description"
// //                 value={session.description}
// //                 onChange={(e) =>
// //                   setSession({ ...session, description: e.target.value })
// //                 }
// //                 className="border p-2 rounded"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Speaker (optional)"
// //                 value={session.speaker || ""}
// //                 onChange={(e) =>
// //                   setSession({ ...session, speaker: e.target.value })
// //                 }
// //                 className="border p-2 rounded"
// //               />
// //             </div>
// //             <button
// //               onClick={handleAddSession}
// //               className="bg-green-600 text-white px-4 py-2 rounded"
// //             >
// //               Add Session
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default AgendaManagement;

// import React, { useState, useEffect } from "react";

// interface Session {
//   time: string;
//   title: string;
//   description: string;
// }

// interface Agenda {
//   [day: string]: {
//     date: string;
//     sessions: Session[];
//   };
// }

// const AgendaManagement: React.FC = () => {
//   const [agenda, setAgenda] = useState<Agenda>({});
//   const [loading, setLoading] = useState(true);

//   const [newDay, setNewDay] = useState("");
//   const [newDate, setNewDate] = useState("");

//   const [selectedDay, setSelectedDay] = useState("");
//   const [session, setSession] = useState<Session>({
//     time: "",
//     title: "",
//     description: "",
//   });

//   // Fetch agenda on load
//   const fetchAgenda = async () => {
//     try {
//       const res = await fetch("https://nursing.marketingzynlogic.com/api/nursing-agenda");
//       if (res.ok) {
//         const data = await res.json();
//         const parsedAgenda = JSON.parse(data.agendaData);
//         setAgenda(parsedAgenda);
//       }
//     } catch (err) {
//       console.error("Error fetching agenda:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgenda();
//   }, []);

//   // Add a new day
//   const handleAddDay = async () => {
//     if (!newDay || !newDate) return;

//     try {
//       const res = await fetch("https://nursing.marketingzynlogic.com/api/nursing-agenda/addDay", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ day: newDay, date: newDate }),
//       });

//       if (res.ok) {
//         await fetchAgenda();
//         setNewDay("");
//         setNewDate("");
//       }
//     } catch (err) {
//       console.error("Error adding day:", err);
//     }
//   };

//   // Add a new session to a day
//   const handleAddSession = async () => {
//     if (!selectedDay || !session.title || !session.time) return;

//     try {
//       const { time, title, description } = session; // ✅ remove speaker
//       const res = await fetch(
//         `https://nursing.marketingzynlogic.com/api/nursing-agenda/addSession/${encodeURIComponent(
//           selectedDay
//         )}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ time, title, description }), // ✅ no speaker field
//         }
//       );

//       if (res.ok) {
//         await fetchAgenda();
//         setSession({ time: "", title: "", description: "" });
//       }
//     } catch (err) {
//       console.error("Error adding session:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Agenda Management</h1>

//       {loading ? (
//         <p>Loading agenda...</p>
//       ) : (
//         <>
//           {/* Existing Agenda */}
//           <div className="mb-10">
//             <h2 className="text-xl font-semibold mb-3">Current Agenda</h2>
//             {Object.keys(agenda).length === 0 ? (
//               <p className="text-gray-600">No agenda found.</p>
//             ) : (
//               Object.entries(agenda).map(([day, { date, sessions }]) => (
//                 <div key={day} className="mb-6 border p-4 rounded bg-white shadow">
//                   <h3 className="font-bold text-lg">
//                     {day} – {date}
//                   </h3>
//                   <ul className="mt-2 space-y-2">
//                     {sessions.map((s, idx) => (
//                       <li key={idx} className="p-2 border rounded bg-gray-50">
//                         <p className="font-medium">
//                           {s.time}: {s.title}
//                         </p>
//                         <p className="text-sm text-gray-600">{s.description}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Add Day Form */}
//           <div className="mb-10 border p-4 rounded bg-white shadow">
//             <h2 className="text-xl font-semibold mb-3">Add New Day</h2>
//             <div className="flex space-x-2 mb-3">
//               <input
//                 type="text"
//                 placeholder="Day (e.g., Day 3)"
//                 value={newDay}
//                 onChange={(e) => setNewDay(e.target.value)}
//                 className="border p-2 rounded flex-1"
//               />
//               <input
//                 type="text"
//                 placeholder="Date (e.g., May 17, 2026)"
//                 value={newDate}
//                 onChange={(e) => setNewDate(e.target.value)}
//                 className="border p-2 rounded flex-1"
//               />
//               <button
//                 onClick={handleAddDay}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Add Day
//               </button>
//             </div>
//           </div>

//           {/* Add Session Form */}
//           <div className="border p-4 rounded bg-white shadow">
//             <h2 className="text-xl font-semibold mb-3">Add Session</h2>
//             <div className="mb-3">
//               <select
//                 value={selectedDay}
//                 onChange={(e) => setSelectedDay(e.target.value)}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select Day</option>
//                 {Object.keys(agenda).map((day) => (
//                   <option key={day} value={day}>
//                     {day}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//               <input
//                 type="text"
//                 placeholder="Time (e.g., 09:00 - 10:00)"
//                 value={session.time}
//                 onChange={(e) => setSession({ ...session, time: e.target.value })}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={session.title}
//                 onChange={(e) => setSession({ ...session, title: e.target.value })}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={session.description}
//                 onChange={(e) =>
//                   setSession({ ...session, description: e.target.value })
//                 }
//                 className="border p-2 rounded"
//               />
//             </div>
//             <button
//               onClick={handleAddSession}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Add Session
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AgendaManagement;







import React, { useState, useEffect } from "react";

interface Session {
  time: string;
  title: string;
  description: string;
}

interface Agenda {
  [day: string]: {
    date: string;
    sessions: Session[];
  };
}

const API_BASE = "https://nursing.marketingzynlogic.com/api/nursing-agenda";

const AgendaManagement: React.FC = () => {
  const [agenda, setAgenda] = useState<Agenda>({});
  const [loading, setLoading] = useState(true);

  const [newDay, setNewDay] = useState("");
  const [newDate, setNewDate] = useState("");

  const [selectedDay, setSelectedDay] = useState("");
  const [session, setSession] = useState<Session>({
    time: "",
    title: "",
    description: "",
  });

  const [editingSession, setEditingSession] = useState<{
    day: string;
    index: number;
    session: Session;
  } | null>(null);

  const [editingDay, setEditingDay] = useState<{
    day: string;
    date: string;
  } | null>(null);

  // Fetch agenda
  const fetchAgenda = async () => {
    try {
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        const parsedAgenda = JSON.parse(data.agendaData);
        setAgenda(parsedAgenda);
      }
    } catch (err) {
      console.error("Error fetching agenda:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  // Add new day
  const handleAddDay = async () => {
    if (!newDay || !newDate) return;
    try {
      const res = await fetch(`${API_BASE}/addDay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: newDay, date: newDate }),
      });
      if (res.ok) {
        await fetchAgenda();
        setNewDay("");
        setNewDate("");
      }
    } catch (err) {
      console.error("Error adding day:", err);
    }
  };

  // Edit day
  const handleEditDay = async () => {
    if (!editingDay) return;
    try {
      const res = await fetch(`${API_BASE}/editDay/${encodeURIComponent(editingDay.day)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDay),
      });
      if (res.ok) {
        await fetchAgenda();
        setEditingDay(null);
      }
    } catch (err) {
      console.error("Error editing day:", err);
    }
  };

  // Delete day
  const handleDeleteDay = async (day: string) => {
    try {
      const res = await fetch(`${API_BASE}/deleteDay/${encodeURIComponent(day)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAgenda();
      }
    } catch (err) {
      console.error("Error deleting day:", err);
    }
  };

  // Add session
  const handleAddSession = async () => {
    if (!selectedDay || !session.title || !session.time) return;
    try {
      const { time, title, description } = session;
      const res = await fetch(`${API_BASE}/addSession/${encodeURIComponent(selectedDay)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, title, description }),
      });
      if (res.ok) {
        await fetchAgenda();
        setSession({ time: "", title: "", description: "" });
      }
    } catch (err) {
      console.error("Error adding session:", err);
    }
  };

  // Edit session
  const handleEditSession = async () => {
    if (!editingSession) return;
    try {
      const { day, index, session } = editingSession;
      const res = await fetch(`${API_BASE}/editSession/${encodeURIComponent(day)}/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });
      if (res.ok) {
        await fetchAgenda();
        setEditingSession(null);
      }
    } catch (err) {
      console.error("Error editing session:", err);
    }
  };

  // Delete session
  const handleDeleteSession = async (day: string, index: number) => {
    try {
      const res = await fetch(`${API_BASE}/deleteSession/${encodeURIComponent(day)}/${index}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchAgenda();
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Agenda Management</h1>

      {loading ? (
        <p>Loading agenda...</p>
      ) : (
        <>
          {/* Agenda display */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Current Agenda</h2>
            {Object.keys(agenda).length === 0 ? (
              <p className="text-gray-600">No agenda found.</p>
            ) : (
              Object.entries(agenda).map(([day, { date, sessions }]) => (
                <div key={day} className="mb-6 border p-4 rounded bg-white shadow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{day} – {date}</h3>
                    <div className="space-x-2">
                      <button
                        className="text-blue-600"
                        onClick={() => setEditingDay({ day, date })}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDeleteDay(day)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <ul className="mt-2 space-y-2">
                    {sessions.map((s, idx) => (
                      <li key={idx} className="p-2 border rounded bg-gray-50 flex justify-between">
                        <div>
                          <p className="font-medium">{s.time}: {s.title}</p>
                          <p className="text-sm text-gray-600">{s.description}</p>
                        </div>
                        <div className="space-x-2">
                          <button
                            className="text-blue-600"
                            onClick={() => setEditingSession({ day, index: idx, session: s })}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600"
                            onClick={() => handleDeleteSession(day, idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          {/* Add Day */}
          <div className="mb-10 border p-4 rounded bg-white shadow">
            <h2 className="text-xl font-semibold mb-3">Add New Day</h2>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="Day (e.g., Day 3)"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Date (e.g., May 17, 2026)"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border p-2 rounded flex-1"
              />
              <button onClick={handleAddDay} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Day
              </button>
            </div>
          </div>

          {/* Add Session */}
          <div className="border p-4 rounded bg-white shadow">
            <h2 className="text-xl font-semibold mb-3">Add Session</h2>
            <div className="mb-3">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Day</option>
                {Object.keys(agenda).map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Time"
                value={session.time}
                onChange={(e) => setSession({ ...session, time: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Title"
                value={session.title}
                onChange={(e) => setSession({ ...session, title: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={session.description}
                onChange={(e) => setSession({ ...session, description: e.target.value })}
                className="border p-2 rounded"
              />
            </div>
            <button onClick={handleAddSession} className="bg-green-600 text-white px-4 py-2 rounded">
              Add Session
            </button>
          </div>

          {/* Edit Session Modal */}
          {editingSession && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Session</h2>
                <input
                  type="text"
                  value={editingSession.session.time}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, time: e.target.value },
                    })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={editingSession.session.title}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, title: e.target.value },
                    })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={editingSession.session.description}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, description: e.target.value },
                    })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => setEditingSession(null)} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button onClick={handleEditSession} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Day Modal */}
          {editingDay && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Day</h2>
                <input
                  type="text"
                  value={editingDay.day}
                  disabled
                  className="border p-2 rounded w-full mb-2 bg-gray-100"
                />
                <input
                  type="text"
                  value={editingDay.date}
                  onChange={(e) =>
                    setEditingDay({ ...editingDay, date: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => setEditingDay(null)} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button onClick={handleEditDay} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AgendaManagement;

