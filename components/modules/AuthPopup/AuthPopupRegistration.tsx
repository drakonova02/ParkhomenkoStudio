import { useAuthForm } from '@/hooks/useAuthForm'
import AuthPopupClose from './AuthPopupClose'
import { handleSignUp, singUpFx } from '@/context/auth'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import NameInput from './NameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useLang } from '@/hooks/useLang'
import AuthPopupSocials from './AuthPopupSocials'
import Logo from '@/components/elements/logo/Logo'

const AuthPopupRegistration = ({
  toggleAuth,
  isSideActive,
}: IAuthSideProps) => {
  const { lang, translations } = useLang()
  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(singUpFx.pending, isSideActive, handleSignUp)

  const submitForm = (data: IInputs) =>
    handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-front pop-up-full'>
      <AuthPopupClose />
      <Logo />
      <p className='card-body__description'>
        {translations[lang].auth_popup.registration_description}
      </p>
      <form onSubmit={handleSubmit(submitForm)}>
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button
          className='inner__btn action primary'
          type='submit'
          disabled={spinner}
        >
          {translations[lang].auth_popup.registration_text}
        </button>
        <p className='line-text'>{translations[lang].common.or}</p>
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
        <div className='inner__bottom'>
          <span className='inner__bottom__text'>
            {translations[lang].auth_popup.registration_question}
          </span>
          <button
            type='button'
            className='btn-reset inner__switch'
            onClick={toggleAuth}
          >
            {translations[lang].auth_popup.login_text}!
          </button>
        </div>
      </form>
    </div>
  )
}

export default AuthPopupRegistration
