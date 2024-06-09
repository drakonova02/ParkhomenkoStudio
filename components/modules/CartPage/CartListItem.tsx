import Image from 'next/image'
import { ICartItem } from '@/types/cart'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/lib/utils/common'

const CartListItem = ({ item }: { item: ICartItem }) => {
  const { deleteSpinner, increasePriceWithAnimation, decreasePriceWithAnimation, animatedPrice, count, setCount, handleDeleteCartItem } = useCartItemAction(item)
  const isMedia530 = useMediaQuery(530)
  const imageSize = isMedia530 ? 132 : 160

  return (
    <>
      <button disabled={deleteSpinner} className={`btn-reset`} onClick={handleDeleteCartItem}>
        {deleteSpinner ? (
          <svg width='9' height='11' viewBox='0 0 9 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M8.28125 2.3125H6.81641L6.15234 1.21875C5.97656 0.925781 5.68359 0.75 5.35156 0.75H3.37891C3.04688 0.75 2.75391 0.925781 2.57812 1.21875L1.91406 2.3125H0.449219C0.195312 2.3125 0 2.52734 0 2.78125C0 3.01562 0.195312 3.25 0.449219 3.25H0.625L1.03516 9.87109C1.05469 10.3789 1.46484 10.75 1.97266 10.75H6.75781C7.26562 10.75 7.67578 10.3789 7.69531 9.87109L8.125 3.25H8.28125C8.53516 3.25 8.75 3.05469 8.75 2.78125C8.75 2.52734 8.53516 2.3125 8.28125 2.3125ZM3.37891 1.6875H5.35156L5.72266 2.3125H3.00781L3.37891 1.6875ZM6.75781 9.8125H1.97266L1.5625 3.25H7.16797L6.75781 9.8125Z'></path>
          </svg>
        ) : (
          <span />
        )}
      </button>
      <div>
        <Image src={item.image} alt={item.name} width={imageSize} height={imageSize} />
      </div>
      <div>
        <div>{item.name}</div>
      </div>
      <div>
        <div>
          <span>{formatPrice(+item.price)} $</span>
        </div>
        <div>{formatPrice(animatedPrice)} $</div>
      </div>
    </>
  )
}

export default CartListItem
