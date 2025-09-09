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
    <div className="w-full max-w-7xl mx-auto mt-8">
      <div className="bg-gradient-to-r from-[#2DBE60] to-green-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Supplier Bookings</h2>
            <p className="text-green-100 text-lg">Manage your event supplier applications</p>
          </div>
          <div className="mt-6 md:mt-0 bg-white bg-opacity-20 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{bookings.length}</div>
                <div className="text-green-100 font-medium">Total Applications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image src="/avatar1.png" alt="Profile" width={80} height={80} className="rounded-xl object-cover w-20 h-20 border-4 border-white shadow-md" />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                      booking.status === 'Approved' ? 'bg-green-500' :
                      booking.status === 'Rejected' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{booking.supplierId?.fullName || 'Unknown Supplier'}</h3>
                      {booking.supplierId?.businessName && (
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                          {booking.supplierId.businessName}
                        </div>
                      )}
                      <div className="text-gray-600 font-medium">Event: <span className="text-indigo-600 font-semibold">{booking.eventId?.eventName || 'N/A'}</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                        booking.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                        booking.status === 'Rejected' ? 'bg-red-100 text-red-700 border border-red-200' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="#3B82F6" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Contact Info</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">📞 {booking.supplierId?.phone || 'N/A'}</div>
                    <div className="text-gray-600">✉️ {booking.supplierId?.email || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="#10B981" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Services</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.services?.length > 0 ? booking.services.join(', ') : 'No services specified'}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="#F59E0B" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800">Proposed Price</h4>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    ₹{booking.proposedPrice > 0 ? booking.proposedPrice.toLocaleString() : 'Not specified'}
                  </div>
                </div>
              </div>
              
              {booking.message && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center mt-0.5">
                      <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-blue-800 mb-1">Message from Supplier</h5>
                      <p className="text-blue-700 text-sm">{booking.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                {booking.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleUpdateBookingStatus(booking._id, 'Confirmed')}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Approve
                    </button>
                    <button 
                      onClick={() => handleUpdateBookingStatus(booking._id, 'Rejected')}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Reject
                    </button>
                  </>
                )}
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
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
