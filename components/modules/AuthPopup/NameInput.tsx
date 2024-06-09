import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage'
import { useLang } from '@/hooks/useLang'
import { nameValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/authPopup'

const NameInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'>
        <path fill='#9098B1' fill-rule='evenodd' d='M10 2a2.9 2.9 0 1 0 0 5.8A2.9 2.9 0 0 0 10 2ZM5.1 4.9a4.9 4.9 0 1 1 9.8 0 4.9 4.9 0 0 1-9.8 0ZM7.5 13.4c-3 0-5.5 2.5-5.5 5.5v.1a1 1 0 1 1-2 0c0-4.2 3.4-7.6 7.5-7.6h5c4.1 0 7.5 3.4 7.5 7.5v.1a1 1 0 1 1-2 0c0-3.1-2.5-5.6-5.5-5.6h-5Z' clip-rule='evenodd' />
      </svg>
      <input type='text' className='form__block__input' placeholder={translations[lang].auth_popup.name} {...register('name', nameValidationRules(translations[lang].validation.invalid_value, translations[lang].validation.requiredName))} />
      <NameErrorMessage errors={errors} fieldName='name' />
    </div>
  )
}

export default NameInput
