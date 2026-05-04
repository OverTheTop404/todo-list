import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import { BadgePlus } from 'lucide-react'
import { useAppSelector } from '@/common/hooks/useAppSelector'

import styled from 'styled-components'
import { FakeRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/FakeRow/FakeRow'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'
import { TaskSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskSceleton/TaskSceleton'
import { EmptyBtn, StyledEmptyBtn } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import { Droppable } from '@hello-pangea/dnd'
import { useGetTasksQuery } from '@/features/todolists/api/tasksSbApi'
import { useEffect, useState, useMemo } from 'react'
import { selectSortDirection, selectViewTask, sortTasksAC, viewTaskAC } from '@/app/app-slice'

type Props = {
  todoInfo: TodoListType
}

export const TodoBody = ({ todoInfo }: Props) => {
  const dispatch = useAppDispatch()
  const viewTask = useAppSelector(selectViewTask)
  const sortDirection = useAppSelector(selectSortDirection)

  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    setFirstLoad(false)
  }, [])

  const { data: tasks, isLoading } = useGetTasksQuery(
    { list_id: todoInfo.id },
    {
      skip: firstLoad,
    },
  )

  // Проверяем, активны ли фильтры или сортировка
  const isDraggable = viewTask === 'all' && sortDirection === 'default'

  // Функция сброса всех фильтров и сортировки
  const resetToDefault = () => {
    dispatch(viewTaskAC({ viewTask: 'all' }))
    dispatch(sortTasksAC({ direction: 'default' }))
  }

  // Применяем фильтрацию и сортировку с помощью useMemo для оптимизации
  const processedTasks = useMemo(() => {
    if (!tasks) return []

    let filtered = [...tasks]

    // Фильтрация
    if (viewTask === 'active') {
      filtered = filtered.filter((item) => item.is_completed === false)
    } else if (viewTask === 'completed') {
      filtered = filtered.filter((item) => item.is_completed === true)
    }

    // Сортировка
    if (sortDirection === 'default') {
      // Сортировка по position (по умолчанию, для DnD)
      filtered.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    } else if (sortDirection === 'completed-first') {
      filtered.sort((a, b) => {
        if (a.is_completed === b.is_completed) return 0
        return a.is_completed ? -1 : 1
      })
    } else if (sortDirection === 'active-first') {
      filtered.sort((a, b) => {
        if (a.is_completed === b.is_completed) return 0
        return a.is_completed ? 1 : -1
      })
    }

    return filtered
  }, [tasks, viewTask, sortDirection])

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
        <Droppable droppableId={todoInfo.id} type="TASK" isDropDisabled={!isDraggable}>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {processedTasks.length ? (
                processedTasks.map((task, index) => <TaskRow key={task.id} taskInfo={task} index={index} isDragDisabled={!isDraggable} />)
              ) : (
                <p style={{ marginBottom: `${todoInfo.addTaskStatus ? '10px' : '0'}` }}>There are no tasks</p>
              )}
              {provided.placeholder}
              {todoInfo.addTaskStatus && <FakeRow todoInfo={todoInfo} />}
            </ul>
          )}
        </Droppable>

        {/* Показываем сообщение с кнопкой, если DnD отключен */}
        {!isDraggable && (
          <DnDDisabledMessage>
            ⚠️ Drag and drop is disabled when filters or sorting are active.
            <ResetText onClick={resetToDefault}>Reset to default</ResetText>
          </DnDDisabledMessage>
        )}
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

const DnDDisabledMessage = styled.div`
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  color: #856404;
  padding: 8px 12px;
  margin: 10px 0;
  font-size: 12px;
  border-radius: 4px;
`

const ResetText = styled.span`
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 6px;

  &:hover {
    color: #0052cc;
  }
`
