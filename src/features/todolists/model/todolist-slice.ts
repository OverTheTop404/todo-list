import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { todoListsApi } from '@/features/todolists/api/todoListsApi'

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState: [] as DomainTodoLists[],
  reducers: (create) => ({
    changeHeadLineColorAC: create.reducer<{ id: string; color: string }>((state, action) => {
      const todoList = state.find((todo) => todo.id === action.payload.id)
      if (todoList) todoList.headLineColor = action.payload.color
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(renameTodoTC.fulfilled, (state, action) => {
        const todoList = state.find((todo) => todo.id === action.payload.todolistId)
        if (todoList) todoList.title = action.payload.title
      })
      .addCase(renameTodoTC.rejected, (_state, action: any) => {
        console.log(action.payload.message)
      })
      .addCase(deleteTodoTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(deleteTodoTC.rejected, (_state, action: any) => {
        console.log(action.payload.message)
      })
      .addCase(addTodoListsTC.fulfilled, (state, action) => {
        state.unshift({
          id: action.payload.data.item.id,
          title: action.payload.data.item.title,
          order: state.length + 1,
          addedDate: new Date().toISOString(),
          headLineColor: '#1ac517',
        })
      })
      .addCase(addTodoListsTC.rejected, (_state, action: any) => {
        console.log(action.payload.message)
      })
      .addCase(fetchTodoListsTC.fulfilled, (_state, action) => {
        return action.payload.todoLists.map((todo) => ({ ...todo, headLineColor: '#1ac517' }))
      })
      .addCase(fetchTodoListsTC.rejected, (_state, action: any) => {
        console.log(action.payload.message)
      })
  },
  selectors: {
    selectTodoLists: (state) => state,
  },
})

export const renameTodoTC = createAsyncThunk(
  `${todoListsSlice.name}/renameTodoTC`,
  async (args: { title: string; todolistId: string }, { rejectWithValue }) => {
    try {
      await todoListsApi.renameTodoList({ ...args })
      return args
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
export const deleteTodoTC = createAsyncThunk(`${todoListsSlice.name}/deleteTodoTC`, async (arg: { id: string }, { rejectWithValue }) => {
  try {
    await todoListsApi.deleteTodoList(arg.id)
    return arg.id
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const addTodoListsTC = createAsyncThunk(`${todoListsSlice.name}/addTodoListsTC`, async (arg: { letterTrim: string }, { rejectWithValue }) => {
  try {
    const res = await todoListsApi.addTodoList(arg.letterTrim)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const fetchTodoListsTC = createAsyncThunk(`${todoListsSlice.name}/fetchTodoListsTC`, async (_, { rejectWithValue }) => {
  try {
    const res = await todoListsApi.getTodoLists()
    return { todoLists: res.data }
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const todolistReducer = todoListsSlice.reducer
export const { changeHeadLineColorAC } = todoListsSlice.actions
export const { selectTodoLists } = todoListsSlice.selectors

export type DomainTodoLists = TodoListType & {
  headLineColor: string
}
