import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  getArticle,
  updateArticle,
  createArticle
} from '../../actions/articles';
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
  const [tagListInput, setTagListInput] = useState('');

  useEffect(() => {
    (async () => {
      await (match.params.slug ? getArticle(match.params.slug) : null);
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
  }, [getArticle, match.params.slug]);

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
      ? updateArticle(article.slug, { article: formData }, history)
      : createArticle({ article: formData }, history);
  };

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {/* <ListErrors errors={this.props.errors}></ListErrors> */}

            <form>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    placeholder='Article Title'
                    value={title}
                    name='title'
                    onChange={e => onChange(e)}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder="What's this article about?"
                    name='description'
                    value={description}
                    onChange={e => onChange(e)}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    rows='8'
                    placeholder='Write your article (in markdown)'
                    name='body'
                    required
                    value={body}
                    onChange={e => onChange(e)}
                  />
                </fieldset>

                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter tags'
                    name='tagListInput'
                    value={tagListInput}
                    onChange={e => setTagListInput(e.target.value)}
                    onKeyUp={e => watchForEnter(e)}
                  />

                  <div className='tag-list'>
                    {(tagList || []).map(tag => {
                      return (
                        <span className='tag-default tag-pill' key={tag}>
                          <i
                            className='ion-close-round'
                            onClick={() => removeTagHandler(tag)}
                          />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </fieldset>

                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='button'
                  disabled={loading}
                  onClick={e => onSubmit(e)}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
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
