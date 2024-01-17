import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landlord, setLandLord] =useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    useEffect(()=>{
        const fetchUser =async()=>{
            
            try {
                setLoading(true)
                const response= await fetch(`/api/user/${listing.userRef}`)
                const data= await response.json()
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                }
                setLandLord(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }

        }
        fetchUser()
    },[listing.userRef])

    const handleChange=(e)=>{
        setMessage(e.target.value)
    }
  return (
    <>
    {
        landlord && <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea name='message' id='message' onChange={handleChange} rows={2} 
            placeholder='Enter your message...' value={message}
            className='border rounded-lg w-full p-3'></textarea>
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                className='text-white text-center uppercase font-semibold bg-slate-700 rounded-lg p-3 hover:opacity-95'
            >
            Send Message
            </Link>
        </div>
    }
    </>
    
  )
}
