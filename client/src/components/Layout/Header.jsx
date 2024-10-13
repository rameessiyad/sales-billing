import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icon for user profile or notifications

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Dashboard Title */}
      <div className="text-xl font-bold text-gray-700">
        Sales & Billing Dashboard
      </div>

     
      {/* User Profile / Notifications */}
      <div className="text-gray-600 hover:text-gray-800">
        <FaUserCircle size={30} />
      </div>
    </header>
  );
};

export default Header;
