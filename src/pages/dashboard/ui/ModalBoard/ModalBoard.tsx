import { FormButton, FormFieldWrapper, FormGroup, TextField } from '@/features/auth/ui/SignIn/SignIn'
import { ImageUp, NotebookPen, Pencil } from 'lucide-react'
import s from '@/features/auth/ui/SignIn/SignIn.module.css'
import { AppLoader } from '@/common/components/AppLoader/AppLoader'
import { Modal } from '@/common/components/Modal/Modal'
import styled from 'styled-components'
import { type FieldErrors, type SubmitHandler, useForm } from 'react-hook-form'
import { type CreateBoardFormInputs, createBoardFormSchema } from '@/features/boards/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { setNoticeAC } from '@/app/app-slice'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useCreateBoardMutation, useUpdateBoardMutation } from '@/features/boards/api/boardsApi'
import { useEffect } from 'react'
import { toast } from 'react-toastify/unstyled'
import { useAuthMeQuery } from '@/features/auth/api/sbAuthApi'
import type { Board } from '@/features/boards/api/boardsApi.types'
import { useNavigate } from 'react-router'

type Props = {
  closeModal: () => void
  isOpen: boolean
  board?: Board
}

const BOARD_IMAGES = [
  { id: '1', url: 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/DeeDoesAI.webp', label: 'Abstract' },
  { id: '2', url: 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/Cake.webp', label: 'Food' },
  { id: '3', url: 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/FemaleAdventurer.webp', label: 'Adventure' },
  { id: '4', url: 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/domik.webp', label: 'Winter' },
  { id: '5', url: 'https://wafkhyzjimyjwfpugwzs.supabase.co/storage/v1/object/public/OTT%20S3/nature.webp', label: 'Nature' },
]

export const ModalBoard = ({ closeModal, isOpen, board }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: dataMe } = useAuthMeQuery()
  const [createBoard, { isLoading }] = useCreateBoardMutation()
  const [updateBoard, { isLoading: isLoadingUpdate }] = useUpdateBoardMutation()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateBoardFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      image_url: BOARD_IMAGES[0].url,
      navigateToBoard: false,
    },
    resolver: zodResolver(createBoardFormSchema),
  })

  // Обновляем форму при изменении board (когда открываем модалку на редактирование)
  useEffect(() => {
    if (isOpen && board) {
      reset({
        title: board.title,
        description: board.description || '',
        image_url: board.image_url || BOARD_IMAGES[0].url,
        navigateToBoard: false,
      })
    } else if (isOpen && !board) {
      // Сбрасываем форму при создании новой доски
      reset({
        title: '',
        description: '',
        image_url: BOARD_IMAGES[0].url,
        navigateToBoard: false,
      })
    }
  }, [isOpen, board, reset])

  const handleCloseModal = () => {
    closeModal()
    // Опционально: сбрасываем форму при закрытии
    reset({
      title: '',
      description: '',
      image_url: BOARD_IMAGES[0].url,
      navigateToBoard: false,
    })
  }

  useEffect(() => {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errorMessage = (errors as FieldErrors<CreateBoardFormInputs>)[key as keyof CreateBoardFormInputs]?.message
        if (errorMessage) {
          toast.error(errorMessage, {
            autoClose: 2000,
            position: 'bottom-right',
          })
        }
      }
    }
  }, [errors])

  const selectedImage = watch('image_url')
  const navigateToBoard = watch('navigateToBoard')

  const onSubmit: SubmitHandler<CreateBoardFormInputs> = async (data) => {
    if (data.title === board?.title && data.description === board?.description && data.image_url === board?.image_url) {
      closeModal()
      return
    }

    try {
      let result
      if (board) {
        // Обновляем доску
        const { navigateToBoard: _, ...updateData } = data
        await updateBoard({ id: board.id, updates: updateData }).unwrap()
        dispatch(setNoticeAC({ noticeMessage: `«${data.title}» board success updated`, noticeType: 'success' }))
      } else {
        // Создаем доску
        const { navigateToBoard, ...boardData } = data
        result = await createBoard({
          user_id: dataMe?.user.id!,
          ...boardData,
        }).unwrap()

        dispatch(setNoticeAC({ noticeMessage: `«${data.title}» board success created`, noticeType: 'success' }))

        // Перенаправляем только если чекбокс отмечен
        if (navigateToBoard && result) {
          navigate(`/board/${result.id}`, { state: { pageName: result.title } })
        }
      }

      closeModal()
    } catch (error: any) {
      dispatch(setNoticeAC({ noticeMessage: error.message, noticeType: 'error' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalContentInner>
        {board ? <h2>Edit board</h2> : <h2>Create new board</h2>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldWrapper>
            <FormGroup>
              <Pencil size={18} />
              <TextField
                type="text"
                {...register('title')}
                autoComplete={'off'}
                className={errors.title && s.errorInput}
                placeholder={'Enter name your board'}
              />
              {errors.title && <span className={s.errorMessage}>{errors.title.message}</span>}
            </FormGroup>

            <FormGroup>
              <NotebookPen size={18} />
              <TextAreaField
                rows={3}
                {...register('description')}
                autoComplete={'off'}
                className={errors.description && s.errorInput}
                placeholder={'Description'}
              />
              {errors.description && <span className={s.errorMessage}>{errors.description.message}</span>}
            </FormGroup>

            <FormGroup>
              <label>Choose board image</label>
              <ImageRadioGroup>
                {BOARD_IMAGES.map((image) => (
                  <ImageRadioOption key={image.id}>
                    <HiddenRadioInput type="radio" {...register('image_url')} value={image.url} id={`image-${image.id}`} />
                    <ImageLabel htmlFor={`image-${image.id}`} $isSelected={selectedImage === image.url}>
                      <BoardImage src={image.url} alt={image.label} loading="lazy" />
                      <ImageOverlay $isSelected={selectedImage === image.url}>
                        <CheckIcon $isSelected={selectedImage === image.url} />
                      </ImageOverlay>
                    </ImageLabel>
                  </ImageRadioOption>
                ))}
                <BoardUpload>
                  <ImageUp size={30} />
                  <span>Upload image (in dev)</span>
                </BoardUpload>
              </ImageRadioGroup>
              {errors.image_url && <span className={s.errorMessage}>{errors.image_url.message}</span>}
            </FormGroup>

            {/* Добавляем чекбокс только для создания новой доски */}
            {!board && (
              <CheckboxGroup>
                <CheckboxLabel>
                  <CheckboxInput type="checkbox" {...register('navigateToBoard')} />
                  <CheckboxCustom $checked={navigateToBoard}>{navigateToBoard && <Checkmark>✓</Checkmark>}</CheckboxCustom>
                  <CheckboxText>Navigate to board after creation</CheckboxText>
                </CheckboxLabel>
              </CheckboxGroup>
            )}

            <FormButton type="submit">{board ? 'Save changes' : 'Create board'}</FormButton>
          </FormFieldWrapper>
        </form>
      </ModalContentInner>
      {(isLoading || isLoadingUpdate) && <AppLoader forceMode bg={'rgba(0, 0, 0, 0.5)'} />}
    </Modal>
  )
}

const ModalContentInner = styled.div`
  h2 {
    margin-bottom: 10px;
  }
`

const ImageRadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 10px;
`

const ImageRadioOption = styled.div`
  position: relative;
`

const HiddenRadioInput = styled.input`
  display: none;

  &:checked + label {
    border-color: #4f46e5;
  }
`

const ImageLabel = styled.label<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$isSelected ? '#4f46e5' : '#e5e7eb')};
  border-radius: 8px;
  transition: all 0.2s ease;
  background: ${(props) => (props.$isSelected ? '#f8fafc' : 'transparent')};
  position: relative;
  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
  }
`

const BoardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`

const BoardUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 204px;
  border-radius: 8px;
  border: 2px solid #1f1f1f;
  gap: 10px;
  color: #555555;
  &:hover {
    cursor: not-allowed;
  }
`

const ImageOverlay = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${(props) => (props.$isSelected ? '#4f46e5' : 'rgba(255, 255, 255, 0.8)')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`

const CheckIcon = styled.div<{ $isSelected: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.$isSelected ? '#ffffff' : 'transparent')};
  transition: all 0.2s ease;
`

const TextAreaField = styled.textarea`
  padding: 10px 10px 10px 30px;
  border: 1px solid #282c42;
  color: #fff;
  background: #191b23;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  min-height: 45px;
  max-height: 145px;
  display: block;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
  }
`

const CheckboxGroup = styled.div`
  margin: 15px 0;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
`

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const CheckboxCustom = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.$checked ? '#4f46e5' : '#ccc')};
  border-radius: 4px;
  margin-right: 10px;
  background: ${(props) => (props.$checked ? '#4f46e5' : 'transparent')};
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${CheckboxLabel}:hover & {
    border-color: #4f46e5;
  }
`

const Checkmark = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 0 !important;
`

const CheckboxText = styled.span`
  color: #fff;
  font-size: 14px;
  margin-bottom: 0 !important;
`
