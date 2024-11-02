import { Event } from "./types";

interface eventDetails{
    newTitle: string,
    newColor: string;
    newStartTime: number;
    newEndTime: number;
}
const createExpense = (e: eventDetails) => {
    

    // Exercise: Add add new expense to expenses context array
    const newEvent: Event = {
        title: e.newTitle,
        color: e.newColor,
        startTime: e.newStartTime,
        endTime: e.newEndTime,
    };
    return newEvent;
};