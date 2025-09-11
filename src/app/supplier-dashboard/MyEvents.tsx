import React, { useEffect, useState } from "react";

const MyEvents: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyBookings();
  }, []);

  const loadMyBookings = async () => {
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.supplier.getBookings();
      
      if (result.success) {
        setBookings((result.data as any[]) || []);
      } else {
        console.error('Failed to load bookings:', result.message);
        setBookings([]);
      }
    } catch (error) {
      console.error('Failed to load bookings:', error);
      setBookings([]);
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
          <div key={booking.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 mb-6 transform hover:-translate-y-1">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section: Date & Time */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#2DBE60] to-green-600 rounded-2xl p-6 min-w-[140px] text-white shadow-lg">
                <div className="text-xs font-semibold mb-2 opacity-90">{new Date(booking.event.eventDate).toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
                <div className="text-4xl font-bold mb-2">{new Date(booking.event.eventDate).getDate()}</div>
                <div className="text-xs font-semibold mb-2 opacity-90">{new Date(booking.event.eventDate).toLocaleString('en-US', { weekday: 'long' }).toUpperCase()}</div>
                <div className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">{booking.event.eventTime}</div>
              </div>
              
              {/* Right Section: Event Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.event.eventName}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-gray-700 font-semibold">{booking.event.organizer.fullName}</span>
                        </div>
                        {booking.event.organizer.companyName && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-gray-600">{booking.event.organizer.companyName}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span className="text-gray-700">{booking.event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-3">Booking Details</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600 text-sm">Services:</span>
                          <p className="text-gray-800 font-medium">{booking.services?.join(', ') || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Proposed Price:</span>
                          <p className="text-gray-800 font-bold text-lg">₹{booking.proposedPrice?.toLocaleString() || '0'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-sm">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
          <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6 opacity-80">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section: Date & Time */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-6 min-w-[140px] text-white shadow-lg">
                <div className="text-xs font-semibold mb-2 opacity-90">{new Date(booking.event.eventDate).toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
                <div className="text-4xl font-bold mb-2">{new Date(booking.event.eventDate).getDate()}</div>
                <div className="text-xs font-semibold mb-2 opacity-90">{new Date(booking.event.eventDate).toLocaleString('en-US', { weekday: 'long' }).toUpperCase()}</div>
                <div className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">{booking.event.eventTime}</div>
              </div>
              
              {/* Right Section: Event Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{booking.event.eventName}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-gray-600 font-semibold">{booking.event.organizer.fullName}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span className="text-gray-600">{booking.event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-600 mb-3">Final Details</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500 text-sm">Services:</span>
                          <p className="text-gray-700 font-medium">{booking.services?.join(', ') || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Final Price:</span>
                          <p className="text-gray-700 font-bold text-lg">₹{booking.proposedPrice?.toLocaleString() || '0'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">Status:</span>
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyEvents;
