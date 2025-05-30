import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import { BadgePlus } from 'lucide-react'
import { useAppSelector } from '@/common/hooks/useAppSelector'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { FakeRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/FakeRow/FakeRow'
import { fetchTaskTC, selectTasks } from '@/features/todolists/model/tasks-slice'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { selectViewTask } from '@/features/todolists/model/utility-slice'
import { TaskStatus } from '@/common/enums/enams'

type Props = {
  todoInfo: TodoListType
}

export const TodoBody = ({ todoInfo }: Props) => {
  const dispatch = useAppDispatch()

  const tasks = useAppSelector(selectTasks)
  const isFetched = tasks.some((task) => task.todoListId === todoInfo.id)

  useEffect(() => {
    !isFetched && dispatch(fetchTaskTC(todoInfo.id))
  }, [])

  const viewTask = useAppSelector(selectViewTask)

  let filteredTasksCopy = tasks
  if (viewTask === 'active') filteredTasksCopy = tasks.filter((item) => item.status === TaskStatus.New)
  if (viewTask === 'completed') filteredTasksCopy = tasks.filter((item) => item.status === TaskStatus.Completed)

  const [addTaskMode, setAddTaskMode] = useState(false)
  const toggleTaskMode = (value: boolean) => setAddTaskMode(value)

  const taskForThisColumn = filteredTasksCopy.filter((task) => task.todoListId === todoInfo.id)
  return (
    <>
      <StyledTodoBody>
        {taskForThisColumn.length ? (
          <SortableContext items={filteredTasksCopy} strategy={verticalListSortingStrategy}>
            {taskForThisColumn.map((task) => {
              return <TaskRow key={task.id} taskInfo={task} />
            })}
          </SortableContext>
        ) : (
          <p style={{ marginBottom: `${addTaskMode ? '10px' : '0'}` }}>There are no tasks</p>
        )}
        {addTaskMode && <FakeRow todoListId={todoInfo.id} toggleTaskMode={toggleTaskMode} />}
      </StyledTodoBody>
      <AddNewTaskBtn onClick={() => toggleTaskMode(true)}>
        <BadgePlus size={15} /> New task
      </AddNewTaskBtn>
    </>
  )
}

const StyledTodoBody = styled.ul`
  padding: 0 15px;
`

const AddNewTaskBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 15px;
  color: #0052cc;

  svg {
    margin-right: 5px;
  }

  &:hover {
    cursor: pointer;
  }
`
