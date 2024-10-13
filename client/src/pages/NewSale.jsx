import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { AiFillDelete } from 'react-icons/ai';

const mockProducts = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 150 },
    { id: 4, name: 'Product D', price: 300 },
    { id: 5, name: 'Product E', price: 250 },
    { id: 6, name: 'Product F', price: 350 },
    { id: 7, name: 'Product G', price: 400 },
    { id: 8, name: 'Product H', price: 120 },
    { id: 9, name: 'Product I', price: 500 },
    { id: 10, name: 'Product J', price: 220 },
];

const NewSale = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [taxAmount, setTaxAmount] = useState('');

    // Filter products based on the search term
    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle adding products to the sale
    const handleAddProduct = (product) => {
        if (!selectedProducts.some(p => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    };

    // Function to handle removing products from the sale
    const handleRemoveProduct = (id) => {
        setSelectedProducts(selectedProducts.filter(product => product.id !== id));
    };

    // Function to handle bill generation (placeholder)
    const handleGenerateBill = () => {
        // Placeholder logic for generating a bill
        const totalAmount = selectedProducts.reduce((total, product) => total + product.price, 0);
        const totalTax = (totalAmount * (taxAmount / 100)).toFixed(2);
        alert(`Bill Generated!\nCustomer: ${customerName}\nTotal Amount: $${totalAmount}\nTax Amount: $${totalTax}`);
    };

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">New Sale</h2>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search Products..."
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Products List */}
                <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Available Products</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                                    <th className="px-4 py-3 text-center text-gray-600 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-gray-700">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">${product.price}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleAddProduct(product)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Selected Products List */}
                <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Selected Products</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                                    <th className="px-4 py-3 text-center text-gray-600 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-gray-700">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">${product.price}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleRemoveProduct(product.id)}
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

                {/* Customer Name and Tax Amount Fields */}
                <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Tax Amount (%)"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={taxAmount}
                            onChange={(e) => setTaxAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Generate Bill Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleGenerateBill}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Generate Bill
                    </button>
                </div>
            </div>
        </AppLayout>
    );
};

export default NewSale;
