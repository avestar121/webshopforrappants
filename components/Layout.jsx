import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const showNavbar = router.pathname !== '/';

  return (
    <div className='layout'>
      <Head>
        <title>rappants</title>
      </Head>
      {showNavbar && (
        <header>
          <Navbar />
        </header>
      )}
      <main className='main-container'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
