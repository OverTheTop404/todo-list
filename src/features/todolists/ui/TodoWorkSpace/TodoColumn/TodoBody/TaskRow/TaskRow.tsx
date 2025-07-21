import styled from 'styled-components'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import { InputWrapper, TitleWrapper } from '../../TodoTitle/TodoTitle.tsx'
import { Input } from '@/features/todolists/ui/TodoWorkSpace/TodoColumn/Input'
import { useEffect, useRef, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { deleteTaskTC, type DomainTask, renameTaskModeAC, updateTaskTC } from '@/features/todolists/model/tasks-slice.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { TaskStatus } from '@/common/enums/enams'
import { EntityStatus } from '@/common/components/EntityStatus/EntityStatus'

type StyledInputProps = {
  taskInfo: DomainTask
}

export const TaskRow = ({ taskInfo }: StyledInputProps) => {
  const dispatch = useAppDispatch()

  const [showPopup, setShowPopup] = useState(false)

  const refPopup = useRef<HTMLUListElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (refPopup.current && !refPopup.current.contains(event.target as Node)) {
      setShowPopup(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])

  const renameHandler = (title: string) => {
    dispatch(updateTaskTC({ ...taskInfo, title: title }))
  }

  const changeTaskStatusHandler = () => {
    const newStatus = taskInfo.status === TaskStatus.New ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ ...taskInfo, status: newStatus }))
  }

  const titlePencilHandler = () => {
    setShowPopup(false)
    dispatch(renameTaskModeAC({ taskId: taskInfo.id, mode: true }))
  }

  const deleteTaskHandler = () => {
    setShowPopup(false)
    dispatch(deleteTaskTC({ todolistId: taskInfo.todoListId, taskId: taskInfo.id }))
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: taskInfo.id,
    data: {
      type: 'Task',
      taskInfo,
    },
    disabled: taskInfo.renameStatus,
    // animateLayoutChanges,
  })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    borderRadius: '4px',
    opacity: isDragging ? 0 : 1,
    cursor: isDragging ? 'grab' : 'auto',
    // color: isDragging ? "#ebecf0" : "#242424",
    // background: isDragging ? "#ebecf0" : "#fff",
    // border: "1px solid #ebecf0",
  }
  if (isDragging) {
    return (
      <StyledRow
        className={taskInfo.status === TaskStatus.Completed ? 'checkedView' : ''}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <TitleWrapper id={taskInfo.id}>
          <StyledInput type={'checkbox'} />
          <InputLabel></InputLabel>
          <div>
            <LabelText>{taskInfo.title}</LabelText>
            <Pencil size={20} />
          </div>
        </TitleWrapper>
        <PanelTitle>
          <SubMenuWrapper>
            <EllipsisVertical size={20} className={showPopup ? 'active' : ''} />
          </SubMenuWrapper>
        </PanelTitle>
      </StyledRow>
    )
  }

  return (
    <StyledRow
      className={taskInfo.status === TaskStatus.Completed ? 'checkedView' : ''}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {taskInfo.renameStatus ? (
        <TitleWrapper className={'edit'}>
          <StyledInput type={'checkbox'} checked={taskInfo.status === TaskStatus.Completed} />
          <InputLabel />
          <InputWrapper>
            <Input title={taskInfo.title} inputHandler={() => {}} renameHandler={renameHandler} />
          </InputWrapper>
        </TitleWrapper>
      ) : (
        <TitleWrapper>
          <StyledInput type={'checkbox'} checked={taskInfo.status === TaskStatus.Completed} />
          <InputLabel onClick={() => changeTaskStatusHandler()}></InputLabel>
          <div>
            <LabelText onClick={() => changeTaskStatusHandler()}>{taskInfo.title}</LabelText>
            <Pencil size={20} onClick={titlePencilHandler} />
          </div>
        </TitleWrapper>
      )}
      <PanelTitle>
        <SubMenuWrapper>
          <EllipsisVertical size={20} className={showPopup ? 'active' : ''} onClick={() => setShowPopup(true)} />
          {showPopup && (
            <SubMenu ref={refPopup}>
              <li onClick={titlePencilHandler}>
                <Pencil size={20} /> Rename
              </li>
              <li onClick={() => deleteTaskHandler()}>
                <Trash2 size={20} /> Delete
              </li>
            </SubMenu>
          )}
        </SubMenuWrapper>
      </PanelTitle>
      {taskInfo.entityStatus === 'loading' && <EntityStatus entity={'task'} />}
    </StyledRow>
  )
}

export const PanelTitle = styled.div`
  display: flex;
  flex-direction: row;
`
export const SubMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  color: grey;
  position: relative;
  & + & {
    margin-left: 5px;
  }
  & > svg.active {
    color: #0052cc;
  }
  &:hover > svg {
    cursor: pointer;
    color: #0052cc;
  }
`
const SubMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  min-width: 150px;
  width: max-content;
  height: auto;
  background: #fff;
  padding: 10px 0;
  border-radius: 4px;
  z-index: 999;
  box-shadow: 0 0 3px 0;
  li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    color: #667085;
    font-size: 16px;
    & > ul {
      position: absolute;
      top: -10px;
      left: 100%;
      display: none;
      margin-top: 0;
    }
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
export const LabelText = styled.span`
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
`
export const InputLabel = styled.label`
  flex: 0 0 0;
  position: relative;
  top: -50%;
`
export const StyledRow = styled.li`
  display: flex;
  justify-content: space-between;
  //line-height: 1.4;
  background: #fff;
  border: 1px solid #ebecf0;
  margin-bottom: 5px;
  padding: 10px 2px 10px 10px;
  font-size: 18px;
  border-radius: 4px;
  position: relative;
  &.checkedView {
    ${TitleWrapper} {
      color: #aaa;
      text-decoration: line-through;
      & svg {
        color: initial;
        &:hover {
          cursor: pointer;
          color: #0052cc;
        }
      }
      &.edit {
        color: initial;
        text-decoration: none;
      }
    }
  }

  &:hover &:before {
    display: none;
  }
  ${InputWrapper} {
    flex: 1 1 0;
    input {
      font-weight: 400;
      font-size: 17px;
    }
  }
  ${TitleWrapper} {
    flex: 1 1 0;
    height: auto;
    min-height: 24px;
    //position: relative;
    //top: -1px;
    svg {
      padding: 2px 0 1px;
      margin-left: 2px;
      height: 19px;
      top: 3px;
    }
  }
  .trash {
    color: #bfbfbf;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  &:hover svg {
    opacity: 1;
  }
`
export const StyledInput = styled.input`
  &[type='checkbox']:checked,
  &[type='checkbox']:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &[type='checkbox']:checked + label,
  &[type='checkbox']:not(:checked) + label {
    //display: inline-block;
    //position: relative;
    padding-left: 28px;
    line-height: 20px;
    cursor: pointer;
  }
  &[type='checkbox']:checked + label:before,
  &[type='checkbox']:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 20px;
    height: 20px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
  }

  &[type='checkbox']:checked + label:before,
  &[type='checkbox']:not(:checked) + label:before {
    border-radius: 2px;
  }
  &[type='checkbox']:checked + label:after,
  &[type='checkbox']:not(:checked) + label:after {
    content: '';
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &[type='checkbox']:checked + label:after,
  &[type='checkbox']:not(:checked) + label:after {
    left: 3px;
    top: 6px;
    width: 14px;
    height: 9px;
    border-radius: 1px;
    border-left: 4px solid #41c21f;
    border-bottom: 4px solid #41c21f;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  &[type='checkbox']:not(:checked) + label:after {
    opacity: 0;
  }

  &[type='checkbox']:checked + label:after {
    opacity: 1;
  }
`
