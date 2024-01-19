import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow
    overflow-hidden rounded-lg w-full sm:w-[320px] cursor-pointer '>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listingItem'
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 duration-300 '
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
          <p className=' truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
      
        <div className='flex items-center gap-1 '>
          <MdLocationOn className='w-4 h-4 text-green-700'/>
          <p className='text-sm  text-gray-600 truncate w-full'>{listing.address}</p>
        </div>
        {/* hear we are using the one plugin called line-clamp "that is used to show the only require number clamp lines remains will truncate "
        whearas if we use the truncate then it will show in only single line of truncated sentences.
        To-plugin: https://github.com/tailwindlabs/tailwindcss-line-clamp */}

        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='text-slate-500 mt-2 font-semibold '>
          ${''}
          {listing.offer?listing.discountPrice.toLocaleString('en-US')
          :listing.regularPrice.toLocaleString('en-US')}
          {listing.type==='rent' && '/month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='text-xs font-bold'>
                {listing.bedrooms>1? `${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
            </div>
            <div className='text-xs font-bold'>
                {listing.bathrooms>1? `${listing.bathrooms} baths`:`${listing.bathrooms} bath`}
            </div>
          </div>
      </div>
    </div>
  )
}
