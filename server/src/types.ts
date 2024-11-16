export type User = {
  username: string;
  password: string;
  id: number;
};

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}
