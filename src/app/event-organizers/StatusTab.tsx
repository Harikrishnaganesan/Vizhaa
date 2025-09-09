import React, { useState, useEffect } from "react";
import Image from "next/image";

interface StatusTabProps {
  events?: any[];
}

const StatusTab: React.FC<StatusTabProps> = ({ events }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { organizerAPI } = await import('../../../services/api.js');
      const result = await organizerAPI.getBookings();
      console.log('Bookings result:', result);
      
      // Handle the response format from backend
      if (result.success && result.data) {
        const bookingsData = result.data.allBookings || result.data.bookingsByEvent || result.data || [];
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string, message = '') => {
    try {
      const { organizerAPI } = await import('../../../services/api.js');
      const result = await organizerAPI.updateBookingStatus(bookingId, status, message);
      
      if (result.success) {
        // Reload bookings
        loadBookings();
      } else {
        console.error('Failed to update booking status:', result.message);
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading supplier bookings...</div>
      </div>
    );
  }
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8 text-center">
        <img src="/status.svg" alt="No Bookings" className="w-32 h-32 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Supplier Bookings</h2>
        <p className="text-gray-500">No suppliers have booked your events yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#2DBE60] text-2xl font-bold">Supplier Bookings</h2>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-gray-600 font-semibold">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="10" cy="10" r="8" fill="#23364E"/><path fill="#fff" d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-1.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            Total Bookings
          </span>
          <span className="text-gray-600 font-semibold">{bookings.length}</span>
        </div>
      </div>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="border rounded-lg p-6 flex flex-col lg:flex-row lg:items-center gap-6 bg-gray-50">
            <div className="flex-shrink-0">
              <Image src="/avatar1.png" alt="Profile" width={100} height={100} className="rounded-lg object-cover w-[100px] h-[100px]" />
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{booking.supplierId?.fullName || 'Unknown Supplier'}</h3>
                  {booking.supplierId?.businessName && (
                    <span className="text-gray-500 text-sm">{booking.supplierId.businessName}</span>
                  )}
                  <div className="mt-2 text-gray-600 text-sm">Phone: {booking.supplierId?.phone || 'N/A'}</div>
                  <div className="text-gray-600 text-sm">Email: {booking.supplierId?.email || 'N/A'}</div>
                  <div className="text-gray-600 text-sm">Event: <span className="font-semibold">{booking.eventId?.eventName || 'N/A'}</span></div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Services:</span> {booking.services?.length > 0 ? booking.services.join(', ') : 'No services specified'}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Proposed Price:</span> ₹{booking.proposedPrice > 0 ? booking.proposedPrice.toLocaleString() : 'Not specified'}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm font-semibold">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  {booking.message && (
                    <div className="text-gray-600 text-sm">
                      <span className="font-semibold">Message:</span> {booking.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {booking.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleUpdateBookingStatus(booking._id, 'Confirmed')}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleUpdateBookingStatus(booking._id, 'Rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded text-sm flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M21 15.46l-5.27-2.11a.75.75 0 0 0-.73.09l-2.11 1.58a.75.75 0 0 1-.88 0l-2.11-1.58a.75.75 0 0 0-.73-.09L3 15.46V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.54z"/><path fill="#fff" d="M21 8.24V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.24l9 3.6 9-3.6z"/></svg>
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTab;
