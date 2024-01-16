
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect, useRef, useState} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateFailure,
          deleteUserStart,deleteUserSuccess,deleteUserFailure,
          signOuteUserStart,signOuteUserSuccess,signOuteUserFailure
 } from '../redux/user/userSlice.js';
import { Link, useNavigate } from 'react-router-dom';



//firebase storage rules;
// allow read;
// allow write:if 
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const [file , setFile] = useState(undefined)
  const [filePrec , setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [updateSuccess, setUpdateSuccess]= useState(false);
  const [userListing, setUserListing] = useState([])
  const [showListError, setShowListError] = useState(false)
  const dispatch=useDispatch()

  const {currentUser,loading,error}=useSelector(state=>state.user)

  const [formData , setFormData] = useState({})
  const fileRef=useRef(null)
  const navigate=useNavigate()
  

  useEffect(()=>{
    if (file){
      handleFileUpload(file)
    }
  },[file])
  

  const handleFileUpload=(file)=>{
    //getStorage is used to authenticate with your firebase project account using app configuration  at '../firebase' file
    const storage =getStorage(app)
    const fileName= new Date().getTime()+ file.name;
    //now we have the storage and image url for store in the firebase by using ref library;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file)

    //snapshots of uploading data
    uploadTask.on('state_changed',
      (snapshot)=>{
        const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes) * 100
        // console.log("uploading"+ Math.round(uploadProgress) + '% done')
        setFilePerc(Math.round(uploadProgress))
      },
      //checking File upload status
      (error)=>{
        setFileUploadError(true)
      },

      //get the  file URL of downloadURL
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=> setFormData({...formData ,avatar:downloadURL})
          )
      }
    )


  }

  const handleInputChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })

  }
const submitHandler= async(e)=>{
  e.preventDefault()
  try {
      dispatch(updateUserStart())
    const response= await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const result= await response.json()
    if(result.success===false){
      dispatch(updateFailure(result.message))
      return;
    }
    dispatch(updateUserSuccess(result))
    setUpdateSuccess(true)

  } catch (error) {
    dispatch(updateFailure(error.message))
  }
}

const deleteHandler= async()=>{
  try {
    dispatch(deleteUserStart())
    const response=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const result= await response.json()
    if (result.success===false){
      dispatch(deleteUserFailure(result.message))
      return;
    }

    dispatch(deleteUserSuccess(result))

  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const signOutHandler=async()=>{
  try {
    dispatch(signOuteUserStart())
    const response= await fetch(`api/auth/signout`,{
      method:'GET'
    });
    const result= await response.json()
    if (result.success=== false){
      dispatch(signOuteUserFailure(result.message))
      return ;
    }
    dispatch(signOuteUserSuccess(result))
    
  } catch (error) {
    dispatch(signOuteUserFailure(error.message))
  }
}

const handleShowListing= async()=>{
  try {
    setShowListError(false)
    const response= await fetch(`api/user/listing/${currentUser._id}`,{
      method:'GET'
    })
    
    const data= await response.json()
    if(data.success===false){
      setShowListError(true)
    }
    setUserListing(data)

  } catch (error) {
    setShowListError(false)
  }
}

const handleListingDelete=async(delListingId)=>{
  try {
    const response= await fetch(`api/listing/delete/${delListingId}`,{
      method:'DELETE'
    })
    const data= await response.json()
    if(data.success === false){
      console.log(data.message)
      return
    }
    setUserListing((prev)=>prev.filter((listing)=>listing._id !== delListingId))
    
  } catch (error) {
    console.log(error)
  }

}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'></input>
        <img  onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover self-center mt-2 cursor-pointer' src={formData.avatar || currentUser.avatar} alt='profile'/>
        <p className='flex flex-col self-center  text-sm'>
          {fileUploadError?(
            <span className='text- red-700'>Error image upload(image should be less than 2Mb)</span>
          ):
          
            filePrec>0 && filePrec<100?
            <span className='text-slate-700'>{`Uploading... ${filePrec}%`}</span>
            : filePrec===100?<span className='text-green-600'>Image uploaded successfully...</span>
          
            :("")
          }
        </p>
        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'  defaultValue={currentUser.username} onChange={handleInputChange}></input>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'  defaultValue={currentUser.email} onChange={handleInputChange}></input>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'  defaultValue={currentUser.password}onChange={handleInputChange}></input>
        <button  disabled={loading} className='bg-slate-700 text-center text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80' >{loading?'loading...':'Update'}</button>
        <Link  className=' bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95' to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span  onClick={deleteHandler} className='text-red-700 cursor-pointer'>Delete account</span>
        <span  onClick={signOutHandler} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error?error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess?'User update successfully...!':''}</p>
      <p className='text-green-700 text-center cursor-pointer' onClick={handleShowListing}> Show Listings</p>
      <p className='text-red-700'>{showListError?'Error occured in show listing...!':""}</p>
      {
          userListing && userListing.length>0 && 
          <div className='flex flex-col gap-4'>
            <h1 className='font-semibold text-2xl text-center mt-5'>Your Listings</h1>
            {
              userListing.map((listing)=>
              <>
                <div key  ={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4 '>
                  <Link to={`/listing/${currentUser._id}`}>
                    <img src={listing.imageUrls[0]} alt='listing profile' className='w-16 h-16 object-contain  '/>
                  </Link>
                  <Link className='font-semibold text-slate-700 flex-1 hover:underline truncate' to={`/listing/${currentUser._id}`}>
                    <p >{listing.description}</p>
                  </Link>
                  <div className='flex flex-col items-center'>
                    <button className='text-red-700 font-semibold uppercase'onClick={()=>handleListingDelete(listing._id)}  >delete</button>
                    <button className='text-green-700 font-semibold uppercase'>edit</button>
                  </div>
                </div>
              </>
            )
          }
          </div>
      }
    </div>
    
  )
}
