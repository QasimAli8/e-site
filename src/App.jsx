import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CardContext'
const App = () => {
    const [location, setLocation] = useState();
    const [openDropDown, setOpenDropDown] = useState(false)
    const [address, setAddess] = useState(true)
    const { cartItem, setCartItem } = useCart()

    const getLocation = async () => {
        navigator.geolocation.getCurrentPosition(async pos => {
            const
            { latitude, longitude } = pos.coords
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            try {
                const location = await axios.get(url)
                const exactLocation = location.data.address;
                setLocation(exactLocation)
                setOpenDropDown(false)
                setAddess(!address)
                // console.log(exactLocation);

            } catch (error) {
                console.log(error);

            }
        })
    }
    useEffect(() => {
        getLocation()
    }, [])
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItem')
        if (storedCart) {
            setCartItem(JSON.parse(storedCart))
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cartItem))
    }, [cartItem])

    return (
        <BrowserRouter >
            <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} address={address} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/category/:category' element={<CategoryProduct />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<SingleProduct />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<ProtectedRoute>
                    <Cart location={location} getLocation={getLocation} />
                </ProtectedRoute>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
export default App
