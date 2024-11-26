export type User = {
    username: string;
    password: string;
    email: string;
};

export type UserCredentials = {
    id: number,
    username: string,
    password: string,
    token: string
};

export type Event = {
    title: string;
    id: number;
    startTime: string;
    endTime: string;
    weekday: string;
};
