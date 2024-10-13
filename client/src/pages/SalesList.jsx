import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { AiFillDelete } from 'react-icons/ai';

// Mock sales data (including date for each sale)
const mockSales = [
    { id: 1, date: '2024-10-01', customer: 'Customer A', totalAmount: 150, products: ['Product A', 'Product B'] },
    { id: 2, date: '2024-10-02', customer: 'Customer B', totalAmount: 200, products: ['Product C'] },
    { id: 3, date: '2024-10-03', customer: 'Customer C', totalAmount: 120, products: ['Product D', 'Product E'] },
    { id: 4, date: '2024-10-04', customer: 'Customer D', totalAmount: 300, products: ['Product F'] },
    { id: 5, date: '2024-10-05', customer: 'Customer E', totalAmount: 250, products: ['Product G', 'Product H'] },
    { id: 6, date: '2024-10-06', customer: 'Customer F', totalAmount: 180, products: ['Product I'] },
    { id: 7, date: '2024-10-07', customer: 'Customer G', totalAmount: 220, products: ['Product J', 'Product K'] },
    { id: 8, date: '2024-10-08', customer: 'Customer H', totalAmount: 275, products: ['Product L'] },
    { id: 9, date: '2024-10-09', customer: 'Customer I', totalAmount: 400, products: ['Product M'] },
    { id: 10, date: '2024-10-10', customer: 'Customer J', totalAmount: 300, products: ['Product N', 'Product O'] },
];

const SalesList = () => {
    const [sales, setSales] = useState(mockSales);
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 5;

    // Get current sales based on the page
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle sale deletion
    const handleDelete = (id) => {
        const updatedSales = sales.filter((sale) => sale.id !== id);
        setSales(updatedSales);
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Sales List</h2>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                    {/* Sales Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Date</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Customer</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Total Amount</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Products</th>
                                    <th className="px-4 py-3 text-center text-gray-600 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSales.map((sale) => (
                                    <tr key={sale.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-gray-700">{sale.date}</td>
                                        <td className="px-4 py-3 text-gray-700">{sale.customer}</td>
                                        <td className="px-4 py-3 text-gray-700">${sale.totalAmount}</td>
                                        <td className="px-4 py-3 text-gray-700">{sale.products.join(', ')}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(sale.id)}
                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                            >
                                                <AiFillDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex space-x-2">
                            {Array.from(
                                { length: Math.ceil(sales.length / salesPerPage) },
                                (_, i) => (
                                    <li key={i}>
                                        <button
                                            onClick={() => paginate(i + 1)}
                                            className={`px-3 py-1 rounded-md ${currentPage === i + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                                } hover:bg-blue-700 hover:text-white transition`}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </AppLayout>
    );
};

export default SalesList;
