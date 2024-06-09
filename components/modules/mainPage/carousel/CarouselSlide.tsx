import Image from 'next/image'
import { ICarouselSlide } from '@/types/main-page'

const HeroSlide = ({ slide }: { slide: ICarouselSlide }) => (
  <>
    <picture>
      <Image src={slide.image} alt={slide.title} loading='eager' />
    </picture>
    <div className='holder-text'>
      <h2 className='homepage-carousel-title'>{slide.title}</h2>
      <p className='homepage-carousel-text'>{slide.description}</p>
    </div>
  </>
)

export default HeroSlide
