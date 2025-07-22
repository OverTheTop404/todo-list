import { type FieldErrors, type SubmitHandler, useForm } from 'react-hook-form'
import s from './Login.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginInputs, loginSchema } from '@/features/auth/lib/schemas/loginSchema'
import styled from 'styled-components'
import { LockKeyhole, User } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { toast } from 'react-toastify/unstyled'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { ResultCode } from '@/common/enums/enams'
import { setIsLoggedIn, setNoticeAC } from '@/app/app-slice'
import { AUTH_TOKEN } from '@/common/constants/constants'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

export const Login = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: '', password: '', rememberMe: false },
    resolver: zodResolver(loginSchema),
  })

  const [mutation] = useLoginMutation()

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    mutation(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setNoticeAC({ noticeMessage: 'Success Login', noticeType: 'info' }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
      }
    })
  }

  useEffect(() => {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const errorMessage = (errors as FieldErrors<LoginInputs>)[key as keyof LoginInputs]?.message
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
    <LoginForm>
      <FormWrapper>
        <FormLabel>
          <h2>Sign in</h2>
          <p>
            To login get registered
            <a style={{ marginLeft: '5px' }} href="https://social-network.samuraijs.com" target="_blank" rel="noreferrer">
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldWrapper>
            <FormGroup>
              <User size={18} />
              <TextField type="text" {...register('email')} className={errors.email && s.errorInput} placeholder={'Login'} />
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
            </FormGroup>
            <FormGroup>
              <LockKeyhole size={18} />
              <TextField type="password" {...register('password')} className={errors.password && s.errorInput} placeholder={'Password'} />
              {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            </FormGroup>
            <FormGroup>
              <input type="checkbox" {...register('rememberMe')} />
              Remember me
            </FormGroup>
            <FormButton type="submit">Login</FormButton>
          </FormFieldWrapper>
        </form>
      </FormWrapper>
      <ToastContainer autoClose={3000} customProgressBar={false} position={'bottom-right'} />
    </LoginForm>
  )
}

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 10px;
  & svg {
    color: rgb(71 72 72);
    position: absolute;
    left: 5px;
    top: 12px;
  }
  input[type='checkbox'] {
    margin-right: 5px;
    margin-bottom: 20px;
  }
`

const LoginForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
`

const FormLabel = styled.div`
  width: 100%;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 10px;
  }
`

const FormFieldWrapper = styled.div`
  position: relative;
`

const TextField = styled.input`
  padding: 10px 10px 10px 30px;
  border: 1px solid rgb(203 203 203);
  color: rgb(71 72 72);
  background: rgb(255 255 255);
  border-radius: 4px;
  width: 300px;
  display: block;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
  }
`
const FormButton = styled.button`
  display: block;
  background: #61a517;
  border: 0;
  padding: 7px 20px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  transition: all ease-in 0.1s;
  &:hover {
    background: #4d8311;
    cursor: pointer;
  }
`
