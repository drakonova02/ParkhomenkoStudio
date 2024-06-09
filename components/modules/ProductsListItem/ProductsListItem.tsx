/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/hooks/useLang'
import { IProductsListItemProps } from '@/types/modules'
import { formatPrice } from '@/lib/utils/common'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'

const ProductsListItem = ({ item }: IProductsListItemProps) => {
  return (
    <>
      <li>
        <Link href={`/catalog/${item.category}/${item._id}`}>
          <picture>
            <Image src={item.images} alt={item.name} fill />
          </picture>
        </Link>
        <div>
          <h3 className='product-title'>
            <Link href={`/catalog/${item.category}/${item._id}`}>{item.name}</Link>
          </h3>
          <ProductAvailable vendorCode={item.vendorCode} inStock={+item.inStock} />
          <span>{formatPrice(+item.price)} $</span>
        </div>
      </li>
    </>
  )
}

export default ProductsListItem
