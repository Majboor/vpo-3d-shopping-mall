import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "@/components/ui/sonner";
import FrameSequence from "@/components/FrameSequence";
import FrameSequenceScene2 from "@/components/FrameSequenceScene2";
import TopTicker from "@/components/vpo/TopTicker";
import Navigation from "@/components/vpo/Navigation";
import ManifestoSection from "@/components/vpo/ManifestoSection";
import SpacesSection from "@/components/vpo/SpacesSection";
import CurrentSelectionSection from "@/components/vpo/CurrentSelectionSection";
import QuoteSection from "@/components/vpo/QuoteSection";
import RunwaySection from "@/components/vpo/RunwaySection";
import DistrictsSection from "@/components/vpo/DistrictsSection";
import AccessSection from "@/components/vpo/AccessSection";
import JournalSection from "@/components/vpo/JournalSection";
import WaitlistFooter from "@/components/vpo/WaitlistFooter";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();

  // Refresh ScrollTrigger when page loads and on resize
  useEffect(() => {
    // Wait for fonts and images to load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);
    
    // Also refresh on resize with debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      toast("Building for a retail brand?", {
        description: "See how VPO signed 3+ stores and packaged 150K+ MRR into spatial commerce proof.",
        action: {
          label: "For Businesses",
          onClick: () => navigate("/business"),
        },
        duration: 9000,
      });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="bg-background overflow-hidden">
      <TopTicker />
      <Navigation />
      <FrameSequence />
      <ManifestoSection />
      <SpacesSection />
      <CurrentSelectionSection />
      <FrameSequenceScene2 />
      <QuoteSection />
      <RunwaySection />
      <DistrictsSection />
      <AccessSection />
      <JournalSection />
      <WaitlistFooter />
    </main>
  );
};

export default Index;
