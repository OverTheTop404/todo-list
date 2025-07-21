import type { DomainTodoLists } from '@/features/todolists/api/todoListsApi.types'
import { todoListsApi } from '@/features/todolists/api/todoListsApi'
import { createAppSlice } from '@/common/utils'
import { loaderStatusAC, type RequestStatus, setNoticeAC } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enams'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { handleServerAppError } from '@/common/utils/handleServerAppError'
import { domainTodoSchema } from '@/features/todolists/lib/schemas'

export type TodoListType = DomainTodoLists & {
  headLineColor: string
  entityStatus: RequestStatus
  renameStatus: boolean
  addTaskStatus: boolean
}

export const todoListsSlice = createAppSlice({
  name: 'todoLists',
  initialState: {
    todoLists: [] as TodoListType[],
    hasModeAddTodo: false,
  },
  reducers: (create) => ({
    modeAddTaskAC: create.reducer<{ todoListId: string; status: boolean }>((state, action) => {
      const todoList = state.todoLists.find((todo) => todo.id === action.payload.todoListId)
      if (todoList) todoList.addTaskStatus = action.payload.status
      //state.hasModeAddTodo = action.payload.status
    }),
    modeAddTodoAC: create.reducer<{ status: boolean }>((state, action) => {
      state.hasModeAddTodo = action.payload.status
    }),
    changeEntityStatus: create.reducer<{ todolistId: string; status: RequestStatus }>((state, action) => {
      const todoList = state.todoLists.find((todo) => todo.id === action.payload.todolistId)
      if (todoList) todoList.entityStatus = action.payload.status
    }),
    changeHeadLineColorAC: create.reducer<{ id: string; color: string }>((state, action) => {
      const todoList = state.todoLists.find((todo) => todo.id === action.payload.id)
      if (todoList) todoList.headLineColor = action.payload.color
    }),
    renameTodoModeAC: create.reducer<{ todoListId: string; mode: boolean }>((state, action) => {
      const todoList = state.todoLists.find((todo) => todo.id === action.payload.todoListId)
      if (todoList) todoList.renameStatus = action.payload.mode
    }),
    renameTodoTC: create.asyncThunk(
      async (args: { title: string; todolistId: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'loading' }))
          const res = await todoListsApi.renameTodoList({ ...args })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'succeeded' }))
            dispatch(setNoticeAC({ noticeMessage: 'Success update todolist', noticeType: 'success' }))
            return args
          } else {
            dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'failed' }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        } finally {
          dispatch(renameTodoModeAC({ todoListId: args.todolistId, mode: false }))
        }
      },
      {
        fulfilled: (state, action) => {
          const todoList = state.todoLists.find((todo) => todo.id === action.payload.todolistId)
          if (todoList) todoList.title = action.payload.title
        },
      },
    ),
    deleteTodoTC: create.asyncThunk(
      async (args: { id: string }, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeEntityStatus({ todolistId: args.id, status: 'loading' }))
          await todoListsApi.deleteTodoList(args.id)
          dispatch(changeEntityStatus({ todolistId: args.id, status: 'succeeded' }))
          dispatch(setNoticeAC({ noticeMessage: 'Success delete todolist', noticeType: 'success' }))
          return args.id
        } catch (error) {
          dispatch(changeEntityStatus({ todolistId: args.id, status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.todoLists.findIndex((todo) => todo.id === action.payload)
          if (index !== -1) state.todoLists.splice(index, 1)
        },
      },
    ),
    addTodoListsTC: create.asyncThunk(
      async (args: { letterTrim: string }, { rejectWithValue, dispatch }) => {
        try {
          const res = await todoListsApi.addTodoList(args.letterTrim)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setNoticeAC({ noticeMessage: `Success create todolist «${res.data.data.item.title}»`, noticeType: 'success' }))
            return res.data
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        } finally {
          dispatch(modeAddTodoAC({ status: false }))
        }
      },
      {
        fulfilled: (state, action) => {
          state.todoLists.unshift({
            id: action.payload.data.item.id,
            title: action.payload.data.item.title,
            order: state.todoLists.length + 1,
            addedDate: new Date().toISOString(),
            headLineColor: '#1ac517',
            entityStatus: 'idle',
            renameStatus: false,
            addTaskStatus: false,
          })
        },
      },
    ),
    fetchTodoListsTC: create.asyncThunk(
      async (_, { rejectWithValue, dispatch }) => {
        try {
          dispatch(loaderStatusAC({ status: 'loading' }))
          const res = await todoListsApi.getTodoLists()
          domainTodoSchema.array().parse(res.data) // 💎
          dispatch(loaderStatusAC({ status: 'idle' }))
          return { todoLists: res.data }
        } catch (error) {
          dispatch(loaderStatusAC({ status: 'failed' }))
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.todoLists = action.payload.todoLists.map((todo) => ({
            ...todo,
            headLineColor: '#1ac517',
            entityStatus: 'idle',
            renameStatus: false,
            addTaskStatus: false,
          }))
        },
      },
    ),
  }),
  selectors: {
    selectTodoLists: (state) => state.todoLists,
    selectHasModeAddTodo: (state) => state.hasModeAddTodo,
  },
})

export const todolistReducer = todoListsSlice.reducer
export const {
  changeHeadLineColorAC,
  renameTodoTC,
  fetchTodoListsTC,
  addTodoListsTC,
  deleteTodoTC,
  changeEntityStatus,
  modeAddTodoAC,
  modeAddTaskAC,
  renameTodoModeAC,
} = todoListsSlice.actions
export const { selectTodoLists, selectHasModeAddTodo } = todoListsSlice.selectors
