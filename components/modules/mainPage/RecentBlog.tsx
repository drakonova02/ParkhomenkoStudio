import { useUnit } from 'effector-react'
import MainPageBlog from './MainPageBlog'
import { useLang } from '@/hooks/useLang'
import { $recentBlog } from '@/context/goods'
import { getRecentBlogFx } from '@/api/main-page'

const RecentBlog = () => {
  const goods = useUnit($recentBlog)
  const spinner = useUnit(getRecentBlogFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageBlog
      title={translations[lang].main_page.recent_blog_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default RecentBlog