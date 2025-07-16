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
import { modeAddTaskAC } from '@/features/todolists/model/todolist-slice'
import { useState } from 'react'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'

type FakeRowProps = {
  todoListId: string
}

export const FakeRow = ({ todoListId }: FakeRowProps) => {
  const dispatch = useAppDispatch()
  const [switchLoader, setSwitchLoader] = useState(false)
  const inputHandler = () => {
    dispatch(modeAddTaskAC({ status: false, todoListId }))
  }

  return (
    <StyledRow>
      <TitleWrapper className={'edit'}>
        <StyledInput type={'checkbox'} checked={false} />
        <InputLabel />
        <InputWrapper>
          <Input todoListId={todoListId} title={''} inputHandler={inputHandler} renameHandler={() => {}} switchLoader={setSwitchLoader} />
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
