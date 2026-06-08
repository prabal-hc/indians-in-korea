"use client";

import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import { EventForm, EventFormValues } from "@/components/admin/forms/EventForm";
import * as eventsService from "@/services/admin/events.service";

export default function AdminCreateEventPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <PageTitle
        title="Create Event"
        subtitle="Add a new event with date, location, imagery, and description."
      />
      <EventForm
        onSubmit={async (values: EventFormValues) => {
          await eventsService.create({
            title: values.title,
            category: values.category,
            status: values.status,
            date: values.date,
            time: values.time || undefined,
            location: values.location,
            description: values.description,
            imageUrl: values.imageUrl || undefined,
            attendees: values.attendees || "0",
          });
          router.push("/admin/events");
        }}
      />
    </div>
  );
}
