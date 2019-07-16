import React from 'react';

const QueryForm = ({ onSubmit, onChange, value, id, className }) => {
  return (
    <form id={id || null} className={className || null} onSubmit={onSubmit}>
      <input
        type='text'
        name='query'
        placeholder='Search'
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default QueryForm;
