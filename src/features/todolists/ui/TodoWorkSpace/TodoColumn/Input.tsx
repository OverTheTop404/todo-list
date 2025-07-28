import styled from 'styled-components'
import { ChangeEvent, type Dispatch, KeyboardEvent, type SetStateAction, useRef, useState } from 'react'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAddTodoListMutation } from '@/features/todolists/api/todoListsApi'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'
import { modeAddTodoAC } from '@/app/app-slice'

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

  const [addTodoListMutation] = useAddTodoListMutation()
  const [createTaskMutation] = useCreateTaskMutation()
  // console.log(isLoadingCreateTodo, isLoadingCreateTask)
  // useEffect(() => {
  //   // dispatch(modeAddTodoAC({ status: false }))
  //   // todoListId && dispatch(changeModeAddTaskAC(todoListId, false))
  //   if (createTodoStatus === 'fulfilled') {
  //     dispatch(modeAddTodoAC({ status: false }))
  //   }
  //   if (createTaskStatus === 'fulfilled') {
  //     todoListId && dispatch(changeModeAddTaskAC(todoListId, false))
  //   }
  // }, [isLoadingCreateTodo, isLoadingCreateTask])

  const createHandler = () => {
    if (todoListId) {
      createTaskMutation({ todoListId, title: letterTrim }).finally(() => {
        dispatch(changeModeAddTaskAC(todoListId, false))
      })
    } else {
      addTodoListMutation(letterTrim).finally(() => {
        dispatch(modeAddTodoAC({ status: false }))
      })
    }
    //todoListId ? createTaskMutation({ todoListId, title: letterTrim }) : addTodoListMutation(letterTrim)
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
