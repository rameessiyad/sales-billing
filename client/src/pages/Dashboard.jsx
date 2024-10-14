import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [latestSales, setLatestSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProductsCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/product/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json();

      if (data.success) {
        setTotalProducts(data.count);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const fetchSalesCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/sales/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json();

      if (data.success) {
        setTotalSales(data.count);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //fetch latest sales
    const fetchLatestSales = async () => {
      try {
        const response = await fetch(`${baseUrl}/sales/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
          setLatestSales(data.sales);
        } else {
          console.log(data.message);
        }

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestSales();
    fetchProductsCount();
    fetchSalesCount();
  }, [])

  if (loading) {
    return <div>
      <div className="text-center p-6">Loading...</div>
    </div>;
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Total Products and Total Sales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Products */}
          <div className="p-6 bg-white shadow-lg rounded-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>

          {/* Total Sales */}
          <div className="p-6 bg-white shadow-lg rounded-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalSales}</p>
          </div>
        </div>

        {/* Latest Sales as Table */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Latest Sales</h3>

          {/* Sales Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Quantity</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestSales.slice(0, 5).map((sale) => (
                  <tr key={sale._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700 font-medium">{sale.customer}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{sale.products.map(p => p.productName).join(', ')}</td>
                    <td className="px-4 py-3 text-gray-700">{sale.products.reduce((acc, p) => acc + p.quantity, 0)}</td>
                    <td className="px-4 py-3 text-gray-700">₹{sale.totalAmount}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(sale.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          <div className="mt-4 text-center">

            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              onClick={() => navigate('/sales')}
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
