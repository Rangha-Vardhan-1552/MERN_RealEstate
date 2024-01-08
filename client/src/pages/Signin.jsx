import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';

export default function Signin() {
  const [FormData, setFormData]=useState({})
  const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const HandleInputChange =(e)=>{
    setFormData({
      ...FormData ,
      [e.target.id]:e.target.value
    });

  };

  const submitHandler= async(e)=>{
    e.preventDefault()
    //setLoading(true)
    dispatch(signInStart());
    try {
      const response= await fetch('api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(FormData)
      })
      const data=await response.json()
      if (data.success==false){
        // setLoading(false)
        // setError(data.message)
        dispatch(signInFailure(data.message))
        return
      }
      
      // setLoading(false)
      // setError(null)
      dispatch(signInSuccess(data))
      console.log(data)
      navigate('/')
      
    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailure(error.message))
    }
  }
    
  console.log(FormData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='email' placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={HandleInputChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={HandleInputChange}></input>
        <button  disabled={loading} className='border p-3 rounded-lg bg-slate-700 uppercase text-white hover:opacity-90 disabled:opacity-80'>
          {loading?'Loading...':'Sign In'}
        </button>
        <Oauth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-slate-700'>SignUp</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
