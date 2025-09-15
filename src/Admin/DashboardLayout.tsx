import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AlignJustify, Search, Bell, Settings, Rss, Calendar, MessageCircle, File, Mail, List, Layout, FormInput, LogOut,
  ChevronDown, Home, TrendingUp, CreditCard
} from 'lucide-react';

import { useLoginContext } from "../context/LoginContext";

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, hasDropdown = false, isActive = false, onClick }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-xl transition-colors duration-200 ${onClick ? 'cursor-pointer' : ''} ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </div>
    {hasDropdown && <ChevronDown className="w-4 h-4 transition-transform duration-200" />}
  </div>
);

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLogin } = useLoginContext();

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    setIsLogin(false);
    navigate('/workflow'); // Redirect to login or workflow page
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className={`fixed z-50 h-full bg-[#0A234E] text-white transition-all duration-300 ease-in-out overflow-y-auto ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:w-64 md:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-wider text-blue-400 mr-2">Ʌ</span>
              <span className="text-xl font-bold">NURSING</span>
            </div>
            {/* The close button for mobile is now part of the top bar toggle */}
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <div className="text-xs text-gray-500 font-semibold mb-2 ml-2 uppercase">Dashboards</div>
          <SidebarItem icon={Home} label="Dashboard" isActive={location.pathname === '/admin'} onClick={() => navigate('')} />
          <SidebarItem icon={TrendingUp} label="Speakers" isActive={location.pathname === '/admin/banking'} onClick={() => navigate('banking')} />
          <SidebarItem icon={File} label="Abstract Submissions" isActive={location.pathname === '/admin/abstract-submissions'} onClick={() => navigate('abstract-submissions')} />
          <SidebarItem icon={File} label="Bookings" isActive={location.pathname === '/admin/bookings'} onClick={() => navigate('bookings')} />
          <SidebarItem icon={CreditCard} label="Payments" isActive={location.pathname === '/admin/payments'} onClick={() => navigate('payments')} />
          <SidebarItem icon={List} label="Registration Types" isActive={location.pathname === '/admin/registration-types'} onClick={() => navigate('registration-types')} />
          <SidebarItem icon={List} label="Discounts" isActive={location.pathname === '/admin/discounts'} onClick={() => navigate('discounts')} />
          <SidebarItem icon={List} label="Accommodation Combinations" isActive={location.pathname === '/admin/accommodation-combinations'} onClick={() => navigate('accommodation-combinations')} />
          <SidebarItem icon={List} label="Important Dates" isActive={location.pathname === '/admin/important-dates'} onClick={() => navigate('important-dates')} />
          <SidebarItem icon={List} label="Venue Details" isActive={location.pathname === '/admin/venue-details'} onClick={() => navigate('venue-details')} />


        </nav>
      </aside>

      {/* Main Content */}
 
<div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
  {/* Top Bar */}
  <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center transition-all duration-300 ease-in-out">
    <div className="flex items-center space-x-4 w-full">
      <h1 className="text-2xl font-bold text-[#0A234E] text-center">NURSING MEET 2026</h1>
    </div>
    <div className="flex items-center space-x-4">
      <LogOut onClick={handleLogout} className="text-gray-600 hover:text-gray-900 cursor-pointer w-6 h-6" />
      {/* <Settings className="text-gray-600 hover:text-gray-900 cursor-pointer w-6 h-6" /> */}
      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer">
        <img src="https://placehold.co/100x100/A0B9C6/FFFFFF?text=A" alt="Profile" className="object-cover w-full h-full" />
      </div>
    </div>
  </header>

  {/* Page Content */}
  <main className="p-6">
    <Outlet />
  </main>
</div>



      
    </div>
  );
};

export default DashboardLayout;
