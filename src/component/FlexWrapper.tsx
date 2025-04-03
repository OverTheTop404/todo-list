import styled from "styled-components";

type FlexWrapperPropsType = {
  justify?: "start" | "center" | "space-between" | "space-around";
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap";
  align?: string;
  gap?: string;
};

export const FlexWrapper = styled.div<FlexWrapperPropsType>`
  display: flex;
  justify-content: ${(props) => props.justify || "start"};
  align-items: ${(props) => props.align || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "0"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  height: 100%;
`;
