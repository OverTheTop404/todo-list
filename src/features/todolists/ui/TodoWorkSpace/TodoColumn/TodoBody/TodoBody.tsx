import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import { BadgePlus } from 'lucide-react'
import { useAppSelector } from '@/common/hooks/useAppSelector'

import styled from 'styled-components'
import { FakeRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/FakeRow/FakeRow'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { selectViewTask } from '@/features/todolists/model/utility-slice'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'
import { TaskSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskSceleton/TaskSceleton'
import { EmptyBtn, StyledEmptyBtn } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import { Droppable } from '@hello-pangea/dnd'
import { useGetTasksQuery } from '@/features/todolists/api/tasksSbApi'
import { useEffect, useState } from 'react'

type Props = {
  todoInfo: TodoListType
}

export const TodoBody = ({ todoInfo }: Props) => {
  const dispatch = useAppDispatch()
  // const location = useLocation()
  //const params = useParams()
  const viewTask = useAppSelector(selectViewTask)

  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    setFirstLoad(false)
  }, [])

  //const needSkip = params.boardId !== todoInfo.board_id

  const { data: tasks, isLoading } = useGetTasksQuery(
    { list_id: todoInfo.id },
    {
      skip: firstLoad,
    },
  )

  // const [firstLoad, setFirstLoad] = useState(true)
  //
  // const boardId = location.pathname.split('/').pop()
  //
  // useEffect(() => {
  //   boardId === todoInfo.board_id ? setFirstLoad(true) : setFirstLoad(true)
  // }, [boardId])

  let filteredTasksCopy = tasks
  if (viewTask === 'active') filteredTasksCopy = tasks?.filter((item) => item.is_completed === false)
  if (viewTask === 'completed') filteredTasksCopy = tasks?.filter((item) => item.is_completed === true)

  if (isLoading) {
    return (
      <>
        <TaskSkeleton taskRows={3} />
        <StyledEmptyBtn>
          <EmptyBtn />
        </StyledEmptyBtn>
      </>
    )
  }

  return (
    <>
      <StyledTodoBody>
        <Droppable droppableId={todoInfo.id} type="TASK">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasksCopy?.length ? (
                filteredTasksCopy.map((task, index) => <TaskRow key={task.id} taskInfo={task} index={index} />)
              ) : (
                <p style={{ marginBottom: `${todoInfo.addTaskStatus ? '10px' : '0'}` }}>There are no tasks</p>
              )}
              {provided.placeholder}
              {todoInfo.addTaskStatus && <FakeRow todoInfo={todoInfo} />}
            </ul>
          )}
        </Droppable>
      </StyledTodoBody>
      <AddNewTaskBtn onClick={() => dispatch(changeModeAddTaskAC({ listId: todoInfo.id, boardId: todoInfo.board_id, status: true }))}>
        <BadgePlus size={15} /> New task
      </AddNewTaskBtn>
    </>
  )
}

const StyledTodoBody = styled.div`
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
