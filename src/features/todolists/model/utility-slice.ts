import { createSlice } from '@reduxjs/toolkit'

export type FilterActionType = 'all' | 'active' | 'completed'

export const utilitySlice = createSlice({
  name: 'utility',
  initialState: {
    addColumnMode: false,
    viewTask: 'all' as FilterActionType,
  },
  reducers: (create) => ({
    addColumnModeAC: create.reducer<{ addColumnMode: boolean }>((state, action) => {
      state.addColumnMode = action.payload.addColumnMode
    }),
    viewTaskAC: create.reducer<{ viewTask: FilterActionType }>((state, action) => {
      state.viewTask = action.payload.viewTask
    }),
  }),
  selectors: {
    selectAddColumnMode: (state) => state.addColumnMode,
    selectViewTask: (state) => state.viewTask,
  },
})

export const utilityReducer = utilitySlice.reducer
export const { addColumnModeAC, viewTaskAC } = utilitySlice.actions
export const { selectAddColumnMode, selectViewTask } = utilitySlice.selectors
