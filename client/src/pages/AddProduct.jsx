import React, { useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.product.loading);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('image', image);

        dispatch(addProduct(formData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                setName('');
                setPrice('');
                setStock('');
                setImage(null);
                navigate('/products'); 
            }
        });
    };

    return (
        <AppLayout>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product price"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter stock quantity"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            accept="image/*"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full p-3 font-bold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default AddProduct;
