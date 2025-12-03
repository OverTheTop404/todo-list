//import s from './MainMenu.module.css'
//import loginBg from '../../../assets/images/DeeDoesAI.webp'

import styled from 'styled-components'
import { CircleFadingPlus, UserPen } from 'lucide-react'
import { useModal } from '@/common/hooks/useModal'
import { Modal } from '@/common/components/Modal/Modal'

export const Dashboard = () => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <PageWrapper>
      <SystemInform>
        <UserPen /> Demo version, for personal use only!
      </SystemInform>
      <h1>Your boards</h1>
      <YourBoardsWrapper>
        <Boards onClick={openModal}>
          <CircleFadingPlus size={50} />
          Create new board
        </Boards>
      </YourBoardsWrapper>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="modal-content-inner">
          <h2>Create new board</h2>
          <p>Это информационное модальное окно с важной информацией!</p>
          <button onClick={closeModal} className="close-btn">
            Понятно
          </button>
        </div>
      </Modal>
    </PageWrapper>
  )
}

const SystemInform = styled.div`
  position: absolute;
  right: 30px;
  display: inline-flex;
  padding: 15px;
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
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 0 calc(25% - 30px * 3 / 4);
  gap: 10px;
  height: 250px;
  border-radius: 4px;
  font-size: 18px;
  background-color: rgba(238 238 238 / 50%);
  background-size: cover;
  transition: all 200ms ease-out;

  svg {
    transition: all 200ms ease-out;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(238 238 238 / 100%);
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
//background: url(${loginBg}) 50% 50% no-repeat;
