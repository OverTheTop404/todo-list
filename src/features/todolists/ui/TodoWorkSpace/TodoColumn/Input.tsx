import styled from 'styled-components'
import { ChangeEvent, type Dispatch, KeyboardEvent, type SetStateAction, useRef, useState } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { addTodoListsTC } from '@/features/todolists/model/todolist-slice.ts'
import { addTaskTC } from '@/features/todolists/model/tasks-slice.ts'

type Props = {
  todoListId?: string
  title?: string
  placeholder?: string
  inputHandler: () => void
  renameHandler: (title: string) => void
  switchLoader?: Dispatch<SetStateAction<boolean>>
}

export const Input = ({ todoListId, title, placeholder, inputHandler, renameHandler, switchLoader }: Props) => {
  const dispatch = useAppDispatch()

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
      todoListId ? dispatch(addTaskTC({ todoListId, title: letterTrim })) : dispatch(addTodoListsTC({ letterTrim }))
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
