import { InputWrapper, StyledTitle } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoTitle/TodoTitle'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import React from 'react'
import { ColumnWrapper, StyledTodoItem } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoColumn'
import { addColumnModeAC } from '@/features/todolists/model/utility-slice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

export const FakeColumn = () => {
  const dispatch = useAppDispatch()
  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
  const inputHandler = () => {
    dispatch(addColumnModeAC({ addColumnMode: false }))
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
