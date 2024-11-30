import { createContext, useState } from "react";
import { Todo } from "../types/types"

interface AppContextType {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const intitialState: AppContextType = {
    todoList: [],
    setTodoList: () => [],
};

export const AppContext = createContext<AppContextType>(intitialState);

export const AppProvider = (props: any) => {
    const [todoList, setTodoList] = useState<Todo[]>(intitialState.todoList);

    return (
        <AppContext.Provider
        value={{
            todoList: todoList, 
            setTodoList: setTodoList,
        }}>
            {props.children}
        </AppContext.Provider>
    );
}