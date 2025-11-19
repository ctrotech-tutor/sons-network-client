// components/events/EventItem.tsx
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

// Define the shape of an event object for type safety
export type Event = {
  id: string;
  name: string;
  date: string; // Supabase returns date as a string
  time: string;
  location: string;
};

interface EventItemProps {
  event: Event;
}

export default function EventItem({ event }: EventItemProps) {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="flex items-center space-x-4 p-4 rounded-lg transition-colors hover:bg-muted">
        {/* Left Side: Date Block */}
        <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary text-primary-foreground rounded-md">
          <span className="text-sm font-semibold">{month}</span>
          <span className="text-3xl font-bold tracking-tight">{day}</span>
        </div>

        {/* Right Side: Event Details */}
        <div className="grow">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              {event.time}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" />
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
