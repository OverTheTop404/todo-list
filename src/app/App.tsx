import styled from 'styled-components'
import domWrap from '../assets/images/domik-wrap.jpg'
import { MainMenu } from '@/common/components/MainMenu/MainMenu'
import { TopLine } from '@/common/components/TopLine/TopLine'
import { Navigate, Route, Routes } from 'react-router'
import { TodoWorkSpace } from '@/features/todolists/ui/TodoWorkSpace/TodoWorkSpace'
import { MyTasks } from '@/features/mytasks/ui/MyTasks/MyTasks'
import { OtherTasks } from '@/features/othertasks/ui/OtherTasks/OtherTasks'
import { MyCompany } from '@/features/mycompany/ui/MyCompany/MyCompany'
import { News } from '@/features/news/ui/News/News'
import { Reports } from '@/features/reports/ui/Reports/Reports'
import { License } from '@/features/license/ui/License/License'
import { Support } from '@/features/support/ui/Support/Support'
import { withDraggableScroll } from '@/common/hocs/withDraggableScroll'

export const App = () => {
  // const themeMode = useAppSelector(selectThemeMode);
  // const dispatch = useAppDispatch();
  // const changeTheme = () => {
  //   dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  // };

  const WithScroll = withDraggableScroll(TodoWorkSpace)

  return (
    <Application>
      <MainMenu />
      <WorkSpace>
        <TopLine />
        <Routes>
          <Route path={'/'} element={<Navigate to={'/rocketweb'} />} />
          <Route path={'/my-tasks'} element={<MyTasks />} />
          <Route path={'/other-tasks'} element={<OtherTasks />} />
          <Route path={'/daily-tasks'} element={<WithScroll />} />
          <Route path={'/armoglaze'} element={<WithScroll />} />
          <Route path={'/rocketweb'} element={<WithScroll />} />
          <Route path={'/my-company'} element={<MyCompany />} />
          <Route path={'/news'} element={<News />} />
          <Route path={'/reports'} element={<Reports />} />
          <Route path={'/license'} element={<License />} />
          <Route path={'/support'} element={<Support />} />
          <Route path={'/*'} element={<Support />} />
        </Routes>
      </WorkSpace>
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
