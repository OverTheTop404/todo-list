import styled from "styled-components";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

type StyledInputProps = {
  title?: string;
  placeholder?: string;
  callBackRename?: (id: string, title: string) => void;
  toggleColumnMode?: (value: boolean | undefined) => void;
  toggleTaskMode?: (value: boolean) => void;
  addTask?: (title: string, todoListId: string | undefined) => void;
  inputHandler: () => void;
  id: string;
  todoListId?: string;
  addColumn?: (title: string | undefined) => void;
};

export const Input = ({
  id,
  todoListId,
  title,
  placeholder,
  addTask,
  inputHandler,
  toggleColumnMode,
  addColumn,
  toggleTaskMode,
  callBackRename,
}: StyledInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  let [letter, setLetter] = useState<string>(title ? title : "");

  const letterTrim = letter.replace(/\s+/g, " ").trim();

  const currentLetter = (e: ChangeEvent<HTMLInputElement>) => {
    setLetter(e.currentTarget.value);
  };

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputHandler();
      toggleColumnMode && toggleColumnMode(false);
      toggleTaskMode && toggleTaskMode(false);
    }
    if (e.key === "Enter" && letterTrim.length && title === "") {
      addTask && addTask(letterTrim, todoListId);
      addColumn && addColumn(letterTrim);
    }
    if (
      e.key === "Enter" &&
      title?.length &&
      letterTrim.length &&
      title !== letterTrim
    ) {
      callBackRename && callBackRename(id, letterTrim);
    }
  };

  const onBlurInputHandler = () => {
    inputHandler();
    toggleColumnMode && toggleColumnMode(false);
    toggleTaskMode && toggleTaskMode(false);
    if (letterTrim.length && title === "") {
      addTask && addTask(letterTrim, todoListId);
      addColumn && addColumn(letterTrim);
    }
    if (title?.length && letterTrim.length && title !== letterTrim) {
      callBackRename && callBackRename(id, letterTrim);
    }
  };

  return (
    <>
      <StyledInput
        autoFocus
        ref={ref}
        type={"text"}
        value={letter}
        className={"editInput"}
        placeholder={placeholder ? placeholder : "Enter a name"}
        onChange={currentLetter}
        onKeyDown={keyPressHandler}
        onBlur={onBlurInputHandler}
      />
    </>
  );
};

const StyledInput = styled.input`
  font-size: 14px;
  padding: 4px 5px;
`;

// const StyledButton = styled.button`
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   width: auto;
//   padding: 4px 15px;
//   background: #0052cc;
//   border: 0;
//   border-radius: 4px;
//   color: #fff;
//   &:hover {
//     cursor: pointer;
//   }
// `;
