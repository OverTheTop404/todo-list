import { Navigate, Route, Routes } from 'react-router'
import { TodoWorkSpace } from '@/features/todolists/ui/TodoWorkSpace/TodoWorkSpace'
import { PageNotFound } from '@/common/components/PageNotFound/PageNotFound'
import { SignIn } from '@/features/auth/ui/SignIn/SignIn'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { ProtectedRoute } from '@/common/components/ProtectedRoute/ProtectedRoute'
import { selectIsLoggedIn } from '@/app/app-slice'
import { MainLayout } from '@/common/components/Layout/MainLayout'
import { SignLayout } from '@/common/components/Layout/SignLayout'
import { SignUp } from '@/features/auth/ui/SignUp/SignUp'
import { Dashboard } from '@/pages/dashboard/ui/Dashboard'

export const Path = {
  Main: '/',
  SignIn: '/login',
  SignUp: '/register',
  Dashboard: '/dashboard',
  Board: '/board/:boardId',
  NotFound: '*',
} as const

export const Routing = () => {
  // const WithScroll = withDraggableScroll(TodoWorkSpace)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route element={<MainLayout />}>
          <Route path={Path.Main} element={<Navigate to={'/dashboard'} />} />
          <Route path={Path.Dashboard} element={<Dashboard />} />
          <Route path={'/my-tasks'} element={''} />
          <Route path={'/other-tasks'} element={''} />
          {/*<Route path={'/daily-tasks'} element={''} />*/}
          {/*<Route path={'/armoglaze'} element={''} />*/}
          {/*<Route path={'/rocketweb'} element={<WithScroll />} />*/}
          <Route path={Path.Board} element={<TodoWorkSpace />} />
          <Route path={'/my-company'} element={''} />
          <Route path={'/news'} element={''} />
          <Route path={'/reports'} element={''} />
          <Route path={'/license'} element={''} />
          <Route path={'/support'} element={''} />
        </Route>
      </Route>
      <Route element={<MainLayout />}>
        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Route>
      {/*<Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>*/}
      {/*  <Route path={Path.SignIn} element={<SignIn />} />*/}
      {/*</Route>*/}
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Dashboard} />}>
        <Route element={<SignLayout />}>
          <Route path={Path.SignIn} element={<SignIn />} />
          <Route path={Path.SignUp} element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  )
}
