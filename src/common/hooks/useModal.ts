import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const afterOpenModal = () => {
    console.log('modal open')
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return { isOpen, openModal, afterOpenModal, closeModal }
}
