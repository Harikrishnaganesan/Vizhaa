"use client";
import SupplierSignUp from "../../components/SupplierSignUp";

export default function SupplierSignUpPage() {
  return <SupplierSignUp onBack={() => window.history.back()} />;
}
