import { IEmptyPageContentProps } from '@/types/modules'
import ContentLinks from './ContentLinks'
import ContentTitle from './ContentTitle'
import { useLang } from '@/hooks/useLang'

const EmptyPageContent = ({
  description,
  btnText,
  title,
  oopsWord,
}: IEmptyPageContentProps) => {
  const { lang, translations } = useLang()
  const currentTitle = title ? title : translations[lang].common.empty_text
  const currentOopsWord = oopsWord ? oopsWord : translations[lang].common.oh

  return (
    <div className='no-found'>
      <ContentTitle title={currentTitle} oopsWord={currentOopsWord} />
      <div className='description'>{description}</div>
      <ContentLinks btnText={btnText} />
    </div>
  )
}

export default EmptyPageContent
