import { useState } from 'react'
import { useLang } from '@/hooks/useLang'

const PromotionalCode = ({
  setIsCorrectPromotionalCode,
}: {
  setIsCorrectPromotionalCode: (arg0: boolean) => void
}) => {
  const [value, setValue] = useState('')
  const isCorrectCode = value === 'new1096'
  const { lang, translations } = useLang()

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    if (e.target.value === 'new1096') {
      setIsCorrectPromotionalCode(true)
    } else {
      setIsCorrectPromotionalCode(false)
    }
  }

  return (
    <div>
      <input
        type='text'
        placeholder={translations[lang].order.promocode}
        value={value}
        onChange={handleChangeValue}
        style={
          isCorrectCode ? { border: '1px solid #16D9A6', color: '16D9A6' } : {}
        }
      />
      <p>{translations[lang].order.promo_code_text}</p>
    </div>
  )
}

export default PromotionalCode
