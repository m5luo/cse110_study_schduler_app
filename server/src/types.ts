export type Event = {
  title: string;
  id: number;
  startTime: string;
  endTime: string;
  weekday: string;
};

export type User = {
  username: string;
  password: string;
  id: number;
};

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type Note = {
  noteId: number;
  userId: number;
  title: string;
  content: string;
};
