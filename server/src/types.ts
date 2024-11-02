export type Note = {
  noteTitle: string;
  noteContent: string;
};

export type Label = {
  labelName: string;
  labelledNotes: Note[];
};
