import { IMainPageSectionProps } from '@/types/main-page'
import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import ProductsListItem from '../ProductsListItem/ProductsListItem'

const MainPageSection = ({ title, goods, spinner }: IMainPageSectionProps) => (
  <section className='section-slider'>
    <h2 className='section-title'>{title}</h2>
    {spinner && (
      <motion.ul {...basePropsForMotion}>
        {Array.from(new Array(4)).map((_, i) => (
          <li key={i}>
            <div />
          </li>
        ))}
      </motion.ul>
    )}
    {!spinner && (
      <motion.ul {...basePropsForMotion}>
        {goods.map((item) => (
          <ProductsListItem key={item._id} item={item} title={title} />
        ))}
      </motion.ul>
    )}
  </section>
)

export default MainPageSection