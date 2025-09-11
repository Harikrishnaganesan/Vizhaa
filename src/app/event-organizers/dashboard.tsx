// dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import MyEvents from "./MyEvents";
import EventForm from "./EventForm";
import StatusTab from "./StatusTab";
import Header from "../components/Header/Header";
import { useProfile } from "../contexts/ProfileContext";
import Image from "next/image";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  createdAt: string;
}

const ProfileTab = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.organizer.getProfile();
      if (result.success) {
        setProfile(result.data as ProfileData);
        setEditData(result.data as ProfileData);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.organizer.updateProfile(editData);
      if (result.success) {
        setProfile(result.data as ProfileData);
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center py-8">Failed to load profile</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Save
            </button>
            <button onClick={() => { setEditing(false); setEditData(profile); }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">{profile.fullName?.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile.fullName}</h3>
              <p className="text-gray-600">Event Organizer</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  value={editData.fullName || ''}
                  onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              {editing ? (
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              {editing ? (
                <input
                  type="tel"
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              {editing ? (
                <input
                  type="text"
                  value={editData.companyName || ''}
                  onChange={(e) => setEditData({...editData, companyName: e.target.value})}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{profile.companyName || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sidebarItems = [
  { key: "events", label: "My Events", icon: <img src="/view-event.svg" alt="My Events" className="w-5 h-5" /> },
  { key: "form", label: "Form", icon: <img src="/my-event.svg" alt="Form" className="w-5 h-5" /> },
  { key: "status", label: "Status", icon: <img src="/status.svg" alt="Status" className="w-5 h-5" /> },
  { key: "payment", label: "Payment", icon: <img src="/poket.svg" alt="Payment" className="w-5 h-5" /> },
  { key: "profile", label: "Profile", icon: <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center"><svg className="w-3 h-3 text-gray-800" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg></div> },
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
  viewSuppliers?: boolean;
}

const EventOrganizersDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("events");
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { api } = await import('../../services/completeApi');
      
      // Load events from API
      const eventsData = await api.organizer.getEvents();
      setEvents((eventsData.data as EventData[]) || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewEvent = () => {
    setEditingEvent(undefined);
    setActiveTab("form");
  };

  const handleEditEvent = (event: EventData) => {
    if (event.viewSuppliers) {
      setActiveTab("status");
    } else {
      setEditingEvent(event);
      setActiveTab("form");
    }
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
      case "profile":
        return <ProfileTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Mobile Navigation */}
        <div className="md:hidden bg-[#23364E] p-4 shadow-lg">
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {sidebarItems.map(item => (
              <button
                key={item.key}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                  activeTab === item.key
                    ? "bg-[#2DBE60] text-white shadow-lg"
                    : "text-white hover:bg-[#22364A] hover:text-[#2DBE60]"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-[#23364E] text-white py-8 px-6 flex-col gap-3 shadow-xl min-h-full">
          <div className="flex items-center gap-3 mb-8 px-4 py-3 bg-[#1A2A3A] rounded-xl">
            <img src="/dashboard.svg" alt="Dashboard" className="w-6 h-6" />
            <span className="font-bold text-xl">Dashboard</span>
          </div>
          {sidebarItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === item.key
                  ? "bg-[#2DBE60] text-white shadow-lg"
                  : "text-white hover:bg-[#22364A] hover:text-[#2DBE60]"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
              <span className="text-base font-semibold">{item.label}</span>
            </button>
          ))}
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-[#F8F9FA] py-6 md:py-12 px-4">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizersDashboard;