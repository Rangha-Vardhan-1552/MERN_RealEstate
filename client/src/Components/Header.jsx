import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const navigate= useNavigate()
    const {currentUser}=useSelector(state=>state.user)
    const [search, setSearch] = useState('')
    const handlesubmit=(e)=>{
        e.preventDefault()
        const urlParams= new URLSearchParams(window.location.search)
        urlParams.set('searchTerm',search)
        const searchQuery= urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    // here useEffect is used for to replicate the changes ,while if any  changes done in lets say searchTerm value,
    //then by providing dependence to useEffect we can replicate changes to search box as well...

    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search)
        const searchTermFromUrl=urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearch(searchTermFromUrl)
        }
    },[location.search])

  return (
    
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Vardhan</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                
                <form className='bg-slate-100 p-3 rounded-lg flex items-center ' onSubmit={handlesubmit} > 
                    <input type='text' placeholder='search...'  value={search}  onChange={(e)=>setSearch(e.target.value)} className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                    <button>
                        <FaSearch className='text-slate-600'/> 
                    </button>
                     
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser? (
                            <img  className='rounded-full w-7 h-7 object-cover' src={currentUser.avatar} alt='profile'/>
                        ):(
                            <li className=' text-slate-700 hover:underline'>SignIn</li>
                        ) }
                        
                    </Link>
                    
                </ul>
            </div>
        </header>
    
    
  )
}
