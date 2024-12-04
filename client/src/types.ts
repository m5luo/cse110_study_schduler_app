export type Event = {
    id: number
    title: string;
    startTime: string;
    endTime: string;
    weekday: string;
};

export type User = {
    username: string;
    password: string;
    id: number;
};

export type Note = {
    noteId: number;
    userId: number;
    title: string;
    content: string;
}