"use client";
import React, { useState } from "react";
import ViewEvents from "./ViewEvents";
import MyEvents from "./MyEvents";
import PocketTab from "./PocketTab";
<<<<<<< HEAD
import Header from "../components/Header/Header";
=======
import Header from "../components/header/header";
>>>>>>> 7e92d227ae97a43368f963625d0168584731c60c
import { useProfile } from "../contexts/ProfileContext";

const sidebarItems = [
  { name: "View Events", icon: <img src="/view-event.svg" alt="View Events" className="w-5 h-5" /> },
  { name: "My Events", icon: <img src="/my-event.svg" alt="My Events" className="w-5 h-5" /> },
  { name: "Pocket", icon: <img src="/poket.svg" alt="Pocket" className="w-5 h-5" /> },
  { name: "Profile", icon: <img src="/avatar1.png" alt="Profile" className="w-5 h-5 rounded-full" /> }
];

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("View Events");
  const { profile } = useProfile();

  const renderTabContent = () => {
    switch (activeTab) {
      case "View Events":
        return <ViewEvents />;
      case "My Events":
        return <MyEvents />;
      case "Pocket":
        return <PocketTab />;
      case "Profile":
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow">Profile component placeholder</div>
          </div>
        );
      default:
        return <ViewEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      
      <div className="flex flex-col md:flex-row">
        {/* Mobile Navigation */}
        <div className="md:hidden bg-[#23364E] p-4">
          <nav className="flex gap-2 overflow-x-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === item.name
                    ? "bg-[#1A2A3A] text-white border-b-2 border-[#2DBE60]"
                    : "text-white hover:bg-[#22364A] hover:text-[#2DBE60]"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex bg-[#23364E] w-64 min-h-screen flex-shrink-0 flex-col pt-8">
          <nav className="flex-1 flex flex-col gap-2 px-4">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all border-l-4 ${
                  activeTab === item.name
                    ? "bg-[#1A2A3A] text-white border-[#2DBE60] shadow"
                    : "text-white border-transparent hover:bg-[#22364A] hover:text-[#2DBE60]"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 px-4 md:px-10 py-4 md:py-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}