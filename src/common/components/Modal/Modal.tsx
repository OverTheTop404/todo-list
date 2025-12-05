import ReactModal from 'react-modal'
import React from 'react'
import styled from 'styled-components'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ReactModal closeTimeoutMS={300} isOpen={isOpen} onRequestClose={onClose} className="modal-content" overlayClassName="modal-overlay">
      <ModalWrapper>{children}</ModalWrapper>
      <CloseBtn onClick={onClose}>
        <X size={30} />
      </CloseBtn>
    </ReactModal>
  )
}

const ModalWrapper = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 20px;
`

const CloseBtn = styled.div`
  position: absolute;
  right: -5px;
  top: -35px;
  color: #fff;
  &:hover {
    cursor: pointer;
    color: red;
  }
`
