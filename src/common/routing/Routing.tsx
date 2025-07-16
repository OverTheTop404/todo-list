import { Navigate, Route, Routes } from 'react-router'
import { withDraggableScroll } from '@/common/hocs/withDraggableScroll'
import { TodoWorkSpace } from '@/features/todolists/ui/TodoWorkSpace/TodoWorkSpace'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound'
import { Login } from '@/common/components/Login/Login'

const WithScroll = withDraggableScroll(TodoWorkSpace)

export const Path = {
  Main: '/',
  Login: '/login',
  NotFound: '*',
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Navigate to={'/rocketweb'} />} />
      <Route path={'/my-tasks'} element={''} />
      <Route path={'/other-tasks'} element={''} />
      <Route path={'/daily-tasks'} element={''} />
      <Route path={'/armoglaze'} element={''} />
      <Route path={'/rocketweb'} element={<WithScroll />} />
      <Route path={'/my-company'} element={''} />
      <Route path={'/news'} element={''} />
      <Route path={'/reports'} element={''} />
      <Route path={'/license'} element={''} />
      <Route path={'/support'} element={''} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
