import { useCallback, MutableRefObject } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { tasksSbApi } from '@/features/todolists/api/tasksSbApi'
import type { TaskSbType } from '@/features/todolists/api/tasksApi.types'

export const useCardsDragDrop = (
  tasksDataRef: MutableRefObject<{ [listId: string]: TaskSbType[] }>,
  pendingUpdatesRef: MutableRefObject<{ [listId: string]: TaskSbType[] }>,
  scheduleSaveCards: () => void,
) => {
  const dispatch = useAppDispatch()

  const repositionTasks = useCallback((tasks: TaskSbType[]) => {
    return tasks.map((task, idx) => ({
      ...task,
      position: idx + 1,
    }))
  }, [])

  const handleCardDrag = useCallback(
    (sourceListId: string, destListId: string, sourceIndex: number, destIndex: number) => {
      const sourceTasks = tasksDataRef.current[sourceListId]
      const destTasks = tasksDataRef.current[destListId]

      if (!sourceTasks) return false

      const safeDestTasks = destTasks ? [...destTasks] : []
      let newSourceTasks = [...sourceTasks]
      const [movedTask] = newSourceTasks.splice(sourceIndex, 1)

      if (!movedTask) return false

      if (sourceListId === destListId) {
        // Перемещение внутри одной колонки
        newSourceTasks.splice(destIndex, 0, movedTask)
        const repositionedTasks = repositionTasks(newSourceTasks)

        tasksDataRef.current[sourceListId] = repositionedTasks
        dispatch(tasksSbApi.util.updateQueryData('getTasks', { list_id: sourceListId }, () => repositionedTasks))

        pendingUpdatesRef.current[sourceListId] = repositionedTasks
        scheduleSaveCards()
      } else {
        // Перемещение между разными колонками
        const updatedTask = { ...movedTask, list_id: destListId }
        let newDestTasks = [...safeDestTasks]
        newDestTasks.splice(destIndex, 0, updatedTask)

        const repositionedSourceTasks = repositionTasks(newSourceTasks)
        const repositionedDestTasks = repositionTasks(newDestTasks)

        tasksDataRef.current[sourceListId] = repositionedSourceTasks
        tasksDataRef.current[destListId] = repositionedDestTasks

        dispatch(tasksSbApi.util.updateQueryData('getTasks', { list_id: sourceListId }, () => repositionedSourceTasks))
        dispatch(tasksSbApi.util.updateQueryData('getTasks', { list_id: destListId }, () => repositionedDestTasks))

        pendingUpdatesRef.current[sourceListId] = repositionedSourceTasks
        pendingUpdatesRef.current[destListId] = repositionedDestTasks
        scheduleSaveCards()
      }

      return true
    },
    [tasksDataRef, pendingUpdatesRef, scheduleSaveCards, dispatch, repositionTasks],
  )

  return { handleCardDrag }
}
