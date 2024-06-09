import { IMainPageSectionBlogProps } from '@/types/main-page'
import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import BlogListItem from '../BlogListItem/BlogListItem'

const MainPageSection = ({
  title,
  goods,
  spinner,
}: IMainPageSectionBlogProps) => (
  <section className='section-slider blog-section'>
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
          <BlogListItem key={item._id} item={item} title={title} />
        ))}
      </motion.ul>
    )}
  </section>
)

export default MainPageSection
