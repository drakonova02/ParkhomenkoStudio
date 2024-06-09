import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const ContentLinks = ({ btnText }: { btnText: string }) => {
  const { lang, translations } = useLang()

  return (
    <div className='links-list'>
      <Link href='/catalog'>{btnText}</Link>
      <Link href='/'>{translations[lang].common.back_to_main}</Link>
    </div>
  )
}

export default ContentLinks