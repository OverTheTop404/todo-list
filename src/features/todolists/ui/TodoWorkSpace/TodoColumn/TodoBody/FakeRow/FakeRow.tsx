import { EllipsisVertical } from 'lucide-react'
import { InputWrapper, TitleWrapper } from '../../TodoTitle/TodoTitle.tsx'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import {
  InputLabel,
  PanelTitle,
  StyledInput,
  StyledRow,
  SubMenuWrapper,
} from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoBody/TaskRow/TaskRow'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useState } from 'react'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'

type FakeRowProps = {
  todoInfo: TodoListType
}

export const FakeRow = ({ todoInfo }: FakeRowProps) => {
  const dispatch = useAppDispatch()
  const [switchLoader, setSwitchLoader] = useState(false)
  const inputHandler = () => {
    dispatch(changeModeAddTaskAC({ listId: todoInfo.id, boardId: todoInfo.board_id, status: false }))
  }

  return (
    <StyledRow>
      <TitleWrapper className={'edit'}>
        <StyledInput type={'checkbox'} checked={false} />
        <InputLabel />
        <InputWrapper>
          <Input
            todoListId={todoInfo.id}
            boardId={todoInfo.board_id}
            title={''}
            inputHandler={inputHandler}
            renameHandler={() => {}}
            switchLoader={setSwitchLoader}
          />
        </InputWrapper>
      </TitleWrapper>
      <PanelTitle>
        <SubMenuWrapper>
          <EllipsisVertical size={20} />
        </SubMenuWrapper>
      </PanelTitle>
      {switchLoader && <EntityStatus entity={'task'} />}
    </StyledRow>
  )
}
