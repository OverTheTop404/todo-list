import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortPanel } from './SortPanel/SortPanel.tsx'
import { TodoColumn } from './TodoColumn/TodoColumn.tsx'
import { useGetTodoListsQuery } from '@/features/todolists/api/todoListsApi'
import { TodoSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import type { TaskType } from '@/features/todolists/api/tasksApi.types'

export const TodoWorkSpace = () => {
  const { data: todoLists, isLoading } = useGetTodoListsQuery()

  // BOF dnd-kit
  const [activeColumn, setActiveColumn] = useState<TodoListType | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    switch (event.active.data.current?.type) {
      case 'Column':
        setActiveColumn(event.active.data.current.todoInfo)
        return
      case 'Task':
        setActiveTask(event.active.data.current.taskInfo)
        return
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over ? over.id : null

    if (activeId === overId) return

    const isActiveTask = active.data.current?.type === 'Task'
    const isOverTask = over.data.current?.type === 'Task'

    if (!isActiveTask) return

    if (isActiveTask && isOverTask) {
      //   setTasks((tasksCopy) => {
      //     const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
      //     const overIndex = tasksCopy.findIndex((t) => t.id === overId);
      //     tasksCopy[activeIndex].todoListId = tasksCopy[overIndex].todoListId;
      //     return arrayMove(tasksCopy, activeIndex, overIndex);
      //   });
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveTask && isOverAColumn) {
      //   setTasks((tasksCopy) => {
      //     const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
      //     tasksCopy[activeIndex].todoListId = overId;
      //     return arrayMove(tasksCopy, activeIndex, activeIndex);
      //   });
    }
  }

  const handleColumnDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)

    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over ? over.id : null

    if (activeId === overId) return

    // setTodoLists((todoList) => {
    //   const activeColumnIndex = todoLists.findIndex((list) => list.id === activeId);
    //   const overColumnIndex = todoLists.findIndex((list) => list.id === overId);
    //   return arrayMove(todoList, activeColumnIndex, overColumnIndex);
    // });
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  )
  // const columnsId = useMemo(() => todoLists.map((column) => column.id), [todoLists]);
  // EOF dnd-kit

  if (isLoading) {
    return (
      <>
        <SortPanel />
        <TodoSkeleton />
        <TodoSkeleton />
        <TodoSkeleton />
        <TodoSkeleton />
      </>
    )
  }

  return (
    <>
      <SortPanel />
      {/*{todoLists?.map((column) => <TodoColumn key={column.id} todoInfo={column} />)}*/}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners} //closestCorners
        onDragStart={handleDragStart}
        onDragEnd={handleColumnDragEnd}
        onDragOver={handleDragOver}
      >
        {todoLists && (
          <SortableContext items={todoLists} strategy={horizontalListSortingStrategy}>
            {todoLists.map((column) => (
              <TodoColumn key={column.id} todoInfo={column} />
            ))}
          </SortableContext>
        )}

        {createPortal(
          <DragOverlay>
            {activeColumn && <TodoColumn todoInfo={activeColumn} />}
            {activeTask && <TaskRow taskInfo={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </>
  )
}
