import styled from 'styled-components'
import { TodoTitle } from './TodoTitle/TodoTitle.tsx'
import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TodoBody } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TodoBody'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'

type TodoItemProps = {
  todoInfo: TodoListType
}

export const TodoColumn = ({ todoInfo }: TodoItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todoInfo.id,
    data: {
      type: 'Column',
      todoInfo,
    },
    disabled: todoInfo.renameStatus,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // height: 'min-content',
    // height: isDragging ? "100%" : "min-content",
  }
  const subStyle = {
    // height: isDragging ? "100%" : "min-content",
  }
  const dragStyle = {
    border: '2px dashed rgba(55,55,55, 1)',
    zIndex: '-1',
    backgroundColor: 'rgba(31, 31, 31, .6)',
  }

  if (isDragging) {
    return (
      <ColumnWrapper style={{ ...style, ...dragStyle }}>
        <StyledTodoItem style={{ opacity: 0 }}>
          {/*<TodoTitle todoInfo={todoInfo} />*/}
          {/*<TodoBody todoInfo={todoInfo} />*/}
        </StyledTodoItem>
      </ColumnWrapper>
    )
  }

  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <ColumnWrapper onMouseDown={stopHorizontalScrollOnClickColumn} ref={setNodeRef} style={style}>
      <StyledTodoItem style={{ ...subStyle }} {...listeners} {...attributes}>
        <TodoTitle todoInfo={todoInfo} />
        <TodoBody todoInfo={todoInfo} />
      </StyledTodoItem>
      {todoInfo.entityStatus === 'loading' && <EntityStatus />}
    </ColumnWrapper>
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
  flex: 0 0 375px;
`
