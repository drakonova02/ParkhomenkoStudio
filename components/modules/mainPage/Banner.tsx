'use client'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import Image from 'next/image'
import img from '@/public/img/banner/Пархоменко_Ранок_2006,_20_30,_ДВП,_олія.jpg'

const Banner = () => {
  const { lang, translations } = useLang()

  return (
    <section className='homepage-banner'>
      <picture>
        <Image
          src={img}
          alt={translations[lang].main_page.banner_title}
          loading='eager'
        />
      </picture>

      <div className='holder-text'>
        <h2 className='banner-title'>
          {translations[lang].main_page.banner_title}
        </h2>
        <p className='banner-text'>
          {translations[lang].main_page.banner_descrioptin}
        </p>
        <Link className='action secondary' href='/exhibition'>
          {translations[lang].common.more}
        </Link>
      </div>
    </section>
  )
}

export default Banner
