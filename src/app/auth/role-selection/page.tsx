"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserRoleSelectionPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#253C51] p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/openingcard-logo.svg" alt="Vizhaa Logo" width={120} height={60} className="mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Choose Your Role</h1>
          <p className="text-gray-600">Select how you want to use Vizhaa</p>
        </div>
        
        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <button
            className="bg-blue-50 hover:bg-blue-100 rounded-xl p-6 border-2 border-transparent hover:border-blue-400 transition-all"
            onClick={() => router.push('/auth/organizer-registration')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Image src="/openingcard-eo.svg" alt="Event Organizer" width={60} height={60} className="object-contain" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Event Organizer</h3>
              <p className="text-gray-600 text-sm">Create and manage events</p>
            </div>
          </button>
          
          <button
            className="bg-green-50 hover:bg-green-100 rounded-xl p-6 border-2 border-transparent hover:border-green-400 transition-all"
            onClick={() => router.push('/auth/supplier-registration')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Image src="/openingcard-Supplier.svg" alt="Service Supplier" width={60} height={60} className="object-contain" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">Free Lancers</h3>
              <p className="text-gray-600 text-sm">Provide event services</p>
            </div>
          </button>
        </div>
        
        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Already have an account?</p>
          <button 
            onClick={() => router.push('/auth/user-login')}
            className="bg-[#253C51] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2A4F71] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}