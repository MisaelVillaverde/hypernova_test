import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/' className='logo'>
      <img
        className='logo__img'
        src='https://hypernovalabs.com/wp-content/uploads/2021/03/Hypernova_H-02.png'
        alt='logo'
      />
      <ul>
        <li>Hyper</li>
        <li>Nova</li>
        <li className='labs'>Labs</li>
      </ul>
    </Link>
  );
};

export default Logo;
