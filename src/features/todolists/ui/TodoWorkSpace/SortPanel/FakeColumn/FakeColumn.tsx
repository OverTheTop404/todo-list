import { InputWrapper, StyledTitle } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoTitle/TodoTitle'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import React, { Dispatch, type SetStateAction } from 'react'
import { ColumnWrapper, StyledTodoItem } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoColumn'

type FakeColumn = {
  setAddColumnMode: Dispatch<SetStateAction<boolean>>
}

export const FakeColumn = ({ setAddColumnMode }: FakeColumn) => {
  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
  const inputHandler = () => {
    setAddColumnMode(false)
  }
  return (
    <ColumnWrapper onMouseDown={stopHorizontalScrollOnClickColumn}>
      <StyledTodoItem>
        <StyledTitle style={{ borderTop: '5px solid #1ac517' }}>
          <InputWrapper>
            <Input title={''} inputHandler={inputHandler} renameHandler={() => {}} />
          </InputWrapper>
        </StyledTitle>
      </StyledTodoItem>
    </ColumnWrapper>
  )
}
