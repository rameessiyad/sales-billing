import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { baseUrl } from '../../baseUrl';
import toast from 'react-hot-toast';

const NewSale = () => {
    const [subSales, setSubSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerName, setCustomerName] = useState('');  // New state for customer name

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
                setSubSales(data.subSales);

            } catch (error) {
                console.error('Error fetching sub-sales:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubSales();
    }, []);

    //increase quantity
    const handleIncreaseQuantity = async (subSaleIndex, productIndex) => {
        const subSale = subSales[subSaleIndex];
        const product = subSale.products[productIndex];

        try {
            const response = await fetch(`${baseUrl}/sub-sales/increase-quantity`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    subSaleId: subSale._id,
                    productId: product._id,
                    quantityToAdd: 1,

                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubSales((prevSubSales) => {
                    const newSubSales = [...prevSubSales];
                    newSubSales[subSaleIndex] = data.subSale;
                    return newSubSales;
                });
            }

        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleGenerateBill = async () => {
        if (!customerName) {
            toast.error('Please enter customer name');
            return;
        }

        const subSalesId = subSales[0]._id;
        const saleDetails = {
            customer: customerName,
            subSalesId,
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
                toast.success('Bill generated successfully');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error('Error generating bill:', error);
        }
    }


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

                                                >
                                                    -
                                                </button>
                                                {product.quantity}
                                                <button
                                                    className="bg-gray-200 px-2 py-1 rounded-lg ml-2"
                                                    onClick={() => handleIncreaseQuantity(subSaleIndex, productIndex)}
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
                            generate bill
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">No sub-sales available.</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Add Product to Sale
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default NewSale;
