"use client";
import OrganizerSignUp from "../../components/OrganizerSignUp";

export default function OrganizerSignUpPage() {
  return <OrganizerSignUp onBack={() => window.history.back()} />;
}
