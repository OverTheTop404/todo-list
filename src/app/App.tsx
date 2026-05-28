import { Routing } from '@/common/routing/Routing'
import { AppLoader } from '@/common/components/AppLoader/AppLoader'
import styled from 'styled-components'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

import { useEffect } from 'react'
import { loaderStatusAC, setIsLoggedIn } from '@/app/app-slice'
import { useAuthMeQuery } from '@/features/auth/api/sbAuthApi'
import { useParams } from 'react-router'
import { useGetBoardByIdQuery } from '@/features/boards/api/boardsApi'
//rebuild
export const App = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  //console.log(params)
  const { data: boardData } = useGetBoardByIdQuery(params.boardId!, {
    skip: !params.boardId,
  })

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
    <Application backgroundImage={boardData?.image_url}>
      {!isLoading && <Routing />}
      <AppLoader />
    </Application>
  )
}

export const Application = styled.div<{ backgroundImage?: string }>`
  background: url(${(props) => props.backgroundImage || 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/DeeDoesAI.webp'})
    50% 50% no-repeat;
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
