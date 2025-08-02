import styled from 'styled-components'
import { TodoTitle } from './TodoTitle/TodoTitle.tsx'
import React from 'react'
import { TodoBody } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TodoBody'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { Draggable } from '@hello-pangea/dnd'

type TodoItemProps = {
  todoInfo: TodoListType
  index: number
}

export const TodoColumn = ({ todoInfo, index }: TodoItemProps) => {
  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <Draggable draggableId={todoInfo.id} index={index}>
      {(provided) => (
        <ColumnWrapper ref={provided.innerRef} {...provided.draggableProps} onMouseDown={stopHorizontalScrollOnClickColumn}>
          <StyledTodoItem>
            <TodoTitle todoInfo={todoInfo} dragHandleProps={provided.dragHandleProps} />
            <TodoBody todoInfo={todoInfo} />
          </StyledTodoItem>
          {todoInfo.entityStatus === 'loading' && <EntityStatus />}
        </ColumnWrapper>
      )}
    </Draggable>
  )
}

export const StyledTodoItem = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 0 5px 0;
  background-color: #ebecf0;
`

export const ColumnWrapper = styled.div`
  border-radius: 4px;
  position: relative;
  width: 375px;
  display: inline-flex;
  margin-right: 30px;
  height: min-content;
`
