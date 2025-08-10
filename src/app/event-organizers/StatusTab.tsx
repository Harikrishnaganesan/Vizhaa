import React from "react";
import Image from "next/image";

interface EventData {
  eventName: string;
  location: string;
  numSuppliers: number;
  time: string;
  date: string;
  selectedServices: string;
  selectedDressCode: string;
  paymentStatus: 'Paid' | 'Advance Paid' | 'Unpaid';
  isPastEvent: boolean;
}

interface SupplierProfile {
  id: number;
  name: string;
  role: string;
  age: number;
  address: string;
  avatarUrl: string;
}

interface StatusTabProps {
  currentEvent?: EventData | null;
  suppliers: SupplierProfile[];
}

const StatusTab: React.FC<StatusTabProps> = ({ currentEvent, suppliers }) => {
  const totalSuppliers = currentEvent?.numSuppliers || 0;
  const joinedSuppliers = suppliers.length;
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#2DBE60] text-2xl font-bold">Event Peoples</h2>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-gray-600 font-semibold">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="10" cy="10" r="8" fill="#23364E"/><path fill="#fff" d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-1.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            Service
          </span>
          <span className="text-gray-600 font-semibold">{joinedSuppliers} / {totalSuppliers}</span>
        </div>
      </div>
      <div className="space-y-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="border rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-6 bg-gray-50">
            <div className="flex-shrink-0">
              <Image src={supplier.avatarUrl} alt="Profile" width={100} height={100} className="rounded-lg object-cover w-[100px] h-[100px]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{supplier.name}</h3>
                  <span className="text-gray-500 text-sm">{supplier.role}</span>
                </div>
                <button className="border border-gray-300 rounded px-4 py-1 text-gray-600 font-medium hover:bg-gray-100">Remove</button>
              </div>
              <div className="mt-2 text-gray-600 text-sm">Age : {supplier.age}</div>
              <div className="mt-2 text-gray-600 text-sm">
                <span className="font-semibold">Address</span><br />
                {supplier.address}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded shadow flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M21 15.46l-5.27-2.11a.75.75 0 0 0-.73.09l-2.11 1.58a.75.75 0 0 1-.88 0l-2.11-1.58a.75.75 0 0 0-.73-.09L3 15.46V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.54z"/><path fill="#fff" d="M21 8.24V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.24l9 3.6 9-3.6z"/></svg>
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTab;
