import { useContext } from "react";
import { Event } from "../types/types";
import { AppContext } from "../context/AppContext";
import { deleteEvent } from "../event-utils/event-utils";

const EventItem = (currentEvent: Event) => {
  // Exercise: Consume the AppContext here
  const { events, setEvents } = useContext(AppContext);
  const handleDeleteExpense = (currentEvent: Event) => {
    deleteEvent(currentEvent.title);
    // Exercise: Remove expense from expenses context array
    const updatedEvents= events.filter((e) => e.title !== currentEvent.title);
    setEvents(updatedEvents);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentEvent.title}</div>
      <div>{currentEvent.color}</div>
      <div>Start Time:{currentEvent.startTime}</div>
      <div>End Time:{currentEvent.endTime}</div>
      <div>Day: {currentEvent.weekday}</div>
      <div>
        <button aria-label={currentEvent.title} onClick={() => handleDeleteExpense(currentEvent)}>
          x
        </button>
      </div>
    </li>
  );
};

export default EventItem;
