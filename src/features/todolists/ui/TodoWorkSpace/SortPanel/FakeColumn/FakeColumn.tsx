import { InputWrapper, StyledTitle } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoTitle/TodoTitle'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import React, { useState } from 'react'
import { ColumnWrapper, StyledTodoItem } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/TodoColumn'
import styled from 'styled-components'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'
import { modeAddTodoAC } from '@/app/app-slice'

export const FakeColumn = () => {
  const dispatch = useAppDispatch()
  const [switchLoader, setSwitchLoader] = useState(false)
  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
  const inputHandler = () => {
    dispatch(modeAddTodoAC({ status: false }))
  }
  return (
    <ColumnWrapper onMouseDown={stopHorizontalScrollOnClickColumn} style={{ marginRight: '0' }}>
      <StyledTodoItem>
        <StyledTitle style={{ borderTop: '5px solid #1ac517' }}>
          <InputWrapper>
            <Input title={''} inputHandler={inputHandler} renameHandler={() => {}} switchLoader={setSwitchLoader} />
          </InputWrapper>
          <PanelTitle>
            <SubMenuWrapper />
            <SubMenuWrapper />
          </PanelTitle>
        </StyledTitle>
        <StyledEmptyTask>
          <EmptyTaskRow />
        </StyledEmptyTask>
        <StyledEmptyBtn>
          <EmptyBtn />
        </StyledEmptyBtn>
        {switchLoader && <EntityStatus />}
      </StyledTodoItem>
    </ColumnWrapper>
  )
}

const StyledEmptyTask = styled.ul`
  padding: 3px 15px;
`
const EmptyTaskRow = styled.div`
  height: 15px;
  width: 150px;
  border-radius: 10px;
  background: #c9c9c9;
`
const StyledEmptyBtn = styled.div`
  padding: 13px 15px 18px;
`
const EmptyBtn = styled.div`
  height: 15px;
  width: 86px;
  border-radius: 10px;
  background: #c9c9c9;
`
const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
`
const SubMenuWrapper = styled.div`
  background-color: #c9c9c9;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  & + & {
    margin-left: 5px;
  }
`
