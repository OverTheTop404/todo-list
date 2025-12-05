import { type ReactNode } from 'react'
import { MainMenuNew } from '@/common/components/MainMenu/MainMenuNew'
import { TopLine } from '@/common/components/TopLine/TopLine'
import styled from 'styled-components'
import { Outlet } from 'react-router'

type Props = {
  children?: ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MainMenuNew />
      <WorkSpace>
        <TopLine />
        <MainLayoutContent>{children ? children : <Outlet />}</MainLayoutContent>
      </WorkSpace>
    </>
  )
}

const MainLayoutContent = styled.div`
  position: relative;
`
const WorkSpace = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: nowrap;
  flex-direction: column;
  user-select: none;
  cursor: default;
  overflow: hidden;
`
