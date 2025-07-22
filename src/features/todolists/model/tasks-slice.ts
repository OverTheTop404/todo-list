import { _tasksApi } from '@/features/todolists/api/tasksApi'
import type { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { createAppSlice } from '@/common/utils'
import { changeEntityStatus, modeAddTaskAC } from '@/features/todolists/model/todolist-slice'
import { type RequestStatus, setNoticeAC } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enams'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { domainTaskSchema } from '@/features/todolists/lib/schemas'

const modelCreator = (args: UpdateTaskModel) => {
  return {
    description: args.description,
    status: args.status,
    priority: args.priority,
    startDate: args.startDate,
    deadline: args.deadline,
    title: args.title,
  }
}

type TaskType = DomainTask & {
  renameStatus: boolean
  entityStatus: string // Временно string. Надо RequestStatus
}

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: [] as TaskType[],
  reducers: (create) => ({
    sortTasksAC: create.reducer<{ flag: boolean }>((state, action) => {
      state.sort((a, b) => {
        return a.status === b.status ? 0 : action.payload.flag ? (a.status ? -1 : 1) : a.status ? 1 : -1
      })
    }),
    changeEntityTaskStatusAC: create.reducer<{ taskId: string; status: RequestStatus }>((state, action) => {
      const task = state.find((task) => task.id === action.payload.taskId)
      if (task) task.entityStatus = action.payload.status
    }),
    renameTaskModeAC: create.reducer<{ taskId: string; mode: boolean }>((state, action) => {
      const task = state.find((task) => task.id === action.payload.taskId)
      if (task) task.renameStatus = action.payload.mode
    }),
    updateTaskTC: create.asyncThunk(
      async (args: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'loading' }))
          const res = await _tasksApi.updateTask({ todolistId: args.todoListId, taskId: args.id, model: modelCreator(args) })
          dispatch(renameTaskModeAC({ taskId: args.id, mode: false }))
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setNoticeAC({ noticeMessage: `Success update task «${res.data.data.item.title}»`, noticeType: 'success' }))
            dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'succeeded' }))
            return res.data
          } else {
            dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'failed' }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
          //return res.data
        } catch (error: any) {
          dispatch(renameTaskModeAC({ taskId: args.id, mode: false }))
          dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state.findIndex((task) => task.id === action.payload.data.item.id)
          if (task !== -1) state[task] = { ...state[task], ...action.payload.data.item }
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeEntityTaskStatusAC({ taskId: args.taskId, status: 'loading' }))
          await _tasksApi.deleteTask(args)
          dispatch(setNoticeAC({ noticeMessage: 'Success delete task', noticeType: 'success' }))
          dispatch(changeEntityTaskStatusAC({ taskId: args.taskId, status: 'succeeded' }))
          return args.taskId
        } catch (error: any) {
          dispatch(changeEntityTaskStatusAC({ taskId: args.taskId, status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state.findIndex((task) => task.id === action.payload)
          if (task !== -1) state.splice(task, 1)
        },
      },
    ),
    fetchTaskTC: create.asyncThunk(
      async (args: string, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeEntityStatus({ todolistId: args, status: 'loading' }))
          const res = await _tasksApi.getTasks(args)
          domainTaskSchema.array().parse(res.data.items) // 💎
          dispatch(changeEntityStatus({ todolistId: args, status: 'succeeded' }))
          return { tasksList: res.data.items }
        } catch (error) {
          dispatch(changeEntityStatus({ todolistId: args, status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          //return action.payload.tasksList.map((task) => ({ ...task, renameStatus: false, entityStatus: 'idle' }))
          return [...state, ...action.payload.tasksList.map((task) => ({ ...task, renameStatus: false, entityStatus: 'idle' }))]
        },
      },
    ),
    addTaskTC: create.asyncThunk(
      async (args: { todoListId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          const res = await _tasksApi.createTask(args)
          dispatch(modeAddTaskAC({ status: false, todoListId: args.todoListId }))
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setNoticeAC({ noticeMessage: `Success create task «${res.data.data.item.title}»`, noticeType: 'success' }))
            return res.data
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          dispatch(modeAddTaskAC({ status: false, todoListId: args.todoListId }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({ ...action.payload.data.item, renameStatus: false, entityStatus: 'idle' })
        },
      },
    ),
  }),
  // extraReducers: (builder) => {
  //   builder.addCase(deleteTodoTC.fulfilled, (state, action: { payload: string }) => {
  //     return state.filter((task) => task.todoListId !== action.payload)
  //   })
  // },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { sortTasksAC, deleteTaskTC, updateTaskTC, addTaskTC, fetchTaskTC, changeEntityTaskStatusAC, renameTaskModeAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
