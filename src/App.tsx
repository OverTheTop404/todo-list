import { FilterActionType, TodoItem } from "./component/todo/TodoItem.tsx";
import styled from "styled-components";
import { CircleFadingPlus } from "lucide-react";
import { v1 } from "uuid";
import domWrap from "./assets/images/domik-wrap.jpg";
import { MainMenu } from "./component/structure/MainMenu.tsx";
import { TopLine } from "./component/structure/TopLine.tsx";
import React, { useRef, useState } from "react";
import { SortPanel } from "./component/structure/SortPanel.tsx";
import { TodoNote } from "./component/todo/TodoNote.tsx";

const list1 = v1();
const list2 = v1();
const list3 = v1();
const list4 = v1();

export type todoListType = {
  id: string;
  title: string;
  order: number;
  addedDate: string;
  headLineColor: string;
  bodyColor: string;
  width: string;
};
export type taskType = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status: number;
  priority: number;
  order: number;
  startDate: string;
  addedDate: string;
  deadline: string;
  todoListId: string;
};
export type noteType = {
  id: string;
  text: string;
  todoListId: string;
};

const todoListsStructure: todoListType[] = [
  {
    id: list1,
    title: "Schedule",
    order: 2,
    addedDate: "2019-07-30T12:24:15.063",
    headLineColor: "#1ac517",
    bodyColor: "rgb(255, 255, 255, .2)",
    width: "400px",
  },
  {
    id: list2,
    title: "What to learn",
    order: 1,
    addedDate: "2019-07-30T12:24:15.063",
    headLineColor: "#1363da",
    bodyColor: "rgb(255, 255, 255, .2)",
    width: "400px",
  },
  {
    id: list3,
    title: "Watch",
    order: 3,
    addedDate: "2019-07-30T12:24:15.063",
    headLineColor: "#ff3737",
    bodyColor: "rgb(255, 255, 255, .2)",
    width: "400px",
  },
  {
    id: list4,
    title: "What to buy",
    order: 2,
    addedDate: "2019-07-30T12:24:15.063",
    headLineColor: "#b210f5",
    bodyColor: "rgb(255, 255, 255, .2)",
    width: "400px",
  },
];
const tasksStructure = [
  {
    id: v1(),
    title: "Wake up and breakfast",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Homework and study",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Fix the car",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Work",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Lunch",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "19:00-22:00 attend in it-incubator lesson",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Dinner",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Chill",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Homework and study 2",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Fix the car 2",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Work 2",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list1,
  },
  {
    id: v1(),
    title: "Html",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list2,
  },
  {
    id: v1(),
    title: "Css",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list2,
  },
  {
    id: v1(),
    title: "JS",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list2,
  },
  {
    id: v1(),
    title: "React",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list2,
  },
  {
    id: v1(),
    title: "Learn English: Present Simple",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list2,
  },
  {
    id: v1(),
    title: "IT синяк",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "IT-kamasutra",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Arcane",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Rick and Morty",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Game Of Throne",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Fallout",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Fringe of the future",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "The Gorge",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },
  {
    id: v1(),
    title: "Mickey 17",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list3,
  },

  {
    id: v1(),
    title: "Beer",
    description: "",
    completed: true,
    status: 1,
    priority: 1,
    order: 1,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list4,
  },
  {
    id: v1(),
    title: "Meat",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 2,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list4,
  },
  {
    id: v1(),
    title: "Cheese",
    description: "",
    completed: false,
    status: 1,
    priority: 1,
    order: 2,
    startDate: "2019-07-30T12:24:15.063",
    addedDate: "2019-07-30T12:24:15.063",
    deadline: "2019-07-30T12:24:15.063",
    todoListId: list4,
  },
];
const notesStructure = [
  {
    id: v1(),
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur culpa molestiae molestias.",
    todoListId: list1,
  },
];

// const [tasks, setTasks] = useState({
//   [list1]: [
//     { id: v1(), title: "Html", completed: true },
//     { id: v1(), title: "Css", completed: false },
//   ],
//   [list2]: [
//     { id: v1(), title: "8:00 wake up and breakfast", completed: true },
//     { id: v1(), title: "Homework and study", completed: true },
//     { id: v1(), title: "Fix the car", completed: true },
//     { id: v1(), title: "Work", completed: true },
//     {
//       id: v1(),
//       title: "19:00-22:00 attend in it-incubator lesson",
//       completed: false,
//     },
//     { id: v1(), title: "Chill", completed: false },
//   ],
//   [list3]: [
//     { id: v1(), title: "JS", completed: true },
//     { id: v1(), title: "React", completed: false },
//   ],
//   [list4]: [
//     { id: v1(), title: "Present Simple", completed: true },
//     { id: v1(), title: "Present Perfect", completed: false },
//   ],
//   [list5]: [
//     { id: v1(), title: "IT синяк", completed: true },
//     { id: v1(), title: "IT-kamasutra", completed: false },
//   ],
//   [list6]: [
//     { id: v1(), title: "Arcane", completed: true },
//     { id: v1(), title: "Game Of Throne", completed: true },
//     { id: v1(), title: "How I Meet Your Mother", completed: true },
//     { id: v1(), title: "Fringe of the future", completed: false },
//   ],
//   [list7]: [],
//   [list8]: [
//     { id: v1(), title: "Arcane", completed: true },
//     { id: v1(), title: "Game Of Throne", completed: true },
//     { id: v1(), title: "How I Meet Your Mother", completed: true },
//     { id: v1(), title: "Fringe of the future", completed: false },
//   ],
//   [list9]: [],
// })

export const App = () => {
  const [todoLists, setTodoLists] =
    useState<Array<todoListType>>(todoListsStructure);
  const [tasks, setTasks] = useState<Array<taskType>>(tasksStructure);
  const [notes, setNotes] = useState<Array<noteType>>(notesStructure);
  const [viewTask, setViewTask] = useState<FilterActionType>("all");

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };
  const deleteTodo = (id: string) => {
    setTodoLists(todoLists.filter((item) => item.id !== id));
    setTasks(tasks.filter((item) => item.todoListId !== id));
  };
  const renameTodo = (id: string, title: string) => {
    setTodoLists([
      ...todoLists.map((item) =>
        item.id === id ? { ...item, title: title } : item,
      ),
    ]);
  };
  const renameTask = (id: string, title: string) => {
    setTasks([
      ...tasks.map((item) =>
        item.id === id ? { ...item, title: title } : item,
      ),
    ]);
  };
  const changeStatus = (id: string) => {
    setTasks([
      ...tasks.map((item) => {
        return item.id === id ? { ...item, completed: !item.completed } : item;
      }),
    ]);
  };

  const [addColumnMode, setAddColumnMode] = useState(false);

  const toggleColumnMode = (value: boolean | undefined) => {
    value !== undefined && setAddColumnMode(value);
  };

  const addColumn = (title: string | undefined) => {
    if (title) {
      setTodoLists([
        {
          id: v1(),
          title: title,
          order: todoLists.length + 1,
          addedDate: "2019-07-30T12:24:15.063",
          headLineColor: "#1ac517",
          bodyColor: "rgb(255, 255, 255, .2)",
          width: "400px",
        },
        ...todoLists,
      ]);
    }
  };

  const addTask = (title: string, todoListId: string | undefined) => {
    if (todoListId && title) {
      setTasks([
        ...tasks,
        {
          id: v1(),
          title: title,
          description: "",
          completed: false,
          status: 0,
          priority: 0,
          order: tasks.length + 1,
          startDate: "2019-07-30T12:24:15.063",
          addedDate: "2019-07-30T12:24:15.063",
          deadline: "2019-07-30T12:24:15.063",
          todoListId: todoListId,
        },
      ]);
    }
  };

  const addNotice = () => {};

  let tasksCopy = tasks;

  const sortTasks = (action: boolean) => {
    setTasks([
      ...tasksCopy.sort((a, b) => {
        return a.completed === b.completed
          ? 0
          : action
            ? a.completed
              ? -1
              : 1
            : a.completed
              ? 1
              : -1;
      }),
    ]);
  };

  if (viewTask === "active") {
    tasksCopy = tasks.filter((item) => !item.completed);
  }

  if (viewTask === "completed") {
    tasksCopy = tasks.filter((item) => item.completed);
  }

  const filterTasks = (action: FilterActionType) => {
    setViewTask(action);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX; // Скорость прокрутки
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleChildMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Остановить всплытие события
  };

  return (
    <Application>
      <MainMenu />
      <WorkSpace>
        <TopLine />
        <StyledSection
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            cursor: isDragging ? "grab" : "auto",
          }}
        >
          <TodoColumn style={{ flex: "0 0 50px" }}>
            <SortPanel
              sortTasks={sortTasks}
              addColumn={toggleColumnMode}
              filter={filterTasks}
              activeView={viewTask}
            />
          </TodoColumn>
          {addColumnMode && (
            <TodoColumn onMouseDown={handleChildMouseDown}>
              <TodoItem
                todoInfo={{
                  id: "",
                  title: "",
                  order: todoLists.length,
                  addedDate: "2019-07-30T12:24:15.063",
                  headLineColor: "#1ac517",
                  bodyColor: "rgb(255, 255, 255, .2)",
                  width: "400px",
                }}
                tasksList={[]}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteTodo={deleteTodo}
                renameTodo={renameTodo}
                renameTask={renameTask}
                changeStatus={changeStatus}
                addColumnMode={addColumnMode}
                toggleColumnMode={toggleColumnMode}
                addColumn={addColumn}
              />
            </TodoColumn>
          )}
          {todoLists.map((item) => {
            return (
              <TodoColumn key={item.id} onMouseDown={handleChildMouseDown}>
                <TodoItem
                  todoInfo={item}
                  tasksList={tasksCopy.filter(
                    (task) => task.todoListId === item.id,
                  )}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  deleteTodo={deleteTodo}
                  renameTodo={renameTodo}
                  renameTask={renameTask}
                  changeStatus={changeStatus}
                />
                {/*<TodoNote*/}
                {/*  notes={notes.filter(*/}
                {/*    (notice) => notice.todoListId === item.id,*/}
                {/*  )}*/}
                {/*/>*/}

                <NewBox title={"Add a notice"} onClick={() => addNotice()}>
                  <CircleFadingPlus size={20} />
                  <span>Add a notice</span>
                </NewBox>
              </TodoColumn>
            );
          })}
        </StyledSection>
      </WorkSpace>
    </Application>
  );
};

const NewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

const StyledSection = styled.div`
  display: flex;
  flex: 1 1 0;
  gap: 30px;
  position: relative;
  padding: 30px;
  height: 100%;
  z-index: 1;
  overflow-x: auto;
`;

const WorkSpace = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: nowrap;
  flex-direction: column;
  user-select: none;
  cursor: default;
  overflow: hidden;
  //overflow: hidden;
  //height: 100%;
`;

const Application = styled.div`
  background: url(${domWrap}) 50% 50% no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  & > div {
    z-index: 1;
  }
  &:before {
    content: "";
    position: absolute;
    background-color: #000;
    opacity: 0.7;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const TodoColumn = styled.div`
  height: min-content;
  border-radius: 4px;
  position: relative;
  flex: 0 0 375px;
`;

// const ColumnTitle = styled.div`
//   width: 100%;
//   padding: 10px 20px;
//   border-top-left-radius: 4px;
//   border-top-right-radius: 4px;
//   //position: sticky;
//   //top: 0;
// `;
// const ColumnBody = styled.div`
//   width: 100%;
//   padding: 20px;
// `;
