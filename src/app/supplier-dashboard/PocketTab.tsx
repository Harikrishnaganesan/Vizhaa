import React from "react";

const PocketTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-[#2DBE60] text-lg font-bold mb-6">MY POCKET</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Order Card */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
          <div className="border-2 border-green-400 rounded-full w-24 h-24 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-gray-700">0</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">Order</div>
        </div>
        {/* Earning Card */}
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
          <div className="border-2 border-yellow-400 rounded-full w-24 h-24 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-gray-700">₹0</span>
          </div>
          <div className="text-lg font-semibold text-gray-700">Earning</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pocket Balance */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
          <div className="text-gray-600 font-medium mb-2">Pocket balance</div>
          <div className="text-2xl font-bold text-gray-700">₹0</div>
        </div>
        {/* Cash Limit & Actions */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Available cash limit</span>
            <span className="text-gray-700 font-bold">₹100</span>
          </div>
          <div className="flex gap-4 mt-4">
            <button className="bg-[#2DBE60] hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow">Deposit</button>
            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-6 py-2 rounded shadow">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PocketTab;
