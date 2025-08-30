"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const EventSuppliersPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      loadEventSuppliers();
    }
  }, [eventId]);

  const loadEventSuppliers = async () => {
    try {
      const { organizerAPI } = await import('../../../../../services/api.js');
      const result = await organizerAPI.getEventSuppliers(eventId);
      setSuppliers(result.data.suppliers || []);
      setEvent(result.data.event || null);
    } catch (error) {
      console.error('Failed to load event suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { organizerAPI } = await import('../../../../../services/api.js');
      await organizerAPI.updateBookingStatus(bookingId, status);
      // Reload suppliers
      loadEventSuppliers();
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading event suppliers...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Event Not Found</h2>
          <button 
            onClick={() => router.back()}
            className="bg-[#2DBE60] text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2DBE60] mb-2">
                Suppliers for "{event.eventName}"
              </h1>
              <div className="text-gray-600">
                <span className="font-medium">Location:</span> {event.location} | 
                <span className="font-medium ml-2">Date:</span> {new Date(event.eventDate).toLocaleDateString()} |
                <span className="font-medium ml-2">Budget:</span> ₹{event.budget.toLocaleString()}
              </div>
            </div>
            <button 
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
            >
              Back to Events
            </button>
          </div>
        </div>

        {/* Suppliers List */}
        {suppliers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <img src="/status.svg" alt="No Suppliers" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Suppliers Yet</h2>
            <p className="text-gray-500">No suppliers have booked this event yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Suppliers ({suppliers.length})
              </h2>
            </div>
            
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image 
                      src="/avatar1.png" 
                      alt="Supplier" 
                      width={100} 
                      height={100} 
                      className="rounded-lg object-cover w-[100px] h-[100px]" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{supplier.fullName}</h3>
                        {supplier.businessName && (
                          <p className="text-gray-500 text-sm">{supplier.businessName}</p>
                        )}
                        <div className="mt-2 space-y-1">
                          <div className="text-gray-600 text-sm">
                            <span className="font-medium">Phone:</span> {supplier.phone}
                          </div>
                          <div className="text-gray-600 text-sm">
                            <span className="font-medium">Email:</span> {supplier.email}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-gray-600 text-sm mb-2">
                          <span className="font-medium">Services:</span> {supplier.services.join(', ')}
                        </div>
                        <div className="text-gray-600 text-sm mb-2">
                          <span className="font-medium">Proposed Price:</span> 
                          <span className="font-bold text-green-600"> ₹{supplier.proposedPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-gray-600 text-sm font-medium">Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            supplier.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            supplier.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {supplier.status}
                          </span>
                        </div>
                        {supplier.message && (
                          <div className="text-gray-600 text-sm">
                            <span className="font-medium">Message:</span> {supplier.message}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {supplier.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleUpdateBookingStatus(supplier.id, 'Approved')}
                            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateBookingStatus(supplier.id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded text-sm flex items-center gap-2">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path fill="#fff" d="M21 15.46l-5.27-2.11a.75.75 0 0 0-.73.09l-2.11 1.58a.75.75 0 0 1-.88 0l-2.11-1.58a.75.75 0 0 0-.73-.09L3 15.46V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.54z"/>
                          <path fill="#fff" d="M21 8.24V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.24l9 3.6 9-3.6z"/>
                        </svg>
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSuppliersPage;