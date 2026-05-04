//import s from './MainMenu.module.css'
//import loginBg from '../../../assets/images/DeeDoesAI.webp'

import styled from 'styled-components'
import { CircleFadingPlus, UserPen } from 'lucide-react'
import { useModal } from '@/common/hooks/useModal'
import { useGetBoardsQuery } from '@/features/boards/api/boardsApi'
import { BoardCard } from '@/pages/dashboard/ui/BoardCard/BoardCard'
import { ModalBoard } from '@/pages/dashboard/ui/ModalBoard/ModalBoard'
import { useAuthMeQuery } from '@/features/auth/api/sbAuthApi'
import { useEffect } from 'react'

export const Dashboard = () => {
  const { isOpen, openModal, closeModal } = useModal()

  const { data: userData } = useAuthMeQuery()
  const isAuthenticated = !!userData?.user

  const { data: dataBoard, refetch } = useGetBoardsQuery(undefined, {
    skip: !isAuthenticated,
  })

  useEffect(() => {
    if (isAuthenticated) {
      refetch()
    }
  }, [isAuthenticated, refetch])

  return (
    <PageWrapper>
      <SystemInform>
        <UserPen /> Demo version, for personal use only!
      </SystemInform>
      <h1>Your boards</h1>
      <YourBoardsWrapper>
        <CreateBoard onClick={openModal}>
          <CircleFadingPlus size={50} />
          Create new board
        </CreateBoard>
        {dataBoard?.map((board) => <BoardCard key={board.id} data={board} />)}
      </YourBoardsWrapper>

      <ModalBoard closeModal={closeModal} isOpen={isOpen} />
    </PageWrapper>
  )
}

const SystemInform = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  display: inline-flex;
  padding: 10px 15px;
  font-weight: 600;
  background: #ffffff;
  color: #242424;
  border-radius: 4px;
  margin-bottom: 30px;
  align-items: center;
  gap: 10px;
`

const PageWrapper = styled.div`
  padding: 30px;
`

const CreateBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex: 0 0 calc(25% - 30px * 3 / 4);
  gap: 10px;
  height: 250px;
  border-radius: 4px;
  font-size: 18px;
  background-color: rgba(238 238 238 / 50%);
  background-size: cover;
  transition: all 200ms ease-out;
  border: 1px solid rgb(51 51 51);
  svg {
    transition: all 200ms ease-out;
  }
  span {
    position: absolute;
    left: 0;
    bottom: 10px;
    background: #000;
    color: #fff;
    padding: 5px 20px 3px 20px;
    font-family: globerbook, sans-serif;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(238 238 238 / 100%);
    border: 1px solid rgb(255 255 255);
    svg {
      transform: rotate(180deg);
    }
  }
`

const YourBoardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
`
