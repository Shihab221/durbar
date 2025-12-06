import { HeroSlider } from "@/components/home/hero-slider";
import { AchievementsSection } from "@/components/home/achievements-section";
import { VideoSection } from "@/components/home/video-section";
import { PageTransition } from "@/components/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSlider />
      <AchievementsSection />
      <VideoSection />
    </PageTransition>
  );
}

