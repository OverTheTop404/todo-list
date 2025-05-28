import { SortPanel } from './SortPanel/SortPanel.tsx'
import { TodoColumn } from './TodoColumn/TodoColumn.tsx'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { TaskRow } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow.tsx'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { type DomainTodoLists, fetchTodoListsTC, selectTodoLists } from '@/features/todolists/model/todolist-slice.ts'
import { FakeColumn } from '@/features/todolists/ui/TodoWorkSpace/FakeColumn/FakeColumn'
import { selectAddColumnMode } from '@/features/todolists/model/utility-slice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import type { DomainTask } from '@/features/todolists/api/tasksApi.types'

export const TodoWorkSpace = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodoListsTC())
  }, [])
  const todoLists = useAppSelector(selectTodoLists)
  const addColumnMode = useAppSelector(selectAddColumnMode)

  // BOF dnd-kit
  const [activeColumn, setActiveColumn] = useState<DomainTodoLists | null>(null)
  const [activeTask, setActiveTask] = useState<DomainTask | null>(null)
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
    // const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return

    // if (isActiveTask && isOverTask) {
    //   setTasks((tasksCopy) => {
    //     const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
    //     const overIndex = tasksCopy.findIndex((t) => t.id === overId);
    //     tasksCopy[activeIndex].todoListId = tasksCopy[overIndex].todoListId;
    //     return arrayMove(tasksCopy, activeIndex, overIndex);
    //   });
    // }
    //
    // const isOverAColumn = over.data.current?.type === "Column";
    // if (isActiveTask && isOverAColumn) {
    //   setTasks((tasksCopy) => {
    //     const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
    //     tasksCopy[activeIndex].todoListId = overId;
    //     return arrayMove(tasksCopy, activeIndex, activeIndex);
    //   });
    // }
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
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  )
  // const columnsId = useMemo(() => todoLists.map((column) => column.id), [todoLists]);
  // EOF dnd-kit

  return (
    <>
      <SortPanel />
      <DndContext
        sensors={sensors}
        // collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleColumnDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={todoLists} strategy={horizontalListSortingStrategy}>
          {addColumnMode && <FakeColumn />}
          {todoLists.map((column) => (
            <TodoColumn key={column.id} todoInfo={column} />
          ))}
        </SortableContext>

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
