// dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import MyEvents from "./MyEvents";
import EventForm from "./EventForm";
import StatusTab from "./StatusTab";

import Image from "next/image";
// Removed unused imports

const sidebarItems = [
  { key: "events", label: "My Events", icon: <img src="/view-event.svg" alt="My Events" className="w-5 h-5" /> },
  { key: "form", label: "Form", icon: <img src="/my-event.svg" alt="Form" className="w-5 h-5" /> },
  { key: "status", label: "Status", icon: <img src="/status.svg" alt="Status" className="w-5 h-5" /> },
  { key: "payment", label: "Payment", icon: <img src="/poket.svg" alt="Payment" className="w-5 h-5" /> },
];

export interface EventData {
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



const EventOrganizersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("events");
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventData | undefined>(undefined);
  const [userData, setUserData] = useState<{name: string; email: string} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { organizerAPI } = await import('../../../services/api.js');
      
      // Load user data and events from API
      const [dashboardData, eventsData] = await Promise.all([
        organizerAPI.getDashboard(),
        organizerAPI.getEvents()
      ]);
      
      setUserData({
        name: dashboardData.organizer?.fullName || 'User',
        email: dashboardData.organizer?.email || ''
      });
      
      setEvents(eventsData.data || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setUserData({ name: 'User', email: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewEvent = () => {
    setEditingEvent(undefined);
    setActiveTab("form");
  };

  const handleEditEvent = (event: EventData) => {
    setEditingEvent(event);
    setActiveTab("form");
  };

  const handleFormSubmit = async () => {
    // Reload events after form submission
    await loadDashboardData();
    setActiveTab("events");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <MyEvents 
                 onStartNewEvent={handleStartNewEvent}
                 onEditEvent={handleEditEvent}
                 loading={loading}
               />;
      case "form":
        return <EventForm 
                 onSubmit={handleFormSubmit}
                 initialData={editingEvent}
                 isEdit={!!editingEvent}
               />;
      case "status":
        return <StatusTab events={events} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#23364E] flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#23364E] p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/dashboard.svg" alt="Dashboard" className="w-5 h-5" />
          <span className="font-semibold text-lg text-white">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/avatar1.png" alt="User" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-white" />
          <span className="text-white font-semibold text-sm">{userData?.name || 'Loading...'}</span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Mobile Navigation */}
        <div className="md:hidden bg-[#23364E] p-4">
          <nav className="flex gap-2 overflow-x-auto">
            {sidebarItems.map(item => (
              <button
                key={item.key}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === item.key
                    ? "bg-[#1A2A3A] text-white border-b-2 border-[#2DBE60]"
                    : "text-white hover:bg-[#22364A] hover:text-[#2DBE60]"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-56 bg-[#23364E] text-white py-8 px-4 flex-col gap-2 shadow-lg min-h-full">
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
          {/* Desktop header profile bar */}
          <div className="hidden md:flex w-full justify-end items-center bg-[#23364E] px-8 py-4" style={{ minHeight: '64px' }}>
            <div className="flex items-center gap-3">
              <Image src="/avatar1.png" alt="User"
                width={40} 
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white" />
              <span className="text-white font-semibold">{userData?.name || 'Loading...'}</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
          <main className="flex-1 bg-[#F8F9FA] py-6 md:py-12 px-4">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizersDashboard;