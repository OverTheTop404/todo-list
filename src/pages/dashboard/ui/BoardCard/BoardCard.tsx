import styled from 'styled-components'
import type { Board } from '@/features/boards/api/boardsApi.types'
import { Pencil, Trash2 } from 'lucide-react'
import { useDeleteBoardMutation } from '@/features/boards/api/boardsApi'

import { NavLink } from 'react-router'
import { ModalBoard } from '@/pages/dashboard/ui/ModalBoard/ModalBoard'
import { useModal } from '@/common/hooks/useModal'
import { setNoticeAC } from '@/app/app-slice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

type Props = {
  data: Board
}

export const BoardCard = ({ data: board }: Props) => {
  const dispatch = useAppDispatch()
  const { isOpen, openModal, closeModal } = useModal()
  const [deleteBoard] = useDeleteBoardMutation()

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      try {
        await deleteBoard({ id })
        dispatch(
          setNoticeAC({
            noticeMessage: `Board "${board.title}" deleted successfully`,
            noticeType: 'success',
          }),
        )
      } catch (error: any) {
        dispatch(
          setNoticeAC({
            noticeMessage: error.message || 'Failed to delete board',
            noticeType: 'error',
          }),
        )
      }
    }
  }

  return (
    <>
      <Board style={{ backgroundImage: `url(${board.image_url})`, backgroundSize: 'cover' }}>
        <NavLink to={`/board/${board.id}`} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
          <span>{board.title}</span>
        </NavLink>
        <PanelTitle>
          <Pencil size={17} onClick={openModal} />
          <Trash2 size={17} onClick={() => handleDelete(board.id)} />
        </PanelTitle>
      </Board>
      <ModalBoard board={board} closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 15px;
  top: 5px;
  right: -15px;
  background: #000;
  color: #fff;
  padding: 5px 15px 5px 10px;
  border-radius: 4px;
  opacity: 0;
  transition: all 200ms ease-out;
`

const Board = styled.div`
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
  background-position: 50% 50%;
  background-size: cover;
  transition: all 200ms ease-out;
  border: 1px solid rgb(51 51 51);
  overflow: hidden;
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
    ${PanelTitle} {
      opacity: 1;
      right: -5px;
    }
  }
`
