import HeroSection from "../components/HeroSection";
import SecondSection from "../components/SecondSection";
import LaptopSection from "../components/LaptopSection";
import ReviewSection from "../components/ReviewSection";
import CountReview from "../components/CountReview";
import Download from "../components/Download";

export default function HomeMainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <SecondSection />
        <LaptopSection />
        <ReviewSection />
        <CountReview />
        <Download />
      </main>
    </div>
  );
}
