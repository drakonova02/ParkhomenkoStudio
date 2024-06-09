import { IProductAvailableProps } from '@/types/elements'
import { useLang } from '@/hooks/useLang'

const ProductAvailable = ({ vendorCode, inStock }: IProductAvailableProps) => {
  const isInStock = +inStock > 0
  const { lang, translations } = useLang()

  return (
    <div className='detail'>
      <span className='available'>
        {isInStock
          ? translations[lang].product.available
          : translations[lang].product.not_available}
      </span>
      <span>
        {translations[lang].product.vendor_code}
        .: {vendorCode}
      </span>
    </div>
  )
}

export default ProductAvailable