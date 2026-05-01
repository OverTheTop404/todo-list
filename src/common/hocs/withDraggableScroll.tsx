import React, { useRef, useState, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectLoaderStatus } from '@/app/app-slice'

interface DraggableScrollProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const DraggableScroll = ({ children, className, style }: DraggableScrollProps) => {
  const loaderStatus = useAppSelector(selectLoaderStatus)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isDraggingScreen, setIsDraggingScreen] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)
  const [isClick, setIsClick] = useState<boolean>(true)

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDraggingScreen(false)
    }

    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDraggingScreen(true)
      setIsClick(true)
      setStartX(e.pageX - (scrollRef.current.offsetLeft || 0))
      setScrollLeft(scrollRef.current.scrollLeft)
    }
  }

  const handleMouseLeave = () => setIsDraggingScreen(false)
  const handleMouseUp = () => setIsDraggingScreen(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingScreen || !scrollRef.current || loaderStatus === 'loading') return

    setIsClick(false)
    e.preventDefault()

    const x = e.pageX - (scrollRef.current.offsetLeft || 0)
    const walk = x - startX
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Предотвращаем клик если был drag
    if (!isClick) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <StyledSection
      ref={scrollRef}
      className={className}
      style={{
        cursor: isDraggingScreen ? 'grab' : 'auto',
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {children}
    </StyledSection>
  )
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
  user-select: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
