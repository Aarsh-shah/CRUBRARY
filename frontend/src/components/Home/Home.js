import React from 'react';
import './Home.css';
import bookpg from '../../assets/img/kakashi.jfif';
import videoSource from '../../assets/books.mp4';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='Container'>
      <video autoPlay='autoplay' loop='loop' muted className='Video'>
        <source src={videoSource} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='Content'>
        <div className='SubContent'>
          <h1>CRUDBARY</h1>
          <p>One stop for all your library needs</p>
          <button type='button' className='btn btn-outline-dark'>
            <Link to='/register'>Get started</Link>
          </button>
          <img src={bookpg} alt='profile' />
        </div>
      </div>
    </div>
  );
};

export default Home;