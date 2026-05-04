import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useGetGitHubSessionQuery } from '@/features/auth/api/sbAuthApi'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { setIsLoggedIn, setNoticeAC } from '@/app/app-slice'
import { AppLoader } from '@/common/components/AppLoader/AppLoader'

export const Callback = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: session, error } = useGetGitHubSessionQuery()

  useEffect(() => {
    if (session) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(
        setNoticeAC({
          noticeMessage: 'Successfully logged in with GitHub!',
          noticeType: 'success',
        }),
      )
      navigate('/dashboard')
    }

    if (error) {
      dispatch(
        setNoticeAC({
          noticeMessage: 'GitHub login failed. Please try again.',
          noticeType: 'error',
        }),
      )
      navigate('/login')
    }
  }, [session, error, dispatch, navigate])

  return <AppLoader />
}
