import React from 'react';

const ArticleList = ({ articles }) => {
  if (!articles) {
    return <div className='article-preview'>Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className='article-preview'>No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map(article => {
        return <h2 key={article.slug}>{article.title}</h2>;
      })}
    </div>
  );
};

export default ArticleList;
