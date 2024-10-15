import React from 'react';
import { FaBox, FaReceipt, FaPlus } from 'react-icons/fa';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { baseUrl } from '../../../baseUrl';

const SideBar = () => {

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      localStorage.removeItem('user');

      if (response.ok) {
        window.location.href = '/login';
      }

    } catch (error) {
      console.log(error);
    }
  }

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
            <Link to="/" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaBox className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaBox className="mr-3" />
              All Products
            </Link>
          </li>
          <li>
            <Link to="/sales" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaReceipt className="mr-3" />
              All Sales
            </Link>
          </li>
          <li>
            <Link to="/new-sale" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaPlus className="mr-3" />
              New Sale
            </Link>
          </li>
          <li>
            <Link to="/add-product" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded">
              <FaPlus className="mr-3" />
              Add Product
            </Link>
          </li>

          <li className='fixed bottom-5'>
            <button className='flex items-center p-2 text-gray-300 hover:text-white rounded' onClick={handleLogout}>
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
