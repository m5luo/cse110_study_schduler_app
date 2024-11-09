export type Note = {
  noteTitle: string;
  noteContent: string;
};

export type Label = {
  labelName: string;
  labelledNotes: Note[];
};

export type TodoItem = {
  id: string;
  content: string;
}

export type TodoList = {
  items: TodoItem[];
};
