import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/rappants', '_blank'); // Replace with your Instagram URL
  };

  return (
    <div className='footer-container'>
      <p>2023 RAPPANTS  All right Reserved</p>
      <p className='icons'>
        <AiFillInstagram onClick={handleInstagramClick} />
      </p>
    </div>
  );
};

export default Footer;
