import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Calendar from './Calendar';
import * as eventUtils from './event-utils/event-utils'
import {jest} from '@jest/globals';
import { Event } from './types/types';

jest.mock('./event-utils/event-utils')
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

      test('tests fetchEvent for many events', async () => {
    
        const mockEvents: Event[] = [
          {
            id: 1,
            title: 'Test Event 1',
            startTime: '10AM',
            endTime: '12PM',
            weekday: 'M',
          },
          {
            id: 2,
            title: 'Test Event 2',
            startTime: '10AM',
            endTime: '12PM',
            weekday: 'T',
          },
          {
            id: 3,
            title: 'Test Event 3',
            startTime: '10AM',
            endTime: '12PM',
            weekday: 'W',
          },
          {
            id: 4,
            title: 'Test Event 4',
            startTime: '10AM',
            endTime: '12PM',
            weekday: 'Th',
          },
        ];
        mockFetchEvents.mockResolvedValueOnce(mockEvents);
        render(<Calendar/>);
        await waitFor(() => expect(mockFetchEvents).toHaveBeenCalledTimes(1));
        const testEvent1 = await screen.findByText('Test Event 1');
        const testEvent2 = await screen.findByText('Test Event 2');
        const testEvent3 = await screen.findByText('Test Event 3');
        const testEvent4 = await screen.findByText('Test Event 4');
        expect(testEvent1).toBeInTheDocument();
        expect(testEvent2).toBeInTheDocument();
        expect(testEvent3).toBeInTheDocument();
        expect(testEvent4).toBeInTheDocument();
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

      test('tests createEvent for many events', async () => {

        const newEvent1: Event = {
            id: 1,
            title: 'New Event 1',
            startTime: '1AM',
            endTime: '3AM',
            weekday: 'M',
        };
        mockFetchEvents.mockResolvedValueOnce([]);
        mockCreateEvent.mockResolvedValueOnce(newEvent1);
        render(<Calendar/>);

        fireEvent.change(screen.getByPlaceholderText('Event Name'), {
            target: { value: newEvent1.title },
        });
          fireEvent.change(screen.getByLabelText('Start Time'), {
            target: { value: newEvent1.startTime },
        });
          fireEvent.change(screen.getByLabelText('End Time'), {
            target: { value: newEvent1.endTime },
        });
          fireEvent.change(screen.getByLabelText('Day'), {
            target: { value: newEvent1.weekday },
        });

        fireEvent.click(screen.getByText(/Submit/i));
        await waitFor(() => expect(mockCreateEvent).toHaveBeenCalledTimes(1));

        const newEventTitle1 = await screen.findByText(newEvent1.title);
        expect(newEventTitle1).toBeInTheDocument();

        const newEvent2: Event = {
            id: 2,
            title: 'New Event 2',
            startTime: '1AM',
            endTime: '3AM',
            weekday: 'T',
        };
        mockCreateEvent.mockResolvedValueOnce(newEvent2);

        fireEvent.change(screen.getByPlaceholderText('Event Name'), {
            target: { value: newEvent2.title },
        });
          fireEvent.change(screen.getByLabelText('Start Time'), {
            target: { value: newEvent2.startTime },
        });
          fireEvent.change(screen.getByLabelText('End Time'), {
            target: { value: newEvent2.endTime },
        });
          fireEvent.change(screen.getByLabelText('Day'), {
            target: { value: newEvent2.weekday },
        });

        fireEvent.click(screen.getByText(/Submit/i));
        await waitFor(() => expect(mockCreateEvent).toHaveBeenCalledTimes(2));

        const newEventTitle2 = await screen.findByText(newEvent2.title);
        expect(newEventTitle2).toBeInTheDocument();
        expect(newEventTitle1).toBeInTheDocument();


        const newEvent3: Event = {
            id: 3,
            title: 'New Event 3',
            startTime: '1AM',
            endTime: '3AM',
            weekday: 'W',
        };
        mockCreateEvent.mockResolvedValueOnce(newEvent3);

        fireEvent.change(screen.getByPlaceholderText('Event Name'), {
            target: { value: newEvent3.title },
        });
          fireEvent.change(screen.getByLabelText('Start Time'), {
            target: { value: newEvent3.startTime },
        });
          fireEvent.change(screen.getByLabelText('End Time'), {
            target: { value: newEvent3.endTime },
        });
          fireEvent.change(screen.getByLabelText('Day'), {
            target: { value: newEvent3.weekday },
        });

        fireEvent.click(screen.getByText(/Submit/i));
        await waitFor(() => expect(mockCreateEvent).toHaveBeenCalledTimes(3));

        const newEventTitle3 = await screen.findByText(newEvent3.title);
        expect(newEventTitle3).toBeInTheDocument();
        expect(newEventTitle1).toBeInTheDocument();
        expect(newEventTitle2).toBeInTheDocument();

      });

      test('tests deleteEvent', async () => {

        const mockEvents: Event[] = [
            {
              id: 1,
              title: 'Event to Delete',
              startTime: '10AM',
              endTime: '12PM',
              weekday: 'M',
            },
            {
              id: 2,
              title: 'Event to Keep',
              startTime: '1PM',
              endTime: '3PM',
              weekday: 'T',
            },
          ];

          mockFetchEvents.mockResolvedValueOnce(mockEvents);
          mockDeleteEvent.mockResolvedValueOnce(1);
          render(<Calendar/>)
          await waitFor(() => expect(mockFetchEvents).toHaveBeenCalledTimes(1));
          const deleteEvent = await screen.findByText('Event to Delete');
          const keepEvent = await screen.findByText('Event to Keep');
          expect(deleteEvent).toBeInTheDocument();
          expect(keepEvent).toBeInTheDocument();

          const eventTitle = screen.getByText('Event to Delete');
          const eventContent = eventTitle.closest('.event-content') as HTMLElement | null;
          const deleteButton = within(eventContent!).getByTitle('Delete event');
          fireEvent.click(deleteButton);
          await waitFor(() => expect(mockDeleteEvent).toHaveBeenCalledWith(mockEvents[0].id));
          await waitFor(() => expect(screen.queryByText('Event to Delete')).not.toBeInTheDocument());
          expect(screen.getByText('Event to Keep')).toBeInTheDocument();
      });
})


