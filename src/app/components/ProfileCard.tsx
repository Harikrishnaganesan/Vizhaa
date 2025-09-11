"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Profile {
  userType: 'organizer' | 'supplier';
  fullName: string;
  email: string;
  phone: string;
  services?: string[];
  isVerified: boolean;
  createdAt?: string;
}

interface FormData {
  fullName: string;
  email: string;
  services: string[];
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    services: []
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/users/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setFormData({
          fullName: result.data.fullName,
          email: result.data.email,
          services: result.data.services || []
        });
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="h-20 w-20 rounded-full mx-auto mb-4 border-4 border-blue-100 bg-blue-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            profile.userType === 'organizer' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {profile.userType === 'organizer' ? 'Event Organizer' : 'Supplier'}
          </span>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
            <div className="flex flex-wrap gap-2">
              {['catering', 'decoration', 'photography', 'music', 'venue', 'transportation'].map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => {
                    const services = formData.services.includes(service)
                      ? formData.services.filter(s => s !== service)
                      : [...formData.services, service];
                    setFormData({...formData, services});
                  }}
                  className={`px-2 py-1 text-xs rounded-full ${
                    formData.services.includes(service)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-gray-900 font-medium">{profile.fullName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{profile.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900">{profile.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Services</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.services?.map((service: string) => (
                <span key={service} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Status</label>
            <span className={`px-2 py-1 text-xs rounded-full ${
              profile.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {profile.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
          {profile.createdAt && (
            <div>
              <label className="block text-sm font-medium text-gray-500">Member Since</label>
              <p className="text-gray-900">{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}