import React, { useState } from "react";

const EventForm: React.FC = () => {
  const [eventName, setEventName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [numSuppliers, setNumSuppliers] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [dressCode, setDressCode] = useState<string>("");
  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);

  const eventTypes = [
    "Marriage",
    "Birthday Function",
    "Corporate Event",
    "Anniversary",
    "Baby Shower",
    "Graduation Party",
    "Engagement",
    "Reception"
  ];

  const serviceOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Mini-Tiffin",
    "Snacks",
    "High Tea",
    "Cocktails",
    "Desserts"
  ];

  const dressCodeOptions = [
    "Premium",
    "Gold",
    "Silver",
    "Traditional",
    "Formal",
    "Casual",
    "Theme-based"
  ];

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handlePaymentDetailsClick = () => {
    setShowPaymentDetails(!showPaymentDetails);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-[#2DBE60] text-2xl font-bold mb-6 text-left">Enter Event Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event Name</label>
            <select 
              className="w-full border rounded px-4 py-2"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            >
              <option value="">Select Event</option>
              {eventTypes.map((event) => (
                <option key={event} value={event}>{event}</option>
              ))}
              <option value="other">Other (Please Specify)</option>
            </select>
            {eventName === "other" && (
              <input 
                type="text" 
                placeholder="Enter your event name" 
                className="w-full border rounded px-4 py-2 mt-2"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              placeholder="Enter location" 
              className="w-full border rounded px-4 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Number of Suppliers</label>
            <div className="flex items-center">
              <button 
                className="bg-gray-200 px-3 py-1 rounded-l"
                onClick={(e) => { e.preventDefault(); setNumSuppliers(Math.max(1, numSuppliers - 1)); }}
              >
                -
              </button>
              <span className="border-t border-b border-gray-300 px-4 py-1 bg-gray-100">
                {numSuppliers}
              </span>
              <button 
                className="bg-gray-200 px-3 py-1 rounded-r"
                onClick={(e) => { e.preventDefault(); setNumSuppliers(numSuppliers + 1); }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time</label>
            <input 
              type="text" 
              placeholder="e.g. 6:30 PM" 
              className="w-full border rounded px-4 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input 
              type="date" 
              className="w-full border rounded px-4 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Services Needed</label>
            <div className="grid grid-cols-2 gap-2">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    id={service}
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="mr-2"
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      <hr className="my-6" />

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Dress Code Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dressCodeOptions.map((option) => (
            <button
              key={option}
              className={`border rounded-lg p-4 flex flex-col items-center ${
                dressCode === option ? "border-2 border-[#2DBE60] bg-white" : "bg-gray-100"
              }`}
              onClick={() => setDressCode(option)}
            >
              <span className="font-bold text-gray-700">{option}</span>
              <span className="text-green-600">Available</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Payment details</h3>
          <button 
            className="text-[#2DBE60] hover:underline"
            onClick={handlePaymentDetailsClick}
          >
            {showPaymentDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showPaymentDetails && (
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="inline-block w-3 h-3 rounded-full bg-black mr-2"></span>
                  Total Payment
                </span>
                <span className="font-bold text-gray-800">₹ 5000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  Advance Payment
                </span>
                <span className="font-bold text-gray-800">₹ 500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  Balance Payment
                </span>
                <span className="font-bold text-gray-800">₹ 4500</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button className="bg-[#2DBE60] hover:bg-green-600 text-white font-semibold px-12 py-3 rounded-full shadow">
            {showPaymentDetails ? "Pay Now" : "View Payment Options"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;