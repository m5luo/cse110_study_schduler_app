import { API_BASE_URL } from "../constants";
import { Event } from "../types/types";

// Function to create an expense in the backend. Method: POST
export const createEvent = async (token: string, event: Event): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.json();
};

// Function to delete an expense in the backend. Method: DELETE
export const deleteEvent = async (token: string, title: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/events/${title}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete event");
  }
};

// Function to get all expenses from the backend. Method: GET
export const fetchEvents = async (token: string): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  // Parsing the response to get the data
  let eventList = response.json().then((jsonResponse) => {
    console.log("data in fetchEvents", jsonResponse);
    return jsonResponse.data;
  });

  console.log("response in fetchExpenses", eventList);
  return eventList;
};
