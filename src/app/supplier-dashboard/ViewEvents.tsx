
import React, { useEffect, useState } from "react";

interface EventData {
  eventName: string;
  location: string;
  numSuppliers: number;
  time: string;
  date: string;
  selectedServices: string;
  selectedDressCode: string;
  paymentStatus: string;
  isPastEvent?: boolean;
}

const ViewEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      // Only show upcoming events (not past)
      setEvents(parsedEvents.filter((event: EventData) => !event.isPastEvent));
    }
  }, []);

  return (
    <div>
      <h2 className="text-[#2DBE60] text-lg font-bold mb-6">AVAILABLE EVENTS</h2>
      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">No events available.</div>
      ) : (
        events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg p-6 flex gap-6 items-center max-w-3xl mb-8">
            {/* Left Section: Date & Book */}
            <div className="flex flex-col items-center justify-between bg-[#E6F9ED] rounded-lg p-4 min-w-[120px] h-full">
              <div className="text-xs text-gray-500 mb-2">{new Date(event.date).toLocaleString('en-US', { month: 'long' }).toUpperCase()}</div>
              <div className="text-3xl font-bold text-[#2DBE60]">{new Date(event.date).getDate()}</div>
              <div className="text-xs text-gray-500 mb-2">{new Date(event.date).toLocaleString('en-US', { weekday: 'long' }).toUpperCase()}</div>
              <div className="text-xs text-gray-500 mb-2">{event.time}</div>
              <button
                className="bg-[#2DBE60] text-white font-semibold px-6 py-2 rounded mt-2 shadow"
                onClick={() => {
                  // Add event to supplierEvents in localStorage as current event
                  const supplierEvents = JSON.parse(localStorage.getItem('supplierEvents') || '[]');
                  // Prevent duplicate booking
                  if (!supplierEvents.some((e: EventData) => e.eventName === event.eventName && e.date === event.date)) {
                    supplierEvents.push({ ...event, isPastEvent: false });
                    localStorage.setItem('supplierEvents', JSON.stringify(supplierEvents));
                  }
                }}
              >
                BOOK
              </button>
            </div>
            {/* Right Section: Event Details */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold text-gray-700 mb-1">Event Details</div>
                <div className="text-gray-700">{event.eventName}</div>
                <div className="text-gray-700">Date<br/><span className="font-bold">{event.date}</span></div>
                <div className="text-gray-700">Time<br/><span className="font-bold">{event.time}</span></div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Location</div>
                <div className="text-gray-700">{event.location}</div>
                <div className="text-gray-700">Dress Code<br/><span className="font-bold">{event.selectedDressCode}</span></div>
                <div className="text-gray-700">Number of Services<br/><span className="font-bold">{event.selectedServices}</span></div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewEvents;
