import styled from 'styled-components'
import { TodoTitle } from './TodoTitle/TodoTitle.tsx'
import React, { useState } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TodoBody } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TodoBody'
import type { DomainTodoLists } from '@/features/todolists/model/todolist-slice'

type TodoItemProps = {
  todoInfo: DomainTodoLists
}

export const TodoColumn = ({ todoInfo }: TodoItemProps) => {
  const [renameStatus, setRenameStatus] = useState<boolean>(false)
  const renameStatusHandler = (value: boolean) => setRenameStatus(value)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todoInfo.id,
    data: {
      type: 'Column',
      todoInfo,
    },
    disabled: renameStatus,
  })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    height: 'min-content',
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

  // const tasksId = useMemo(() => tasksList.map((task) => task.id), [tasksList]);

  if (isDragging) {
    return (
      <ColumnWrapper ref={setNodeRef} style={{ ...style, ...dragStyle }}>
        <StyledTodoItem style={{ opacity: 0 }}>
          <TodoTitle todoInfo={todoInfo} renameStatus={renameStatus} renameStatusHandler={renameStatusHandler} />
          <TodoBody todoInfo={todoInfo} />
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
        <TodoTitle todoInfo={todoInfo} renameStatus={renameStatus} renameStatusHandler={renameStatusHandler} />
        <TodoBody todoInfo={todoInfo} />
      </StyledTodoItem>
    </ColumnWrapper>
  )
}

export const StyledTodoItem = styled.div`
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
