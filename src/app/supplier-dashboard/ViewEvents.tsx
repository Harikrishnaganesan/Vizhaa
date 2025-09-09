// ViewEvents.tsx - Supplier sees ALL events from ALL organizers
"use client";
import React, { useState, useEffect } from "react";

const ViewEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingEvent, setBookingEvent] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    services: [] as string[],
    proposedPrice: "",
    message: "",
  });

  const availableServices = ["Catering", "Photography", "Decoration", "Music", "Transportation", "Security"];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { supplierAPI } = await import('/services/api.js');
      const result = await supplierAPI.getAvailableEvents();
      
      if (result.success) {
        setEvents(result.data || []);
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
    if (!bookingData.message.trim()) {
      alert('Please enter a message');
      return;
    }

    try {
      const { supplierAPI } = await import('/services/api.js');
      const result = await supplierAPI.bookEvent(eventId, {
        services: bookingData.services,
        proposedPrice: bookingData.proposedPrice ? parseInt(bookingData.proposedPrice) : 0,
        message: bookingData.message
      });
      
      if (result.success) {
        setBookingEvent(null);
        setBookingData({ services: [], proposedPrice: "", message: "" });
        alert('Application submitted successfully!');
        loadEvents();
      } else {
        alert('Failed to apply: ' + (result.message || 'Unknown error'));
      }
    } catch (error: any) {
      alert('Failed to apply: ' + error.message);
    }
  };

  const handleServiceToggle = (service: string) => {
    const services = bookingData.services.includes(service)
      ? bookingData.services.filter(s => s !== service)
      : [...bookingData.services, service];
    setBookingData({ ...bookingData, services });
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2DBE60]">Available Events ({events.length})</h2>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800 leading-tight">{event.eventName}</h3>
              <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full font-semibold">{event.eventType}</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">Organizer</span>
                </div>
                <p className="text-gray-800 font-medium">{event.organizer?.fullName || 'N/A'}</p>
                {event.organizer?.companyName && (
                  <p className="text-gray-600 text-sm">{event.organizer.companyName}</p>
                )}
                <p className="text-gray-600 text-sm">{event.organizer?.phone || 'N/A'}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-gray-800 text-sm">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-800 text-sm font-medium">{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                {event.budget > 0 && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-gray-800 text-sm font-semibold">₹{event.budget?.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            {event.isBooked ? (
              <div className="text-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  event.bookingStatus === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  event.bookingStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.bookingStatus || 'Booked'}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setBookingEvent(event.id)}
                className="w-full bg-gradient-to-r from-[#2DBE60] to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Event
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Booking Modal */}
      {bookingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Book Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableServices.map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={bookingData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-gray-300 text-green-600"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <input
                type="number"
                placeholder="Proposed Price (₹)"
                value={bookingData.proposedPrice}
                onChange={(e) => setBookingData({ ...bookingData, proposedPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                required
              />
              
              <textarea
                placeholder="Message to organizer (optional)"
                value={bookingData.message}
                onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleBookEvent(bookingEvent)}
                  className="flex-1 bg-[#2DBE60] text-white py-2 px-4 rounded font-medium"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setBookingEvent(null)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded font-medium"
                >
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