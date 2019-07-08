import React from 'react';

const YourFeedTab = ({ token, getFeed, tab, onTabClick }) => {
  if (token) {
    const clickHandler = async e => {
      e.preventDefault();
      await getFeed();
      // await onTabClick('feed');
    };

    return (
      <li>
        <a
          href=''
          className={tab === 'feed' ? 'nav-active' : ''}
          // className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={e => clickHandler(e)}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

export default YourFeedTab;
