import { useUnit } from 'effector-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { handleCloseMinicart } from '@/lib/utils/common'
import MinicartItem from './MinicartItem'
import { formatPrice } from '@/lib/utils/common'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { getCartItemsFx } from '@/context/cart'
import { $cart, $cartFromLs } from '@/context/cart'

const Minicart = () => {
    const { lang, translations } = useLang()
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
    const { animatedPrice } = useTotalPrice()

    return (
      <div className='cart-popup'>
        <button className='btn-reset close-icon' onClick={handleCloseMinicart}/>
        <h3 className='cart-title'>
            {translations[lang].breadcrumbs.cart}
        </h3>
        <ul className='cart-wrapper'>
            <AnimatePresence>
                {currentCartByAuth.length ? (
                    currentCartByAuth.map((item) => (
                    <motion.li
                        key={item._id || item.clientId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='cart-list__item'
                    >
                        <MinicartItem item={item} />
                    </motion.li>
                    ))
                ) : (
                    <li className='empty-cart'>{translations[lang].common.cart_empty}</li>
                )}
            </AnimatePresence>
        </ul>
        <div className='cart-footer'>
            <div className='cart-footer-holder'>
                <strong>{translations[lang].common.order_price}:</strong>
                <span>{formatPrice(animatedPrice)} $</span>
            </div>
            <Link href='/order' className='action primary'>{translations[lang].breadcrumbs.order}</Link>
            <Link href='/cart' className='action secondary'>{translations[lang].header.go_basket}</Link>
        </div>
      </div>
    )
}

export default Minicart