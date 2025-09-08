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
      const { supplierAPI } = await import('../../../services/api.js');
      const result = await supplierAPI.getAvailableEvents();
      setEvents(result.data || []);
      setError('');
    } catch (error: any) {
      setError(error.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = async (eventId: string) => {
    if (!bookingData.services.length || !bookingData.proposedPrice) {
      alert('Please select services and enter proposed price');
      return;
    }

    try {
      const { supplierAPI } = await import('../../../services/api.js');
      await supplierAPI.bookEvent(eventId, bookingData.message);
      
      setBookingEvent(null);
      setBookingData({ services: [], proposedPrice: "", message: "" });
      alert('Event booked successfully!');
      loadEvents();
    } catch (error: any) {
      alert('Failed to book event: ' + error.message);
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">{event.eventName}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.eventType}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Organizer:</span>
                <span className="text-gray-800 font-medium">{event.organizer.fullName}</span>
              </div>
              {event.organizer.companyName && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Company:</span>
                  <span className="text-gray-800">{event.organizer.companyName}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{event.organizer.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-800">{event.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Budget:</span>
                <span className="text-gray-800 font-semibold">₹{event.budget?.toLocaleString()}</span>
              </div>
            </div>
            
            {event.isBooked ? (
              <div className="text-center">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  event.bookingStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                  event.bookingStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.bookingStatus || 'Booked'}
                </span>
              </div>
            ) : (
              <button
                onClick={() => setBookingEvent(event.id)}
                className="w-full bg-[#2DBE60] hover:bg-green-600 text-white py-2 px-4 rounded font-medium"
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