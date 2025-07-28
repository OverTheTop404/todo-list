import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { RequestStatus } from '@/app/app-slice'

export const sortAllTasks = (todoId: string, flag: boolean) => {
  return tasksApi.util.updateQueryData('getTasks', todoId, (state) => {
    state.items.sort((a, b) => {
      return a.status === b.status ? 0 : flag ? (a.status ? -1 : 1) : a.status ? 1 : -1
    })
  })
}

export const renameTaskMode = (taskId: string, todoId: string, mode: boolean) => {
  return tasksApi.util.updateQueryData('getTasks', todoId, (state) => {
    const task = state.items.find((task) => task.id === taskId)
    if (task) task.renameStatus = mode
  })
}

export const changeTaskEntityStatus = (taskId: string, todoId: string, status: RequestStatus) => {
  return tasksApi.util.updateQueryData('getTasks', todoId, (state) => {
    const task = state.items.find((task) => task.id === taskId)
    if (task) task.entityStatus = status
  })
}
