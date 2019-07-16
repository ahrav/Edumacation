import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Spinner from '../layout/Spinner';
import {
  getArticle,
  updateArticle,
  createArticle
} from '../../actions/articles';
import '../../assets/css/main.css';

const Editor = ({
  match,
  article,
  getArticle,
  updateArticle,
  createArticle,
  history,
  loading
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: []
  });
  const [initialTitle, setInitialTitle] = useState('');
  const [image, setImage] = useState('');
  const [tagListInput, setTagListInput] = useState('');

  useEffect(() => {
    (async () => {
      await (match.params.slug ? getArticle(match.params.slug) : null);
      await setInitialTitle(
        loading || !article || !article.title ? '' : article.title
      );
      await setFormData({
        title: loading || !article || !article.title ? '' : article.title,
        description:
          loading || !article || !article.description
            ? ''
            : article.description,
        body: loading || !article || !article.body ? '' : article.body,
        tagList: loading || !article || !article.tagList ? [] : article.tagList
      });
      await setTagListInput('');
    })();
  }, [match.params.slug]);

  const { title, description, body, tagList } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const watchForEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setFormData({
        ...formData,
        tagList: [e.target.value].concat(formData.tagList)
      });
      setTagListInput('');
    }
  };

  const removeTagHandler = tag => {
    setFormData({
      ...formData,
      tagList: formData.tagList.filter(t => t !== tag)
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    article
      ? updateArticle(article.slug, { formData }, image, history)
      : createArticle({ formData }, image, history);
  };
  if (loading) return <Spinner />;
  return (
    <section id='mainForm' className='containerForm medium'>
      <header>
        <h2>{initialTitle ? initialTitle : 'New Article'}</h2>
        <p>{initialTitle ? 'Edit Article' : 'Publish Article'}</p>
        <p />
      </header>
      <div className='boxForm'>
        <form>
          <div className='rowForm gtr-50 gtr-uniform'>
            <div className='col-6Form col-12-mobilep'>
              <input
                minLength='1'
                className='input100'
                required
                type='text'
                value={title}
                onChange={e => onChange(e)}
                name='title'
                placeholder='Article title'
              />
              <span className='symbol-input100'>
                {/* <i className='fa fa-trophy' aria-hidden='true' /> */}
              </span>
            </div>

            <div className='col-12Form'>
              <input
                type='text'
                className='input100'
                name='description'
                placeholder='Description'
                onChange={e => onChange(e)}
                value={description}
              />
              <span className='symbol-input100'>
                {/* <i className='fa fa-trophy' aria-hidden='true' /> */}
              </span>
            </div>

            <div className='col-12Form'>
              <textarea
                className='textArea'
                type='text'
                name='body'
                rows='8'
                placeholder='Write your article in markdown'
                onChange={e => onChange(e)}
                value={body}
              />
              <span className='symbol-input100'>
                {/* <i className='fa fa-trophy' aria-hidden='true' /> */}
              </span>
            </div>

            <div className='col-12Form'>
              <input
                type='file'
                name='image'
                onChange={e => setImage(e.target.files[0])}
                accept='image/png, image/jpg, image/jpeg'
              />
              <span className='symbol-input100'>
                {/* <i className='fa fa-trophy' aria-hidden='true' /> */}
              </span>
            </div>

            <div className='col-12Form'>
              <input
                className='input100'
                type='text'
                name='tagListInput'
                placeholder='Enter Tags'
                onChange={e => setTagListInput(e.target.value)}
                onKeyUp={e => watchForEnter(e)}
                value={tagListInput}
              />
              <span className='symbol-input100'>
                {/* <i className='fa fa-envelope' aria-hidden='true' /> */}
              </span>
              <div className='tag-list'>
                {(tagList || []).map(tag => {
                  return (
                    <span
                      style={{ marginRight: '2px', fontStyle: 'italic' }}
                      key={tag}
                    >
                      <Icon
                        name='cancel'
                        style={{ paddingRight: '0px', margin: 0 }}
                        onClick={() => removeTagHandler(tag)}
                      />
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className='col-12Form'>
              <ul className='actionsForm specialForm'>
                <li>
                  <button
                    type='button'
                    onClick={e => onSubmit(e)}
                    disabled={loading}
                  >
                    Publish Article
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  article: state.articles.article,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { getArticle, updateArticle, createArticle }
)(withRouter(Editor));
