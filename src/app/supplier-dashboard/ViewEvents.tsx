import React from "react";

const ViewEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-[#2DBE60] text-lg font-bold mb-6">AVAILABLE EVENTS</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 flex gap-6 items-center max-w-3xl">
        {/* Left Section: Date & Book */}
        <div className="flex flex-col items-center justify-between bg-[#E6F9ED] rounded-lg p-4 min-w-[120px] h-full">
          <div className="text-xs text-gray-500 mb-2">AUGUST</div>
          <div className="text-3xl font-bold text-[#2DBE60]">6</div>
          <div className="text-xs text-gray-500 mb-2">WEDNESDAY</div>
          <div className="text-xs text-gray-500 mb-2">9:12 AM</div>
          <button className="bg-[#2DBE60] text-white font-semibold px-6 py-2 rounded mt-2 shadow">BOOK</button>
        </div>
        {/* Right Section: Event Details */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Event Details</div>
            <div className="text-gray-700">Marriage</div>
            <div className="text-gray-700">Date<br/><span className="font-bold">03-09-2025</span></div>
            <div className="text-gray-700">Time<br/><span className="font-bold">6:30 PM</span></div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Location</div>
            <div className="text-gray-700">AVC Marriage Hall, Mayiladuthurai</div>
            <div className="text-gray-700">Dress Code<br/><span className="font-bold">Gold</span></div>
            <div className="text-gray-700">Number of Services<br/><span className="font-bold">Evening, Night</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
