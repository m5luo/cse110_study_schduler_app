export type Event = {
    title: string;
    color: string;
    startTime: number;
    endTime: number;
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