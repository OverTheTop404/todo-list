import { ToastContainer, toast } from 'react-toastify/unstyled'
import 'react-toastify/ReactToastify.css'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectNotice } from '@/app/app-slice'

export const AlertSnackbar = () => {
  const noticeEntity = useAppSelector(selectNotice)

  toast(noticeEntity.noticeMessage, {
    type: noticeEntity.noticeType,
    autoClose: 2000,
    position: 'bottom-right',
  })

  return <ToastContainer />
}
