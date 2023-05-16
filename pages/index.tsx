import React from 'react';
import { client } from '../library/client';
import {
  Product,
  Footer,
  Cart,
  Layout,
  Navbar
} from '../components/index';
import Link from 'next/link'

const Home = () => {
  return (
    <div className='main-home-page'>
      <Link href='/products'><img className='main-logo' src='https://rappants.co/wp-content/uploads/2022/07/coin_2.gif'></img></Link>
      <div className='links'>
        <Link href='/products'><h2>SHOP</h2></Link>
        <Link href='https://www.instagram.com/rappants.archive/'><h2>ARCHIVE</h2></Link>
        <a href='mailto:avestar121@gmail.com'><h2>CONTACT</h2></a>
      </div>
    </div>
  );
};


export default Home;
