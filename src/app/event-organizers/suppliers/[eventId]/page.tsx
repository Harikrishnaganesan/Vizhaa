"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Supplier {
  id: string;
  fullName: string;
  businessName?: string;
  phone: string;
  email: string;
  services: string[];
  proposedPrice: number;
  message?: string;
  status: string;
  bookedAt: string;
}

export default function EventSuppliersPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    if (eventId) {
      loadEventSuppliers();
    }
  }, [eventId]);

  const loadEventSuppliers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuppliers([]);
      setEventName("Demo Event");
    } catch (error) {
      setSuppliers([]);
      setEventName("Demo Event");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (supplierId: string, status: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      loadEventSuppliers();
    } catch (error) {
      console.error('Failed to update supplier status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading suppliers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:underline mb-2 flex items-center gap-2"
            >
              ← Back to Events
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Suppliers for "{eventName}"
            </h1>
          </div>
          <div className="text-gray-600">
            {suppliers.length} Supplier{suppliers.length !== 1 ? 's' : ''} Booked
          </div>
        </div>

        {suppliers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <img src="/status.svg" alt="No Suppliers" className="w-32 h-32 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No Suppliers Yet</h2>
            <p className="text-gray-500">No suppliers have booked this event yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image 
                      src="/avatar1.png" 
                      alt="Supplier" 
                      width={80} 
                      height={80} 
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {supplier.fullName}
                        </h3>
                        {supplier.businessName && (
                          <p className="text-gray-600 text-sm">{supplier.businessName}</p>
                        )}
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div>📞 {supplier.phone}</div>
                          <div>✉️ {supplier.email}</div>
                          <div>📅 Booked: {new Date(supplier.bookedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-2">
                          <span className="font-semibold text-gray-700">Services:</span>
                          <div className="text-sm text-gray-600 mt-1">
                            {supplier.services.join(', ')}
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold text-gray-700">Proposed Price:</span>
                          <div className="text-lg font-bold text-green-600">
                            ₹{supplier.proposedPrice.toLocaleString()}
                          </div>
                        </div>
                        {supplier.message && (
                          <div className="mb-2">
                            <span className="font-semibold text-gray-700">Message:</span>
                            <div className="text-sm text-gray-600 mt-1">
                              {supplier.message}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          supplier.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          supplier.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {supplier.status}
                        </span>
                      </div>
                      
                      {supplier.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(supplier.id, 'Approved')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(supplier.id, 'Rejected')}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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
}