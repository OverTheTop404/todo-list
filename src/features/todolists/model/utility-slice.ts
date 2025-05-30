import { createSlice } from '@reduxjs/toolkit'

export type FilterActionType = 'all' | 'active' | 'completed'

export const utilitySlice = createSlice({
  name: 'utility',
  initialState: {
    viewTask: 'all' as FilterActionType,
  },
  reducers: (create) => ({
    viewTaskAC: create.reducer<{ viewTask: FilterActionType }>((state, action) => {
      state.viewTask = action.payload.viewTask
    }),
  }),
  selectors: {
    selectViewTask: (state) => state.viewTask,
  },
})

export const utilityReducer = utilitySlice.reducer
export const { viewTaskAC } = utilitySlice.actions
export const { selectViewTask } = utilitySlice.selectors
