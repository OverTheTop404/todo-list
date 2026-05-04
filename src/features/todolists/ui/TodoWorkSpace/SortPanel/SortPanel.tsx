import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownWideNarrow,
  CircleFadingPlus,
  Filter,
  SquareCheckBig,
  SquareDashed,
  SquareMenu,
  Repeat,
} from 'lucide-react' // Добавляем Repeat иконку
import styled from 'styled-components'
import React from 'react'
import { sortTasksAC } from '@/app/app-slice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { FakeColumn } from '@/features/todolists/ui/TodoWorkSpace/SortPanel/FakeColumn/FakeColumn'
import { modeAddTodoAC, selectHasModeAddTodo, selectSortDirection, selectViewTask, viewTaskAC } from '@/app/app-slice'
import { usePopup } from '@/common/hooks/usePopup'

export const SortPanel = () => {
  const dispatch = useAppDispatch()
  const viewTask = useAppSelector(selectViewTask)
  const hasTodoMode = useAppSelector(selectHasModeAddTodo)
  const sortDirection = useAppSelector(selectSortDirection)
  const { refPopup: refSort, showPopup: sortPopup, togglePopup: setSortPopup } = usePopup()
  const { refPopup: refFilter, showPopup: filterPopup, togglePopup: setFilterPopup } = usePopup()

  const sortHandler = (direction: 'default' | 'completed-first' | 'active-first') => {
    dispatch(sortTasksAC({ direction }))
  }

  const stopHorizontalScrollOnClickColumn = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <>
      <div style={{ flex: '0 0 50px' }} onMouseDown={stopHorizontalScrollOnClickColumn}>
        <PanelBtnWrapper>
          <PanelBtn title={'Create new task list'} onClick={() => dispatch(modeAddTodoAC({ status: true }))}>
            <CircleFadingPlus size={20} />
          </PanelBtn>
        </PanelBtnWrapper>
        <PanelBtnWrapper>
          <PanelBtn title={'Sort task list'} className={sortPopup ? 'active' : ''} onClick={() => setSortPopup(!sortPopup)}>
            <ArrowDownWideNarrow size={20} />
          </PanelBtn>
          {sortPopup && (
            <SubMenu ref={refSort}>
              <li className={sortDirection === 'default' ? 'active' : ''} onClick={() => sortHandler('default')}>
                <Repeat size={20} /> Default (by position)
              </li>
              <li className={sortDirection === 'active-first' ? 'active' : ''} onClick={() => sortHandler('active-first')}>
                <ArrowDown10 size={20} /> Active first (not done)
              </li>
              <li className={sortDirection === 'completed-first' ? 'active' : ''} onClick={() => sortHandler('completed-first')}>
                <ArrowDown01 size={20} /> Completed first
              </li>
            </SubMenu>
          )}
        </PanelBtnWrapper>
        <PanelBtnWrapper>
          <PanelBtn title={'Filter task list'} className={filterPopup ? 'active' : ''} onClick={() => setFilterPopup(!filterPopup)}>
            <Filter size={20} />
          </PanelBtn>
          {filterPopup && (
            <SubMenu ref={refFilter}>
              <li className={viewTask === 'all' ? 'active' : ''} onClick={() => dispatch(viewTaskAC({ viewTask: 'all' }))}>
                <SquareMenu size={20} /> All
              </li>
              <li className={viewTask === 'completed' ? 'active' : ''} onClick={() => dispatch(viewTaskAC({ viewTask: 'completed' }))}>
                <SquareCheckBig size={20} /> Completed
              </li>
              <li className={viewTask === 'active' ? 'active' : ''} onClick={() => dispatch(viewTaskAC({ viewTask: 'active' }))}>
                <SquareDashed size={20} /> Active
              </li>
            </SubMenu>
          )}
        </PanelBtnWrapper>
      </div>
      {hasTodoMode && <FakeColumn />}
    </>
  )
}

const PanelBtnWrapper = styled.div`
  position: relative;
`
const PanelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  background-color: rgb(255, 255, 255, 0.5);
  padding: 10px;
  font-weight: bold;
  transition: background-color 200ms ease-out;
  margin-bottom: 10px;
  &:hover,
  &.active {
    cursor: pointer;
    background-color: rgb(255, 255, 255, 1);
  }
  span {
    margin-left: 5px;
    font-weight: 400;
  }
`
const SubMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 115%;
  margin-top: 0;
  min-width: 150px;
  width: max-content;
  font-weight: 400;
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
