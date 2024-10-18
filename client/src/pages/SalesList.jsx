import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { baseUrl } from '../../baseUrl'; 

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 5;

    // Fetch sales data from the API
    const fetchSales = async () => {
        try {
            const response = await fetch(`${baseUrl}/sales`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
            });

            const data = await response.json();

            if (response.ok) {
                setSales(data.sales); 
            } else {
                setError('Failed to fetch sales data');
            }
        } catch (error) {
            console.error('Error fetching sales data:', error);
            setError('An error occurred while fetching sales');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    // Get current sales based on the page
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = sales.slice(indexOfFirstSale, indexOfFirstSale + salesPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    if (loading) {
        return <div>Loading sales data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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
                                </tr>
                            </thead>
                            <tbody>
                                {currentSales.map((sale) => (
                                    <tr key={sale._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-gray-700">{new Date(sale.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-gray-700">{sale.customer}</td>
                                        <td className="px-4 py-3 text-gray-700">₹{sale.totalAmount}</td>
                                        <td className="px-4 py-3 text-gray-700">{sale.products.map((product) => product.productName).join(', ')}</td>
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
