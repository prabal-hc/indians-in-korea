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
          date: event.date,
          location: event.location,
          description: event.description,
          imageUrl: "",
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
          onSubmit={async (updated) => {
            await eventsService.update(id, updated);
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
