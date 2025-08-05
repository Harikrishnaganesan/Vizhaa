"use client";
import React, { useState } from "react";
import Header from "../../app/components/Header";
import MyEvents from "./MyEvents";
import EventForm from "./EventForm";
import StatusTab from "./StatusTab";
import PaymentTab from "./PaymentTab";
import Image from "next/image";

const sidebarItems = [
  { key: "events", label: "My Events", icon: <img src="/view-event.svg" alt="My Events" className="w-5 h-5" /> },
  { key: "form", label: "Form", icon: <img src="/my-event.svg" alt="Form" className="w-5 h-5" /> },
  { key: "status", label: "Status", icon: <img src="/status.svg" alt="Status" className="w-5 h-5" /> },
  { key: "payment", label: "Payment", icon: <img src="/poket.svg" alt="Payment" className="w-5 h-5" /> },
];

const EventOrganizersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("events");

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <MyEvents />;
      case "form":
        return <EventForm />;
      case "status":
        return <StatusTab />;
      case "payment":
        return <PaymentTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#23364E] flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar - Updated to match Supplier Dashboard */}
        <aside className="w-56 bg-[#23364E] text-white py-8 px-4 flex flex-col gap-2 shadow-lg min-h-full">
          <div className="flex items-center gap-2 mb-6 px-3">
            <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
            <span className="font-semibold text-lg">Dash Board</span>
          </div>
          {sidebarItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all border-l-4 ${
                activeTab === item.key
                  ? "bg-[#1A2A3A] text-white border-[#2DBE60] shadow"
                  : "text-white border-transparent hover:bg-[#22364A] hover:text-[#2DBE60]"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
              <span className="text-base">{item.label}</span>
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
          <main className="flex-1 bg-[#F8F9FA] flex flex-col items-center py-12 px-4">
            {/* Tab content for active navigation */}
            {activeTab && renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizersDashboard;