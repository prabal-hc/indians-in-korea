import { MainLayout } from "@/components/templates";
import { Hero, UpcomingEvent } from "@/components/organisms";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <UpcomingEvent />
    </MainLayout>
  );
}
