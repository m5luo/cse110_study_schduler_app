export type User = {
  username: string;
  password: string;
  email: string;
};

export type UserCredentials = {
  user_id: number;
  username: string;
  password: string;
  token: string;
};

export type Event = {
  title: string;
  id: number;
  startTime: string;
  endTime: string;
  weekday: string;
};

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type Note = {
  note_id: number;
  // user_id: number;
  title: string;
  content: string;
};

export type noteCount = {
  count: number;
};