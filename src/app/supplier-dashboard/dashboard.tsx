"use client";
import React, { useState } from "react";
import ViewEvents from "./ViewEvents";
import MyEvents from "./MyEvents";
import PocketTab from "./PocketTab";

const sidebarItems = [

  { name: "View Events", icon: <img src="/view-event.svg" alt="View Events" className="w-5 h-5" /> },
  { name: "My Events", icon: <img src="/my-event.svg" alt="My Events" className="w-5 h-5" /> },
  { name: "Pocket", icon: <img src="/poket.svg" alt="Pocket" className="w-5 h-5" /> }
];

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("View Events");
  const [userData, setUserData] = useState<{name: string; email: string} | null>(null);

  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const { supplierAPI } = await import('../../../services/api.js');
        const dashboardData = await supplierAPI.getDashboard();
        setUserData({
          name: dashboardData.supplier?.fullName || 'User',
          email: dashboardData.supplier?.email || ''
        });
      } catch (error) {
        console.error('Failed to load user data:', error);
        setUserData({ name: 'User', email: '' });
      }
    };
    
    loadUserData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "View Events":
        return <ViewEvents />;
      case "My Events":
        return <MyEvents />;
      case "Pocket":
        return <PocketTab />;
      default:
        return <ViewEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top Bar - Supplier Dashboard */}
      <div className="bg-[#23364E] px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-white text-lg font-semibold">
            <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
            Dash Board
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src="/avatar1.png" alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
          <span className="text-white font-medium">{userData?.name || 'Loading...'}</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-[#23364E] w-64 min-h-screen flex-shrink-0 flex flex-col pt-8">
          
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
        <main className="flex-1 px-10 py-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
