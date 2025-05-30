import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { createAppSlice } from '@/common/utils'
import { deleteTodoTC } from '@/features/todolists/model/todolist-slice'

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: [] as DomainTask[],
  reducers: (create) => ({
    sortTasksAC: create.reducer<{ flag: boolean }>((state, action) => {
      state.sort((a, b) => {
        return a.status === b.status ? 0 : action.payload.flag ? (a.status ? -1 : 1) : a.status ? 1 : -1
      })
    }),
    changeTaskStatusTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; model: UpdateTaskModel }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.updateTask(args)
          return res.data
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state.find((task) => task.id === action.payload.data.item.id)
          if (task) task.status = action.payload.data.item.status
        },
      },
    ),
    renameTaskTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; model: UpdateTaskModel }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.updateTask(args)
          return res.data
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state.find((task) => task.id === action.payload.data.item.id)
          if (task) task.title = action.payload.data.item.title
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, { rejectWithValue }) => {
        try {
          await tasksApi.deleteTask(args)
          return args.taskId
        } catch (error) {
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
      async (arg: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(arg)
          return { tasksList: res.data.items }
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          //return action.payload.tasksList.map((task) => task)
          return [...state, ...action.payload.tasksList]
        },
      },
    ),
    addTaskTC: create.asyncThunk(
      async (args: { todoListId: string; title: string }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(args)
          return res.data
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push(action.payload.data.item)
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
export const { sortTasksAC, deleteTaskTC, changeTaskStatusTC, renameTaskTC, addTaskTC, fetchTaskTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
