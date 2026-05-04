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
import { Callback } from '@/features/auth/ui/Callback/Callback'

export const Path = {
  Main: '/',
  SignIn: '/login',
  SignUp: '/register',
  Dashboard: '/dashboard',
  Board: '/board/:boardId',
  Callback: '/auth/callback',
  NotFound: '*',
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route path={Path.Callback} element={<Callback />} />

      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route element={<MainLayout />}>
          <Route path={Path.Main} element={<Navigate to={'/dashboard'} />} />
          <Route path={Path.Dashboard} element={<Dashboard />} />
          <Route path={'/my-tasks'} element={<div>My Tasks</div>} />
          <Route path={'/other-tasks'} element={<div>Other Tasks</div>} />
          <Route path={Path.Board} element={<TodoWorkSpace />} />
          <Route path={'/my-company'} element={<div>My Company</div>} />
          <Route path={'/news'} element={<div>News</div>} />
          <Route path={'/reports'} element={<div>Reports</div>} />
          <Route path={'/license'} element={<div>License</div>} />
          <Route path={'/support'} element={<div>Support</div>} />
        </Route>
      </Route>

      <Route element={<MainLayout />}>
        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Dashboard} />}>
        <Route element={<SignLayout />}>
          <Route path={Path.SignIn} element={<SignIn />} />
          <Route path={Path.SignUp} element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  )
}
