import styled from "styled-components";

import { AlignRight, Trash2, Pencil, Palette } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Input } from "../Input.tsx";
import { HexColorPicker } from "react-colorful";

type TodoTitleProps = {
  id: string;
  title: string;
  renameTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
  toggleColumnMode?: (value: boolean | undefined) => void;
  toggleTaskMode: (value: boolean) => void;
  setColorHandler: Dispatch<SetStateAction<string>>;
  color: string;
  addColumnMode?: boolean;
  addColumn?: (title: string | undefined) => void;
};

export const TodoTitle = ({
  id,
  title,
  renameTodo,
  toggleColumnMode,
  toggleTaskMode,
  deleteTodo,
  setColorHandler,
  addColumnMode,
  addColumn,
  color,
}: TodoTitleProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [renameStatus, setRenameStatus] = useState<boolean>(false);
  const refPopup = useRef<HTMLUListElement | null>(null);
  const refPopupColor = useRef<HTMLDivElement | null>(null);

  const handlePopupClickOutside = (event: MouseEvent) => {
    if (refPopup.current && !refPopup.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
    if (
      refPopupColor.current &&
      !refPopupColor.current.contains(event.target as Node)
    ) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handlePopupClickOutside);
    return () => {
      document.removeEventListener("mouseup", handlePopupClickOutside);
    };
  }, []);

  const inputHandler = () => {
    setRenameStatus(false);
  };

  const titlePencilHandler = () => {
    setShowPopup(false);
    setRenameStatus(true);
  };

  return (
    <>
      <StyledTitle>
        {renameStatus || title === "" ? (
          <InputWrapper>
            <Input
              id={id}
              title={title}
              toggleColumnMode={toggleColumnMode}
              toggleTaskMode={toggleTaskMode}
              inputHandler={inputHandler}
              callBackRename={renameTodo}
              addColumn={addColumn}
            />
          </InputWrapper>
        ) : (
          <TitleWrapper>
            <TitleText>{title}</TitleText>
            <Pencil size={15} onClick={titlePencilHandler} />
          </TitleWrapper>
        )}
        {!addColumnMode && (
          <PanelTitle>
            <SubMenuWrapper>
              <Palette
                size={20}
                className={showColorPicker ? "active" : ""}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              {showColorPicker && (
                <ColorMenu ref={refPopupColor}>
                  <HexColorPicker color={color} onChange={setColorHandler} />
                </ColorMenu>
              )}
            </SubMenuWrapper>
            <SubMenuWrapper>
              <AlignRight
                size={20}
                className={showPopup ? "active" : ""}
                onClick={() => setShowPopup(!showPopup)}
              />
              {showPopup && (
                <SubMenu ref={refPopup}>
                  <li onClick={titlePencilHandler}>
                    <Pencil size={20} /> Rename
                  </li>
                  <li onClick={() => deleteTodo(id)}>
                    <Trash2 size={20} /> Delete
                  </li>
                </SubMenu>
              )}
            </SubMenuWrapper>
          </PanelTitle>
        )}
      </StyledTitle>
    </>
  );
};

const ColorMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 150px;
  width: max-content;
  height: auto;
  background: #fff;
  padding: 0;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 0 3px 0;
`;

const TitleText = styled.span`
  font-size: 19px;
  margin-right: 5px;
  //border-bottom: 1px solid #ebecf0;
  font-weight: 500;
`;
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  svg {
    position: relative;
    top: 0;
    width: 20px;
    height: 20px;
    padding: 3px 0 1px;
    opacity: 0;
  }
  &:hover svg {
    opacity: 1;
  }
  svg:hover {
    color: #0052cc;
    cursor: pointer;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  input {
    width: 95%;
    font-weight: 500;
    background: transparent;
    border: 0;
    font-size: 19px;
    padding: 0;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
    & > ul {
      position: absolute;
      top: -10px;
      left: 100%;
      display: none;
      margin-top: 0;
    }
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #667085;
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
