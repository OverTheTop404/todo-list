import { SortPanel } from './SortPanel/SortPanel.tsx'
import { TodoColumn } from './TodoColumn/TodoColumn.tsx'
import { TodoSkeleton } from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'
import s from './TodoWorkSpace.module.scss'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useParams } from 'react-router'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectHasModeAddTodo } from '@/app/app-slice'
import { useCallback, useEffect, useRef } from 'react'
import { supabase } from '@/app/supaBaseClient'
import { useDebouncedSave } from '@/common/hooks/useDebouncedSave'
import { DraggableScroll } from '@/common/hocs/withDraggableScroll'
import { useGetTodoListsQuery } from '@/features/todolists/api/todoListsSbApi'
import { useGlobalSaveCards } from '@/common/hooks/useGlobalSaveCards'
import { useColumnsDragDrop } from '@/common/hooks/useColumnsDragDrop'
import { useCardsDragDrop } from '@/common/hooks/useCardsDragDrop'
import type { TaskSbType } from '@/features/todolists/api/tasksApi.types'

export const TodoWorkSpace = () => {
  const params = useParams()
  const { data: todoListsData } = useGetTodoListsQuery({ board_id: params.boardId! })
  const hasTodoMode = useAppSelector(selectHasModeAddTodo)

  const tasksDataRef = useRef<{ [listId: string]: TaskSbType[] }>({})

  // Сохранение позиций списков
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

  const { debouncedSave: debouncedSaveLists, forceSave: forceSaveLists } = useDebouncedSave(savePositionsToServer, 2000)

  // Глобальное сохранение карточек
  const { pendingUpdatesRef, scheduleSaveCards, forceSaveCards } = useGlobalSaveCards(2000)

  // Хуки для drag & drop
  const { handleColumnDrag } = useColumnsDragDrop(todoListsData, debouncedSaveLists)
  const { handleCardDrag } = useCardsDragDrop(tasksDataRef, pendingUpdatesRef, scheduleSaveCards)

  // Сохранение при закрытии страницы
  useEffect(() => {
    const handleBeforeUnload = () => {
      forceSaveLists()
      forceSaveCards()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [forceSaveLists, forceSaveCards])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'COLUMN') {
      handleColumnDrag(source, destination)
      return
    }

    if (type === 'TASK') {
      handleCardDrag(source.droppableId, destination.droppableId, source.index, destination.index)
    }
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
                todoListsData.map((column, index) => (
                  <TodoColumn
                    key={column.id}
                    todoInfo={column}
                    index={index}
                    onTasksLoaded={(tasks) => {
                      tasksDataRef.current[column.id] = tasks
                    }}
                  />
                ))
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
