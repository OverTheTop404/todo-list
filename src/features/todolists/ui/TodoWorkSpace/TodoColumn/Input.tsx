import styled from 'styled-components'
import { ChangeEvent, type Dispatch, KeyboardEvent, type SetStateAction, useRef, useState } from 'react'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi'
import { useCreateTaskMutation as useCreateTaskSbMutation } from '@/features/todolists/api/tasksSbApi'
import { useAddTodoListMutation } from '@/features/todolists/api/todoListsSbApi'
import { useParams } from 'react-router'

type Props = {
  todoListId?: string
  boardId?: string
  title?: string
  placeholder?: string
  inputHandler: () => void
  renameHandler: (title: string) => void
  switchLoader?: Dispatch<SetStateAction<boolean>>
}

export const Input = ({ todoListId, title, boardId, placeholder, inputHandler, renameHandler, switchLoader }: Props) => {
  const params = useParams()
  const [addTodoListMutation] = useAddTodoListMutation()
  const [createTaskMutation] = useCreateTaskMutation() // Если удалить - белый экран!!!????????? Почему-то
  const [createTaskSbMutation] = useCreateTaskSbMutation()

  const createHandler = () => {
    if (todoListId && boardId) {
      // createTaskMutation({ todoListId, title: letterTrim })
      createTaskSbMutation({ boardId, list_id: todoListId, title: letterTrim })
    } else {
      addTodoListMutation({ title: letterTrim, board_id: params.boardId! })
    }
  }

  const ref = useRef<HTMLInputElement | null>(null)

  const [letter, setLetter] = useState<string>(title ? title : '')
  const letterTrim = letter.replace(/\s+/g, ' ').trim()

  const currentLetter = (e: ChangeEvent<HTMLInputElement>) => {
    setLetter(e.currentTarget.value)
  }

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && ref.current) ref.current.blur()
  }

  const onBlurInputHandler = () => {
    if (!letterTrim.length || title === letterTrim) {
      inputHandler()
    }
    if (letterTrim.length && title === '') {
      switchLoader && switchLoader(true)
      createHandler()
    }
    if (title?.length && letterTrim.length && title !== letterTrim) {
      renameHandler(letterTrim)
    }
  }

  return (
    <>
      <StyledInput
        autoFocus
        ref={ref}
        type={'text'}
        value={letter}
        className={'editInput'}
        placeholder={placeholder ? placeholder : 'Enter a name'}
        onChange={currentLetter}
        onKeyDown={keyPressHandler}
        onBlur={onBlurInputHandler}
      />
    </>
  )
}

const StyledInput = styled.input`
  font-size: 14px;
  padding: 4px 5px;
`
