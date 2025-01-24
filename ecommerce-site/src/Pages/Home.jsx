import React from 'react'
import Hero from '../Components/Hero'
import Latest_Collection from '../Components/Latest_Collection'
import BestSeller from '../Components/BestSeller'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Latest_Collection/>
      <BestSeller/>
    </div>
  )
}

export default Home
