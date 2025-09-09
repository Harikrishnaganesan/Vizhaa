// EventForm.tsx - Create/Edit Event Form
"use client";
import React, { useState } from "react";
import { useEvents } from "../hooks/useAPI";

interface EventFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData, isEdit = false }) => {
  const [formData, setFormData] = useState({
    eventName: initialData?.eventName || "",
    eventType: initialData?.eventType || "",
    location: initialData?.location || "",
    eventDate: initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : "",
    eventTime: initialData?.eventTime || "",
    budget: initialData?.budget || "",
    numberOfSuppliers: initialData?.numberOfSuppliers || "",
    servicesNeeded: initialData?.servicesNeeded || [],
    notes: initialData?.notes || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const eventTypes = ["Wedding", "Corporate", "Birthday", "Anniversary", "Conference", "Other"];
  const availableServices = ["Breakfast", "Dinner", "Snacks", "Cocktails", "Lunch", "Mini Tifin", "High Tea", "Desserts"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    const services = (formData.servicesNeeded || []).includes(service)
      ? (formData.servicesNeeded || []).filter((s: string) => s !== service)
      : [...(formData.servicesNeeded || []), service];
    setFormData({ ...formData, servicesNeeded: services });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { organizerAPI } = await import('/services/api.js');
      
      const eventData = {
        ...formData,
        budget: formData.budget ? parseInt(formData.budget) : 0,
        numberOfSuppliers: parseInt(formData.numberOfSuppliers),
        eventDate: new Date(formData.eventDate).toISOString()
      };
      
      if (isEdit && initialData?.id) {
        await organizerAPI.updateEvent(initialData.id, eventData);
        setSuccess('Event updated successfully!');
      } else {
        await organizerAPI.createEvent(eventData);
        setSuccess('Event created successfully!');
      }
      
      setTimeout(() => onSubmit(formData), 1000);
    } catch (error: any) {
      setError(error.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2DBE60] mb-2">
          {isEdit ? 'Edit Event' : 'Create New Event'}
        </h2>
        <p className="text-gray-600">Fill in the details to {isEdit ? 'update your' : 'create a new'} event</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Event Name</label>
            <input
              name="eventName"
              type="text"
              placeholder="Enter your event name (e.g., Annual Conference 2024)"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            >
              <option value="">Choose event type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              name="location"
              type="text"
              placeholder="Enter event location (e.g., Mumbai Convention Center)"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Event Date</label>
            <input
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Event Time</label>
            <input
              name="eventTime"
              type="time"
              value={formData.eventTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Budget</label>
            <input
              name="budget"
              type="number"
              placeholder="Enter budget amount (e.g., 50000)"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Number of Suppliers</label>
            <input
              name="numberOfSuppliers"
              type="number"
              placeholder="How many suppliers needed? (e.g., 5)"
              value={formData.numberOfSuppliers}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
              required
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-6">
          <label className="block text-lg font-semibold text-gray-700 mb-4">Services Needed</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableServices.map(service => (
              <label key={service} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#2DBE60] transition-all duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(formData.servicesNeeded || []).includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded border-gray-300 text-[#2DBE60] focus:ring-[#2DBE60] w-5 h-5"
                />
                <span className="text-sm font-medium text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Event Notes/Description</label>
          <textarea
            name="notes"
            placeholder="Add any additional details about your event, special requirements, or instructions for suppliers..."
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DBE60] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
          />
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#2DBE60] to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-12 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              isEdit ? 'Update Event' : 'Create Event'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;