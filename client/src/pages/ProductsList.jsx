import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { AiFillDelete } from 'react-icons/ai';

const mockProducts = [
    { id: 1, name: 'Product A', price: 100, stock: 50, imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product B', price: 200, stock: 30, imageUrl: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Product C', price: 150, stock: 20, imageUrl: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Product D', price: 300, stock: 15, imageUrl: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Product E', price: 250, stock: 40, imageUrl: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Product F', price: 350, stock: 25, imageUrl: 'https://via.placeholder.com/100' },
    { id: 7, name: 'Product G', price: 400, stock: 10, imageUrl: 'https://via.placeholder.com/100' },
    { id: 8, name: 'Product H', price: 120, stock: 60, imageUrl: 'https://via.placeholder.com/100' },
    { id: 9, name: 'Product I', price: 500, stock: 5, imageUrl: 'https://via.placeholder.com/100' },
    { id: 10, name: 'Product J', price: 220, stock: 35, imageUrl: 'https://via.placeholder.com/100' },
    { id: 11, name: 'Product K', price: 275, stock: 45, imageUrl: 'https://via.placeholder.com/100' },
    { id: 12, name: 'Product L', price: 180, stock: 70, imageUrl: 'https://via.placeholder.com/100' },
];

const ProductsList = () => {
    const [products, setProducts] = useState(mockProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 4;

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current products based on the page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle product deletion
    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Product List</h2>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="bg-white p-6 shadow-lg rounded-lg">
                    {/* Products Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Image</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Stock</th>
                                    <th className="px-4 py-3 text-center text-gray-600 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 font-medium">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">${product.price}</td>
                                        <td className="px-4 py-3 text-gray-500">{product.stock}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(product.id)}
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
                                { length: Math.ceil(filteredProducts.length / productsPerPage) },
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

export default ProductsList;
