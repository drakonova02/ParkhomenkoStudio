'use client'
import toast from 'react-hot-toast'
import { createDomain, sample } from 'effector'
import { IGetParkhomenkoOfficesByCityFx, IMakePaymentFx, IOrderDetailsValues, IPaymentNotifyFx, IParkhomenkoAddressData } from '@/types/order'
import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const order = createDomain()
export const setPickupTab = order.createEvent<boolean>()
export const setCourierTab = order.createEvent<boolean>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setMapInstance = order.createEvent<any>()
export const setShouldLoadParkhomenkoData = order.createEvent<boolean>()
export const setChosenPickupAddressData = order.createEvent<Partial<IParkhomenkoAddressData>>()
export const setChosenCourierAddressData = order.createEvent<Partial<IParkhomenkoAddressData>>()
export const setShouldShowCourierAddressData = order.createEvent<boolean>()
export const getParkhomenkoOfficesByCity = order.createEvent<IGetParkhomenkoOfficesByCityFx>()
export const setCourierAddressData = order.createEvent<IParkhomenkoAddressData>()
export const setOnlinePaymentTb = order.createEvent<boolean>()
export const setCashPaymentTb = order.createEvent<boolean>()
export const makePayment = order.createEvent<IMakePaymentFx>()
export const setOrderDetailsValues = order.createEvent<IOrderDetailsValues>()

export const getParkhomenkoOfficesByCityFx = order.createEffect(async ({ city, lang }: IGetParkhomenkoOfficesByCityFx) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
    const baseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}`
    const { data } = await api.get(`${baseUrl}&text=${city}&lang=${lang}`)
    const ParkhomenkoData = await api.get(`${baseUrl}&text=ростелеком&filter=place:${data.results[0].place_id}`)

    return ParkhomenkoData.data.results
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const makePaymentFx = order.createEffect(async ({ jwt, amount, description, metadata }: IMakePaymentFx) => {
  try {
    const { data } = await api.post(
      '/api/payment',
      { amount, description, metadata },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    )

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'makePaymentFx',
        payload: { amount, description },
      })
    }

    localStorage.setItem('paymentId', JSON.stringify(data.result.id))
    window.location.href = data.result.confirmation.confirmation_url
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const checkPaymentFx = order.createEffect(async ({ paymentId }: { paymentId: string }) => {
  try {
    const { data } = await api.post('/api/payment/check', { paymentId })

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const paymentNotifyFx = order.createEffect(async ({ message, email }: IPaymentNotifyFx) => {
  try {
    const { data } = await api.post('/api/payment/notify', { message, email })

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const $ParkhomenkoDataByCity = order.createStore<IParkhomenkoAddressData[]>([]).on(getParkhomenkoOfficesByCityFx.done, (_, { result }) => result)

export const $pickupTab = order.createStore<boolean>(true).on(setPickupTab, (_, value) => value)

export const $courierTab = order.createStore<boolean>(false).on(setCourierTab, (_, value) => value)

export const $mapInstance = order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .createStore<any>({})
  .on(setMapInstance, (_, map) => map)

export const $shouldLoadParkhomenkoData = order.createStore(false).on(setShouldLoadParkhomenkoData, (_, value) => value)

export const $chosenPickupAddressData = order.createStore<Partial<IParkhomenkoAddressData>>({}).on(setChosenPickupAddressData, (_, value) => value)

export const $chosenCourierAddressData = order.createStore<Partial<IParkhomenkoAddressData>>({}).on(setChosenCourierAddressData, (_, value) => value)

export const $shouldShowCourierAddressData = order.createStore(false).on(setShouldShowCourierAddressData, (_, value) => value)

export const $courierAddressData = order.createStore<IParkhomenkoAddressData>({} as IParkhomenkoAddressData).on(setCourierAddressData, (_, value) => value)

export const $onlinePaymentTab = order.createStore<boolean>(true).on(setOnlinePaymentTb, (_, value) => value)

export const $cashPaymentTab = order.createStore<boolean>(false).on(setCashPaymentTb, (_, value) => value)

export const $orderDetailsValues = order.createStore<IOrderDetailsValues>({} as IOrderDetailsValues).on(setOrderDetailsValues, (_, value) => value)

sample({
  clock: getParkhomenkoOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getParkhomenkoOfficesByCityFx,
})

sample({
  clock: makePayment,
  source: {},
  fn: (_, data) => data,
  target: makePaymentFx,
})
