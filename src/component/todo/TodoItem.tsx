import styled from "styled-components";
import { TodoTitle } from "./TodoTitle.tsx";
import { BadgePlus } from "lucide-react";
import { taskType, todoListType } from "../../App.tsx";
import { TaskRow } from "../TaskRow.tsx";
import { useState } from "react";

export type FilterActionType = "all" | "active" | "completed";

type TodoItemProps = {
  todoInfo: todoListType;
  tasksList: taskType[];
  addTask: (title: string, todoListId: string | undefined) => void;
  deleteTask: (id: string) => void;
  deleteTodo: (id: string) => void;
  renameTodo: (id: string, title: string) => void;
  renameTask: (id: string, title: string) => void;
  changeStatus: (id: string) => void;
  toggleColumnMode?: (value: boolean | undefined) => void;
  addColumnMode?: boolean;
  addColumn?: (title: string | undefined) => void;
};

export const TodoItem = ({
  todoInfo,
  tasksList,
  addTask,
  deleteTask,
  deleteTodo,
  renameTodo,
  renameTask,
  changeStatus,
  toggleColumnMode,
  addColumnMode,
  addColumn,
}: TodoItemProps) => {
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [color, setColor] = useState(todoInfo.headLineColor);

  const toggleTaskMode = (value: boolean) => {
    setAddTaskMode(value);
  };

  return (
    <StyledTodoItem style={{ borderTop: `5px solid ${color}` }}>
      <TodoTitle
        id={todoInfo.id}
        title={todoInfo.title}
        toggleColumnMode={toggleColumnMode}
        toggleTaskMode={toggleTaskMode}
        renameTodo={renameTodo}
        deleteTodo={deleteTodo}
        setColorHandler={setColor}
        color={color}
        addColumnMode={addColumnMode}
        addColumn={addColumn}
      />
      {!addColumnMode && (
        <>
          {tasksList.length ? (
            <StyledTodoBody>
              {tasksList.map((item) => {
                return (
                  <TaskRow
                    key={item.id}
                    id={item.id}
                    label={item.title}
                    checked={item.completed}
                    deleteTask={deleteTask}
                    changeStatus={changeStatus}
                    renameTask={renameTask}
                  />
                );
              })}
            </StyledTodoBody>
          ) : (
            <StyledTodoBody>
              <p style={{ marginTop: "10px" }}>There are no tasks</p>
            </StyledTodoBody>
          )}
          {addTaskMode && (
            <div style={!tasksList.length ? { marginTop: "10px" } : {}}>
              <TaskRow
                id={""}
                label={""}
                todoListId={todoInfo.id}
                checked={false}
                toggleTaskMode={toggleTaskMode}
                addTask={addTask}
                deleteTask={deleteTask}
                changeStatus={changeStatus}
                renameTask={renameTask}
              />
            </div>
          )}
          <AddNewTaskBtn onClick={() => toggleTaskMode(true)}>
            <BadgePlus size={15} />
            New task
          </AddNewTaskBtn>
        </>
      )}
    </StyledTodoItem>
  );
};

const StyledTodoBody = styled.ul`
  margin-top: 10px;
`;

const StyledTodoItem = styled.div`
  width: 100%;
  padding: 15px 15px;
  background-color: #ebecf0;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const AddNewTaskBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: #0052cc;
  svg {
    margin-right: 5px;
  }
  &:hover {
    cursor: pointer;
  }
`;
