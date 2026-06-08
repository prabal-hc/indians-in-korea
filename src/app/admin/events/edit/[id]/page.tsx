"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageTitle } from "@/components/admin/PageTitle";
import { EventForm, EventFormValues } from "@/components/admin/forms/EventForm";
import { LoadingSkeleton } from "@/components/admin/LoadingSkeleton";
import * as eventsService from "@/services/admin/events.service";

export default function AdminEditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [values, setValues] = useState<EventFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const event = await eventsService.getById(id);
      if (event) {
        setValues({
          title: event.title,
          category: event.category,
          status: event.status === "Published" ? "Published" : "Draft",
          date: event.date,
          time: event.time || "",
          location: event.location,
          description: event.description,
          imageUrl: event.imageUrl || "",
          attendees: event.attendees || "0",
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Edit Event"
        subtitle="Update event details and publish information for the listing."
      />
      {loading ? (
        <LoadingSkeleton rows={5} columns={1} />
      ) : values ? (
        <EventForm
          initialData={values}
          onSubmit={async (updated: EventFormValues) => {
            await eventsService.update(id, {
              title: updated.title,
              category: updated.category,
              status: updated.status,
              date: updated.date,
              time: updated.time || undefined,
              location: updated.location,
              description: updated.description,
              imageUrl: updated.imageUrl || undefined,
              attendees: updated.attendees || "0",
            });
            router.push("/admin/events");
          }}
          submitLabel="Update event"
        />
      ) : (
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">
          Event not found.
        </div>
      )}
    </div>
  );
}
