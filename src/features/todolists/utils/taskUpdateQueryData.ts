import { tasksSbApi } from '@/features/todolists/api/tasksSbApi'
import type { RequestStatus } from '@/app/app-slice'

export const sortAllTasks = (listId: string, flag: boolean) => {
  return tasksSbApi.util.updateQueryData('getTasks', { list_id: listId }, (state) => {
    state.sort((a, b) => {
      return a.is_completed === b.is_completed ? 0 : flag ? (a.is_completed ? -1 : 1) : a.is_completed ? 1 : -1
    })
  })
}

export const renameTaskMode = (taskId: string, listId: string, mode: boolean) => {
  return tasksSbApi.util.updateQueryData('getTasks', { list_id: listId }, (state) => {
    const task = state.find((task) => task.id === taskId)
    if (task) task.renameStatus = mode
  })
}

export const changeTaskEntityStatus = (taskId: string, listId: string, status: RequestStatus) => {
  return tasksSbApi.util.updateQueryData('getTasks', { list_id: listId }, (state) => {
    const task = state.find((task) => task.id === taskId)
    if (task) task.entityStatus = status
  })
}
