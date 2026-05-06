import { MainLayout } from "@/components/templates";
import {
  CommunitySection,
  GallerySection,
  Hero,
  UpcomingEvent,
  VoiceOfCommunitySection,
} from "@/components/organisms";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <UpcomingEvent />
      <CommunitySection />
      <GallerySection />
      <VoiceOfCommunitySection />
    </MainLayout>
  );
}
