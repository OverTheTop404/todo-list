import { SortPanel } from './SortPanel/SortPanel.tsx'
import { TodoColumn } from './TodoColumn/TodoColumn.tsx'
import { TodoSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import s from './TodoWorkSpace.module.scss'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { todoListsSbApi, useGetTodoListsQuery } from '@/features/todolists/api/todoListsSbApi'
import { useParams } from 'react-router'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectHasModeAddTodo } from '@/app/app-slice'
import { useCallback, useEffect } from 'react'
import { supabase } from '@/app/supaBaseClient'
import { useDebouncedSave } from '@/common/hooks/useDebouncedSave'
import { DraggableScroll } from '@/common/hocs/withDraggableScroll'

export const TodoWorkSpace = () => {
  const params = useParams()
  const { data: todoListsData } = useGetTodoListsQuery({ board_id: params.boardId! })
  //const { data } = useGetBoardByIdQuery(params.boardId!)
  //console.log(data)
  const hasTodoMode = useAppSelector(selectHasModeAddTodo)
  const dispatch = useAppDispatch()

  const savePositionsToServer = useCallback(async (listsData: any[]) => {
    const updates = listsData.map((col) => ({
      id: col.id,
      title: col.title,
      position: col.position,
    }))

    try {
      await supabase.rpc('update_list_positions_batch', {
        p_updates: updates,
      })
    } catch (e) {
      console.error('Ошибка сохранения:', e)
    }
  }, [])

  const { debouncedSave, forceSave } = useDebouncedSave(savePositionsToServer, 2000)

  useEffect(() => {
    const handleBeforeUnload = () => forceSave()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [forceSave])

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Перемещение списков
    if (type === 'COLUMN' && todoListsData) {
      const newColumns = [...todoListsData]
      const [movedColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, movedColumn)
      const positionedList = newColumns.map((col, index) => ({
        ...col,
        position: index + 1,
      }))
      dispatch(todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: movedColumn.board_id }, () => positionedList))
      debouncedSave(positionedList)
      return
    }

    // Перемещение карточек
    // if (type === 'TASK') {
    //   const sourceListId = source.droppableId;
    //   const destinationListId = destination.droppableId;
    //   const cardId = draggableId;
    //
    //   // Получаем текущие задачи
    //   const { data: sourceTasks } = dispatch(tasksApi.endpoints.getTasks.select(sourceListId));
    //   const { data: destTasks } = dispatch(tasksApi.endpoints.getTasks.select(destinationListId));
    //
    //   if (!sourceTasks?.items) return;
    //
    //   // Находим перемещаемую задачу
    //   const taskIndex = sourceTasks.items.findIndex(t => t.id === cardId);
    //   if (taskIndex === -1) return;
    //   const movedTask = sourceTasks.items[taskIndex];
    //
    //   // Определяем after_card_id
    //   const putAfterCardId = destination.index === 0
    //     ? null
    //     : destTasks?.items?.[destination.index - 1]?.id;
    //
    //   // ОПТИМИСТИЧНОЕ ОБНОВЛЕНИЕ для тасок
    //   if (sourceListId === destinationListId) {
    //     // В пределах одного списка
    //     const newTasks = [...sourceTasks.items];
    //     const [removedTask] = newTasks.splice(taskIndex, 1);
    //     newTasks.splice(destination.index, 0, removedTask);
    //
    //     const patchResult = dispatch(
    //       tasksApi.util.updateQueryData('getTasks', destinationListId, (draft) => {
    //         draft.items = newTasks;
    //       })
    //     );
    //
    //     try {
    //       await supabase.rpc('reorder_card', {
    //         p_card_id: cardId,
    //         p_target_list_id: destinationListId,
    //         p_put_after_card_id: putAfterCardId
    //       });
    //     } catch (error) {
    //       patchResult.undo();
    //       console.error('Failed to update task order:', error);
    //     }
    //
    //   } else {
    //     // Между разными списками
    //     // 1. Удаляем из исходного списка
    //     const newSourceTasks = sourceTasks.items.filter(t => t.id !== cardId);
    //     const patchSource = dispatch(
    //       tasksApi.util.updateQueryData('getTasks', sourceListId, (draft) => {
    //         draft.items = newSourceTasks;
    //       })
    //     );
    //
    //     // 2. Добавляем в целевой список
    //     const newDestTasks = destTasks?.items ? [...destTasks.items] : [];
    //     newDestTasks.splice(destination.index, 0, {
    //       ...movedTask,
    //       list_id: destinationListId
    //     });
    //
    //     const patchDest = dispatch(
    //       tasksApi.util.updateQueryData('getTasks', destinationListId, (draft) => {
    //         draft.items = newDestTasks;
    //       })
    //     );
    //
    //     try {
    //       await supabase.rpc('reorder_card', {
    //         p_card_id: cardId,
    //         p_target_list_id: destinationListId,
    //         p_put_after_card_id: putAfterCardId
    //       });
    //     } catch (error) {
    //       // Откатываем оба оптимистичных обновления
    //       patchSource.undo();
    //       patchDest.undo();
    //       console.error('Failed to update task order:', error);
    //     }
    //   }
    //
    //   // Инвалидируем кэш после успеха
    //   dispatch(tasksApi.util.invalidateTags([
    //     { type: 'Task', id: sourceListId },
    //     { type: 'Task', id: destinationListId }
    //   ]));
    // }
  }

  if (!todoListsData) {
    return (
      <DraggableScroll>
        <SortPanel />
        <div style={{ display: 'flex', minHeight: '300px' }}>
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </div>
      </DraggableScroll>
    )
  }

  return (
    <DraggableScroll>
      <SortPanel />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', minHeight: '300px' }}>
              {todoListsData.length > 0 || hasTodoMode ? (
                todoListsData.map((column, index) => <TodoColumn key={column.id} todoInfo={column} index={index} />)
              ) : (
                <div className={s.emptyBoard}>
                  <div className={s.arrow}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={s.text}>Empty board. Create your first list</div>
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DraggableScroll>
  )
}
