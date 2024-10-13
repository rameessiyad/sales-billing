import React from 'react';
import { FaBox, FaReceipt, FaPlus } from 'react-icons/fa';
import { RiLogoutBoxRLine } from "react-icons/ri";

const SideBar = () => {
  return (
    <div className="h-full flex flex-col bg-gray-800 text-white">
      {/* Sidebar Header */}
      <div className="p-4 text-lg font-bold text-center border-b border-gray-700">
        Sales Dashboard
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <a href="/products" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaBox className="mr-3" />
              All Products
            </a>
          </li>
          <li>
            <a href="/sales" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaReceipt className="mr-3" />
              All Sales
            </a>
          </li>
          <li>
            <a href="/new-sale" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaPlus className="mr-3" />
              New Sale
            </a>
          </li>

          <li className='fixed bottom-5'>
            <button className='flex items-center p-2 text-gray-300 hover:text-white rounded '>
              <RiLogoutBoxRLine className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
