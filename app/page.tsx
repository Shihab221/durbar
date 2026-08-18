import { HeroSlider } from "@/components/home/hero-slider";
import { AchievementsSection } from "@/components/home/achievements-section";
import { VideoSection } from "@/components/home/video-section";
import { ChatbotSection } from "@/components/home/chatbot-section";
import { MarsDoodles } from "@/components/home/mars-doodles";
import { PageTransition } from "@/components/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="relative">
        {/* Background doodles — fixed so they appear across the entire page while scrolling */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <MarsDoodles />
        </div>

        {/* Page content sits above the doodle layer */}
        <div className="relative z-10">
          <HeroSlider />
          <AchievementsSection />
          <VideoSection />
          <ChatbotSection />
        </div>
      </div>
    </PageTransition>
  );
}