"use client";
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Choose Signup Type</h1>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/signup/organizer')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Event Organizer
          </button>
          <button
            onClick={() => router.push('/signup/supplier')}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Supplier
          </button>
        </div>
      </div>
    </div>
  );
}