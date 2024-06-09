/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/hooks/useLang'
import { IBlogListItemProps } from '@/types/modules'

const BlogListItem = ({ item }: IBlogListItemProps) => {
  return (
    <>
      <li>
          <Link
            href={`/blog/${item.category}/${item._id}`}
          >
            <picture>
              <Image src={item.images} alt={item.name} fill />
            </picture>
          </Link>
          <div className='blog-wrap'>
            <strong className='blog-category'>{item.category}</strong>
            <div>
              <h3 className='blog-title'>
                <Link href={`/blog/${item.category}/${item._id}`}>
                  {item.name}
                </Link>
              </h3>
              <p className='blog-text'>{item.description}</p>
              <span className='blog-author'>{item.author}</span>
            </div>
          </div>
        </li>
    </>
  )
}

export default BlogListItem