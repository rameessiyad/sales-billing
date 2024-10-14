import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';

const Invoice = () => {
  const { saleId } = useParams();
  const [saleDetails, setSaleDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/sales/${saleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (data.success) {
          setSaleDetails(data.sale);
        } else {
          console.log('Failed to fetch sale details');
        }

      } catch (error) {
        console.error('Error fetching sale details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (saleId) {
      fetchSaleDetails();
    }
  }, [saleId]);

  if (loading) {
    return <div>Loading invoice...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Invoice</h2>
      {saleDetails && (
        <div>
          {/* Customer and Sale Details */}
          <div className="mb-6">
            <p className="text-lg font-semibold">Customer Name: {saleDetails.customer}</p>
            <p className="text-lg">Sale ID: {saleDetails._id}</p>
          </div>

          {/* Product Details */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product Name</th>
                <th className="px-4 py-3 text-right text-gray-600 font-semibold">Quantity</th>
                <th className="px-4 py-3 text-right text-gray-600 font-semibold">Price per Unit</th>
                <th className="px-4 py-3 text-right text-gray-600 font-semibold">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.products.map((product, index) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-3 text-gray-700">{product.productName}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{product.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-700">₹{product.pricePerUnit.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-700">₹{(product.pricePerUnit * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total and Tax Details */}
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Subtotal: ₹{saleDetails.totalAmount.toFixed(2)}</p>
            <p className="text-lg">Tax: ₹{saleDetails.tax.toFixed(2)}</p>
            <p className="text-xl font-bold mt-2">Total: ₹{(saleDetails.totalAmount + saleDetails.tax).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
