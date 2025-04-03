import styled from "styled-components";
import { TaskRow } from "../TaskRow.tsx";
import { taskType } from "../../App.tsx";

type TodoBodyProps = {
  taskList: taskType[];
  deleteTask: (id: string) => void;
  changeStatus: (id: string) => void;
  renameTask: (id: string, title: string) => void;
};

export const TodoBody = ({
  taskList,
  deleteTask,
  changeStatus,
  renameTask,
}: TodoBodyProps) => {
  return (
    <StyledTodoBody>
      {taskList.map((item) => {
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
  );
};

const StyledTodoBody = styled.ul`
  margin-top: 10px;
  //margin-bottom: 10px;
`;
