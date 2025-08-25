import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/clerk-react';
import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg';
import { FaCaretDown } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CardContext';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = ({location,getLocation,openDropDown,setOpenDropDown,address}) => {
    const {cartItem} = useCart()
    const [openNav,setOpenNav] = useState(false)
    const toggleFunction = () =>{
        setOpenDropDown(!openDropDown)
    }
    return (
        <div className='py-3 bg-white shadow-4xl px-4 md:px-0'>
            <div className='max-w-6xl mx-auto flex justify-between
         items-center shadow-4xl'>
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}><h1 className='text-3xl font-bold'>
                        <span className='text-red-500 font-serif'>Z</span>
                        aptro</h1>
                    </Link>
                    <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
                        <MapPin className='text-red-500' />
                        <span className='font-semibold'>{location&&address? <div className='-space-y-2'>
                            <p>{location.county}</p>
                            <p>{location.state}</p>
                        </div> : 'Add address'}</span>
                        <FaCaretDown onClick={toggleFunction} />
                    </div>
                    {
                        openDropDown?<div className='w-{280} h-max bg-white rounded-md shadow-2xl border-2 border-gray-300 shadow-gray-300 p-5 z-30 fixed top-16 left-60'><h1 className='text-xl flex font-semibold justify-between mb-5 gap-3' >change my location
                        <span onClick={toggleFunction}><CgClose/></span></h1>
                        <button onClick={getLocation} className='bg-red-500 rounded-xl text-white items-center justify-center p-2 cursor-pointer hover:bg-red-400 duration-300'>Detect My Location</button>
                        </div>:null
                    }
                </div>
                <nav className='flex gap-7 items-center'>
                    <ul className='md:flex gap-7 font-semibold text-xl items-center hidden'>
                        <NavLink to="/">
                            {({ isActive }) => (
                                <li className={`${isActive ? 'border-b-4 transition-all border-red-500' : 'text-black'}`}>
                                    Home
                                </li>
                            )}
                        </NavLink>
                        <NavLink to={'/products'} >
                            {({ isActive }) => (
                                <li className={`${isActive ? 'border-b-4 transition-all border-red-500' : 'text-black'}`}>
                                    Products
                                </li>
                            )}</NavLink>
                        <NavLink to={'/about'} >
                            {({ isActive }) => (
                                <li className={`${isActive ? 'border-b-4 transition-all border-red-500' : 'text-black'}`}>
                                    About
                                </li>
                            )}</NavLink>
                        <NavLink to={'/contact'}>{({ isActive }) => (
                            <li className={`${isActive ? 'border-b-4 transition-all border-red-500' : 'text-black'}`}>
                                Contact
                            </li>
                        )}</NavLink>
                    </ul>
                    <Link className='relative' to={"/cart"} >
                        <IoCartOutline className='h-7 w-7' />
                        <span className='bg-red-500 rounded-full px-2 text-white absolute -top-3 -right-3'>{cartItem.length}</span>
                    </Link>
                    <div className='hidden md:block'>
                        <SignedOut >
                            <SignInButton className='bg-red-500 text-white px-3 py-1 rounded-md ' />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    {
                        openNav?<HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden' />: <HiMenuAlt1 onClick={()=>setOpenNav(true)} className='h-7 w-7 md:hidden'  />
                    }
                </nav>
            </div>
            <ResponsiveMenu openNav={openNav} setOpenNav ={setOpenNav} />
        </div>
    )
}

export default Navbar
