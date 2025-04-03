import { noteType } from "../../App.tsx";
import styled from "styled-components";

type NotesType = {
  notes: noteType[];
};

export const TodoNote = ({ notes }: NotesType) => {
  return (
    <NotesWrapper>
      {notes.map((note) => {
        return (
          <NoteContent>
            <NoteIcon>asd</NoteIcon>
            <NoteText>{note.text}</NoteText>
          </NoteContent>
        );
      })}
    </NotesWrapper>
  );
};

const NotesWrapper = styled.div``;

const NoteContent = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
`;

const NoteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 50px;
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const NoteText = styled.div`
  flex: 1 1 0;
  padding: 15px 15px;
  background-color: rgba(31, 31, 31, 0.8);
  color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-left: 10px;
`;
