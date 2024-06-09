'use client'
import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'
import { handleJWTError } from '@/lib/utils/errors'
import { ICartItem, IAddProductToCartFx, IAddProductsFromLSToCartFx, IUpdateCartItemCountFx, IDeleteCartItemsFx } from '@/types/cart'
import api from '@/api/apiInstance'

export const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart = cart.createEvent<IAddProductsFromLSToCartFx>()
export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()
export const setTotalPrice = cart.createEvent<number>()
export const deleteProductFromCart = cart.createEvent<IDeleteCartItemsFx>()
export const setShouldShowEmpty = cart.createEvent<boolean>()

export const addProductsFromLSToCartFx = createEffect(async ({ jwt, cartItems }: IAddProductsFromLSToCartFx) => {
  try {
    const { data } = await api.post(
      '/api/cart/add-many',
      { items: cartItems },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )

    if (data?.error) {
      const newData: { cartItems: ICartItem[] } = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'addProductsFromLSToCartFx',
        payload: { items: cartItems },
      })
      return newData
    }

    loadCartItems({ jwt })
    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})
export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/cart/all', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      const newData: ICartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'getCartItemsFx',
      })
      return newData
    }

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const addProductToCartFx = createEffect(async ({ jwt, setSpinner, ...dataFields }: IAddProductToCartFx) => {
  try {
    setSpinner(true)
    const { data } = await api.post('/api/cart/add', dataFields, {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      const newData: { newCartItem: ICartItem } = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'addProductToCartFx',
        payload: { ...dataFields, setSpinner },
      })
      return newData
    }

    toast.success('Добавлено в корзину!')
    return data
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
})

export const updateCartItemCountFx = createEffect(async ({ jwt, id, setSpinner, count }: IUpdateCartItemCountFx) => {
  try {
    setSpinner(true)
    const { data } = await api.patch(
      `/api/cart/count?id=${id}`,
      { count },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )

    if (data?.error) {
      const newData: { count: string; id: string } = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'updateCartItemCountFx',
        payload: { id, setSpinner, count },
      })
      return newData
    }

    return data
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
})

export const deleteCartItemFx = createEffect(async ({ jwt, id, setSpinner }: IDeleteCartItemsFx) => {
  try {
    setSpinner(true)
    const { data } = await api.delete(`/api/cart/delete?id=${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      const newData: { id: string } = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'deleteCartItemFx',
        payload: { id, setSpinner },
      })
      return newData
    }

    toast.success('Удалено из корзины!')
    return data
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
})

export const $cart = cart
  .createStore<ICartItem[]>([])
  .on(getCartItemsFx.done, (_, { result }) => result)
  .on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)
  .on(addProductToCartFx.done, (cart, { result }) => [...new Map([...cart, result.newCartItem].map((item) => [item.clientId, item])).values()])
  .on(updateCartItemCountFx.done, (cart, { result }) => cart.map((item) => (item._id === result.id ? { ...item, count: result.count } : item)))
  .on(deleteCartItemFx.done, (cart, { result }) => cart.filter((item) => item._id !== result.id))

export const $cartFromLs = cart.createStore<ICartItem[]>([]).on(setCartFromLS, (_, cart) => cart)

export const $totalPrice = cart.createStore<number>(0).on(setTotalPrice, (_, value) => value)

export const $shouldShowEmpty = cart.createStore(false).on(setShouldShowEmpty, (_, value) => value)

sample({
  clock: loadCartItems,
  source: $cart,
  fn: (_, data) => data,
  target: getCartItemsFx,
})

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})

sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCountFx,
})

sample({
  clock: deleteProductFromCart,
  source: $cart,
  fn: (_, data) => data,
  target: deleteCartItemFx,
})
