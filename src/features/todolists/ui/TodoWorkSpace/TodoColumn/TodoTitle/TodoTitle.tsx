import styled from 'styled-components'

import { AlignRight, Palette, Pencil, Trash2 } from 'lucide-react'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import { HexColorPicker } from 'react-colorful'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useDeleteTodoListMutation, useUpdateTodoListMutation } from '@/features/todolists/api/todoListsApi'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { changeHeadLineColorAC, changeTodoEntityStatus, renameTodoModeAC } from '@/features/todolists/utils/todoUpdateQueryData'
import { usePopup } from '@/common/hooks/usePopup'

type TodoTitleProps = {
  todoInfo: TodoListType
  dragHandleProps?: any
}

export const TodoTitle = ({ todoInfo, dragHandleProps }: TodoTitleProps) => {
  const dispatch = useAppDispatch()
  const { refPopup: refMenu, showPopup: showPopupMenu, togglePopup: togglePopupMenu } = usePopup()
  const { refPopup: refColor, showPopup: showPopupColorPicker, togglePopup: togglePopupColorPicker } = usePopup()
  const [updateTodoListMutation] = useUpdateTodoListMutation()
  const [deleteTodoListMutation] = useDeleteTodoListMutation()

  const { id, title, headLineColor, renameStatus } = todoInfo

  const todoColorHandler = (color: string) => {
    dispatch(changeHeadLineColorAC(id, color))
  }

  const inputHandler = () => {
    dispatch(renameTodoModeAC(id, false))
  }

  const titlePencilHandler = () => {
    togglePopupColorPicker(false)
    togglePopupMenu(false)
    dispatch(renameTodoModeAC(id, true))
  }

  const renameHandler = (title: string) => {
    dispatch(changeTodoEntityStatus(id, 'loading'))
    updateTodoListMutation({ id, title }).then(() => {
      dispatch(changeTodoEntityStatus(id, 'idle'))
    })
  }

  const deleteHandler = () => {
    togglePopupMenu(false)
    dispatch(changeTodoEntityStatus(id, 'loading'))
    deleteTodoListMutation(id).then(() => {
      dispatch(changeTodoEntityStatus(id, 'idle'))
    })
  }

  return (
    <StyledTitle {...dragHandleProps} style={{ cursor: 'default', borderTop: `5px solid ${headLineColor ? headLineColor : '#1ac517'}` }}>
      {renameStatus || title === '' ? (
        <InputWrapper>
          <Input title={title} inputHandler={inputHandler} renameHandler={renameHandler} />
        </InputWrapper>
      ) : (
        <TitleWrapper>
          <TitleText>{title}</TitleText>
          <Pencil size={15} onClick={titlePencilHandler} />
        </TitleWrapper>
      )}

      <PanelTitle>
        <SubMenuWrapper>
          <Palette size={20} className={showPopupColorPicker ? 'active' : ''} onClick={() => togglePopupColorPicker(!showPopupColorPicker)} />
          {showPopupColorPicker && (
            <ColorMenu ref={refColor}>
              <HexColorPicker color={headLineColor} onChange={todoColorHandler} />
            </ColorMenu>
          )}
        </SubMenuWrapper>
        <SubMenuWrapper>
          <AlignRight size={20} className={showPopupMenu ? 'active' : ''} onClick={() => togglePopupMenu(!showPopupMenu)} />
          {showPopupMenu && (
            <SubMenu ref={refMenu}>
              <li onClick={titlePencilHandler}>
                <Pencil size={20} /> Rename
              </li>
              <li onClick={() => deleteHandler()}>
                <Trash2 size={20} /> Delete
              </li>
            </SubMenu>
          )}
        </SubMenuWrapper>
      </PanelTitle>
    </StyledTitle>
  )
}

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;
`
const ColorMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 150px;
  width: max-content;
  height: auto;
  background: #fff;
  padding: 0;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 0 3px 0;
`
const TitleText = styled.span`
  font-size: 19px;
  margin-right: 5px;
  font-weight: 500;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    position: relative;
    top: 0;
    width: 20px;
    height: 20px;
    padding: 3px 0 1px;
    opacity: 0;
  }
  &:hover svg {
    opacity: 1;
  }
  svg:hover {
    color: #0052cc;
    cursor: pointer;
  }
`
export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  input {
    width: 95%;
    font-weight: 500;
    background: transparent;
    border: 0;
    font-size: 19px;
    padding: 0;
  }
`
const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
`
const SubMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  color: grey;
  position: relative;
  & + & {
    margin-left: 5px;
  }
  & > svg.active {
    color: #0052cc;
  }
  &:hover > svg {
    cursor: pointer;
    color: #0052cc;
  }
`
const SubMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 150px;
  width: max-content;
  height: auto;
  background: #fff;
  padding: 10px 0;
  border-radius: 4px;
  z-index: 999;
  box-shadow: 0 0 3px 0;
  li {
    & > ul {
      position: absolute;
      top: -10px;
      left: 100%;
      display: none;
      margin-top: 0;
    }
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #667085;
    svg {
      margin-right: 5px;
    }
    &:hover {
      background: #eff0f6;
      cursor: pointer;
      color: #0052cc;
      > ul {
        display: block;
      }
    }
    &.active {
      background: #eff0f6;
      color: #0052cc;
    }
  }
`
