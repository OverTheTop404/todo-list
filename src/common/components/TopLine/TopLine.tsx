import styled from 'styled-components'
import Andrey from '../../../assets/images/users/andrey3.jpg'
import { Bell, LogOut, Search, Settings } from 'lucide-react'
import { useLocation } from 'react-router'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { loaderStatusAC, selectIsLoggedIn, setIsLoggedIn, setNoticeAC } from '@/app/app-slice'
import { baseApi } from '@/app/baseApi'
import { useLogoutMutation } from '@/features/auth/api/sbAuthApi'

export const TopLine = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  //const [logoutMutation] = useLogoutMutation()
  const [logoutUser] = useLogoutMutation()

  //const logoutHandler = () => {
  // logoutMutation()
  //   .then((res) => {
  //     if (res.data?.resultCode === ResultCode.Success) {
  //       dispatch(setNoticeAC({ noticeMessage: 'Success Logout', noticeType: 'info' }))
  //       dispatch(setIsLoggedIn({ isLoggedIn: false }))
  //       localStorage.removeItem(AUTH_TOKEN)
  //     }
  //   })
  //   .then(() => {
  //     dispatch(baseApi.util.invalidateTags(['Task', 'Auth', 'Todolist']))
  //   })
  //}
  const logoutHandler = async () => {
    try {
      dispatch(loaderStatusAC({ status: 'loading' }))
      const { error } = await logoutUser()
      if (error) {
        throw error
      }
      dispatch(loaderStatusAC({ status: 'idle' }))
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setNoticeAC({ noticeMessage: 'Success Logout', noticeType: 'info' }))
      dispatch(baseApi.util.invalidateTags(['Task', 'Auth', 'Todolist']))
    } catch (error: any) {
      console.error('Ошибка при выходе:', error.message)
    }
  }

  return (
    <TopLineWrapper>
      <LeftSection>{location.state ? location.state.pageName : 'Dashboard'}</LeftSection>
      <RightSection>
        <SearchWrap>
          <Search size={18} />
          <SearchInput type="text" placeholder={'Search'} />
        </SearchWrap>
        <Bell size={20} />
        <Settings size={20} />
        {/*{isLoggedIn && <LogOut size={20} onClick={logoutHandler} />}*/}
        {isLoggedIn && <LogOut size={20} onClick={logoutHandler} />}
        <AccountImage src={Andrey} alt="user" />
      </RightSection>
    </TopLineWrapper>
  )
}

const TopLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 30px;
  color: #fff;
  background-color: rgba(10, 15, 23, 1);
`
const LeftSection = styled.div``
const RightSection = styled.div`
  display: flex;
  align-items: center;
  max-height: 40px;
  padding: 0;
  margin: 0;
  & > svg,
  & > img {
    margin-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`
const AccountImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
const SearchWrap = styled.div`
  position: relative;

  & svg {
    color: #ccc;
    position: absolute;
    left: 5px;
    top: calc(50% - 9px);
  }
`
const SearchInput = styled.input`
  padding: 10px 10px 10px 30px;
  border: 0;
  color: #ccc;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  width: 300px;
  &::placeholder {
    color: #ccc;
  }
`
