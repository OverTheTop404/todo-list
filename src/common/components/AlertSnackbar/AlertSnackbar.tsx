import { toast, ToastContainer, type TypeOptions } from 'react-toastify'

type Props = {
  noticeEntity: {
    noticeMessage: null | string
    noticeType: TypeOptions
  }
}

export const AlertSnackbar = ({ noticeEntity }: Props) => {
  toast(noticeEntity.noticeMessage, {
    type: noticeEntity.noticeType,
    autoClose: 2000,
  })

  return <ToastContainer autoClose={2000} customProgressBar={false} position={'bottom-right'} />
}
