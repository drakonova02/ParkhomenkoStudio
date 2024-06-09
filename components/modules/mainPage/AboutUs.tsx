'use client'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import Image from 'next/image'
import img from '@/public/img/home-about/FB_IMG_1717100192667.jpg'

const AboutUs = () => {
  const { lang, translations } = useLang()

  return (
    <section className='homepage-about'>
      <div className='img-wrap'>
        <picture>
          <Image
            src={img}
            alt={translations[lang].main_page.banner_title}
            loading='eager'
          />
        </picture>
      </div>

      <div className='holder-text'>
        <h3>{translations[lang].main_menu.about_me}</h3>
        <h2 className='about-title'>ParkhomenkoStudia</h2>
        <p className='about-text'>
          {translations[lang].main_page.about_us_text_1}
        </p>
        <p className='about-text'>
          {translations[lang].main_page.about_us_text_2}
        </p>
        <p className='about-text'>
          {translations[lang].main_page.about_us_text_3}
        </p>
        <Link className='action primary' href='/about'>
          {translations[lang].common.more}
        </Link>
      </div>
    </section>
  )
}

export default AboutUs
