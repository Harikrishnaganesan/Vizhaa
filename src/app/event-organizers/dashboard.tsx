"use client";
import React, { useState } from "react";
import Header from "../../app/components/Header";
import Image from "next/image";

const tabs = [
  { key: "dashboard", label: "Dash Board" },
  { key: "events", label: "My Events" },
  { key: "form", label: "Form" },
  { key: "status", label: "Status" },
  { key: "payment", label: "Payment" },
];

const EventOrganizersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-center">Welcome to your Dashboard</h2>
            <p className="text-center text-gray-700">Overview and quick stats will appear here.</p>
          </div>
        );
      case "events":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-center">My Events</h2>
            <p className="text-center text-gray-700">List and manage your events here.</p>
          </div>
        );
      case "form":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-center">Enter a Event Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <select className="w-full border rounded px-4 py-2 mb-4">
                  <option>Event Name</option>
                </select>
                <input type="text" placeholder="Location" className="w-full border rounded px-4 py-2 mb-4" />
                <select className="w-full border rounded px-4 py-2 mb-4">
                  <option>Time</option>
                </select>
                <input type="date" className="w-full border rounded px-4 py-2 mb-4" />
                <select className="w-full border rounded px-4 py-2 mb-4">
                  <option>Dress Code</option>
                </select>
              </div>
              <div>
                <input type="number" placeholder="Number of Suppliers" className="w-full border rounded px-4 py-2 mb-4" />
                <input type="number" placeholder="Number of Services" className="w-full border rounded px-4 py-2 mb-4" />
                <input type="number" placeholder="Total Payment" className="w-full border rounded px-4 py-2 mb-4" />
                <input type="number" placeholder="Advance payment" className="w-full border rounded px-4 py-2 mb-4" />
                <input type="number" placeholder="Price per Head" className="w-full border rounded px-4 py-2 mb-4" />
              </div>
              <div className="col-span-2 flex justify-center mt-4">
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-2 rounded shadow">Update Event Details</button>
              </div>
            </form>
          </div>
        );
      case "status":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-center">Status</h2>
            <p className="text-center text-gray-700">Check your event status here.</p>
          </div>
        );
      case "payment":
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
            <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-center">Payment</h2>
            <p className="text-center text-gray-700">Manage your payments here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#23364E] flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-[#23364E] text-white py-8 px-4 flex flex-col gap-2 shadow-lg">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-3 rounded text-left font-medium transition-colors duration-200 mb-2 ${activeTab === tab.key ? "bg-white/20" : "hover:bg-white/10"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {/* Optionally add icons here */}
              {tab.label}
            </button>
          ))}
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mini-header profile bar */}
          <div className="w-full flex justify-end items-center bg-[#23364E] px-8 py-4" style={{ minHeight: '64px' }}>
            <div className="flex items-center gap-3">
              <Image src="/avatar1.png" alt="User"
              width={40} 
              height={40}
               className="h-10 w-10 rounded-full border-2 border-white" />
              <span className="text-white font-semibold">John Doe</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
          <main className="flex-1 bg-[#F8F9FA] flex flex-col items-center justify-center py-12 px-4">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizersDashboard;
