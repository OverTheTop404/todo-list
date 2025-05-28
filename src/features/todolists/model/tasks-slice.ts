import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tasksApi } from '@/features/todolists/api/tasksApi'
import type { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as DomainTask[],
  reducers: (create) => ({
    sortTasksAC: create.reducer<{ flag: boolean }>((state, action) => {
      state.sort((a, b) => {
        return a.status === b.status ? 0 : action.payload.flag ? (a.status ? -1 : 1) : a.status ? 1 : -1
      })
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskTC.fulfilled, (state, action) => {
        return [...state, ...action.payload.tasksList]
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state.push(action.payload.data.item)
      })
      .addCase(deleteTaskTC.fulfilled, (state, action) => {
        const task = state.findIndex((task) => task.id === action.payload)
        if (task !== -1) state.splice(task, 1)
      })
      .addCase(changeTaskStatusTC.fulfilled, (state, action) => {
        const task = state.find((task) => task.id === action.payload.data.item.id)
        if (task) task.status = action.payload.data.item.status
      })
      .addCase(renameTaskTC.fulfilled, (state, action) => {
        const task = state.find((task) => task.id === action.payload.data.item.id)
        if (task) task.title = action.payload.data.item.title
      })

    // .addCase(deleteTodoTC, (state, action) => {
    //   return state.filter((task) => task.todoListId !== action.payload.id)
    // })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const changeTaskStatusTC = createAsyncThunk(
  `${tasksSlice.name}/changeTaskStatusTC`,
  async (arg: { todolistId: string; taskId: string; model: UpdateTaskModel }, { rejectWithValue }) => {
    try {
      const res = await tasksApi.updateTask(arg)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const renameTaskTC = createAsyncThunk(
  `${tasksSlice.name}/renameTaskTC`,
  async (arg: { todolistId: string; taskId: string; model: UpdateTaskModel }, { rejectWithValue }) => {
    try {
      const res = await tasksApi.updateTask(arg)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteTaskTC = createAsyncThunk(
  `${tasksSlice.name}/deleteTaskTC`,
  async (arg: { todolistId: string; taskId: string }, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(arg)
      return arg.taskId
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const fetchTaskTC = createAsyncThunk(`${tasksSlice.name}/fetchTaskTC`, async (arg: string, { rejectWithValue }) => {
  try {
    const res = await tasksApi.getTasks(arg)
    return { tasksList: res.data.items }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const addTaskTC = createAsyncThunk(`${tasksSlice.name}/addTaskTC`, async (arg: { todoListId: string; title: string }, { rejectWithValue }) => {
  try {
    const res = await tasksApi.createTask(arg)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const tasksReducer = tasksSlice.reducer
export const { sortTasksAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
