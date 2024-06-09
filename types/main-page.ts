import { StaticImageData } from 'next/image'
import { IBlog, IProduct } from './common'

export interface ICarouselSlide {
  id?: number
  image: StaticImageData
  description: string
  title: string
}

export interface IMainPageSectionProps {
  title: string
  goods: IProduct[]
  spinner: boolean
}

export interface IMainPageSectionBlogProps {
  title: string
  goods: IBlog[]
  spinner: boolean
}
