// // import React from 'react';

// // const Discounts: React.FC = () => {
// //   return (
// //     <div className="p-6">
// //       <h1>Discounts</h1>
// //     </div>
// //   );
// // };

// // export default Discounts;




// import React, { useEffect, useState } from "react";

// interface Discount {
//   id: number;
//   name: string | null;
//   phone: string | null;
//   instituteOrUniversity: string | null;
//   country: string | null;
//   sessionId: string;
//   paymentIntentId: string | null;
//   customerEmail: string;
//   amountTotal: number;
//   currency: string;
//   status: string;
//   stripeCreatedAt: string;
//   stripeExpiresAt: string;
//   createdAt: string;
//   updatedAt: string;
//   paymentStatus: string;
// }

// const Discounts: React.FC = () => {
//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDiscounts = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8906/admin/api/admin/discounts/renewable"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch discounts");
//         }
//         const data = await response.json();
//         setDiscounts(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDiscounts();
//   }, []);

//   if (loading) return <p className="p-6">Loading discounts...</p>;
//   if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Discounts</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">ID</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Currency</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Payment Status</th>
//               <th className="border px-4 py-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {discounts.map((d) => (
//               <tr key={d.id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">{d.id}</td>
//                 <td className="border px-4 py-2">{d.customerEmail}</td>
//                 <td className="border px-4 py-2">
//                   {d.amountTotal.toFixed(2)}
//                 </td>
//                 <td className="border px-4 py-2">{d.currency}</td>
//                 <td className="border px-4 py-2">{d.status}</td>
//                 <td className="border px-4 py-2">{d.paymentStatus}</td>
//                 <td className="border px-4 py-2">
//                   {new Date(d.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Discounts;



import React, { useEffect, useState } from "react";

interface Discount {
  id: number;
  name: string | null;
  phone: string | null;
  instituteOrUniversity: string | null;
  country: string | null;
  sessionId: string;
  paymentIntentId: string | null;
  customerEmail: string;
  amountTotal: number;
  currency: string;
  status: string;
  stripeCreatedAt: string;
  stripeExpiresAt: string;
  createdAt: string;
  updatedAt: string;
  paymentStatus: string;
}

const Discounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Discount | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8906/admin/api/admin/discounts/nursing"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch discounts");
        }
        const data = await response.json();
        setDiscounts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  if (loading) return <p className="p-6">Loading discounts...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discounts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Currency</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelected(d)}
              >
                <td className="border px-4 py-2">{d.id}</td>
                <td className="border px-4 py-2">{d.customerEmail}</td>
                <td className="border px-4 py-2">
                  {d.amountTotal.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{d.currency}</td>
                <td className="border px-4 py-2">{d.status}</td>
                <td className="border px-4 py-2">{d.paymentStatus}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent row click
                      setSelected(d);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    More Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              🎟️ Discount Record Details
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Id:</strong> {selected.id}</p>
              <p><strong>Name:</strong> {selected.name || "-"}</p>
              <p><strong>Phone:</strong> {selected.phone || "-"}</p>
              <p>
                <strong>Institute Or University:</strong>{" "}
                {selected.instituteOrUniversity || "-"}
              </p>
              <p><strong>Country:</strong> {selected.country || "-"}</p>
              <p>
                <strong>Session ID 🔑:</strong> {selected.sessionId}
              </p>
              <p>
                <strong>Payment Intent Id:</strong>{" "}
                {selected.paymentIntentId || "-"}
              </p>
              <p><strong>Customer Email:</strong> {selected.customerEmail}</p>
              <p>
                <strong>Amount Total:</strong> €{selected.amountTotal}
              </p>
              <p><strong>Currency:</strong> {selected.currency}</p>
              <p>
                <strong>Status:</strong>{" "}
                {selected.status === "PENDING" ? (
                  <span className="text-yellow-600 font-semibold">
                    🟡 {selected.status}
                  </span>
                ) : selected.status === "PAID" ? (
                  <span className="text-green-600 font-semibold">
                    🟢 {selected.status}
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    🔴 {selected.status}
                  </span>
                )}
              </p>
              <p>
                <strong>Stripe Created At:</strong>{" "}
                {new Date(selected.stripeCreatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Stripe Expires At:</strong>{" "}
                {new Date(selected.stripeExpiresAt).toLocaleString()}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selected.updatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Payment Status:</strong> {selected.paymentStatus}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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

export default Discounts;

