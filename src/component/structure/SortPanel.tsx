import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownWideNarrow,
  CircleFadingPlus,
  Filter,
  SquareCheckBig,
  SquareDashed,
  SquareMenu,
} from "lucide-react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FilterActionType } from "../todo/TodoItem.tsx";

type SortType = {
  sortTasks: (action: boolean) => void;
  addColumn: (value: boolean) => void;
  filter: (action: FilterActionType) => void;
  activeView: string;
};

export const SortPanel = ({
  sortTasks,
  addColumn,
  filter,
  activeView,
}: SortType) => {
  const [sortPopup, setSortPopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);

  const refSort = useRef<HTMLUListElement | null>(null);
  const refFilter = useRef<HTMLUListElement | null>(null);

  const [activeSort, setActiveSort] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (refSort.current && !refSort.current.contains(event.target as Node)) {
      setSortPopup(false);
    }
    if (
      refFilter.current &&
      !refFilter.current.contains(event.target as Node)
    ) {
      setFilterPopup(false);
    }
  };

  const sortMenuClickHandler = () => {
    setSortPopup(!sortPopup);
  };

  const filterMenuClickHandler = () => {
    setFilterPopup(!sortPopup);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const sortHandler = (direction: boolean) => {
    setActiveSort(direction);
    sortTasks(direction);
  };

  return (
    <>
      <PanelBtnWrapper>
        <PanelBtn
          title={"Create new task list"}
          onClick={() => addColumn(true)}
        >
          <CircleFadingPlus size={20} />
        </PanelBtn>
      </PanelBtnWrapper>
      <PanelBtnWrapper>
        <PanelBtn
          title={"Sort task list"}
          className={sortPopup ? "active" : ""}
          onClick={sortMenuClickHandler}
        >
          <ArrowDownWideNarrow size={20} />
        </PanelBtn>
        {sortPopup && (
          <SubMenu ref={refSort}>
            <li
              className={activeSort ? "active" : ""}
              onClick={() => sortHandler(true)}
            >
              <ArrowDown10 size={20} /> Firstly is done
            </li>
            <li
              className={!activeSort ? "active" : ""}
              onClick={() => sortHandler(false)}
            >
              <ArrowDown01 size={20} /> Firstly isn`t done
            </li>
          </SubMenu>
        )}
      </PanelBtnWrapper>
      <PanelBtnWrapper>
        <PanelBtn
          title={"Filter task list"}
          className={filterPopup ? "active" : ""}
          onClick={filterMenuClickHandler}
        >
          <Filter size={20} />
        </PanelBtn>
        {filterPopup && (
          <SubMenu ref={refFilter}>
            <li
              className={activeView === "all" ? "active" : ""}
              onClick={() => filter("all")}
            >
              <SquareMenu size={20} /> All
            </li>
            <li
              className={activeView === "completed" ? "active" : ""}
              onClick={() => filter("completed")}
            >
              <SquareCheckBig size={20} /> Completed
            </li>
            <li
              className={activeView === "active" ? "active" : ""}
              onClick={() => filter("active")}
            >
              <SquareDashed size={20} /> Active
            </li>
          </SubMenu>
        )}
      </PanelBtnWrapper>
    </>
  );
};
const PanelBtnWrapper = styled.div`
  position: relative;
`;

const PanelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.5);
  padding: 10px;
  font-weight: bold;
  transition: background-color 200ms ease-out;
  margin-bottom: 10px;
  &:hover,
  &.active {
    cursor: pointer;
    background-color: rgb(255, 255, 255, 1);
  }
  span {
    margin-left: 5px;
    font-weight: 400;
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 0px;
  left: 115%;
  margin-top: 0;
  min-width: 150px;
  width: max-content;
  font-weight: 400;
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
