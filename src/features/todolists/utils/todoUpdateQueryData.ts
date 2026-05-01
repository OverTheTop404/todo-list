import { RequestStatus } from '@/app/app-slice'
import { todoListsSbApi } from '@/features/todolists/api/todoListsSbApi'

export const changeModeAddTaskAC = ({ listId, boardId, status }: { listId: string; boardId: string; status: boolean }) => {
  return todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: boardId }, (state) => {
    const todoList = state.find((todo) => todo.id === listId)
    if (todoList) todoList.addTaskStatus = status
  })
}

export const renameTodoModeAC = ({ listId, boardId, status }: { listId: string; boardId: string; status: boolean }) => {
  return todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: boardId }, (state) => {
    const todoList = state.find((todo) => todo.id === listId)
    if (todoList) todoList.renameStatus = status
  })
}

// export const changeHeadLineColorAC = ({ listId, boardId, color }: { listId: string; boardId: string; color: string }) => {
//   return todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: boardId }, (state) => {
//     const todoList = state.find((todo) => todo.id === listId)
//     if (todoList) todoList.head_line_color = color
//   })
// }

export const changeTodoEntityStatus = ({ listId, boardId, status }: { listId: string; boardId: string; status: RequestStatus }) => {
  return todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: boardId }, (state) => {
    const todoList = state.find((todo) => todo.id === listId)
    if (todoList) todoList.entityStatus = status
  })
}
