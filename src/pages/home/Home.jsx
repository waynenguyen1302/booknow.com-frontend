import React, { Suspense } from 'react'
import { lazy } from 'react'
// import Featured from '../../components/featured/Featured'
// import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
// import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
// import PropertyList from '../../components/propertyList/PropertyList'
import './home.css'
const Featured = lazy(() => import('../../components/featured/Featured'))
const PropertyList = lazy(() => import('../../components/propertyList/PropertyList'));
const MailList = lazy(() => import('../../components/mailList/MailList'));
const FeaturedProperties = lazy(() => import('../../components/featuredProperties/FeaturedProperties'));

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />   
      <Suspense fallback={<div>Loading...</div>}>
        <div className="homeContainer">
          <Featured />
          <h1 className='homeTitle'>Browse by property type</h1>
          <PropertyList />
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties />
          <MailList />
          <Footer />
        </div> 
      </Suspense>        
    </div>
    
  )
}

export default Home