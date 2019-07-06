import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import {
  getTags,
  getArticlesByTag,
  getArticles,
  getFeed
} from '../../actions/articles';

const Home = ({
  common: { appName },
  token,
  getTags,
  tags,
  getArticlesByTag,
  getArticles,
  getFeed
}) => {
  useEffect(() => {
    (async () => {
      await getTags();
      await (token ? getFeed() : getArticles());
    })();
  }, [getTags]);

  const onClickTag = name => {
    getArticlesByTag(name);
  };

  return (
    <div id='main'>
      <MainView />
      <ul className='actions pagination'>
        <li>
          <a href='' className='disabled button large previous'>
            Previous Page
          </a>
        </li>
        <li>
          <a href='#' className='button large next'>
            Next Page
          </a>
        </li>
      </ul>
    </div>
    // <div className='home-page'>
    //   <Banner appName={appName} />

    //   <div className='container page'>
    //     <div className='row'>
    //       <MainView />

    //       <div className='col-md-3'>
    //         <div className='sidebar'>
    //           <p>Popular Tags</p>
    //           <Tags tags={tags} onClickTag={onClickTag} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

const mapStateToProps = state => ({
  common: state.common,
  token: state.auth.token,
  tags: state.articles.tags
});

export default connect(
  mapStateToProps,
  { getTags, getArticlesByTag, getArticles, getFeed }
)(Home);
