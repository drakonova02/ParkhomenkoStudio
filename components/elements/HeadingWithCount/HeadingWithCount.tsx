import { useLang } from '@/hooks/useLang'
import { showCountMessage } from '@/lib/utils/common'
import { IHeadingWithCountProps } from '@/types/elements'

const HeadingWithCount = ({ count, title }: IHeadingWithCountProps) => {
  const { lang } = useLang()

  return (
    <h1 className={`site-title`}>
      <span>{title}</span>
      <span>{showCountMessage(`${count}`, lang)}</span>
    </h1>
  )
}

export default HeadingWithCount
