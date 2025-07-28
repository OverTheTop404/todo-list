import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import { BadgePlus } from 'lucide-react'
import { useAppSelector } from '@/common/hooks/useAppSelector'

import styled from 'styled-components'
import { FakeRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/FakeRow/FakeRow'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { selectViewTask } from '@/features/todolists/model/utility-slice'
import { TaskStatus } from '@/common/enums/enams'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'
import { TaskSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskSceleton/TaskSceleton'
import { EmptyBtn, StyledEmptyBtn } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type Props = {
  todoInfo: TodoListType
}

export const TodoBody = ({ todoInfo }: Props) => {
  const dispatch = useAppDispatch()
  const viewTask = useAppSelector(selectViewTask)

  const { data: tasks, isLoading } = useGetTasksQuery(todoInfo.id)

  let filteredTasksCopy = tasks?.items
  if (viewTask === 'active') filteredTasksCopy = tasks?.items.filter((item) => item.status === TaskStatus.New)
  if (viewTask === 'completed') filteredTasksCopy = tasks?.items.filter((item) => item.status === TaskStatus.Completed)

  if (isLoading) {
    return (
      <>
        <TaskSkeleton taskRows={7} />
        <StyledEmptyBtn>
          <EmptyBtn />
        </StyledEmptyBtn>
      </>
    )
  }

  return (
    <>
      <StyledTodoBody>
        {filteredTasksCopy?.length ? (
          <SortableContext items={filteredTasksCopy} strategy={verticalListSortingStrategy}>
            {filteredTasksCopy.map((task) => {
              return <TaskRow key={task.id} taskInfo={task} />
            })}
          </SortableContext>
        ) : (
          <p style={{ marginBottom: `${todoInfo.addTaskStatus ? '10px' : '0'}` }}>There are no tasks</p>
        )}
        {todoInfo.addTaskStatus && <FakeRow todoListId={todoInfo.id} />}
      </StyledTodoBody>
      <AddNewTaskBtn onClick={() => dispatch(changeModeAddTaskAC(todoInfo.id, true))}>
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
