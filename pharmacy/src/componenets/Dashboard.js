import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({ children }) => (
  <div className="bg-white shadow rounded-lg p-6">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

function Dashboard() {
  const [data, setData] = useState({
    totalHoursWorked: 0,
    salariesPaid: 0,
    totalSales: 0,
    profit: 0,
    totalWorkers: 0,
    Netstock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profit', {
          wageRate: 15.50, 
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.totalWorkers}</div>
              <p className="text-gray-500">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stock Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.Netstock}</div>
              <p className="text-gray-500">Single Value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Net Profits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{typeof data.profit === 'number' ? `$${data.profit.toFixed(2)}` : 'N/A'}</div>
              <p className="text-gray-500">Year-to-date</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Hours Worked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{typeof data.totalHoursWorked === 'number' ? data.totalHoursWorked : 'N/A'}</div>
              <p className="text-gray-500">Current Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Salaries Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{typeof data.salariesPaid === 'number' ? `$${data.salariesPaid.toFixed(2)}` : 'N/A'}</div>
              <p className="text-gray-500">Current Month</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
