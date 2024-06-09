'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const AllLink = ({ link }: { link?: string }) => {
  const { lang, translations } = useLang()

  return (
    <Link href={link || `/catalog`}>
      <span />
      {translations[lang].common.all_link}
    </Link>
  )
}

export default AllLink