import { Navigate, Route, Routes } from 'react-router'
import { withDraggableScroll } from '@/common/hocs/withDraggableScroll'
import { TodoWorkSpace } from '@/features/todolists/ui/TodoWorkSpace/TodoWorkSpace'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound'
import { Login } from '@/features/auth/ui/Login/Login'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { ProtectedRoute } from '@/common/components/ProtectedRoute/ProtectedRoute'
import { selectIsLoggedIn } from '@/app/app-slice'

const WithScroll = withDraggableScroll(TodoWorkSpace)

export const Path = {
  Main: '/',
  Login: '/login',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
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
      </Route>

      {/*<Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>*/}
      {/*  <Route path={Path.Login} element={<Login />} />*/}
      {/*</Route>*/}

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
