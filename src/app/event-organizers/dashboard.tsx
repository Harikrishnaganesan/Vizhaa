// dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import MyEvents from "./MyEvents";
import EventForm from "./EventForm";
import StatusTab from "./StatusTab";
import PaymentTab from "./PaymentTab";
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
  const [currentEvent, setCurrentEvent] = useState<EventData | null>(null);
  const [formData, setFormData] = useState<Partial<EventData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{name: string; email: string} | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Load user data from API
        const { organizerAPI } = await import('../../../services/api.js');
        const dashboardData = await organizerAPI.getDashboard();
        setUserData({
          name: dashboardData.organizer?.fullName || 'User',
          email: dashboardData.organizer?.email || ''
        });
        
        // Load events from API or localStorage as fallback
        const apiEvents = dashboardData.events || [];
        if (apiEvents.length > 0) {
          setEvents(apiEvents);
          const current = apiEvents.find((event: EventData) => !event.isPastEvent);
          setCurrentEvent(current || null);
        } else {
          // Fallback to localStorage
          const storedEvents = localStorage.getItem("events");
          if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            setEvents(parsedEvents);
            const current = parsedEvents.find((event: EventData) => !event.isPastEvent);
            setCurrentEvent(current || null);
          }
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        // Fallback to localStorage on API error
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          setEvents(parsedEvents);
          const current = parsedEvents.find((event: EventData) => !event.isPastEvent);
          setCurrentEvent(current || null);
        }
        setUserData({ name: 'User', email: '' });
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const handleStartNewEvent = () => {
    setActiveTab("form");
  };

  const handleFormSubmit = (data: Partial<EventData>) => {
    setFormData(data);
    setActiveTab("payment");
  };

  const handlePaymentComplete = (paymentStatus: 'Paid' | 'Advance Paid') => {
    const newEvent = {
      ...formData,
      paymentStatus,
      isPastEvent: false
    } as EventData;

    const updatedEvents = events.map(event => ({
      ...event,
      isPastEvent: true
    }));

    updatedEvents.unshift(newEvent);
    setEvents(updatedEvents);
    setCurrentEvent(newEvent);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setActiveTab("events");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return <MyEvents 
                 onStartNewEvent={handleStartNewEvent} 
                 events={events}
                 loading={loading}
               />;
      case "form":
        return <EventForm onSubmit={handleFormSubmit} />;
      case "payment":
        return formData && <PaymentTab 
                 formData={{
                   eventName: formData.eventName ?? "",
                   location: formData.location ?? "",
                   date: formData.date ?? "",
                   time: formData.time ?? ""
                 }} 
                 onPaymentComplete={handlePaymentComplete} 
               />;
      case "status":
        // TODO: Replace with actual supplier data when available
        return <StatusTab currentEvent={currentEvent} suppliers={[]} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#23364E] flex flex-col">
     
      <div className="flex flex-1">
        {/* Sidebar */}
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
              <span className="text-white font-semibold">{userData?.name || 'Loading...'}</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
          <main className="flex-1 bg-[#F8F9FA] flex flex-col items-center py-12 px-4">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizersDashboard;