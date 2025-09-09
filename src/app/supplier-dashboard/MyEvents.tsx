import React, { useEffect, useState } from "react";

const MyEvents: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyBookings();
  }, []);

  const loadMyBookings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/supplier/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      setBookings(result.data || []);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentBookings = bookings.filter(booking => new Date(booking.event.eventDate) >= new Date());
  const pastBookings = bookings.filter(booking => new Date(booking.event.eventDate) < new Date());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[#2DBE60] text-lg font-bold mb-6">CURRENT BOOKINGS ({currentBookings.length})</h2>
      {currentBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">No current bookings.</div>
      ) : (
        currentBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 flex gap-6 items-center max-w-4xl mb-8">
            {/* Left Section: Date & Time */}
            <div className="flex flex-col items-center justify-between bg-[#E6F9ED] rounded-lg p-4 min-w-[120px] h-full">
              <div className="text-xs text-gray-500 mb-2">{new Date(booking.event.eventDate).toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
              <div className="text-3xl font-bold text-[#2DBE60]">{new Date(booking.event.eventDate).getDate()}</div>
              <div className="text-xs text-gray-500 mb-2">{new Date(booking.event.eventDate).toLocaleString('en-US', { weekday: 'long' }).toUpperCase()}</div>
              <div className="text-xs text-gray-500 mb-2">{booking.event.eventTime}</div>
            </div>
            {/* Right Section: Event Details */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1">Event Details</div>
                <div className="text-gray-700 font-bold">{booking.event.eventName}</div>
                <div className="text-gray-700">Organizer: <span className="font-bold">{booking.event.organizer.fullName}</span></div>
                {booking.event.organizer.companyName && (
                  <div className="text-gray-700">Company: <span className="font-bold">{booking.event.organizer.companyName}</span></div>
                )}
                <div className="text-gray-700">Date: <span className="font-bold">{new Date(booking.event.eventDate).toLocaleDateString()}</span></div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Booking Details</div>
                <div className="text-gray-700">Location: <span className="font-bold">{booking.event.location}</span></div>
                <div className="text-gray-700">Services: <span className="font-bold">{booking.services.join(', ')}</span></div>
                <div className="text-gray-700">Proposed Price: <span className="font-bold">₹{booking.proposedPrice.toLocaleString()}</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Status:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <h2 className="text-[#2DBE60] text-lg font-bold mb-6">PAST BOOKINGS ({pastBookings.length})</h2>
      {pastBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">No past bookings.</div>
      ) : (
        pastBookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6 flex gap-6 items-center max-w-4xl mb-8 opacity-75">
            {/* Left Section: Date & Time */}
            <div className="flex flex-col items-center justify-between bg-gray-100 rounded-lg p-4 min-w-[120px] h-full">
              <div className="text-xs text-gray-500 mb-2">{new Date(booking.event.eventDate).toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
              <div className="text-3xl font-bold text-gray-600">{new Date(booking.event.eventDate).getDate()}</div>
              <div className="text-xs text-gray-500 mb-2">{new Date(booking.event.eventDate).toLocaleString('en-US', { weekday: 'long' }).toUpperCase()}</div>
              <div className="text-xs text-gray-500 mb-2">{booking.event.eventTime}</div>
            </div>
            {/* Right Section: Event Details */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1">Event Details</div>
                <div className="text-gray-700 font-bold">{booking.event.eventName}</div>
                <div className="text-gray-700">Organizer: <span className="font-bold">{booking.event.organizer.fullName}</span></div>
                <div className="text-gray-700">Date: <span className="font-bold">{new Date(booking.event.eventDate).toLocaleDateString()}</span></div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Booking Details</div>
                <div className="text-gray-700">Location: <span className="font-bold">{booking.event.location}</span></div>
                <div className="text-gray-700">Services: <span className="font-bold">{booking.services.join(', ')}</span></div>
                <div className="text-gray-700">Final Price: <span className="font-bold">₹{booking.proposedPrice.toLocaleString()}</span></div>
                <div className="text-gray-700">Status: <span className="font-bold text-gray-600">Completed</span></div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyEvents;
