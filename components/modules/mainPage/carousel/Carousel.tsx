'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { useLang } from '@/hooks/useLang'
import img3 from '@/public/img/carousel/Осінь_над_озером_Зимівне_2017,_ДВП,_олія,_28_58.jpg'
import img2 from '@/public/img/carousel/Ой_вродили_гарбузи_2018_полотно,олія,.jpg'
import img1 from '@/public/img/carousel/germany.jpg'
import HeroSlide from './CarouselSlide'

const Carousel = () => {
  const { lang, translations } = useLang()

  const slides = [
    {
      id: 1,
      title: `${translations[lang].main_page.carousel_title_slide_1}`,
      description: `${translations[lang].main_page.carousel_description_slide_1}`,
      image: img1,
    },
    {
      id: 2,
      title: `${translations[lang].main_page.carousel_title_slide_2}`,
      description: `${translations[lang].main_page.carousel_description_slide_2}`,
      image: img2,
    },
    {
      id: 3,
      title: `${translations[lang].main_page.carousel_title_slide_3}`,
      description: `${translations[lang].main_page.carousel_description_slide_3}`,
      image: img3,
    },
  ]

  const handleSlideClick = (e: SwiperType) => e.slideTo(e.clickedIndex)

  return (
    <section className='homepage-carousel'>
      <Swiper
        className='swiper-container'
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        slidesPerView='auto'
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onClick={handleSlideClick}
        modules={[EffectCoverflow, Pagination, Autoplay]}
      >
        {slides.map((slide) => (
          <SwiperSlide className='swiper-slide' key={slide.id}>
            <HeroSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Carousel
