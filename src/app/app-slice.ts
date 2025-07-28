import { createSlice } from '@reduxjs/toolkit'
import type { TypeOptions } from 'react-toastify'

export type ThemeMode = 'light' | 'dark'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

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
  },
  reducers: (create) => ({
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
    selectThemeMode: (state) => state.themeMode,
    selectLoaderStatus: (state) => state.loaderStatus,
    selectNotice: (state) => state.notice,
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectHasModeAddTodo: (state) => state.hasModeAddTodo,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, loaderStatusAC, setNoticeAC, setIsLoggedIn, modeAddTodoAC } = appSlice.actions
export const { selectThemeMode, selectLoaderStatus, selectNotice, selectIsLoggedIn, selectHasModeAddTodo } = appSlice.selectors
