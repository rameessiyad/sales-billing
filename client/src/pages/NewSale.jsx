import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { baseUrl } from '../../baseUrl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewSale = () => {
    const [subSales, setSubSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerName, setCustomerName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubSales = async () => {
            try {
                const response = await fetch(`${baseUrl}/sub-sales`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();

                console.log(data)
                const updatedSubSales = data.subSales.map((subSale) => {
                    subSale.totalAmount = subSale.products.reduce(
                        (acc, item) => acc + item.pricePerUnit * item.quantity, 0
                    );
                    return subSale;
                });

                setSubSales(updatedSubSales);

            } catch (error) {
                console.error('Error fetching sub-sales:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubSales();
    }, []);

    // Handle quantity change 
    const handleQuantityChange = (subSaleIndex, productIndex, change) => {
        setSubSales((prevSubSales) => {
            const newSubSales = [...prevSubSales];
            const subSale = newSubSales[subSaleIndex];
            const product = subSale.products[productIndex];

            // Update the product quantity
            product.quantity += change;

            if (product.quantity < 1) {
                product.quantity = 1;
            }

            product.totalPrice = product.pricePerUnit * product.quantity;

            subSale.totalAmount = subSale.products.reduce(
                (acc, item) => acc + item.totalPrice, 0
            );

            return newSubSales;
        });
    };

    const handleGenerateBill = async () => {
        if (!customerName) {
            toast.error('Please enter customer name');
            return;
        }

        const subSalesId = subSales[0]._id;

        const updatedProducts = subSales[0].products.map((product) => ({
            productName: product.productName,
            quantity: product.quantity, 
            pricePerUnit: product.pricePerUnit,
            totalPrice: product.totalPrice,
        }));

        const saleDetails = {
            customer: customerName,
            subSalesId,
            products: updatedProducts, 
        };

        try {
            const response = await fetch(`${baseUrl}/sales/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(saleDetails), 
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Bill generated');
                navigate(`/invoice/${data.sale._id}`);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error('Error generating bill:', error);
        }
    };


    if (loading) {
        return (
            <AppLayout>
                <div className="text-center p-6">Loading...</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Sub Sales</h2>
                {subSales.length > 0 ? (
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Quantity</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Price Per Unit</th>
                                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subSales.map((subSale, subSaleIndex) => (
                                    subSale.products.map((product, productIndex) => (
                                        <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-gray-700">{product.productName}</td>
                                            <td className="px-4 py-3 text-gray-700 flex items-center">
                                                <button
                                                    className="bg-gray-200 px-2 py-1 rounded-lg mr-2"
                                                    onClick={() => handleQuantityChange(subSaleIndex, productIndex, -1)}
                                                >
                                                    -
                                                </button>
                                                {product.quantity}
                                                <button
                                                    className="bg-gray-200 px-2 py-1 rounded-lg ml-2"
                                                    onClick={() => handleQuantityChange(subSaleIndex, productIndex, 1)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700">{product.pricePerUnit}</td>
                                            <td className="px-4 py-3 text-gray-700">{product.totalPrice}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>

                        {/* Customer Name Input */}
                        <div className="mt-6">
                            <label htmlFor="customerName" className="block text-gray-700 font-semibold mb-2">
                                Customer Name:
                            </label>
                            <input
                                id="customerName"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter customer name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        {/* Total Section */}
                        <div className="mt-6 text-right">
                            <h3 className="text-xl font-bold">Total Amount: ₹{subSales[0].totalAmount}</h3>
                            <p className="text-gray-500">Tax: ₹{subSales[0].tax}</p>
                        </div>

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
                            onClick={handleGenerateBill}
                        >
                            Generate Bill
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">No sub-sales available.</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => navigate('/products')}
                        >
                            Add Product to Sale
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default NewSale;
