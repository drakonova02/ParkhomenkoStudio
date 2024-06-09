'use client'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  $searchModal,
  openSearchModal,
  $minicart,
  openMinicart,
} from '@/context/modals'
import { $isAuth } from '@/context/auth'
import { $user, loginCheckFx } from '@/context/user'
import HeaderProfile from './HeaderProfile'
import { setLang } from '@/context/lang'
import {
  addOverflowHiddenToBody,
  handleOpenAuthPopup,
  triggerLoginCheck,
} from '@/lib/utils/common'
import {
  addProductsFromLSToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import { useCartByAuth } from '@/hooks/useCartByAuth'

const HeaderLinks = () => {
  const isAuth = useUnit($isAuth)
  const user = useUnit($user)
  const currentCartByAuth = useCartByAuth()
  const searchModal = useUnit($searchModal)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  const handleOpenMinicart = () => {
    openMinicart()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const cart = JSON.parse(localStorage.getItem('cart') as string)
    // const favoritesFromLS = JSON.parse(
    //   localStorage.getItem('favorites') as string
    // )

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    // if (!favoritesFromLS || !favoritesFromLS?.length) {
    //   setShouldShowEmptyFavorites(true)
    // }

    if (!cart || !cart?.length) {
      setShouldShowEmpty(true)
    }

    if (auth?.accessToken) {
      return
    }

    if (cart && Array.isArray(cart)) {
      if (!cart.length) {
        setShouldShowEmpty(true)
      } else {
        setCartFromLS(cart)
      }
    }

    // if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
    //   if (!favoritesFromLS.length) {
    //     setShouldShowEmptyFavorites(true)
    //   } else {
    //     setFavoritesFromLS(favoritesFromLS)
    //   }
    // }
  }, [])

  useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
      //   const favoritesFromLS = JSON.parse(
      //     localStorage.getItem('favorites') as string
      //   )

      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }

      //   if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
      //     addProductsFromLSToFavorites({
      //       jwt: auth.accessToken,
      //       favoriteItems: favoritesFromLS,
      //     })
      //   }
    }
  }, [isAuth])

  return (
    <ul className='header-links'>
      <li>
        <button
          className='header-link search-trigger'
          onClick={handleOpenSearchModal}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            fill='none'
            viewBox='0 0 18 18'
          >
            <path
              fill='#000'
              fill-rule='evenodd'
              d='M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Zm-1.4 6.2a8 8 0 1 1 1-1l3.9 3.7-1 1.1-3.9-3.8Z'
              clip-rule='evenodd'
            />
          </svg>
        </button>
      </li>
      <li>
        <Link href='/wishlist'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='23'
            fill='none'
            viewBox='0 0 27 23'
          >
            <path
              fill='#000'
              d='M26 5.7 25.3 4l-1-1.4a6.8 6.8 0 0 0-9.4-.1l-.2.1-1.2 1.2-1.2-1.2v-.1c-.7-.6-1.4-1-2.2-1.4a6.8 6.8 0 0 0-9 4.6 6.8 6.8 0 0 0 0 3.5c0 .5.3 1 .6 1.6l1 1.4L13.6 23l10.7-10.7 1.1-1.4a6.8 6.8 0 0 0 .7-5.1Zm-1.8 3c-.3.7-.7 1.5-1.3 2.1l-9.4 9.4L4 10.8a5.3 5.3 0 0 1-1.3-2.2 5.9 5.9 0 0 1 0-2.5 5 5 0 0 1 3-3.3 5 5 0 0 1 5.4 1l2.4 2.5 2.4-2.5a5 5 0 0 1 7.8 1c.4.8.6 1.7.6 2.5v1.3h-.1Z'
            />
          </svg>
        </Link>
      </li>
      <li>
        <button
          className='header-link minicart-trigger'
          onClick={handleOpenMinicart}
        >
          {!!currentCartByAuth.length && <span className='not-empty' />}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='29'
            height='25'
            fill='none'
            viewBox='0 0 29 25'
          >
            <path
              fill='#000'
              d='M10.7 21.8c1 0 1.9-.7 1.9-1.6 0-.8-.9-1.5-1.9-1.5-1 0-1.8.7-1.8 1.5 0 .9.8 1.6 1.8 1.6ZM21.8 21.8c1 0 1.8-.7 1.8-1.6 0-.8-.8-1.5-1.9-1.5-1 0-1.8.7-1.8 1.5 0 .9.8 1.6 1.9 1.6ZM26.6 3.7l-.2-.2a1 1 0 0 0-.4 0H9.3l.5 1.3H25L22.8 13h-12L7 3.1 6.9 3l-.4-.2-3.3-.9a1 1 0 0 0-.6 0l-.4.5v.5c.2.2.3.3.5.3l3 .8 3.6 9.8-1.3 1c-.4.3-.6.7-.6 1.2 0 .4.1.8.4 1.1.3.2.5.4.9.5.3.2.6.2 1 .2H23c.2 0 .4 0 .6-.2l.2-.5c0-.2 0-.3-.2-.5a.9.9 0 0 0-.6-.2H9.3L9 16v-.4l2-1.4h12.4l.5-.1.3-.4 2.5-9.5V4c0-.1 0-.2-.2-.3Z'
            />
          </svg>
        </button>
      </li>
      <li>
        {isAuth ? (
          <HeaderProfile />
        ) : loginCheckSpinner ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              fill='#000'
              fill-rule='evenodd'
              d='M15.3 16.6a8.5 8.5 0 1 0-10.6 0 5.5 5.5 0 0 1 10.6 0Zm-1.3 1a4 4 0 0 0-8 0 8.5 8.5 0 0 0 8 0ZM10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
              clip-rule='evenodd'
            />
          </svg>
        ) : (
          <button
            className='header-link account-trigger'
            onClick={handleOpenAuthPopup}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                fill='#000'
                fill-rule='evenodd'
                d='M15.3 16.6a8.5 8.5 0 1 0-10.6 0 5.5 5.5 0 0 1 10.6 0Zm-1.3 1a4 4 0 0 0-8 0 8.5 8.5 0 0 0 8 0ZM10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
                clip-rule='evenodd'
              />
            </svg>
          </button>
        )}
      </li>
    </ul>
  )
}

export default HeaderLinks
