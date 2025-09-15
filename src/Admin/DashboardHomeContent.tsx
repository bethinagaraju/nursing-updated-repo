// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLoginContext } from '../context/LoginContext';

// const DashboardHomeContent = () => {
//   const navigate = useNavigate();
//   const { isLogin } = useLoginContext();

//   useEffect(() => {
//     if (!isLogin) {
//       navigate('/workflow');
//     }
//   }, [isLogin, navigate]);

//   if (!isLogin) {
//     return null; // or a loading spinner
//   }

//   return (
//     <>
//       {/* Admin shortcuts cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/banking')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Speakers</h3>
//           <p className="text-gray-600">Manage speakers</p>
//         </div>
        
//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/abstract-submissions')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Abstract Submissions</h3>
//           <p className="text-gray-600">Show abstract submissions</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/bookings')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Bookings</h3>
//           <p className="text-gray-600">Manage bookings</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/payments')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Payments</h3>
//           <p className="text-gray-600">Manage payments</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/registration-types')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Registration Types</h3>
//           <p className="text-gray-600">Manage registration types</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/discounts')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Discounts</h3>
//           <p className="text-gray-600">Manage discounts</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/accommodation-combinations')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Accommodation Combinations</h3>
//           <p className="text-gray-600">Manage accommodation combinations</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/important-dates')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Important Dates</h3>
//           <p className="text-gray-600">Manage important dates</p>
//         </div>


//         <div
//           className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow"
//           onClick={() => navigate('/admin/venue-details')}
//         >
//           <h3 className="text-lg font-semibold mb-2">Venue Details</h3>
//           <p className="text-gray-600">Manage venue details</p>
//         </div>






//       </div>
//     </>
//   );
// };

// export default DashboardHomeContent;








import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import {
  Users,
  FileText,
  BookOpen,
  CreditCard,
  ClipboardList,
  Percent,
  BedDouble,
  Calendar,
  MapPin,
} from "lucide-react";

const DashboardHomeContent = () => {
  const navigate = useNavigate();
  const { isLogin } = useLoginContext();

  useEffect(() => {
    if (!isLogin) {
      navigate("/workflow");
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return null; // or a loading spinner
  }

  const shortcuts = [
    {
      title: "Speakers",
      desc: "Manage speakers",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      path: "/admin/banking",
    },
    {
      title: "Abstract Submissions",
      desc: "Show abstract submissions",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      path: "/admin/abstract-submissions",
    },
    {
      title: "Bookings",
      desc: "Manage bookings",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      path: "/admin/bookings",
    },
    {
      title: "Payments",
      desc: "Manage payments",
      icon: <CreditCard className="w-8 h-8 text-pink-600" />,
      path: "/admin/payments",
    },
    {
      title: "Registration Types",
      desc: "Manage registration types",
      icon: <ClipboardList className="w-8 h-8 text-indigo-600" />,
      path: "/admin/registration-types",
    },
    {
      title: "Discounts",
      desc: "Manage discounts",
      icon: <Percent className="w-8 h-8 text-yellow-600" />,
      path: "/admin/discounts",
    },
    {
      title: "Accommodation",
      desc: "Manage accommodation combinations",
      icon: <BedDouble className="w-8 h-8 text-teal-600" />,
      path: "/admin/accommodation-combinations",
    },
    {
      title: "Important Dates",
      desc: "Manage important dates",
      icon: <Calendar className="w-8 h-8 text-red-600" />,
      path: "/admin/important-dates",
    },
    {
      title: "Venue Details",
      desc: "Manage venue details",
      icon: <MapPin className="w-8 h-8 text-gray-600" />,
      path: "/admin/venue-details",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {shortcuts.map((item, idx) => (
        <div
          key={idx}
          onClick={() => navigate(item.path)}
          className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 cursor-pointer 
                     hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-start gap-4"
        >
          {item.icon}
          <div>
            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardHomeContent;
