// calendar component for webpage
import { Event } from "../types/types";
import React, { useState, useEffect } from "react";
import "../style/Calendar.css";
import TodoList from "../pages/TodoList";
import shareIcon from "../images/share.png";
import deleteIcon from "../images/trash-can.png";
import { createEvent, deleteEvent, fetchEvents } from "../utils/event-utils";
import Navbar from "./Navbar";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    weekday: "",
  });

  const days = ["M", "T", "W", "Th", "F", "Sat", "Sun"];
  const times = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const eventsFromBackend = await fetchEvents(token);
      setEvents(eventsFromBackend);
    };

    fetchData();
  }, []);

  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return null;

    const [hour, period] = timeStr.match(/(\d+)(AM|PM)/).slice(1);
    let hourNum = parseInt(hour);

    if (period === "PM" && hourNum !== 12) {
      hourNum += 12;
    } else if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    }

    return hourNum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.startTime && formData.endTime && formData.weekday) {
      const token = localStorage.getItem("token");
      console.log(token);
      const newEvent = {
        title: formData.title,
        id: Date.now(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        weekday: formData.weekday,
      };
      const createdEvent = await createEvent(token, newEvent);
      setEvents([...events, createdEvent]);
      setFormData({ title: "", startTime: "", endTime: "", weekday: "" });
    }
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");
    const eventToDelete = events.find((event) => event.id == eventId);
    if (eventToDelete) {
      await deleteEvent(token, eventToDelete.id);
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const isTimeSlotOccupied = (time, weekday) => {
    return events.find((event) => {
      const currentHour = convertTo24Hour(time);
      const startHour = convertTo24Hour(event.startTime);
      const endHour = convertTo24Hour(event.endTime);

      return event.weekday === weekday && currentHour >= startHour && currentHour < endHour;
    });
  };

  const isFirstTimeSlot = (time, weekday, event) => {
    const currentHour = convertTo24Hour(time);
    const startHour = convertTo24Hour(event.startTime);
    return currentHour === startHour;
  };

  const toggleTodoList = () => {
    setIsTodoListOpen(!isTodoListOpen);
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-grid">
          <div className="calendar-table">
            <div className="header-cell"></div>
            {days.map((weekday) => (
              <div key={weekday} className="header-cell">
                {weekday}
              </div>
            ))}

            {times.map((time) => (
              <React.Fragment key={time}>
                <div className="time-cell">{time}</div>
                {days.map((weekday) => {
                  const event = isTimeSlotOccupied(time, weekday);
                  return (
                    <div key={`${time}-${weekday}`} className="calendar-cell">
                      {event && (
                        <div className="event">
                          {isFirstTimeSlot(time, weekday, event) && (
                            <div className="event-content">
                              <span className="event-name">{event.title}</span>
                              <button
                                onClick={() => handleDelete(event.id)}
                                className="delete-button"
                                title="Delete event"
                              >
                                <img src={deleteIcon} alt="Delete" className="delete-icon" />
                              </button>
                              <button className="share-button" onClick={(e) => e.stopPropagation()} title="Share event">
                                <img src={shareIcon} alt="Share" className="share-icon" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="right-column">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  placeholder="Event Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Time</label>
                <select
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">End Time</label>
                <select
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select time</option>
                  {times.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Day</label>
                <select
                  value={formData.weekday}
                  onChange={(e) => setFormData({ ...formData, weekday: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select day</option>
                  {days.map((weekday) => (
                    <option key={weekday} value={weekday}>
                      {weekday}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button">
                SUBMIT
              </button>
            </form>
          </div>
          <button className="todo-button" onClick={toggleTodoList}>
            WEEKLY TODO LIST
          </button>
        </div>
      </div>
      <TodoList isOpen={isTodoListOpen} onClose={toggleTodoList} />
    </>
  );
};

export default Calendar;
