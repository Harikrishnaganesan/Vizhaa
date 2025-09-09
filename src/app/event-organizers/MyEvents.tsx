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
      const { organizerAPI } = await import('/services/api.js');
      const result = await organizerAPI.getEvents();
      setEvents(result.data || []);
    } catch (error: any) {
      setError(error.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const { organizerAPI } = await import('/services/api.js');
      await organizerAPI.deleteEvent(eventId);
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={event.id || `event-${index}`} className="bg-white rounded-lg shadow-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 truncate">{event.eventName}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.eventType}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-800 truncate ml-2">{event.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">{new Date(event.eventDate).toLocaleDateString()}</span>
              </div>
              {event.budget > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Budget:</span>
                  <span className="text-gray-800">₹{event.budget?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Suppliers Needed:</span>
                <span className="text-blue-600 font-semibold">{event.numberOfSuppliers || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Suppliers Booked:</span>
                <span className="text-green-600 font-semibold">{event.suppliersCount || 0}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onEditEvent?.(event)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => router.push(`/event-organizers/suppliers/${event.id}`)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded text-sm font-medium"
              >
                Suppliers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;