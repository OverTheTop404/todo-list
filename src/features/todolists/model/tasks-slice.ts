import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { TaskType, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { createAppSlice } from '@/common/utils'
import { changeEntityStatus, deleteTodoTC, modeAddTaskAC } from '@/features/todolists/model/todolist-slice'
import { type RequestStatus, setNoticeAC } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enams'

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

export type DomainTask = TaskType & {
  renameStatus: boolean
  entityStatus: RequestStatus
}

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: [] as DomainTask[],
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
          const res = await tasksApi.updateTask({ todolistId: args.todoListId, taskId: args.id, model: modelCreator(args) })
          dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'succeeded' }))
          dispatch(renameTaskModeAC({ taskId: args.id, mode: false }))
          dispatch(setNoticeAC({ noticeMessage: 'Success update task', noticeType: 'success' }))
          return res.data
        } catch (error: any) {
          dispatch(changeEntityTaskStatusAC({ taskId: args.id, status: 'failed' }))
          dispatch(setNoticeAC({ noticeMessage: error.message || 'Error update task', noticeType: 'error' }))
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
          await tasksApi.deleteTask(args)
          dispatch(setNoticeAC({ noticeMessage: 'Success delete task', noticeType: 'success' }))
          dispatch(changeEntityTaskStatusAC({ taskId: args.taskId, status: 'succeeded' }))
          return args.taskId
        } catch (error: any) {
          dispatch(setNoticeAC({ noticeMessage: error.message || 'Failed delete task', noticeType: 'error' }))
          dispatch(changeEntityTaskStatusAC({ taskId: args.taskId, status: 'failed' }))
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
          const res = await tasksApi.getTasks(args)
          dispatch(changeEntityStatus({ todolistId: args, status: 'succeeded' }))
          return { tasksList: res.data.items }
        } catch (error) {
          dispatch(changeEntityStatus({ todolistId: args, status: 'failed' }))
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
          const res = await tasksApi.createTask(args)
          dispatch(modeAddTaskAC({ status: false, todoListId: args.todoListId }))
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setNoticeAC({ noticeMessage: `Success create task «${res.data.data.item.title}»`, noticeType: 'success' }))
            return res.data
          } else {
            if (res.data.messages.length) {
              dispatch(setNoticeAC({ noticeMessage: `${res.data.messages[0]}`, noticeType: 'error' }))
            } else {
              dispatch(setNoticeAC({ noticeMessage: 'Failed create task. Some error occurred', noticeType: 'error' }))
            }
            return rejectWithValue(null)
          }
        } catch (error: any) {
          dispatch(modeAddTaskAC({ status: false, todoListId: args.todoListId }))
          dispatch(setNoticeAC({ noticeMessage: error.message, noticeType: 'error' }))
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
  extraReducers: (builder) => {
    builder.addCase(deleteTodoTC.fulfilled, (state, action: { payload: string }) => {
      return state.filter((task) => task.todoListId !== action.payload)
    })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { sortTasksAC, deleteTaskTC, updateTaskTC, addTaskTC, fetchTaskTC, changeEntityTaskStatusAC, renameTaskModeAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
