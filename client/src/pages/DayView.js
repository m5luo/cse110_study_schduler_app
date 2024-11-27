// src/components/DayView.js
import React from 'react';
import '../style/DayView.css';
import shareIcon from '../images/share.png';
import deleteIcon from '../images/trash-can.png';

const DayView = ({ events, selectedDate, onNavigate, onDelete, onShare }) => {
  const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dayShort = selectedDate.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0); // Get first letter (T for Tuesday)

  const times = [
    '12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
    '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'
  ];

  const convertTimeToIndex = (time) => {
    return times.indexOf(time);
  };

  const getEventsForTimeSlot = (timeSlot) => {
    return events.filter(event => {
      // Match the day
      const eventDay = event.day;
      const isCorrectDay = eventDay === dayShort || 
                          (eventDay === 'T' && dayShort === 'T') ||
                          (eventDay === 'Th' && dayShort === 'T');

      // Get start and end indices
      const startIndex = convertTimeToIndex(event.startTime);
      const endIndex = convertTimeToIndex(event.endTime);
      const currentIndex = convertTimeToIndex(timeSlot);

      // Event should only appear in its start time slot
      return isCorrectDay && currentIndex === startIndex;
    });
  };

  const calculateEventStyle = (event) => {
    const startIndex = convertTimeToIndex(event.startTime);
    const endIndex = convertTimeToIndex(event.endTime);
    const duration = endIndex - startIndex;
    
    return {
      height: `${duration * 60}px`,
      backgroundColor: '#4299e1',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    };
  };

  return (
    <div className="day-view">
      <div className="day-header">
        <button onClick={() => onNavigate(-1)} className="nav-button">←</button>
        <h2>{dayName}</h2>
        <button onClick={() => onNavigate(1)} className="nav-button">→</button>
      </div>
      
      <div className="time-slots">
        {times.map((time) => (
          <div key={time} className="time-slot">
            <div className="time-label">{time}</div>
            <div className="events-container">
              {getEventsForTimeSlot(time).map(event => (
                <div 
                  key={event.id} 
                  className="day-event"
                  style={calculateEventStyle(event)}
                >
                  <span className="event-name">{event.eventName}</span>
                  <div className="event-actions">
                    <button 
                      className="delete-button"
                      onClick={() => onDelete(event.id)}
                      title="Delete event"
                    >
                      <img src={deleteIcon} alt="Delete" className="delete-icon" />
                    </button>
                    <button 
                      className="share-button"
                      onClick={(e) => onShare(event, e)}
                      title="Share event"
                    >
                      <img src={shareIcon} alt="Share" className="share-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;