import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { todoListsApi } from '@/features/todolists/api/todoListsApi'
import { createAppSlice } from '@/common/utils'

export const todoListsSlice = createAppSlice({
  name: 'todoLists',
  initialState: [] as DomainTodoLists[],
  reducers: (create) => ({
    changeHeadLineColorAC: create.reducer<{ id: string; color: string }>((state, action) => {
      const todoList = state.find((todo) => todo.id === action.payload.id)
      if (todoList) todoList.headLineColor = action.payload.color
    }),
    renameTodoTC: create.asyncThunk(
      async (args: { title: string; todolistId: string }, { rejectWithValue }) => {
        try {
          await todoListsApi.renameTodoList({ ...args })
          return args
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const todoList = state.find((todo) => todo.id === action.payload.todolistId)
          if (todoList) todoList.title = action.payload.title
        },
        // rejected: (_state, action) => {
        //   console.log(action.payload ?? action.payload.message)
        // },
      },
    ),
    deleteTodoTC: create.asyncThunk(
      async (arg: { id: string }, { rejectWithValue }) => {
        try {
          await todoListsApi.deleteTodoList(arg.id)
          return arg.id
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
    addTodoListsTC: create.asyncThunk(
      async (arg: { letterTrim: string }, { rejectWithValue }) => {
        try {
          const res = await todoListsApi.addTodoList(arg.letterTrim)
          return res.data
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({
            id: action.payload.data.item.id,
            title: action.payload.data.item.title,
            order: state.length + 1,
            addedDate: new Date().toISOString(),
            headLineColor: '#1ac517',
          })
        },
      },
    ),
    fetchTodoListsTC: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const res = await todoListsApi.getTodoLists()
          return { todoLists: res.data }
        } catch (error) {
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (_state, action) => {
          return action.payload.todoLists.map((todo) => ({ ...todo, headLineColor: '#1ac517' }))
        },
      },
    ),
  }),
  selectors: {
    selectTodoLists: (state) => state,
  },
})

export const todolistReducer = todoListsSlice.reducer
export const { changeHeadLineColorAC, renameTodoTC, fetchTodoListsTC, addTodoListsTC, deleteTodoTC } = todoListsSlice.actions
export const { selectTodoLists } = todoListsSlice.selectors

export type DomainTodoLists = TodoListType & {
  headLineColor: string
}
