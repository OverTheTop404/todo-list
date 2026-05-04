import { createSlice } from '@reduxjs/toolkit'
import type { TypeOptions } from 'react-toastify'

export type ThemeMode = 'light' | 'dark'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type FilterActionType = 'all' | 'active' | 'completed'
export type SortDirectionType = 'default' | 'completed-first' | 'active-first' // Добавляем 'default'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    loaderStatus: 'idle' as RequestStatus,
    isLoggedIn: false,
    notice: {
      noticeMessage: null as null | string,
      noticeType: 'default' as TypeOptions,
    },
    hasModeAddTodo: false,
    viewTask: 'all' as FilterActionType,
    sortDirection: 'default' as SortDirectionType, // Меняем значение по умолчанию на 'default'
  },
  reducers: (create) => ({
    viewTaskAC: create.reducer<{ viewTask: FilterActionType }>((state, action) => {
      state.viewTask = action.payload.viewTask
    }),
    sortTasksAC: create.reducer<{ direction: SortDirectionType }>((state, action) => {
      state.sortDirection = action.payload.direction
    }),
    modeAddTodoAC: create.reducer<{ status: boolean }>((state, action) => {
      state.hasModeAddTodo = action.payload.status
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    loaderStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.loaderStatus = action.payload.status
    }),
    setNoticeAC: create.reducer<{ noticeMessage: null | string; noticeType: TypeOptions }>((state, action) => {
      state.notice = action.payload
    }),
  }),
  selectors: {
    selectViewTask: (state) => state.viewTask,
    selectThemeMode: (state) => state.themeMode,
    selectLoaderStatus: (state) => state.loaderStatus,
    selectNotice: (state) => state.notice,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectHasModeAddTodo: (state) => state.hasModeAddTodo,
    selectSortDirection: (state) => state.sortDirection,
  },
})

export const appReducer = appSlice.reducer
export const { viewTaskAC, changeThemeModeAC, loaderStatusAC, setNoticeAC, setIsLoggedIn, modeAddTodoAC, sortTasksAC } = appSlice.actions
export const { selectViewTask, selectThemeMode, selectLoaderStatus, selectNotice, selectIsLoggedIn, selectHasModeAddTodo, selectSortDirection } =
  appSlice.selectors
