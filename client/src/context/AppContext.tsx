import { createContext, useState } from "react";
import { Event, Todo } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const initialState: AppContextType = {
  events: [],
  setEvents: () => {},
  todoList: [],
  setTodoList: () => [],
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [events, setEvents] = useState<Event[]>(initialState.events);
  const [todoList, setTodoList] = useState<Todo[]>(initialState.todoList);

  return (
    <AppContext.Provider
      value={{
        events: events,
        setEvents: setEvents,
        todoList: todoList,
        setTodoList: setTodoList,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
