// PaymentTab.tsx
import React, { useState } from "react";

interface FormData {
  eventName: string;
  location: string;
  date: string;
  time: string;
}

interface PaymentHistory {
  eventName: string;
  date: string;
  location: string;
  paymentStatus: 'Paid' | 'Advance Paid';
}

interface PaymentTabProps {
  formData: FormData | null;
  onPaymentComplete: (status: 'Paid' | 'Advance Paid') => void;
}

const PaymentTab: React.FC<PaymentTabProps> = ({ formData, onPaymentComplete }) => {
  const [paymentOption, setPaymentOption] = useState<'full' | 'advance' | null>(null);
  const [history, setHistory] = useState<PaymentHistory[]>([]);

  // Dummy handlePayment function
  const handlePayment = () => {
    if (formData && paymentOption) {
      setHistory(prev => [
        ...prev,
        {
          eventName: formData.eventName,
          date: formData.date,
          location: formData.location ?? "",
          paymentStatus: paymentOption === 'full' ? 'Paid' : 'Advance Paid',
        }
      ]);
      onPaymentComplete(paymentOption === 'full' ? 'Paid' : 'Advance Paid');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Payment Details</h2>
      {formData ? (
        <>
          <div className="mb-6 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
            <div className="space-y-3">
              {/* Full Payment Option */}
              <div
                className={`p-4 border rounded-lg cursor-pointer transition flex items-center gap-4 ${
                  paymentOption === "full"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setPaymentOption("full")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
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
                    <div className="text-sm text-gray-600">Pay ₹5000 now</div>
                  </div>
                </div>
              </div>
              {/* Advance Payment Option */}
              <div
                className={`p-4 border rounded-lg cursor-pointer transition flex items-center gap-4 ${
                  paymentOption === "advance"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setPaymentOption("advance")}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
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
          <button
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
              !paymentOption
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={!paymentOption}
            onClick={handlePayment}
          >
            Complete Payment
          </button>
        </>
      ) : (
        <div className="text-gray-700 text-lg mb-8">No active payment. Please create an event and proceed to payment.</div>
      )}
      {/* Payment History Section - always visible */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#2DBE60]">Payment History</h2>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Paid
            </span>
            <span className="flex items-center gap-1 text-red-500 font-medium">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Unpaid
            </span>
          </div>
        </div>
        {history.length === 0 ? (
          <div className="text-gray-500">No payment history found.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((event, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-5 flex items-center justify-between border border-gray-200">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-semibold text-lg">
                    <span className="text-gray-800">{event.eventName ?? "Event"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v2a1 1 0 102 0V3a1 1 0 00-1-1zM4.293 4.293a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L4.293 5.707a1 1 0 010-1.414zM2 6a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm2.293 7.707a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 1.414l-1.414 1.414a1 1 0 01-1.414 0zM6 18a1 1 0 001-1v-2a1 1 0 10-2 0v2a1 1 0 001 1zm7.707-2.293a1 1 0 010-1.414l-1.414-1.414a1 1 0 011.414-1.414l1.414 1.414a1 1 0 010 1.414zM18 14a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-2.293-7.707a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0z"/></svg>
                    <span>{event.date ?? "Date not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 016 6c0 4.418-6 10-6 10S4 12.418 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"/></svg>
                    <span>{event.location ?? "Location not specified"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${event.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-500'}`}>
                    {event.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
                  </span>
                  <span className={`w-4 h-4 rounded-full ${event.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-red-500'} inline-block`}></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentTab;