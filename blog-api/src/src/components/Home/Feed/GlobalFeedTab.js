import React from 'react';

const GlobalFeedTab = ({ getArticles, onTabClick, tab }) => {
  const clickHandler = async e => {
    e.preventDefault();
    await getArticles();
    // await onTabClick('all');
  };

  return (
    <li>
      <a
        href='/#'
        // className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        className={tab === 'all' ? 'nav-active' : ''}
        onClick={e => clickHandler(e)}
      >
        Global Feed
      </a>
    </li>
  );
};

export default GlobalFeedTab;
