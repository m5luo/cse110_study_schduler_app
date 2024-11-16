import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Event } from "../types/types";
import { createEvent } from "../event-utils/event-utils";

const AddEventForm = () => {
  // Exercise: Consume the AppContext here
  const { events, setEvents } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [weekday, setWeekday] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newEvent: Event = {
      title: title,
      color: color,
      startTime: startTime,
      endTime: endTime,
      weekday: weekday,
    };

    createEvent(newEvent);
    setEvents([...events, newEvent]);

    setTitle("");
    setColor("");
    setStartTime(0);
    setEndTime(0);
    setWeekday("");
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="color">Color</label>
          <input
            required
            type="text"
            className="form-control"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          ></input>
        </div>

        <div className="col-sm">
          <label htmlFor="startTime">Start Time</label>
          <input
            required
            type="text"
            className="form-control"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value))}
          ></input>
        </div>

        <div className="col-sm">
          <label htmlFor="endTime">End Time</label>
          <input
            required
            type="text"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(Number(e.target.value))}
          ></input>
        </div>

        <div className="col-sm">
          <label htmlFor="weekday">Weekday</label>
          <input
            required
            type="text"
            className="form-control"
            id="weekday"
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
          ></input>
        </div>

        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEventForm;