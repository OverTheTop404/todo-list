import { SortPanel } from './SortPanel/SortPanel.tsx'
import { TodoColumn } from './TodoColumn/TodoColumn.tsx'
import { todoListsApi, useGetTodoListsQuery, useReorderTodoListMutation } from '@/features/todolists/api/todoListsApi'
import { TodoSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { tasksApi, useReorderTaskMutation } from '@/features/todolists/api/tasksApi'

export const TodoWorkSpace = () => {
  const { data: todoLists, isLoading } = useGetTodoListsQuery()

  const dispatch = useAppDispatch()
  const [reorderTodoList] = useReorderTodoListMutation()
  const [reorderTask] = useReorderTaskMutation()

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Перемещение колонок
    if (type === 'COLUMN' && todoLists) {
      const newColumns = [...todoLists]
      const [movedColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, movedColumn)

      const patchResult = dispatch(
        todoListsApi.util.updateQueryData('getTodoLists', undefined, (_state) => {
          return newColumns
        }),
      )

      const newOrder =
        destination.index === 0 ? null : destination.index < source.index ? todoLists[destination.index - 1].id : todoLists[destination.index].id

      try {
        await reorderTodoList({
          id: movedColumn.id,
          order: newOrder,
        }).unwrap()
      } catch (error) {
        patchResult.undo()
        console.error('Failed to update todo list order:', error)
      }
      return
    }

    // Перемещение задач
    if (type === 'TASK') {
      const sourceTodoId = source.droppableId // ID колонки, откуда переместили
      const destinationTodoId = destination.droppableId // ID колонки, куда переместили
      const taskId = draggableId // ID перемещаемой задачи

      dispatch(
        tasksApi.util.updateQueryData('getTasks', destinationTodoId, (state) => {
          const newOrder =
            destination.index === 0
              ? null
              : destination.index < source.index
                ? state.items[destination.index - 1].id
                : state.items[destination.index].id

          if (sourceTodoId === destinationTodoId) {
            const taskIndex = state.items.findIndex((t) => t.id === taskId)
            if (taskIndex === -1) return
            const [task] = state.items.splice(taskIndex, 1)
            state.items.splice(destination.index, 0, task) // Если задача остается в той же колонке
          } else {
            // Иначе обновляем целевую колонку
            // dispatch(
            //   tasksApi.util.updateQueryData('getTasks', destinationTodoId, (targetDraft) => {
            //     targetDraft.items.splice(destination.index, 0, {
            //       ...task,
            //       todoListId: destinationTodoId, // Обновляем ID колонки если нужно
            //     })
            //   }),
            // )
          }

          try {
            reorderTask({
              todoId: destinationTodoId, // или sourceTodoId, если порядок в той же колонке
              taskId,
              order: newOrder,
            }).unwrap()
          } catch (error) {
            console.error('Failed to update task order:', error)
          }
        }),
      )
    }
  }

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', minHeight: '300px' }}>
              {todoLists?.map((column, index) => <TodoColumn key={column.id} todoInfo={column} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
