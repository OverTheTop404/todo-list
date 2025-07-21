import type { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { setNoticeAC } from '@/app/app-slice'
import { z } from 'zod/v4'

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage

  switch (true) {
    case axios.isAxiosError(error): {
      errorMessage = error.response?.data?.message || error.message
      break
    }
    case error instanceof z.ZodError: {
      errorMessage = `Zod error. Смотри консоль`
      break
    }
    case error instanceof Error: {
      errorMessage = `Native error: ${error.message}`
      break
    }
    default:
      errorMessage = JSON.stringify(error)
  }

  dispatch(setNoticeAC({ noticeMessage: errorMessage, noticeType: 'error' }))
}
