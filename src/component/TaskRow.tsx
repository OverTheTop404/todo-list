import styled from "styled-components";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { InputWrapper, TitleWrapper } from "./todo/TodoTitle.tsx";
import { Input } from "./Input.tsx";
import { useEffect, useRef, useState } from "react";

type StyledInputProps = {
  checked: boolean;
  label: string;
  changeStatus: (id: string) => void;
  id: string;
  todoListId?: string;
  addTask?: (title: string, todoListId: string | undefined) => void;
  deleteTask: (id: string) => void;
  renameTask: (id: string, title: string) => void;
  toggleTaskMode?: (value: boolean) => void;
};

export const TaskRow = ({
  checked,
  label,
  addTask,
  changeStatus,
  deleteTask,
  renameTask,
  toggleTaskMode,
  id,
  todoListId,
}: StyledInputProps) => {
  const [renameStatus, setRenameStatus] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const refPopup = useRef<HTMLUListElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (refPopup.current && !refPopup.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const popupMenuClickHandler = () => {
    setShowPopup(!showPopup);
  };

  const inputHandler = () => {
    setRenameStatus(false);
  };

  const titlePencilHandler = () => {
    setShowPopup(false);
    setRenameStatus(true);
  };

  return (
    <StyledRow className={checked ? "checkedView" : ""}>
      {renameStatus || label === "" ? (
        <TitleWrapper className={"edit"}>
          <StyledInput
            type={"checkbox"}
            checked={checked}
            disabled={renameStatus}
          />
          <InputLabel />
          <InputWrapper>
            <Input
              id={id}
              todoListId={todoListId}
              title={label}
              addTask={addTask}
              toggleTaskMode={toggleTaskMode}
              callBackRename={renameTask}
              inputHandler={inputHandler}
            />
          </InputWrapper>
        </TitleWrapper>
      ) : (
        <TitleWrapper>
          <StyledInput
            type={"checkbox"}
            checked={checked}
            disabled={renameStatus}
          />
          <InputLabel onClick={() => changeStatus(id)}></InputLabel>
          <div>
            <LabelText onClick={() => changeStatus(id)}>{label}</LabelText>
            <Pencil size={20} onClick={titlePencilHandler} />
          </div>
        </TitleWrapper>
      )}
      <PanelTitle>
        <SubMenuWrapper>
          <EllipsisVertical
            size={20}
            className={showPopup ? "active" : ""}
            onClick={popupMenuClickHandler}
          />
          {showPopup && (
            <SubMenu ref={refPopup}>
              <li onClick={titlePencilHandler}>
                <Pencil size={20} /> Rename
              </li>
              <li onClick={() => deleteTask(id)}>
                <Trash2 size={20} /> Delete
              </li>
            </SubMenu>
          )}
        </SubMenuWrapper>
      </PanelTitle>
    </StyledRow>
  );
};

const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  color: grey;
  position: relative;
  & + & {
    margin-left: 5px;
  }
  & > svg.active {
    color: #0052cc;
  }
  &:hover > svg {
    cursor: pointer;
    color: #0052cc;
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 150px;
  width: max-content;
  height: auto;
  background: #fff;
  padding: 10px 0;
  border-radius: 4px;
  z-index: 999;
  box-shadow: 0 0 3px 0;
  li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #667085;
    font-size: 16px;
    & > ul {
      position: absolute;
      top: -10px;
      left: 100%;
      display: none;
      margin-top: 0;
    }
    svg {
      margin-right: 5px;
    }
    &:hover {
      background: #eff0f6;
      cursor: pointer;
      color: #0052cc;
      > ul {
        display: block;
      }
    }
    &.active {
      background: #eff0f6;
      color: #0052cc;
    }
  }
`;
const LabelText = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
const InputLabel = styled.label`
  flex: 0 0 0;
  position: relative;
  top: -50%;
`;

const StyledRow = styled.li`
  display: flex;
  justify-content: space-between;
  //line-height: 1.4;
  background: #fff;
  margin-bottom: 5px;
  padding: 10px 2px 10px 10px;
  font-size: 18px;
  border-radius: 4px;
  position: relative;
  &.checkedView {
    ${TitleWrapper} {
      color: #aaa;
      text-decoration: line-through;
      & svg {
        color: initial;
      }
      &.edit {
        color: initial;
        text-decoration: none;
      }
    }
  }

  &:hover &:before {
    display: none;
  }
  ${InputWrapper} {
    flex: 1 1 0;
    input {
      font-weight: 400;
      font-size: 18px;
    }
  }
  ${TitleWrapper} {
    flex: 1 1 0;
    height: auto;
    min-height: 24px;
    //position: relative;
    //top: -1px;
    svg {
      padding: 2px 0 1px;
      margin-left: 2px;
      height: 19px;
      top: 3px;
    }
  }
  .trash {
    color: #bfbfbf;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  &:hover svg {
    opacity: 1;
  }
`;

const StyledInput = styled.input`
  &[type="checkbox"]:checked,
  &[type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &[type="checkbox"]:checked + label,
  &[type="checkbox"]:not(:checked) + label {
    //display: inline-block;
    //position: relative;
    padding-left: 28px;
    line-height: 20px;
    cursor: pointer;
  }
  &[type="checkbox"]:checked + label:before,
  &[type="checkbox"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 2px;
    width: 20px;
    height: 20px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
  }

  &[type="checkbox"]:checked + label:before,
  &[type="checkbox"]:not(:checked) + label:before {
    border-radius: 2px;
  }
  &[type="checkbox"]:checked + label:after,
  &[type="checkbox"]:not(:checked) + label:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &[type="checkbox"]:checked + label:after,
  &[type="checkbox"]:not(:checked) + label:after {
    left: 3px;
    top: 6px;
    width: 14px;
    height: 9px;
    border-radius: 1px;
    border-left: 4px solid #41c21f;
    border-bottom: 4px solid #41c21f;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  &[type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
  }

  &[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;
