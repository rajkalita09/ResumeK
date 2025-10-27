import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/features/authSlice.js';

const Navbar = () => {
    const {user} = useSelector(state => state.auth) 
    const dispatch= useDispatch();
    const navigate= useNavigate();
  
    const logoutUser = () => {
        navigate('/')
        dispatch(logout())
    }

    return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
                <img src="/logo.png" alt="logo" className='h-11 w-auto' />
            </Link>
            <div className='flex items-center gap-4'>
                <>
                    <p className='hidden sm:block'>Hello, {user?.name}</p> {/* Desktop */}
                    <p className='sm:hidden text-sm font-medium text-slate-700'>Hi, {user?.name?.split(" ")[0]}</p> {/* Mobile */}
                    </>

                <button onClick={logoutUser} className='px-4 py-2 bg-yellow-500 hover:bg-yellow-700 active:scale-95 transition-all rounded-full text-white mt-1'>
                    Logout
                </button>
            </div>
        </nav>
      
    </div>
  )
}

export default Navbar
