import React from 'react';

const Banner = ({ appName }) => {
  return (
    <section id='intro'>
      <a href='#' className='logo'>
        <img src='images/logo.jpg' alt='' />
      </a>
      <header>
        <h2>{appName}</h2>
        <p>Spread the knowledge></p>
      </header>
    </section>
  );
};

export default Banner;
