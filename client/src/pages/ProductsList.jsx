import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { baseUrl } from '../../baseUrl';
import toast from 'react-hot-toast';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [quantities, setQuantities] = useState({});
    const productsPerPage = 4;
    const [selectedProducts, setSelectedProducts] = useState(new Set());

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseUrl}/product`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setProducts(data.products);
                console.log(products);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts();
    }, [])

    // Handle product selection
    const handleSelectProduct = (id) => {
        const updatedSelectedProducts = new Set(selectedProducts);
        if (updatedSelectedProducts.has(id)) {
            updatedSelectedProducts.delete(id);
        } else {
            updatedSelectedProducts.add(id);
        }
        setSelectedProducts(updatedSelectedProducts);
    };

    // Handle adding selected products to sale
    const handleAddSale = async () => {
        const selectedProductsArray = Array.from(selectedProducts).map((productId) => ({
            productId,
            quantity: quantities[productId] || 1,
        }));

        const saleData = {
            products: selectedProductsArray,
            tax: 10,
        };

        try {
            const response = await fetch(`${baseUrl}/sub-sales/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                toast.success("saled added");
            }

        } catch (error) {
            console.log("Error adding products to sale", error);
        }
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
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Select</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Image</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map((product) => (
                                    <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.has(product._id)}
                                                onChange={() => handleSelectProduct(product._id)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded" />
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 font-medium">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">₹ {product.price}</td>
                                        <td className="px-4 py-3 text-gray-500">{product.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Sale Button */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleAddSale}
                        disabled={selectedProducts.size === 0}
                        className={`px-4 py-2 font-semibold text-white rounded-lg ${selectedProducts.size === 0 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
                            } transition`}
                    >
                        Add Sale
                    </button>
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
