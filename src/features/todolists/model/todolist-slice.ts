import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { todoListsApi } from '@/features/todolists/api/todoListsApi'
import { createAppSlice } from '@/common/utils'
import { loaderStatusAC, type RequestStatus, setNoticeAC } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enams'

export type DomainTodoLists = TodoListType & {
  headLineColor: string
  entityStatus: RequestStatus
  renameStatus: boolean
  addTaskStatus: boolean
}

export const todoListsSlice = createAppSlice({
  name: 'todoLists',
  initialState: {
    todoLists: [] as DomainTodoLists[],
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
          await todoListsApi.renameTodoList({ ...args })
          dispatch(renameTodoModeAC({ todoListId: args.todolistId, mode: false }))
          dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'succeeded' }))
          dispatch(setNoticeAC({ noticeMessage: 'Success update todolist', noticeType: 'success' }))
          return args
        } catch (error) {
          dispatch(setNoticeAC({ noticeMessage: 'Error update todolist', noticeType: 'error' }))
          dispatch(changeEntityStatus({ todolistId: args.todolistId, status: 'failed' }))
          return rejectWithValue(error)
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
          dispatch(setNoticeAC({ noticeMessage: 'Failed delete todolist', noticeType: 'error' }))
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
          dispatch(modeAddTodoAC({ status: false }))
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setNoticeAC({ noticeMessage: `Success create todolist «${res.data.data.item.title}»`, noticeType: 'success' }))
            return res.data
          } else {
            if (res.data.messages.length) {
              dispatch(setNoticeAC({ noticeMessage: `${res.data.messages[0]}`, noticeType: 'error' }))
            } else {
              dispatch(setNoticeAC({ noticeMessage: 'Failed create todolist. Some error occurred', noticeType: 'error' }))
            }
            return rejectWithValue(null)
          }
        } catch (error) {
          return rejectWithValue(error)
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
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
        try {
          dispatch(loaderStatusAC({ status: 'loading' }))
          await delay(2000)
          const res = await todoListsApi.getTodoLists()
          dispatch(loaderStatusAC({ status: 'idle' }))
          return { todoLists: res.data }
        } catch (error) {
          dispatch(loaderStatusAC({ status: 'failed' }))
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
