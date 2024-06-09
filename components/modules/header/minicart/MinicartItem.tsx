import Image from 'next/image'
import Link from 'next/link'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { formatPrice } from '@/lib/utils/common'
import { ICartItem } from '@/types/cart'
import DeleteItemBtn from '@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn'

const MinicartItem = ({ item }: { item: ICartItem }) => {
  const {
    deleteSpinner,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    count,
    setCount,
    animatedPrice,
    handleDeleteCartItem,
  } = useCartItemAction(item)

  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteCartItem}
      />
      <div className='cart-list__item__img'>
        <Image src={item.image} alt={item.name} width={96} height={96} />
      </div>
      <div className='cart-list__item__inner'>
        <Link
          href={`/catalog/${item.category}/${item.productId}`}
          className='cart-list__item__title'
        >
          <span>
            {item.name.replace('.', '')}
          </span>
        </Link>
        <div className='cart-list__item__bottom'>
          <span className='cart-list__item__price'>
            {formatPrice(animatedPrice)} ₽
          </span>
        </div>
      </div>
    </>
  )
}

export default MinicartItem