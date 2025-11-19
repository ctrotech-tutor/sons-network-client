// components/marketing/UpcomingEvents.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import EventItem, { Event } from "@/components/events/EventItem";
import { Button } from "@/components/ui/button";

async function getUpcomingEvents(): Promise<Event[]> {
  const today = new Date().toISOString();

  // Fetch the next 3 events that are on or after today's date
  const { data, error } = await supabase
    .from("events")
    .select("id, name, date, time, location")
    .gte('date', today) // gte = greater than or equal to
    .order("date", { ascending: true }) // Order by the soonest date first
    .limit(3);

  if (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }

  return data as Event[];
}

export default async function UpcomingEvents() {
  const events = await getUpcomingEvents();

  if (events.length === 0) {
    return (
        <section className="py-16 sm:py-24">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Upcoming Events</h2>
                <p className="text-muted-foreground">No upcoming events scheduled at the moment. Stay tuned!</p>
            </div>
        </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="ghost">View All Events &rarr;</Button>
          </Link>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
