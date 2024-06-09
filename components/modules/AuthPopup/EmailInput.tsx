import { useLang } from '@/hooks/useLang'
import { emailValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/authPopup'

const EmailInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='16' fill='none'>
        <path fill='#9098B1' fill-rule='evenodd' d='M0 1.3c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v13.4c0 .6-.4 1-1 1H1a1 1 0 0 1-1-1V1.3Zm2 1v11.4h16V2.3H2Z' clip-rule='evenodd' />
        <path fill='#9098B1' fill-rule='evenodd' d='M.2.6A1 1 0 0 1 1.7.5L10 7.6 18.3.5A1 1 0 0 1 19.7 2l-9 7.7a1 1 0 0 1-1.4 0L.3 2A1 1 0 0 1 .3.6Z' clip-rule='evenodd' />
      </svg>
      <input type='email' className='form__block__input' placeholder='Email' {...register('email', emailValidationRules(translations[lang].validation.invalid_email, translations[lang].validation.required_email))} />
      {errors.email && <span>{errors.email?.message}</span>}
    </div>
  )
}

export default EmailInput
