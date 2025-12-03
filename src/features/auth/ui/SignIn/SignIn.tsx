import { type FieldErrors, type SubmitHandler, useForm } from 'react-hook-form'
import s from './SignIn.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginInputs, loginSchema } from '@/features/auth/lib/schemas/loginSchema'
import styled from 'styled-components'
import { LockKeyhole, User } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { toast } from 'react-toastify/unstyled'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { IconSvgSprite } from '@/common/components/IconSvgSprite/IconSvgSprite'
import { Path } from '@/common/routing/Routing'
import { useLoginMutation } from '../../api/sbAuthApi'
import { loaderStatusAC, setIsLoggedIn, setNoticeAC } from '@/app/app-slice'

export const SignIn = () => {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  })

  //const [mutation] = useLoginMutation()
  const [login] = useLoginMutation()

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      dispatch(loaderStatusAC({ status: 'loading' }))
      await login({
        email: data.email,
        password: data.password,
      }).unwrap()
      dispatch(setNoticeAC({ noticeMessage: 'Success Login', noticeType: 'info' }))
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } catch (error: any) {
      dispatch(setNoticeAC({ noticeMessage: error.message, noticeType: 'error' }))
    } finally {
      dispatch(loaderStatusAC({ status: 'idle' }))
    }
    // mutation(data).then((res) => {
    //   if (res.data?.resultCode === ResultCode.Success) {
    //     dispatch(setNoticeAC({ noticeMessage: 'Success Login', noticeType: 'info' }))
    //     dispatch(setIsLoggedIn({ isLoggedIn: true }))
    //     localStorage.setItem(AUTH_TOKEN, res.data.data.token)
    //   }
    // })
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
    <LoginWrapper>
      <LoginForm>
        <Logo>
          <IconSvgSprite iconId="rocketWebFull" width={'200px'} height={'55px'} viewBox={'0 0 1830 470'} />
        </Logo>
        <FormLabel>
          <h2>Sign in with</h2>
        </FormLabel>
        <SocOption>
          <SocOptionRow>
            <IconSvgSprite iconId="github" width={'25px'} height={'25px'} viewBox={'0 0 20 20'} /> GitHub
          </SocOptionRow>
          <SocOptionRow>
            <IconSvgSprite iconId="google" width={'25px'} height={'25px'} viewBox={'0 0 754 768'} /> Google
          </SocOptionRow>
        </SocOption>
        <OptionDelimiter>
          <hr />
          <div className="or-block">
            <p>OR</p>
          </div>
        </OptionDelimiter>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldWrapper>
            <FormGroup>
              <User size={18} />
              <TextField
                type="text"
                {...register('email')}
                autoComplete={'off'}
                className={errors.email && s.errorInput}
                placeholder={'name@host.com'}
              />
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
            </FormGroup>
            <FormGroup>
              <LockKeyhole size={18} />
              <TextField
                type="password"
                {...register('password')}
                autoComplete={'off'}
                className={errors.password && s.errorInput}
                placeholder={'password'}
              />
              {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
            </FormGroup>
            <FormButton type="submit">Continue</FormButton>
            <HelpersLink>
              <ForgotPass>
                <a href="#">Forgot Password?</a>
              </ForgotPass>
              <NoAccount>
                No account? <a href={Path.SignUp}>Sign up</a>
              </NoAccount>
            </HelpersLink>
          </FormFieldWrapper>
        </form>

        <ToastContainer autoClose={3000} customProgressBar={false} position={'bottom-right'} />
      </LoginForm>
      <LoginInfo>
        <FormLabel>
          <p style={{ marginBottom: '15px', fontSize: '17px', fontWeight: '600' }}>Guest access if you just want to watch:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
      </LoginInfo>
    </LoginWrapper>
  )
}
const HelpersLink = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;

  a {
    color: #fff;

    &:hover {
      color: #2864f3;
    }
  }
`
const ForgotPass = styled.div``
const NoAccount = styled.div``

const SocOption = styled.div`
  display: flex;
  gap: 10px;
`
const SocOptionRow = styled.button`
  padding: 10px;
  border: 1px solid #272a35;
  background: #191b23;
  border-radius: 4px;
  width: 100%;
  font-size: 17px;
  color: #fff;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: center;
  svg {
    margin-right: 7px;
  }
  &:hover {
    background: #272a35;
    cursor: pointer;
  }
`

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 28%;
  padding: 0 70px;
  z-index: 1;
  background: linear-gradient(90deg, #06080d 0%, rgba(13, 18, 28, 0.8) 100%);
`

const LoginInfo = styled.div`
  width: 100%;
`
const LoginForm = styled.div`
  width: 100%;
`

const OptionDelimiter = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;
  hr {
    opacity: 0.6;
    border: 0;
    border-style: solid;
    border-bottom-width: 1px;
    width: 100%;
    border-color: #282c42;
  }
  .or-block {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid #282c42;
    width: 32px;
    height: 32px;
    color: #fff;
    p {
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
    }
  }
`

const Logo = styled.div`
  display: block;
  height: 65px;
  width: 250px;
  margin-bottom: 35px;
  &:hover {
    cursor: pointer;
  }
`

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
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

const FormLabel = styled.div`
  color: #fff;
  width: 100%;
  margin-bottom: 20px;
  user-select: text;
  cursor: text;
  h2 {
    margin-bottom: 10px;
  }
`

const FormFieldWrapper = styled.div`
  position: relative;
  color: #fff;
  span {
    display: block;
    margin-bottom: 10px;
  }
`

const TextField = styled.input`
  padding: 10px 10px 10px 30px;
  border: 1px solid #282c42;
  color: #fff;
  background: #191b23;
  border-radius: 4px;
  width: 100%;
  display: block;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
  }
`
const FormButton = styled.button`
  display: block;
  background: linear-gradient(122deg, #fa5560 0.01%, #b14bf4 49.9%, #4d91ff 100%);

  animation-timing-function: ease-out;
  -webkit-animation-duration: 200ms;
  animation-duration: 200ms;
  border: 0;
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  transition: all ease-in 0.1s;
  &:hover {
    box-shadow: 0 0 1rem 0 rgba(161, 128, 255, 0.6);
    cursor: pointer;
  }
`
