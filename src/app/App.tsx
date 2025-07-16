import styled from 'styled-components'
import domWrap from '../assets/images/domik-wrap.jpg'
import { MainMenu } from '@/common/components/MainMenu/MainMenu'
import { TopLine } from '@/common/components/TopLine/TopLine'
import { Routing } from '@/common/routing/Routing'
import { AlertSnackbar } from '@/common/components/AlertSnackbar/AlertSnackbar'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectNotice } from '@/app/app-slice'

export const App = () => {
  // const themeMode = useAppSelector(selectThemeMode);
  // const dispatch = useAppDispatch();
  // const changeTheme = () => {
  //   dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  // };

  const noticeEntity = useAppSelector(selectNotice)

  return (
    <Application>
      <MainMenu />
      <WorkSpace>
        <TopLine />
        <Routing />
      </WorkSpace>
      {noticeEntity.noticeMessage && <AlertSnackbar noticeEntity={noticeEntity} />}
    </Application>
  )
}

const WorkSpace = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: nowrap;
  flex-direction: column;
  user-select: none;
  cursor: default;
  overflow: hidden;
`
const Application = styled.div`
  background: url(${domWrap}) 50% 50% no-repeat;
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
    opacity: 0.7;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
