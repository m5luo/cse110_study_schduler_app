import { createContext, useState } from "react";
import { Event } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const initialState: AppContextType = {
  events: [],
  setEvents: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [events, setEvents] = useState<Event[]>(initialState.events);

  return (
    <AppContext.Provider
      value={{
        events: events,
        setEvents: setEvents,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
