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

type FakeRowProps = {
  todoListId: string
  toggleTaskMode?: (value: boolean) => void
}

export const FakeRow = ({ todoListId, toggleTaskMode }: FakeRowProps) => {
  const inputHandler = () => {
    toggleTaskMode && toggleTaskMode(false)
  }

  return (
    <StyledRow>
      <TitleWrapper className={'edit'}>
        <StyledInput type={'checkbox'} checked={false} />
        <InputLabel />
        <InputWrapper>
          <Input todoListId={todoListId} title={''} inputHandler={inputHandler} renameHandler={() => {}} />
        </InputWrapper>
      </TitleWrapper>
      <PanelTitle>
        <SubMenuWrapper>
          <EllipsisVertical size={20} />
        </SubMenuWrapper>
      </PanelTitle>
    </StyledRow>
  )
}
