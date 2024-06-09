import { StoreWritable } from 'effector'

export interface IProduct {
  _id: string
  category: string
  price: number
  name: string
  description: string
  characteristics: { [index: string]: string }
  images: string
  vendorCode: string
  inStock: string
  isBestseller: boolean
  isNew: boolean
  popularity: number
  review: number
  errorMessage?: string
}

export interface IBlog {
  _id: string
  category: string
  name: string
  description: string
  images: string
  date: string
  author: string
}

export interface IBaseEffectProps {
  jwt: string
  id: string
  setSpinner: (arg0: boolean) => void
}

export type UseGoodsByAuth<T> = StoreWritable<T>
