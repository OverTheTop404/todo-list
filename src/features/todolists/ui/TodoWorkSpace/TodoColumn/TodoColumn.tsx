import styled from 'styled-components'
import { TodoTitle } from './TodoTitle/TodoTitle.tsx'
import React, { useEffect } from 'react'
import { TodoBody } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TodoBody'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { Draggable } from '@hello-pangea/dnd'
import { useGetTasksQuery } from '@/features/todolists/api/tasksSbApi'

type TodoItemProps = {
  todoInfo: TodoListType
  index: number
  onTasksLoaded?: (tasks: any[]) => void
}

export const TodoColumn = ({ todoInfo, index, onTasksLoaded }: TodoItemProps) => {
  const { data: tasks } = useGetTasksQuery({ list_id: todoInfo.id })

  useEffect(() => {
    if (tasks && onTasksLoaded) {
      onTasksLoaded(tasks)
    }
  }, [tasks, onTasksLoaded, todoInfo.id])

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
  max-width: 375px;
`

export const ColumnWrapper = styled.div`
  border-radius: 4px;
  position: relative;
  min-width: 375px;
  display: inline-flex;
  margin-right: 30px;
  height: min-content;
`
