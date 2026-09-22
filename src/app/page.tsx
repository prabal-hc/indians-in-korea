import { MainLayout } from "@/components/templates";
import {
  AboutSection,
  CommunitySection,
  GallerySection,
  Hero,
  SponsorsSection,
  UpcomingEvent,
  VoiceOfCommunitySection,
} from "@/components/organisms/home";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <AboutSection />
      <UpcomingEvent />
      <CommunitySection />
      <GallerySection />
      <SponsorsSection />
      <VoiceOfCommunitySection />
    </MainLayout>
  );
}
