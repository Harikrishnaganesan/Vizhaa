"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { EventData } from "./dashboard";

interface EventFormProps {
  onSubmit?: (data: Partial<EventData>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const [eventName, setEventName] = useState<string>("");
  const [otherEventName, setOtherEventName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [numSuppliers, setNumSuppliers] = useState<number>(1);
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDressCode, setSelectedDressCode] = useState<string>("");
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState<"full" | "advance" | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const eventTypes = [
    "Marriage",
    "Birthday",
    "Corporate Event",
    "Anniversary",
    "Baby Shower",
    "Graduation",
    "Engagement",
    "Reception",
    "Other"
  ];

  const serviceOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Mini Tiffin",
    "Snacks",
    "High Tea",
    "Cocktails",
    "Desserts"
  ];

  const dressCodeOptions = [
    { 
      name: "Premium", 
      available: true,
      icon: (
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    { 
      name: "Gold", 
      available: true,
      icon: (
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
      name: "Silver", 
      available: true,
      icon: (
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const handleServiceToggle = (service: string): void => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPaymentOptions) {
      setShowPaymentOptions(true);
      return;
    }
    if (!paymentOption) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const eventData = {
        eventName: eventName === "Other" ? otherEventName : eventName,
        location,
        numSuppliers,
        time,
        date,
        selectedServices: selectedServices.join(", "),
        selectedDressCode,
  paymentStatus: paymentOption === "full" ? "Paid" : "Advance Paid" as "Paid" | "Advance Paid"
      };
      localStorage.setItem('currentEvent', JSON.stringify(eventData));
      if (onSubmit) {
        onSubmit(eventData);
      } else {
        router.push("/event-organizers/my-events");
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Enter Event Details</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={eventName}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEventName(e.target.value)}
                required
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((event) => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
              {eventName === "Other" && (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Please specify event name"
                  value={otherEventName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherEventName(e.target.value)}
                  required
                />
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Suppliers</label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-3 py-1 rounded-l-md transition"
                onClick={(): void => setNumSuppliers(Math.max(1, numSuppliers - 1))}
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1 bg-gray-50">
                  {numSuppliers}
                </span>
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-3 py-1 rounded-r-md transition"
                onClick={(): void => setNumSuppliers(numSuppliers + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition [&::-webkit-calendar-picker-indicator]:bg-transparent"
                value={time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services Needed</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-${service}`}
                      checked={selectedServices.includes(service)}
                      onChange={(): void => handleServiceToggle(service)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-700">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Dress Code Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dressCodeOptions.map((option) => (
              <div
                key={option.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center ${
                  selectedDressCode === option.name
                    ? "border-2 border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                }`}
                onClick={(): void => setSelectedDressCode(option.name)}
              >
                {option.icon}
                <div className="font-medium text-gray-800">{option.name}</div>
                <div className="text-green-600 text-sm mt-1">
                  {option.available ? "Available" : "Unavailable"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showPaymentOptions && (
          <div className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
            <div className="space-y-3">
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  paymentOption === "full" 
                    ? "border-green-500 bg-green-50" 
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={(): void => setPaymentOption("full")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                    paymentOption === "full" 
                      ? "border-green-500 bg-green-500" 
                      : "border-gray-400"
                  }`}>
                    {paymentOption === "full" && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">Full Payment</div>
                    <div className="text-sm text-gray-600">Pay the full amount of ₹5000 now</div>
                  </div>
                </div>
              </div>
              
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  paymentOption === "advance" 
                    ? "border-green-500 bg-green-50" 
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={(): void => setPaymentOption("advance")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                    paymentOption === "advance" 
                      ? "border-green-500 bg-green-500" 
                      : "border-gray-400"
                  }`}>
                    {paymentOption === "advance" && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">Advance Payment</div>
                    <div className="text-sm text-gray-600">Pay ₹500 now and the rest later</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : showPaymentOptions ? "Confirm Payment" : "Continue with Payment"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;