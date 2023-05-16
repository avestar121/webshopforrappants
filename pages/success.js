import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {useStateContext} from '../context/StateContext'
import { runFireworks } from '../library/utils'

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks()
    }, [])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank You for your order!</h2>
                <p className='description'>If you have any questions, please email 
                    <a className='email' href='mailto:avestar121@gmail.com'>
                        avestar121@gmail.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' className='btn' width='300px'>
                        Continue Shopping
                    </button>
                </Link>
        </div>
    </div>
  )
}

export default Success