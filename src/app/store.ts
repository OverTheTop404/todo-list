import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice'
import { todolistReducer, todoListsSlice } from '@/features/todolists/model/todolist-slice'
import { appReducer, appSlice } from './app-slice.ts'
import { utilityReducer, utilitySlice } from '@/features/todolists/model/utility-slice'
import { authReducer, authSlice } from '@/features/auth/model/auth-slice'

// создание store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todoListsSlice.name]: todolistReducer,
    [appSlice.name]: appReducer,
    [utilitySlice.name]: utilityReducer,
    [authSlice.name]: authReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
