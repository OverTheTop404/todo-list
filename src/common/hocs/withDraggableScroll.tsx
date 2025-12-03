import React, { type ComponentType, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectLoaderStatus } from '@/app/app-slice'

export const withDraggableScroll = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const loaderStatus = useAppSelector(selectLoaderStatus)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [isDraggingScreen, setIsDraggingScreen] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (scrollRef.current) {
        setIsDraggingScreen(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
      }
    }
    const handleMouseLeave = () => setIsDraggingScreen(false)
    const handleMouseUp = () => setIsDraggingScreen(false)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingScreen || !scrollRef.current || loaderStatus === 'loading') return
      e.preventDefault()
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = x - startX // Скорость прокрутки
      scrollRef.current.scrollLeft = scrollLeft - walk
    }

    return (
      <StyledSection
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          cursor: isDraggingScreen ? 'grab' : 'auto',
        }}
      >
        <WrappedComponent {...props} />
      </StyledSection>
    )
  }
}

export const StyledSection = styled.div`
  display: flex;
  flex: 1 1 0;
  gap: 30px;
  position: relative;
  padding: 30px;
  height: 100%;
  z-index: 1;

  overflow-x: auto;
`
