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
    eventDate: initialData?.eventDate || "",
    eventTime: initialData?.eventTime || "",
    budget: initialData?.budget || "",
    numberOfSuppliers: initialData?.numberOfSuppliers || "",
    servicesNeeded: initialData?.servicesNeeded || [],
    description: initialData?.description || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const eventTypes = ["Wedding", "Corporate", "Birthday", "Anniversary", "Conference", "Other"];
  const availableServices = ["Catering", "Photography", "Decoration", "Music", "Transportation", "Security"];

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
      const { organizerAPI } = await import('../../../services/api.js');
      
      const eventData = {
        ...formData,
        budget: parseInt(formData.budget),
        numberOfSuppliers: parseInt(formData.numberOfSuppliers)
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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-[#2DBE60] mb-6">
        {isEdit ? 'Edit Event' : 'Create New Event'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="eventName"
            type="text"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <input
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            name="eventTime"
            type="time"
            value={formData.eventTime}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            name="budget"
            type="number"
            placeholder="Budget (₹)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            name="numberOfSuppliers"
            type="number"
            placeholder="Number of Suppliers"
            value={formData.numberOfSuppliers}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Services Needed</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableServices.map(service => (
              <label key={service} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(formData.servicesNeeded || []).includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </div>
        
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2DBE60] text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
        </button>
      </form>
    </div>
  );
};

export default EventForm;