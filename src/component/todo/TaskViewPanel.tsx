import { StyledButton } from "../Button.tsx";
import styled from "styled-components";
import { FilterActionType } from "./TodoItem.tsx";

type filterTasksType = {
  filter: (action: FilterActionType) => void;
};

export const TaskViewPanel = ({ filter }: filterTasksType) => {
  return (
    <PanelButtonWrapper>
      <StyledButton onClick={() => filter("all")}>All</StyledButton>
      <StyledButton onClick={() => filter("completed")}>Completed</StyledButton>
      <StyledButton onClick={() => filter("active")}>Active</StyledButton>
    </PanelButtonWrapper>
  );
};

const PanelButtonWrapper = styled.div`
  button + button {
    margin-left: 5px;
  }
`;
