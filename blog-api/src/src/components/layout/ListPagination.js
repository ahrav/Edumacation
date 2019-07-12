import React from 'react';

const ListPagination = ({ articlesCount, onSetPage, currentPage }) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => onSetPage(page);
  return (
    <nav>
      <ul className='actions pagination'>
        <li>
          <a
            onClick={() => setPage(currentPage - 1)}
            className={
              currentPage === 0
                ? 'disabled button large previous'
                : 'button large previous'
            }
          >
            Previous Page
          </a>
        </li>
        {range.map(v => {
          const isCurrent = v === currentPage;
          const onClick = ev => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={isCurrent ? 'active-pagination' : ''}
              onClick={onClick}
              key={v.toString()}
            >
              <a href='/#'>{v + 1}</a>
            </li>
          );
        })}
        <li>
          <a
            onClick={() => setPage(currentPage + 1)}
            className={
              range[range.length - 1] > currentPage
                ? 'button large next'
                : 'disabled button large next'
            }
          >
            Next Page
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ListPagination;
