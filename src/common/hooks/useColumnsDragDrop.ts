import { useCallback } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { todoListsSbApi } from '@/features/todolists/api/todoListsSbApi'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'

export const useColumnsDragDrop = (todoListsData: TodoListType[] | undefined, debouncedSaveLists: (data: any[]) => void) => {
  const dispatch = useAppDispatch()

  const handleColumnDrag = useCallback(
    (source: any, destination: any) => {
      if (!todoListsData) return false

      const newColumns = [...todoListsData]
      const [movedColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, movedColumn)
      const positionedList = newColumns.map((col, index) => ({
        ...col,
        position: index + 1,
      }))

      dispatch(todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: movedColumn.board_id }, () => positionedList))
      debouncedSaveLists(positionedList)
      return true
    },
    [todoListsData, dispatch, debouncedSaveLists],
  )

  return { handleColumnDrag }
}
