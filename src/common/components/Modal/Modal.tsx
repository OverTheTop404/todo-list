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
      <ModalWrapper>
        {children}
        <CloseBtn onClick={onClose}>
          <X size={30} />
        </CloseBtn>
      </ModalWrapper>
    </ReactModal>
  )
}

const ModalWrapper = styled.div`
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
