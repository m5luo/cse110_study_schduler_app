// calendar component for webpage
import React, { useState } from 'react';
import '../style/Calendar.css';
import TodoList from './TodoList';
import shareIcon from '../images/share.png';
import deleteIcon from '../images/trash-can.png';
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    startTime: '',
    endTime: '',
    day: ''
  });

  const days = ['M', 'T', 'W', 'Th', 'F', 'Sat', 'Sun'];
  const times = [
    '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
    '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
  ];

  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return null;
    
    const [hour, period] = timeStr.match(/(\d+)(AM|PM)/).slice(1);
    let hourNum = parseInt(hour);
    
    if (period === 'PM' && hourNum !== 12) {
      hourNum += 12;
    } else if (period === 'AM' && hourNum === 12) {
      hourNum = 0;
    }
    
    return hourNum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.eventName && formData.startTime && formData.endTime && formData.day) {
      setEvents([...events, { ...formData, id: Date.now() }]);
      setFormData({ eventName: '', startTime: '', endTime: '', day: '' });
    }
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const isTimeSlotOccupied = (time, day) => {
    return events.find(event => {
      const currentHour = convertTo24Hour(time);
      const startHour = convertTo24Hour(event.startTime);
      const endHour = convertTo24Hour(event.endTime);
      
      return event.day === day && currentHour >= startHour && currentHour < endHour;
    });
  };

  const isFirstTimeSlot = (time, day, event) => {
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
            {days.map(day => (
              <div key={day} className="header-cell">{day}</div>
            ))}

            {times.map(time => (
              <React.Fragment key={time}>
                <div className="time-cell">{time}</div>
                {days.map(day => {
                  const event = isTimeSlotOccupied(time, day);
                  return (
                    <div key={`${time}-${day}`} className="calendar-cell">
                      {event && (
                        <div className="event">
                          {isFirstTimeSlot(time, day, event) && (
                            <div className="event-content">
                              <span className="event-name">{event.eventName}</span>
                              <button
                                onClick={() => handleDelete(event.id)}
                                className="delete-button"
                                title="Delete event"
                              >
                               <img
                                src={deleteIcon}
                                alt="Delete"
                                className= "delete-icon"
                                />
                              </button>
                              <button
                                className="share-button"
                                onClick={(e) => e.stopPropagation()}
                                title="Share event"
                              >
                                <img
                                src={shareIcon}
                                alt="Share"
                                className= "share-icon"
                                />
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
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
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
                  {times.map(time => (
                    <option key={time} value={time}>{time}</option>
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
                  {times.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Day</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button">
                SUBMIT
              </button>
            </form>
          </div>
          <button 
            className="todo-button"
            onClick={toggleTodoList}
          >
            WEEKLY TODO LIST
          </button>
        </div>
      </div>
      <TodoList 
        isOpen={isTodoListOpen} 
        onClose={toggleTodoList}
      />
    </>
  );
};

export default Calendar;