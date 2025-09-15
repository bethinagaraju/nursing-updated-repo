// import React from 'react';

// const VenueDetails: React.FC = () => {
//   return (
//     <div className="p-6">
//       <h1>venue Detials</h1>
//     </div>
//   );
// };

// export default VenueDetails;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoginContext } from "@/context/LoginContext";
import { useNavigate } from "react-router-dom";

const VenueDetails: React.FC = () => {
  const [venue, setVenue] = useState({
    conferenceVenue: "",
    accommodationVenue: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const API_URL = "http://localhost:8906/api/conference-venue";

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

  // Fetch venue details
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await axios.get(API_URL);
        setVenue(res.data);
      } catch (err) {
        console.error("Error fetching venue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, []);

  // Update only one field
  const handleUpdate = async (field: "conferenceVenue" | "accommodationVenue", value: string) => {
    setSaving(true);
    try {
      const updatedVenue = { ...venue, [field]: value };
      const res = await axios.put(API_URL, updatedVenue);
      setVenue(res.data);
    } catch (err) {
      console.error("Error updating venue:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading venue details...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Venue Details</h1>

      {/* Conference Venue */}
      <div>
        <label className="block font-semibold mb-2">Conference Venue</label>
        <input
          type="text"
          value={venue.conferenceVenue}
          onChange={(e) => setVenue({ ...venue, conferenceVenue: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => handleUpdate("conferenceVenue", venue.conferenceVenue)}
          disabled={saving}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Conference Venue"}
        </button>
      </div>

      {/* Accommodation Venue */}
      <div>
        <label className="block font-semibold mb-2">Accommodation Venue</label>
        <input
          type="text"
          value={venue.accommodationVenue}
          onChange={(e) => setVenue({ ...venue, accommodationVenue: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => handleUpdate("accommodationVenue", venue.accommodationVenue)}
          disabled={saving}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Accommodation Venue"}
        </button>
      </div>
    </div>
  );
};

export default VenueDetails;
