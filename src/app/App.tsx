import { Routing } from '@/common/routing/Routing'
import { AppLoader } from '@/common/components/AppLoader/AppLoader'
import styled from 'styled-components'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

import { useEffect } from 'react'
import { loaderStatusAC, setIsLoggedIn } from '@/app/app-slice'
// import domWrap from '../../../assets/images/domik-wrap.jpg'
import loginBg from '../assets/images/DeeDoesAI.webp'
import { useAuthMeQuery } from '@/features/auth/api/sbAuthApi'

export const App = () => {
  const dispatch = useAppDispatch()

  const { data, isLoading } = useAuthMeQuery()

  useEffect(() => {
    if (isLoading) {
      dispatch(loaderStatusAC({ status: 'loading' }))
    } else {
      if (data?.user.aud === 'authenticated') {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      dispatch(loaderStatusAC({ status: 'idle' }))
    }
  }, [isLoading])

  return (
    <Application>
      {!isLoading && <Routing />}
      <AppLoader />
    </Application>
  )
}

export const Application = styled.div`
  background: url(${loginBg}) 50% 50% no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;

  & > div {
    z-index: 1;
  }

  &:before {
    content: '';
    position: absolute;
    background-color: #000;
    opacity: 0.8;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
