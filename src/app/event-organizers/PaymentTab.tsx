// PaymentTab.tsx
import React, { useState } from "react";

interface PaymentTabProps {
  formData: any;
  onPaymentComplete: (status: 'Paid' | 'Advance Paid') => void;
}

const PaymentTab: React.FC<PaymentTabProps> = ({ formData, onPaymentComplete }) => {
  const [paymentOption, setPaymentOption] = useState<'full' | 'advance' | null>(null);

  const handlePayment = () => {
    if (!paymentOption) return;
    if (onPaymentComplete) {
      onPaymentComplete(paymentOption === 'full' ? 'Paid' : 'Advance Paid');
    }
  };
  
  if (!formData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8 text-center">
        <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Payment Details</h2>
        <div className="text-gray-700 text-lg">Please fill out the event form first to proceed with payment.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Payment Details</h2>
      {formData && (
        <div className="mb-4 p-4 bg-green-50 rounded border border-green-200">
          <div className="font-semibold text-green-700 mb-2">Event: {formData.eventName}</div>
          <div className="text-gray-700 text-sm">Location: {formData.location}</div>
          <div className="text-gray-700 text-sm">Date: {formData.date}</div>
          <div className="text-gray-700 text-sm">Time: {formData.time}</div>
        </div>
      )}
      
      <div className="mb-6 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h2>
        <div className="space-y-3">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition ${
              paymentOption === "full" 
                ? "border-green-500 bg-green-50" 
                : "border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setPaymentOption("full")}
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
            onClick={() => setPaymentOption("advance")}
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
    </div>
  );
};

export default PaymentTab;