"use client";
import React, { useState, useEffect } from "react";
import ViewEvents from "./ViewEvents";
import MyEvents from "./MyEvents";
import PocketTab from "./PocketTab";
import Header from "../components/Header/Header";
import ProfileCard from "../components/ProfileCard";
import { useProfile } from "../contexts/ProfileContext";

interface SupplierProfile {
  fullName: string;
  email: string;
  phone: string;
  services: string[];
  createdAt: string;
}

const SupplierProfileTab = () => {
  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<SupplierProfile>>({});

  const availableServices = ['catering', 'decoration', 'photography', 'music', 'venue', 'transportation', 'flowers', 'security'];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.users.getProfile();
      if (result.success) {
        setProfile(result.data);
        setEditData(result.data);
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
      const result = await api.users.updateProfile(editData);
      if (result.success) {
        setProfile(result.data);
        setEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleServiceToggle = (service: string) => {
    const services = editData.services?.includes(service)
      ? editData.services.filter((s: string) => s !== service)
      : [...(editData.services || []), service];
    setEditData({...editData, services});
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
              <p className="text-gray-600">Service Supplier</p>
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
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Services</label>
              {editing ? (
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {availableServices.map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.services?.includes(service) || false}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm capitalize">{service}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mt-1 flex flex-wrap gap-2">
                  {profile.services?.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm capitalize">
                      {service}
                    </span>
                  )) || <span className="text-gray-500">No services specified</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sidebarItems = [
  { name: "View Events", icon: <img src="/view-event.svg" alt="View Events" className="w-5 h-5" /> },
  { name: "My Events", icon: <img src="/my-event.svg" alt="My Events" className="w-5 h-5" /> },
  { name: "Pocket", icon: <img src="/poket.svg" alt="Pocket" className="w-5 h-5" /> },
  { name: "Profile", icon: <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center"><svg className="w-3 h-3 text-gray-800" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg></div> }
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
        return <SupplierProfileTab />;
      default:
        return <ViewEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Navigation */}
        <div className="lg:hidden bg-gradient-to-r from-[#23364E] to-[#1a2b3d] p-4 shadow-xl sticky top-0 z-40">
          <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === item.name
                    ? 'bg-white text-[#23364E] shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex bg-gradient-to-b from-[#23364E] to-[#1a2b3d] w-72 min-h-screen flex-shrink-0 flex-col pt-8 shadow-2xl">
          {/* Profile Section */}
          <div className="px-6 mb-8">
            <div className="bg-white bg-opacity-10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2DBE60] to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {profile?.fullName?.charAt(0) || 'S'}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{profile?.fullName || 'Supplier'}</h3>
                  <p className="text-gray-300 text-xs">Service Provider</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-2 px-6">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group ${
                  activeTab === item.name
                    ? "bg-gradient-to-r from-[#2DBE60] to-green-600 text-white shadow-lg scale-105"
                    : "text-white hover:bg-white hover:bg-opacity-10 hover:text-[#2DBE60]"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <div className={`transition-all duration-300 ${
                  activeTab === item.name ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </div>
                <span className="font-semibold">{item.name}</span>
                {activeTab === item.name && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-screen">
          <div className="max-w-full">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}