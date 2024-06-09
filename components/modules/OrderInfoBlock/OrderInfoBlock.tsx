import Link from 'next/link'
import { useUnit } from 'effector-react'
import { MutableRefObject, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import {
  formatPrice,
  handleOpenAuthPopup,
  isUserAuth,
  showCountMessage,
} from '@/lib/utils/common'
import { IOrderInfoBlockProps } from '@/types/modules'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/context/cart'
import {
  makePayment, makePaymentFx,
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $onlinePaymentTab,
  $orderDetailsValues,
  $pickupTab,
} from '@/context/order'
import toast from 'react-hot-toast'

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage,
}: IOrderInfoBlockProps) => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [isUserAgree, setIsUserAgree] = useState(false)
  const { animatedPrice } = useTotalPrice()
  const onlinePaymentTab = useUnit($onlinePaymentTab)
  const pickupTab = useUnit($pickupTab)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const paymentSpinner = useUnit(makePaymentFx.pending)
  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)
  const orderDetailsValues = useUnit($orderDetailsValues)

  const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

  const scrollToBlock = (selector: HTMLLIElement) =>
    window.scrollTo({
      top: selector.getBoundingClientRect().top + window.scrollY + -50,
      behavior: 'smooth',
    })

  const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key == ' ' || e.code == 'Space') {
      e.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = !checkboxRef.current.checked
    }
  }

  const handleMakePayment = async () => {
    if (
      !chosenCourierAddressData.address_line1 &&
      !chosenPickupAddressData.address_line1
    ) {
      const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      scrollToBlock(orderBlock)
      toast.error('Нужно выбрать адрес!')
      return
    }

    if (!orderDetailsValues.isValid) {
      const detailsBlock = document.querySelector(
        '.details-block'
      ) as HTMLLIElement
      scrollToBlock(detailsBlock)
      return
    }

    if (!isUserAuth()) {
      handleOpenAuthPopup()
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    let description = ''

    if (chosenCourierAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес достаки товара курьером: ${chosenCourierAddressData.address_line1}, ${chosenCourierAddressData.address_line2}`
    }

    if (chosenPickupAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес получения товара: ${chosenPickupAddressData.address_line1}, ${chosenPickupAddressData.address_line2}`
    }

    console.log(orderDetailsValues)

    makePayment({
      jwt: auth.accessToken,
      description,
      amount: `${priceWithDiscount.replace(' ', '')}`,
      metadata: orderDetailsValues,
    })
  }

  return (
    <div>
      <div>
        <p>
          {countWholeCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countWholeCartItemsAmount(currentCartByAuth)}`,
            lang
          )}{' '}
          {translations[lang].order.worth}{' '}
          <span>
            {formatPrice(animatedPrice)} ₽
          </span>
        </p>
        <p>
          {translations[lang].order.amount_with_discounts}:{' '}
          <span>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage && (
          <>
            <p>
              {translations[lang].order.delivery}:{' '}
              <span>
                {pickupTab
                  ? translations[lang].order.pickup_free
                  : translations[lang].order.courier_delivery}
              </span>
            </p>
            <p>
              {translations[lang].order.payment}:{' '}
              <span>
                {onlinePaymentTab
                  ? translations[lang].order.online_payment
                  : translations[lang].order.upon_receipt}
              </span>
            </p>
          </>
        )}
        <p>
          <span>{translations[lang].order.total}:</span>
          <span>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage ? (
          <button
            className={`btn-reset`}
            disabled={
              !isUserAgree || !currentCartByAuth.length || paymentSpinner
            }
            onClick={handleMakePayment}
          >
            {translations[lang].order.make_order}
          </button>
        ) : (
          <Link
            href='/order'
            className={`${!isUserAgree || !currentCartByAuth.length ? 'disabled' : ''}`}
          >
            {translations[lang].order.make_order}
          </Link>
        )}
        <label>
          <input
            type='checkbox'
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
          />
          <span />
          <span
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span>
            {translations[lang].order.agreement_text}{' '}
            <Link
              href='/privacy'
            >
              {translations[lang].order.agreement_link}
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock