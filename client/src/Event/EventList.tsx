import EventItem from "./EventItem";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";
import { Event } from "../types/types";
import { fetchEvents } from "../event-utils/event-utils";

const EventList = () => {
  const { events, setEvents } = useContext(AppContext);

  // Fetch expenses on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Function to load expenses and handle errors
  const loadEvents = async () => {
    try {
      const eventsList = await fetchEvents();
      setEvents(eventsList);
    } catch (err: any) {
      console.log("failed to fetch events");
    }
  };

  return (
    <ul className="list-group">
      {events.map((event: Event) => (
        <EventItem key={event.title} title={event.title} color={event.color} startTime={event.startTime} endTime={event.endTime} weekday={event.weekday} />
      ))}
    </ul>
  );
};

export default EventList;
