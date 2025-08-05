import React from "react";

const PaymentTab: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-[#2DBE60] text-2xl font-bold mb-6">Payment Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Total Payment</span><span className="text-gray-800">500</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Status</span><span className="text-red-600 font-semibold">Unpaid</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Advance Payment</span><span className="text-gray-800">50</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Status</span><span className="text-green-600 font-semibold">Paid</span></div>
        </div>
        <div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Event Details</span><span className="text-gray-800">Marriage</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Location</span><span className="text-gray-800">AVC Marriage Hall, Mayiladuthurai</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Number of Suppliers</span><span className="text-gray-800">15</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Date</span><span className="text-gray-800">03-09-2025</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Number of Services</span><span className="text-gray-800">Evening, Night</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Time</span><span className="text-gray-800">6:30 PM</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Dress Code</span><span className="text-gray-800">Gold</span></div>
          <div className="mb-2 flex justify-between"><span className="font-medium text-gray-600">Verification</span><span className="text-blue-600 underline cursor-pointer">Edit</span></div>
        </div>
      </div>
      <hr className="my-8" />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#2DBE60]">Payment History</h3>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-green-600 font-semibold"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#2DBE60"/></svg>Paid</span>
            <span className="flex items-center gap-1 text-red-600 font-semibold"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#EF4444"/></svg>Unpaid</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between bg-gray-50">
            <div>
              <div className="flex items-center gap-2 text-[#2DBE60] font-semibold"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="#2DBE60" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> Marriage</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> 03-09-2025</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> AVC Marriage Hall, Mayiladuthurai</div>
            </div>
            <span className="text-green-600 font-semibold flex items-center gap-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#2DBE60"/></svg>Paid</span>
          </div>
          <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between bg-gray-50">
            <div>
              <div className="flex items-center gap-2 text-[#2DBE60] font-semibold"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="#2DBE60" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> Marriage</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> 03-09-2025</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> AVC Marriage Hall, Mayiladuthurai</div>
            </div>
            <span className="text-red-600 font-semibold flex items-center gap-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#EF4444"/></svg>Unpaid</span>
          </div>
          <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between bg-gray-50">
            <div>
              <div className="flex items-center gap-2 text-[#2DBE60] font-semibold"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="#2DBE60" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> Marriage</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> 03-09-2025</div>
              <div className="text-gray-600 text-sm flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="#23364E" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg> AVC Marriage Hall, Mayiladuthurai</div>
            </div>
            <span className="text-yellow-500 font-semibold flex items-center gap-1"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#FACC15"/></svg>Payment Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
