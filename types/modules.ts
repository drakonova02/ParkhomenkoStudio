import { IProduct, IBlog } from './common'

export interface IAccordionProps {
  children: React.ReactNode
  title: string | JSX.Element
  titleClass: string
  rotateIconClass?: string
}

export interface IProductsListItemProps {
  item: IProduct
  title?: string
}

export interface IBlogListItemProps {
  item: IBlog
  title?: string
}

export interface IProductsListItemProps {
  item: IProduct
  title?: string
}

export interface OrderInfoBlock {
  isCorrectPromotionalCode?: boolean
  isOrderPage?: boolean
}

export interface IEmptyPageContentProps {
  subtitle: string
  description: string
  btnText: string
  emptyWord?: string
  bgWordClassName?: string
  oopsWord?: string
  title?: string
}

export interface IContentTitleProps {
  title: string
  oopsWord: string
}

export interface IOrderInfoBlockProps {
  isCorrectPromotionalCode?: boolean
  isOrderPage?: boolean
}
