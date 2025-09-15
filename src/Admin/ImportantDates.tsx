// import React from 'react';

// const ImportantDates: React.FC = () => {
//   return (
//     <div className="p-6">
//       <h1>Important Dates</h1>
//     </div>
//   );
// };

// export default ImportantDates;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoginContext } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";


interface ConferenceDates {
  id: number;
  earlyBird: string;
  abstractDeadline: string;
  standardDeadline: string;
  conference: string;
  registrationDeadline: string;
}

const ImportantDates: React.FC = () => {
  const [dates, setDates] = useState<ConferenceDates | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const API_URL = "http://localhost:8906/api/conference-dates";


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

  // Fetch dates on mount
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await axios.get<ConferenceDates>(API_URL);
        setDates(res.data);
      } catch (error) {
        console.error("Error fetching dates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, []);

  // Update a single field
  const handleUpdate = async (field: keyof ConferenceDates, value: string) => {
    if (!dates) return;

    const updated = { ...dates, [field]: value };

    try {
      setUpdating(field);
      const res = await axios.put<ConferenceDates>(API_URL, updated, {
        headers: { "Content-Type": "application/json" },
      });
      setDates(res.data);
    } catch (error) {
      console.error("Error updating date", error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!dates) return <p>No data available</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Important Dates</h1>

      {(
        [
          { key: "earlyBird", label: "Early Bird Deadline" },
          { key: "abstractDeadline", label: "Abstract Deadline" },
          { key: "standardDeadline", label: "Standard Deadline" },
          { key: "conference", label: "Conference Date" },
          { key: "registrationDeadline", label: "Registration Deadline" },
          { key: "conferenceEndDate", label: "Conference End Date" },

        ] as { key: keyof ConferenceDates; label: string }[]
      ).map(({ key, label }) => (
        <div key={key} className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dates[key]?.substring(0, 10) || ""}
              onChange={(e) => handleUpdate(key, e.target.value)}
              className="border p-2 rounded flex-1"
            />
            {updating === key && <span className="text-blue-600">Saving...</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImportantDates;
