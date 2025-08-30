"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupSelectionPage() {
  const router = useRouter();
  return (
  <div className="min-h-screen flex items-center justify-center bg-[#253C51]">
      <div className="bg-gradient-to-b from-[#f8fafc] to-[#e6f7ef] rounded-2xl shadow-xl p-10 w-full max-w-3xl flex flex-col items-center">
        <Image src="/openingcard-logo.svg" alt="Vizhaa Logo" width={120} height={60} className="mb-8" />
        <div className="flex gap-12 w-full justify-center">
          <button
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center w-80 border-2 border-transparent hover:border-green-400 transition"
            onClick={() => router.push('/signup/organizer')}
          >
            <Image src="/openingcard-eo.svg" alt="Event Organizer" width={160} height={160} className="mb-4" />
            <span className="font-bold text-2xl text-gray-800 mt-2">Event Organizer</span>
          </button>
          <button
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center w-80 border-2 border-transparent hover:border-green-400 transition"
            onClick={() => router.push('/signup/supplier')}
          >
            <Image src="/openingcard-Supplier.svg" alt="Supplier" width={160} height={160} className="mb-4" />
            <span className="font-bold text-2xl text-gray-800 mt-2">Supplier</span>
          </button>
        </div>
      </div>
    </div>
  );
}