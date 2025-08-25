import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import BreadCrums from '../components/BreadCrums';
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CardContext';

const SingleProduct = () => {
    const params = useParams();
    const  [singleProduct,setSingleProduct] = useState('');
    const {addToCart} = useCart()
    const getSingleProduct = async() =>{
        try {
            const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`)
            const product = res.data.product;
            setSingleProduct(product)
            
        } catch (error) {
            console.log(error);  
        }
    }
    useEffect(()=>{
        getSingleProduct()
    },[])
     const originalPrice = Math.round(singleProduct.price + (singleProduct.price*singleProduct.discount/100))
  return (
    <>
     {
        singleProduct?<div className='py-4 pb-4 md:px-0'>
            <BreadCrums title={singleProduct.title}/>
            <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap'>
                <div className='w-full'>
                <img src={singleProduct.image} alt="" className='rounded-2xl w-full object-cover'/>
                </div>
                <div className='flex flex-col gap-6'>
                    <h1 className='md:text-3xl font-bold text-gray-800'>{singleProduct.title}</h1>
                    <div className='text-gray-800'>{singleProduct.brand.toUpperCase()} / {singleProduct.category.toUpperCase()} / {singleProduct.model.toUpperCase()}</div>
                    <p className='text-xl font-bold text-red-500'>${singleProduct.price} <span className='text-gray-700 line-through'>${originalPrice}</span>
                    <span className='bg-red-500 text-white p-2 rounded-md ml-2'>{singleProduct.discount} % Discount</span>
                    </p>
                    <p className=' text-gray-600'>{singleProduct.description}</p>
                    <div className='flex item-center gap-4'>
                        <label htmlFor="" className='text-sm text-gray-700 font-semibold' >Quantity</label>
                        <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'/>
                    </div>
                    <div className='flex gap-2 mt-4'>
                     <button onClick={()=>addToCart(singleProduct)} className='bg-red-500 text-white flex gap-2 rounded-md px-2 py-2 font-semibold'><IoCartOutline className='w-6 h-6'/>Add to Cart</button>
                     </div>
                </div>
            </div>
        </div>:
        <div className='flex items-center justify-center h-screen'>
                      <video muted autoPlay loop>
                        <source src={Loading} type='video/webm' />
                      </video>
                    </div>
     }
    </>
  )
}

export default SingleProduct
