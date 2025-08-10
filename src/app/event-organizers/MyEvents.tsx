// MyEvents.tsx
import React from "react";
import { useRouter } from "next/navigation";

interface MyEventsProps {
  onStartNewEvent?: () => void;
  currentEvent?: any;
  pastEvents?: any[];
}

const MyEvents: React.FC<MyEventsProps> = ({ onStartNewEvent, currentEvent, pastEvents = [] }) => {
  const router = useRouter();

  const handleNewEvent = () => {
    if (onStartNewEvent) {
      onStartNewEvent();
    } else {
      router.push("/event-organizers/form");
    }
  };

  if (!currentEvent) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md sm:max-w-2xl mx-auto mt-8 sm:mt-16 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
        <img src="/event-posted.svg" alt="No Event" className="w-20 h-20 sm:w-32 sm:h-32 mb-4 sm:mb-6" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-1 sm:mb-2 text-center">No Current Event</h2>
        <p className="text-gray-500 mb-4 sm:mb-6 text-center text-sm sm:text-base">You have not created any events yet. Start by adding a new event.</p>
        <button
          className="bg-[#2DBE60] hover:bg-[#249e4e] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded shadow transition w-full sm:w-auto"
          onClick={handleNewEvent}
        >
          New Event
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Current Event */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Current Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Event Planning</span><span className="text-green-600 font-semibold">In Progress</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Event Details</span><span className="text-gray-800">{currentEvent.eventName}</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Number of Suppliers</span><span className="text-gray-800">{currentEvent.numSuppliers}</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Time</span><span className="text-gray-800">{currentEvent.time}</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Dress Code</span><span className="text-gray-800">{currentEvent.selectedDressCode}</span></div>
          </div>
          <div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Venue Booking</span><span className="text-green-600 font-semibold">Confirmed</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Location</span><span className="text-gray-800">{currentEvent.location}</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Date</span><span className="text-gray-800">{currentEvent.date}</span></div>
            <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Number of Services</span><span className="text-gray-800">{currentEvent.selectedServices}</span></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Total Payment</span><span className="text-gray-800">5000</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Status</span><span className={currentEvent.paymentStatus === 'Paid' ? 'text-green-600 font-semibold' : 'text-yellow-500 font-semibold'}>{currentEvent.paymentStatus}</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Advance Payment</span><span className="text-gray-800">500</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Status</span><span className={currentEvent.paymentStatus === 'Paid' ? 'text-green-600 font-semibold' : 'text-yellow-500 font-semibold'}>{currentEvent.paymentStatus === 'Paid' ? 'Paid' : 'Advance Paid'}</span></div>
        </div>
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Past Events</h2>
          <div className="space-y-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="border rounded-lg p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Event</span><span className="text-gray-800">{event.eventName}</span></div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Location</span><span className="text-gray-800">{event.location}</span></div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Date</span><span className="text-gray-800">{event.date}</span></div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Time</span><span className="text-gray-800">{event.time}</span></div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Dress Code</span><span className="text-gray-800">{event.selectedDressCode}</span></div>
                    <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Payment Status</span><span className={event.paymentStatus === 'Paid' ? 'text-green-600 font-semibold' : 'text-yellow-500 font-semibold'}>{event.paymentStatus}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;