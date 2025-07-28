import {
  EmptyTaskRow,
  EmptyTaskRowWithoutAnimate,
  StyledEmptyTask,
  SubMenuWrapperWithoutAnimate,
} from '@/features/todolists/ui/TodoWorkSpace/TodoSkeleton/TodoSkeleton'

export const TaskSkeleton = ({ taskRows }: { taskRows: number }) => {
  const rows = Array.from({ length: taskRows }, (_, index) => (
    <EmptyTaskRow key={index}>
      <SubMenuWrapperWithoutAnimate />
      <EmptyTaskRowWithoutAnimate bg="#ebecf0" />
    </EmptyTaskRow>
  ))
  return <StyledEmptyTask>{rows}</StyledEmptyTask>
}
