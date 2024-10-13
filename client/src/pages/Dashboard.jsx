import React, { useEffect, useState } from 'react';
import AppLayout from '../components/Layout/AppLayout';

const mockSales = [
  { id: 1, product: 'Product A', amount: 100, date: '2024-10-10' },
  { id: 2, product: 'Product B', amount: 200, date: '2024-10-11' },
  { id: 3, product: 'Product C', amount: 150, date: '2024-10-12' },
  { id: 4, product: 'Product D', amount: 300, date: '2024-10-13' },
  { id: 5, product: 'Product E', amount: 250, date: '2024-10-14' },
  { id: 6, product: 'Product F', amount: 350, date: '2024-10-15' }
];

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [latestSales, setLatestSales] = useState([]);

  useEffect(() => {
    setTotalProducts(50); 
    setTotalSales(20); 
    setLatestSales(mockSales); 
  }, []);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Total Products and Total Sales */}
        <div className="grid grid-cols-2 gap-6">
          {/* Total Products */}
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>

          {/* Total Sales */}
          <div className="p-4 bg-white shadow-lg rounded-lg">
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
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {latestSales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700 font-medium">{sale.product}</td>
                    <td className="px-4 py-3 text-gray-700">${sale.amount}</td>
                    <td className="px-4 py-3 text-gray-500">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          <div className="mt-4 text-center">
            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
              Show More
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
