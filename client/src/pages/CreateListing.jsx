import React, { useState } from 'react'
import{ getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function CreateListing() {
    const [files, setFiles]=useState([])
    const [formData,setFormData]=useState({
        imageUrls:[],
    })
    const [ImageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] =useState(false)
    console.log("hello",formData)
    const ImageHandlerSubmit=()=>{
        
        if(files.length>0 && files.length + formData.imageUrls.length<7){
            
            setUploading(true)
            setImageUploadError(false)  
            const promises= []
            for(let i=0; i< files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)

                })
                setImageUploadError(false)
                setUploading(false)
            })
            .catch((error)=>{
                setImageUploadError('Image upload failed (2 mb max per image)') 
                  setUploading(false)
            })

        }else{
            setImageUploadError('You can upload only 6 images per listing')
            setUploading(false)
        }

    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTasks = uploadBytesResumable(storageRef, file);
    
            uploadTasks.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTasks.snapshot.ref)
                        .then((downloadUrl) => {
                            resolve(downloadUrl);
                        })
                        .catch((error) => {
                            reject(error); // Resolve or reject here based on the getDownloadURL result
                        });
                }
            );
        });
    };

    
    const HandleDelete=(index)=>{
        setFormData({
            ...formData, imageUrls:formData.imageUrls.filter((__,i)=> i!== index)
        })
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input  className='border p-3 rounded-lg' type='text' placeholder='Name' id='Name' maxLength='62' minLength='10' required></input>
                <textarea  className='border p-3 rounded-lg' type='text' placeholder='Description' id='Description' required  ></textarea>
                <input  className='border p-3 rounded-lg' type='text' placeholder='Address' id='Address' required  ></input>
            
                <div className='flex flex-wrap gap-6'>
                    <div className='flex gap-2'>
                        <input  className='w-5' type='checkbox' id='sell'/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input  className='w-5' type='checkbox' id='rent'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input  className='w-5' type='checkbox' id='Parking'/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input  className='w-5' type='checkbox' id='Furnished'/>
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input  className='w-5' type='checkbox' id='Offer'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='1' max='10'
                        className=' p-3 rounded-lg border border-gray-300'required/>
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='1' max='10' 
                        className=' p-3 rounded-lg border border-gray-300'required/>
                        <p>Baths</p>
                    </div>
                    <div  className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='1' max='10' 
                        className=' p-3 rounded-lg border border-gray-300'required/>
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                        
                    </div>
                    <div  className='flex items-center gap-2'>
                        <input type='number' id='discountPrice' min='1' max='10' 
                        className=' p-3 rounded-lg border border-gray-300'required/>
                        <div  className='flex flex-col items-center'>
                            <p>Discount Price</p>
                            <span className='text-xs'>($ / month)</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 flex-1'>
                <p className='font-semibold '>Images:
                <span className='text-gray-600 ml-2 font-normal'>The first image will be the cover (max 6)</span></p>
            
                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files)} type='file' id='images' accept='images/*' multiple className='p-3 border border-gray-500 rounded w-full'/>
                    <button  type='button' onClick={ImageHandlerSubmit} className='p-3 border border-green-700 text-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>{uploading?'uploading...':'upload'}</button>
                </div>
                <p className='text-red-700 text-sm'>{ImageUploadError && ImageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                        <div key={url} className='flex justify-between p-3 border items-center'>
                            <img src={url} alt='listing' className='w-20 h-20 object-contain rounded-lg' />
                            <button type='button' onClick={()=>HandleDelete(index)} className='text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button >
                        </div>
                    ))
                }

                <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-85 uppercase'>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}
