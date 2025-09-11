// MyEvents.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  eventName: string;
  eventType: string;
  location: string;
  eventDate: string;
  budget: number;
  suppliersCount: number;
  numberOfSuppliers: number;
  createdAt: string;
}

interface MyEventsProps {
  onStartNewEvent?: () => void;
  onEditEvent?: (event: any) => void;
  loading?: boolean;
}

const MyEvents: React.FC<MyEventsProps> = ({ onStartNewEvent, onEditEvent, loading: parentLoading }) => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!parentLoading) {
      loadEvents();
    }
  }, [parentLoading]);

  const loadEvents = async () => {
    setLoading(true);
    setLoading(true);
    setError('');
    try {
      const { api } = await import('../../services/completeApi');
      const result = await api.organizer.getEvents();
      setEvents((result.data as Event[]) || []);
    } catch (error: any) {
      setError(error.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const { api } = await import('../../services/completeApi');
      await api.organizer.deleteEvent(eventId);
      setEvents(events.filter(e => e.id !== eventId));
      setError('');
    } catch (error: any) {
      setError(error.message || 'Failed to delete event');
    }
  };

  const handleNewEvent = () => {
    if (onStartNewEvent) {
      onStartNewEvent();
    } else {
      router.push("/event-organizers/form");
    }
  };

  if (loading || parentLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-2xl mx-auto mt-8 sm:mt-16 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
        <img src="/event-posted.svg" alt="No Event" className="w-20 h-20 sm:w-32 sm:h-32 mb-4 sm:mb-6" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-1 sm:mb-2 text-center">No Events Created</h2>
        <p className="text-gray-500 mb-4 sm:mb-6 text-center text-sm sm:text-base">You have not created any events yet. Start by adding a new event.</p>
        <button
          className="bg-[#2DBE60] hover:bg-[#249e4e] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded shadow transition w-full sm:w-auto"
          onClick={handleNewEvent}
        >
          Create New Event
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2DBE60]">My Events ({events.length})</h2>
        <button
          onClick={handleNewEvent}
          className="bg-[#2DBE60] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Create New Event
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {events.map((event, index) => (
          <div key={event.id || `event-${index}`} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 truncate pr-2">{event.eventName}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium whitespace-nowrap">{event.eventType}</span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-800 truncate">{event.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-800">{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              {event.budget > 0 && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-800 font-semibold">₹{event.budget?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{event.numberOfSuppliers || 0}</div>
                  <div className="text-xs text-gray-600">Needed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{event.suppliersCount || 0}</div>
                  <div className="text-xs text-gray-600">Booked</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => onEditEvent?.(event)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onEditEvent?.({ ...event, viewSuppliers: true })}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Suppliers
                </button>
              </div>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Delete Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;