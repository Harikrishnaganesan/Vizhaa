// ViewEvents.tsx - Supplier sees ALL events from ALL organizers
"use client";
import React, { useState, useEffect } from "react";

const ViewEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingEvent, setBookingEvent] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    proposedBudget: "",
    notes: "",
  });

  const availableServices = ["Catering", "Photography", "Decoration", "Music", "Transportation", "Security"];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.events.getAvailable();
      
      if (result.success) {
        setEvents((result.data as any[]) || []);
        setError('');
      } else {
        setError(result.message || 'Failed to load events');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = async (eventId: string) => {
    if (!bookingData.proposedBudget) {
      alert('Please enter a proposed budget');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`https://vizhaa-backend-1.onrender.com/api/supplier/events/${eventId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          proposedBudget: parseInt(bookingData.proposedBudget),
          notes: bookingData.notes || 'Application for event booking'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBookingEvent(null);
        setBookingData({ proposedBudget: "", notes: "" });
        alert('Application submitted successfully!');
        loadEvents();
      } else {
        alert('Failed to apply: ' + (result.message || 'Unknown error'));
      }
    } catch (error: any) {
      alert('Failed to apply: ' + error.message);
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <img src="/event-posted.svg" alt="No Events" className="w-32 h-32 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Events Available</h2>
        <p className="text-gray-500">There are no events available for booking at the moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2DBE60] to-green-600 rounded-3xl shadow-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Available Events</h2>
            <p className="text-green-100 text-lg">Discover and book exciting events</p>
          </div>
          <div className="mt-6 md:mt-0 bg-white bg-opacity-20 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{events.length}</div>
                <div className="text-green-100 font-medium">Events Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={event._id || event.id || index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            {/* Event Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors">{event.eventName}</h3>
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {event.eventType}
                </span>
              </div>
              
              {/* Organizer Info */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Event Organizer</span>
                </div>
                <div className="ml-11">
                  <p className="text-gray-800 font-semibold text-sm">{event.organizer?.fullName || 'N/A'}</p>
                  {event.organizer?.companyName && (
                    <p className="text-blue-600 text-xs font-medium">{event.organizer.companyName}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">📞 {event.organizer?.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Location</p>
                    <p className="text-gray-800 text-sm font-semibold">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Event Date</p>
                    <p className="text-gray-800 text-sm font-semibold">{new Date(event.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {event.budget > 0 && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Budget</p>
                      <p className="text-yellow-700 text-lg font-bold">₹{event.budget?.toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                {event.servicesNeeded && event.servicesNeeded.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">Services Needed</p>
                    <div className="flex flex-wrap gap-1">
                      {event.servicesNeeded.map((service: string, idx: number) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Button */}
              {event.isBooked ? (
                <div className="text-center">
                  <span className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold shadow-sm ${
                    event.bookingStatus === 'Confirmed' ? 'bg-green-100 text-green-700 border border-green-200' :
                    event.bookingStatus === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {event.bookingStatus || 'Booked'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setBookingEvent(event._id || event.id)}
                  className="w-full bg-gradient-to-r from-[#2DBE60] to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Book This Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Booking Modal */}
      {bookingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2DBE60] to-green-600 p-6 rounded-t-2xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Book Event</h3>
                  <p className="text-green-100">Submit your application</p>
                </div>
                <button
                  onClick={() => setBookingEvent(null)}
                  className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Proposed Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                  Proposed Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    placeholder="Enter your proposed budget"
                    value={bookingData.proposedBudget}
                    onChange={(e) => setBookingData({ ...bookingData, proposedBudget: e.target.value })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Notes to Organizer
                </label>
                <textarea
                  placeholder="Tell the organizer about your services and why you're the best choice..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => handleBookEvent(bookingEvent)}
                  className="flex-1 bg-gradient-to-r from-[#2DBE60] to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Submit Application
                </button>
                <button
                  onClick={() => setBookingEvent(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEvents;