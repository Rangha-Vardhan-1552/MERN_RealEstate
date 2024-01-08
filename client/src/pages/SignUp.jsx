import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Oauth from '../Components/Oauth'
export default function SignUp() {
  const [FormData, setFormData]=useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const HandleInputChange =(e)=>{
    setFormData({
      ...FormData ,
      [e.target.id]:e.target.value
    });

  };

  const submitHandler= async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const response= await fetch('api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(FormData)
      })
      const data=await response.json()
      if (data.success==false){
        setLoading(false)
        setError(data.message)
        return
      }
      
      setLoading(false)
      setError(null)
      console.log(data)
      navigate('/sign-in')
      
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
    
  console.log(FormData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='text' placeholder='username' className='border p-3 rounded-lg ' id='username' onChange={HandleInputChange}></input>
        <input type='email' placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={HandleInputChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={HandleInputChange}></input>
        <button  disabled={loading} className='border p-3 rounded-lg bg-slate-700 uppercase text-white hover:opacity-90 disabled:opacity-80'>
          {loading?'Loading...':'Sign Up'}
        </button>
        <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-slate-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
