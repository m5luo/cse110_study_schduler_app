import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Calendar from '../pages/Calendar';
import * as eventUtils from '../utils/event-utils'
import {jest} from '@jest/globals';
import { Event } from '../types';

jest.mock('../utils/event-utils')
const mockFetchEvents = eventUtils.fetchEvents as jest.Mock;
const mockCreateEvent = eventUtils.createEvent as jest.Mock;
const mockDeleteEvent = eventUtils.deleteEvent as jest.Mock;

test('submit event button exists', () => {
  render(<Calendar/>);
  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();
});

describe('Calendar Function Tests', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('tests fetchEvent and tests that events from backend display in frontend', async () => {
    
        const mockEvents: Event[] = [
          {
            id: 1,
            title: 'Test Event',
            startTime: '10AM',
            endTime: '12PM',
            weekday: 'M',
          },
        ];
        mockFetchEvents.mockResolvedValueOnce(mockEvents);
        render(<Calendar/>);
        await waitFor(() => expect(mockFetchEvents).toHaveBeenCalledTimes(1));
        const testEvent = await screen.findByText('Test Event');
        expect(testEvent).toBeInTheDocument();
      });


      test('tests createEvent', async () => {
    
        const newEvent: Event = {
            id: 2,
            title: 'New Event',
            startTime: '1AM',
            endTime: '3AM',
            weekday: 'M',
        };
        mockFetchEvents.mockResolvedValueOnce([]);
        mockCreateEvent.mockResolvedValueOnce(newEvent);
        mockFetchEvents.mockResolvedValueOnce([newEvent]);
        render(<Calendar/>);

        fireEvent.change(screen.getByPlaceholderText('Event Name'), {
            target: { value: newEvent.title },
        });
          fireEvent.change(screen.getByLabelText('Start Time'), {
            target: { value: newEvent.startTime },
        });
          fireEvent.change(screen.getByLabelText('End Time'), {
            target: { value: newEvent.endTime },
        });
          fireEvent.change(screen.getByLabelText('Day'), {
            target: { value: newEvent.weekday },
        });

        fireEvent.click(screen.getByText(/Submit/i));
        await waitFor(() => expect(mockCreateEvent).toHaveBeenCalledTimes(1));

        const newEventTitle = await screen.findByText(newEvent.title);
        expect(newEventTitle).toBeInTheDocument();
      });
});


