import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules'
import ListingItem from '../Components/ListingItem';


export default function Home() {
  const [offerListing, setOfferListing] = useState([])
  const [restLising, setRentListing] = useState([])
  const [salesListing, setSaleListing] = useState([])
  console.log(salesListing)
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListings= async()=>{
      try {
        const response= await fetch('/api/listing/get?offer=true&limit=4')
        const data= await response.json()
        setOfferListing(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }

    }
    const fetchRentListings= async()=>{
      try {
        const response= await fetch('/api/listing/get?type=rent&limit=4')
        const data= await response.json()
        setRentListing(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings=async()=>{
      try {
        const response= await fetch('/api/listing/get?type=sale&limit=4')
        const data= await response.json()
        setSaleListing(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  },[])
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        {/* top */}
        <h1 className='text-3xl lg:text-6xl font-bold text-gray-700'>
          Find you next
          <span className='text-slate-500'> prefect </span>
          <br/>
          place with ease
        </h1>
        <p className='text-gray-400 text-xs sm:text-sm   '>Vardhan Estate is the best place to find your next perfect place to
          <br/>
          we have a wide range of properties for you to choose from.
        </p>
        <div >
          <Link to={'/search'} className='text-blue-800 font-bold text-xs sm:text-sm hover:underline'>
            Lets get started...
          </Link>
        </div>
      </div>

      {/* slider */}
      <Swiper navigation >
        {
          offerListing && offerListing.length>0 && offerListing.map((listing)=>(
            <SwiperSlide >
              <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}  key={listing._id} className='h-[550px]'>
              </div>
            </SwiperSlide>
          )) 
        }
      </Swiper>

      {/* listItems */}

      <div className='mx-10'>
      <div className="max-w-8xl mx-auto p-3  flex flex-col gap-8 my-10">
        {offerListing && offerListing.length>0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers </h2>
              <Link to={'/search?offer=true'} className='text-blue-800 text-sm hover:underline'>
                Showmore offers...
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
                {
                  offerListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
            </div>
          </div>
        )}
        {restLising && restLising.length>0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent </h2>
              <Link to={'/search?type=rent'} className='text-blue-800 text-sm hover:underline'>
                Showmore places for rent...
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
                {
                  restLising.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
            </div>
          </div>
        )}

        {salesListing && salesListing.length>0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sales </h2>
              <Link to={'/search?type=sale'} className='text-blue-800 text-sm hover:underline'>
                Showmore places for sale...
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
                {
                  salesListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
            </div>
          </div>
        )}

      </div>
    </div>
     
  </div>
    
  )
}
