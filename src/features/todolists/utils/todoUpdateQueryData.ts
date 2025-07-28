import { RequestStatus } from '@/app/app-slice'
import { todoListsApi } from '@/features/todolists/api/todoListsApi'

export const changeModeAddTaskAC = (id: string, status: boolean) => {
  return todoListsApi.util.updateQueryData('getTodoLists', undefined, (state) => {
    const todoList = state.find((todo) => todo.id === id)
    if (todoList) todoList.addTaskStatus = status
  })
}

export const renameTodoModeAC = (id: string, status: boolean) => {
  return todoListsApi.util.updateQueryData('getTodoLists', undefined, (state) => {
    const todoList = state.find((todo) => todo.id === id)
    if (todoList) todoList.renameStatus = status
  })
}

export const changeHeadLineColorAC = (id: string, color: string) => {
  return todoListsApi.util.updateQueryData('getTodoLists', undefined, (state) => {
    const todoList = state.find((todo) => todo.id === id)
    if (todoList) todoList.headLineColor = color
  })
}

export const changeTodoEntityStatus = (id: string, status: RequestStatus) => {
  return todoListsApi.util.updateQueryData('getTodoLists', undefined, (state) => {
    const todoList = state.find((todo) => todo.id === id)
    if (todoList) todoList.entityStatus = status
  })
}
