import { useLang } from '@/hooks/useLang'
import { IAuthInput } from '@/types/authPopup'

const PasswordInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        fill='none'
      >
        <path
          fill='#9098B1'
          fill-rule='evenodd'
          d='M0 7.8c0-.6.4-1 1-1h18c.6 0 1 .4 1 1V19c0 .6-.4 1-1 1H1a1 1 0 0 1-1-1V7.7Zm2 1V18h16V8.7H2Z'
          clip-rule='evenodd'
        />
        <path
          fill='#9098B1'
          fill-rule='evenodd'
          d='M10 2a4.7 4.7 0 0 0-4.6 4.8 1 1 0 0 1-2 0C3.4 3.1 6.4 0 10 0c3.7 0 6.6 3.1 6.6 6.8a1 1 0 1 1-2 0c0-2.7-2-4.8-4.6-4.8ZM10 11.7c.6 0 1 .5 1 1V14a1 1 0 1 1-2 0v-1.2c0-.5.4-1 1-1Z'
          clip-rule='evenodd'
        />
      </svg>
      <input
        type='password'
        className='form__block__input'
        placeholder={translations[lang].auth_popup.password}
        {...register('password', {
          required: translations[lang].validation.required_password,
          minLength: 4,
          maxLength: 40,
        })}
      />
      {errors.password && <span>{errors.password?.message}</span>}
      {errors.password && errors.password.type === 'minLength' && (
        <span>{translations[lang].validation.min_4}</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span>{translations[lang].validation.max_20}</span>
      )}
    </div>
  )
}
export default PasswordInput
