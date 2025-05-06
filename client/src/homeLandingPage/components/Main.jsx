
import { useState } from 'react'
import AboutUs from './AboutUs.JSX'
import BlockGallery from './BlockGallery'
import Factory from './Factory'
import Fair from './Fair'
import Hero from './Hero'
import Mine from './Mine'
import News from './News'
import PaverGallery from './PaverGallery'
import Product from './Product'
import References from './References'
import SlabGallery from './SlabGallery'
import TileGallery from './TileGallery'
import TripleInfo from './TripleInfo'
const Main = () => {
  return (
    <div className='grid grid-cols-2 gap-10 w-full'> 
      <Hero />
      {/* <TripleInfo />
      
      <Product />
     <References />
      <AboutUs /> */}
      <SlabGallery />
      <TileGallery />
      <Mine />
      <PaverGallery />
      <BlockGallery />
      <div className='flex flex-col col-span-2'>
        <Factory />
        <Fair />
        <News />
      </div>
      
      
      
      
    </div>
  )
}

export default Main