/* eslint-disable react/jsx-indent */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import CartList from '@/components/modules/CartPage/CartList'
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { basePropsForMotion } from '@/constants/motion'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'
import { $cart, $cartFromLs, $shouldShowEmpty } from '@/context/cart'
import { getCartItemsFx } from '@/context/cart'

const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const { lang, translations } = useLang()
  const isMedia930 = useMediaQuery(930)
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] = useState(false)
  const shouldShowEmpty = useUnit($shouldShowEmpty)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      {!shouldShowEmpty ? (
        <section>
          <div className='container'>
            <HeadingWithCount count={countWholeCartItemsAmount(currentCartByAuth)} title={translations[lang].breadcrumbs.cart} spinner={cartSpinner} />
            <div>
              <div>
                {(isUserAuth() ? cartSpinner || loginCheckSpinner : cartSpinner) && (
                  <motion.ul {...basePropsForMotion}>
                    {Array.from(new Array(3)).map((_, i) => (
                      <li key={i}>
                        <div />
                      </li>
                    ))}
                  </motion.ul>
                )}
                {!cartSpinner && (
                  <motion.ul {...basePropsForMotion} className={`list-reset`}>
                    <CartList />
                  </motion.ul>
                )}
              </div>
              <div>
                {isMedia930 && <PromotionalCode setIsCorrectPromotionalCode={setIsCorrectPromotionalCode} />}
                <div>
                  <OrderInfoBlock isCorrectPromotionalCode={isCorrectPromotionalCode} />
                </div>
              </div>
            </div>
            {!isMedia930 && <PromotionalCode setIsCorrectPromotionalCode={setIsCorrectPromotionalCode} />}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent subtitle={translations[lang].common.cart_empty} description={translations[lang].common.cart_empty_advice} btnText={translations[lang].common.go_shopping} />
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage
