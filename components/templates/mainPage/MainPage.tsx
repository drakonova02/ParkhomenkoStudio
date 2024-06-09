'use client'
import { useGate } from 'effector-react'
import Carousel from '@/components/modules/mainPage/carousel/Carousel'
import Banner from '@/components/modules/mainPage/Banner'
import AboutUs from '@/components/modules/mainPage/AboutUs'
import NewGoods from '@/components/modules/mainPage/NewGoods'
import { MainPageGate } from '@/context/goods'
import RecentBlog from '@/components/modules/mainPage/RecentBlog'

const MainPage = () => {
  useGate(MainPageGate)

  return (
    <main>
        <Carousel />
        <NewGoods />
        <Banner />
        <RecentBlog />
        <AboutUs />
    </main>
  )
}

export default MainPage