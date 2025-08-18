import React from "react";
import { Card } from "flowbite-react";

const Overview = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold">Total Policies</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">BDT 8,50,000</p>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
