// import React from 'react';

// const AbstractSubmissions = () => {
//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <main className="p-8 w-full max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-blue-700">Abstract Submissions</h1>
//         <p className="text-gray-600">Manage abstract submissions here.</p>
//         {/* Add your abstract submissions management logic here */}
//       </main>
//     </div>
//   );
// };

// export default AbstractSubmissions;


import React, { useEffect, useState } from "react";
import { useLoginContext } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://nursing.marketingzynlogic.com";

interface AbstractSubmission {
  id: number;
  titlePrefix: string;
  name: string;
  email: string;
  phone: string;
  organizationName: string;
  interestedIn: { id: number; option_name: string };
  session: { id: number; sessionName: string };
  country: string;
  abstractFilePath: string;
}



const AbstractSubmissions = () => {
  const [submissions, setSubmissions] = useState<AbstractSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
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
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/admin/api/admin/abstract-submissions/nursing`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setSubmissions(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="p-8 w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Nursing Abstract Submissions
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
        )}

        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions found.</p>
        ) : (
          <div className="overflow-x-auto border border-gray-300 rounded-lg shadow">
            <table className="min-w-full table-auto text-left text-sm">
              <thead>
                <tr className="bg-blue-100 text-gray-800">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Organization</th>
                  <th className="px-4 py-3">Interested In</th>
                  <th className="px-4 py-3">Session</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">PDF</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-3">{sub.titlePrefix}</td>
                    <td className="px-4 py-3">{sub.name}</td>
                    <td className="px-4 py-3">{sub.email}</td>
                    <td className="px-4 py-3">{sub.phone}</td>
                    <td className="px-4 py-3">{sub.organizationName}</td>
                    <td className="px-4 py-3">{sub.interestedIn?.option_name}</td>
                    <td className="px-4 py-3">{sub.session?.sessionName}</td>
                    <td className="px-4 py-3 capitalize">{sub.country}</td>
                    <td className="px-4 py-3">
                      <a
                        href={sub.abstractFilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AbstractSubmissions;
