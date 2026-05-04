import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer, tasksSlice } from '@/features/todolists/model/tasks-slice'
import { appReducer, appSlice } from './app-slice.ts'
//import { utilityReducer, utilitySlice } from '@/features/todolists/model/utility-slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/app/baseApi'
import { supabaseApi } from '@/app/supabaseApi'

const apiMiddlewares = [supabaseApi.middleware, baseApi.middleware]

// создание store
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [appSlice.name]: appReducer,
    //[utilitySlice.name]: utilityReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
  },
  middleware: (gDM) => gDM().concat(apiMiddlewares),
})

setupListeners(store.dispatch)

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
