import { useEffect, useRef, useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import styled from "styled-components";

type SubMenu = {
  id: string;
  name: string;
  icon: any;
  action: any;
  isActive: boolean;
};

type PopupPropsType = {
  icon: any;
  subMenu: SubMenu[];
  activeView?: string;
};

export const Popup = ({ icon, subMenu, activeView }: PopupPropsType) => {
  const [showPopup, setShowPopup] = useState(false);
  const ref = useRef<HTMLUListElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Проверяем, был ли клик вне элемента
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };
  const popupMenuClickHandler = () => {
    setShowPopup(!showPopup);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <SubMenuWrapper>
      <DynamicIcon
        name={icon}
        className={showPopup ? "active" : ""}
        size={20}
        onClick={popupMenuClickHandler}
      />
      {showPopup && (
        <SubMenu ref={ref}>
          {subMenu.map((item) => {
            return (
              <li
                key={item.id}
                className={
                  activeView === item.name.toLowerCase() ? "active" : ""
                }
                onClick={item.action}
              >
                <DynamicIcon name={item.icon} size={20} /> {item.name}
              </li>
            );
          })}
        </SubMenu>
      )}
    </SubMenuWrapper>
  );
};

const SubMenuWrapper = styled.div`
  display: flex;
  flex: 0 0 0;
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
    svg {
      margin-right: 5px;
    }
    &:hover {
      background: #eff0f6;
      cursor: pointer;
    }
    &.active {
      background: #eff0f6;
      color: #0052cc;
    }
  }
`;
