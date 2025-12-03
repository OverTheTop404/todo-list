import { type ReactNode } from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'
import loginBg from '../../../assets/images/DeeDoesAI.webp'

type Props = {
  children?: ReactNode
}

export const SignLayout = ({ children }: Props) => {
  return <LayoutLogin>{children ? children : <Outlet />}</LayoutLogin>
}

const LayoutLogin = styled.div`
  background: url(${loginBg}) 50% 50% no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
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
