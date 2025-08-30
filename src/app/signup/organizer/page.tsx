"use client";
import { useRouter } from "next/navigation";
import OrganizerSignUp from "../../components/OrganizerSignUp";

export default function OrganizerSignUpPage() {
  const router = useRouter();
  return <OrganizerSignUp onBack={() => router.push('/signup/main')} />;
}
