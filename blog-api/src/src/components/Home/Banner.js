import React from 'react';

const Banner = ({ appName }) => {
  return (
    <section id='intro'>
      <a href='#' className='logo'>
        <img src='images/hi.jpg' alt='' />
      </a>
      <header>
        <h2>{appName}</h2>
        <p>Share your knowledge. The more you give, the more you grow.</p>
      </header>
    </section>
  );
};

export default Banner;
