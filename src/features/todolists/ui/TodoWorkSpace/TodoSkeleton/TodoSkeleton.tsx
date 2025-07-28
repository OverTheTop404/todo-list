import { InputWrapper } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoTitle/TodoTitle'
import { ColumnWrapper, StyledTodoItem } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoColumn'
import styled, { keyframes } from 'styled-components'
import { TaskSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskSceleton/TaskSceleton'

export const TodoSkeleton = () => {
  return (
    <ColumnWrapper>
      <StyledTodoItem>
        <StyledTitle style={{ borderTop: '5px solid #1ac517' }}>
          <InputWrapper>
            <EmptyTaskRow width="200px" height="20px" borderRadius="10px" style={{ marginBottom: 0 }} />
          </InputWrapper>
          <PanelTitle>
            <SubMenuWrapper />
            <SubMenuWrapper />
          </PanelTitle>
        </StyledTitle>
        <TaskSkeleton taskRows={7} />
        <StyledEmptyBtn>
          <EmptyBtn />
        </StyledEmptyBtn>
      </StyledTodoItem>
    </ColumnWrapper>
  )
}

interface EmptyTaskRowProps {
  width?: string
  height?: string
  borderRadius?: string
  bg?: string
}

const skeleton = keyframes`
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
`

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 15px;
  border-radius: 4px;
`

export const StyledEmptyTask = styled.ul`
  padding: 0 15px;
`
export const EmptyTaskRow = styled.div<EmptyTaskRowProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  overflow: hidden;
  height: ${({ height }) => height || '46px'};
  width: ${({ width }) => width || '100%'};
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  background: ${({ bg }) => bg || '#fff'};
  border: 1px solid #ebecf0;
  margin-bottom: 5px;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #fff 0%, #f3f3f3 50%, #fff 100%);
    animation: ${skeleton} 1s ease-in-out infinite;
  }
`
export const EmptyTaskRowWithoutAnimate = styled.div<EmptyTaskRowProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  position: relative;
  overflow: hidden;
  height: ${({ height }) => height || '13px'};
  width: ${({ width }) => width || '90%'};
  border-radius: ${({ borderRadius }) => borderRadius || '10px'};
  background: ${({ bg }) => bg || '#fff'};
  border: 1px solid #ebecf0;
  margin-bottom: 0;
  z-index: 9;
`
export const StyledEmptyBtn = styled.div`
  padding: 13px 15px 18px;
`
export const EmptyBtn = styled.div`
  position: relative;
  overflow: hidden;
  height: 15px;
  width: 86px;
  border-radius: 10px;
  background: #fff;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #fff 0%, #f3f3f3 50%, #fff 100%);
    animation: ${skeleton} 1s ease-in-out infinite;
  }
`

const SubMenuWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ color }) => color || '#fff'};
  border-radius: 4px;
  width: 24px;
  height: 24px;
  & + & {
    margin-left: 5px;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #fff 0%, #f3f3f3 50%, #fff 100%);
    animation: ${skeleton} 1s ease-in-out infinite;
  }
`
export const SubMenuWrapperWithoutAnimate = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ color }) => color || '#ebecf0'};
  border-radius: 4px;
  width: 20px;
  height: 20px;
  z-index: 9;
  & + & {
    margin-left: 5px;
  }
`
const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
`
