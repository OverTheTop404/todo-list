import type { Dispatch } from '@reduxjs/toolkit'
import type { BaseResponse } from '@/common/types/types'
import { setNoticeAC } from '@/app/app-slice'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setNoticeAC({ noticeMessage: `${data.messages[0]}`, noticeType: 'error' }))
  } else {
    dispatch(setNoticeAC({ noticeMessage: 'Failed create task. Some error occurred', noticeType: 'error' }))
  }
}
