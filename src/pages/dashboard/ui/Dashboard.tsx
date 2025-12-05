//import s from './MainMenu.module.css'
//import loginBg from '../../../assets/images/DeeDoesAI.webp'

import styled from 'styled-components'
import { CircleFadingPlus, ImageUp, NotebookPen, Pencil, UserPen } from 'lucide-react'
import { useModal } from '@/common/hooks/useModal'
import { Modal } from '@/common/components/Modal/Modal'
import { useCreateBoardMutation, useGetBoardsQuery } from '@/features/boards/api/boardsApi'
import { useAuthMeQuery } from '@/features/auth/api/sbAuthApi'
import s from '@/features/auth/ui/SignIn/SignIn.module.css'
import { type FieldErrors, type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type CreateBoardInputs, createBoardSchema } from '@/features/boards/lib/schemas'
import { FormButton, FormFieldWrapper, FormGroup, TextField } from '@/features/auth/ui/SignIn/SignIn'
import { useEffect } from 'react'
import { toast } from 'react-toastify/unstyled'
import loginBg from '../../../assets/images/DeeDoesAI.webp'
import domikBg from '../../../assets/images/domik.webp'
import natureBg from '../../../assets/images/nature.webp'
import cakeBg from '../../../assets/images/Cake.webp'
import femaleBg from '../../../assets/images/FemaleAdventurer.webp'
import { AppLoader } from '@/common/components/AppLoader/AppLoader'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { setNoticeAC } from '@/app/app-slice'
import { BoardCard } from '@/pages/dashboard/ui/BoardCard/BoardCard'

const BOARD_IMAGES = [
  { id: '1', url: loginBg, label: 'Abstract' },
  { id: '2', url: cakeBg, label: 'Food' },
  { id: '3', url: femaleBg, label: 'Adventure' },
  { id: '4', url: domikBg, label: 'Winter' },
  // { id: '5', url: cheryBg, label: 'Auto' },
  { id: '6', url: natureBg, label: 'Nature' },
]

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { isOpen, openModal, closeModal } = useModal()

  const { data: dataMe } = useAuthMeQuery()
  const { data: dataBoard } = useGetBoardsQuery()
  const [createBoard, { isLoading }] = useCreateBoardMutation()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateBoardInputs>({
    defaultValues: { title: '', description: '', image_url: BOARD_IMAGES[0].url },
    resolver: zodResolver(createBoardSchema),
  })

  const selectedImage = watch('image_url')

  const onSubmit: SubmitHandler<CreateBoardInputs> = async (data) => {
    try {
      await createBoard({ user_id: dataMe?.user.id!, title: data.title, description: data.description, image_url: data.image_url }).unwrap()
      closeModal()
      dispatch(setNoticeAC({ noticeMessage: `«${data.title}» board success created`, noticeType: 'success' }))
      reset()
    } catch (error: any) {
      dispatch(setNoticeAC({ noticeMessage: error.message, noticeType: 'error' }))
    }
  }

  const handleCloseModal = () => {
    closeModal()
    reset()
  }

  useEffect(() => {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errorMessage = (errors as FieldErrors<CreateBoardInputs>)[key as keyof CreateBoardInputs]?.message
        if (errorMessage) {
          toast.error(errorMessage, {
            autoClose: 2000,
            position: 'bottom-right',
          })
        }
      }
    }
  }, [errors])

  return (
    <PageWrapper>
      <SystemInform>
        <UserPen /> Demo version, for personal use only!
      </SystemInform>
      <h1>Your boards</h1>
      <YourBoardsWrapper>
        <CreateBoard onClick={openModal}>
          <CircleFadingPlus size={50} />
          Create new board
        </CreateBoard>
        {dataBoard?.map((board) => (
          <BoardCard data={board} />
          // <Boards key={board.id} style={{ background: `url(${board.image_url}) 50% 50%`, backgroundSize: 'cover' }}>
          //   {/*<img src={board.image_url} style={{ width: '100%' }} alt="" />*/}
          //   <span>{board.title}</span>
          // </Boards>
        ))}
      </YourBoardsWrapper>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalContentInner>
          <h2>Create new board</h2>
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
                    <span>Upload image ( in dev)</span>
                  </BoardUpload>
                </ImageRadioGroup>
                {errors.image_url && <span className={s.errorMessage}>{errors.image_url.message}</span>}
              </FormGroup>
              <FormButton type="submit">Create board</FormButton>
            </FormFieldWrapper>
          </form>
        </ModalContentInner>
        {isLoading && <AppLoader forceMode bg={'rgba(0, 0, 0, 0.5)'} />}
      </Modal>
    </PageWrapper>
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

const SystemInform = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  display: inline-flex;
  padding: 10px 15px;
  font-weight: 600;
  background: #ffffff;
  color: #242424;
  border-radius: 4px;
  margin-bottom: 30px;
  align-items: center;
  gap: 10px;
`

const PageWrapper = styled.div`
  padding: 30px;
`
const CreateBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  flex: 0 0 calc(25% - 30px * 3 / 4);
  gap: 10px;
  height: 250px;
  border-radius: 4px;
  font-size: 18px;
  background-color: rgba(238 238 238 / 50%);
  background-size: cover;
  transition: all 200ms ease-out;
  border: 1px solid rgb(51 51 51);
  svg {
    transition: all 200ms ease-out;
  }
  span {
    position: absolute;
    left: 0;
    bottom: 10px;
    background: #000;
    color: #fff;
    padding: 5px 20px 3px 20px;
    font-family: globerbook, sans-serif;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(238 238 238 / 100%);
    border: 1px solid rgb(255 255 255);
    svg {
      transform: rotate(180deg);
    }
  }
`
const YourBoardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
`
//background: url(${loginBg}) 50% 50% no-repeat;
