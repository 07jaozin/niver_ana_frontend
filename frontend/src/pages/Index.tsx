import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RSVPSection from "@/components/RSVPSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <RSVPSection />
        <EventDetailsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;