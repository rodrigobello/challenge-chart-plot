import React from 'react';
import PropTypes from 'prop-types';

import 'codemirror/lib/codemirror.css';
import './Themes/Material.css';
import './TextEditor.css';

import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

const TextEditor = ({ handleCodeInput }) => {
  const options = {
    lineNumbers: true,
    mode: 'application/json',
    theme: 'material',
  };
  return (
    <div className="TextEditor">
      <CodeMirror
        options={options}
        onChange={handleCodeInput}
        className="cahasdusad"
      />
    </div>
  );
};

TextEditor.propTypes = {
  handleCodeInput: PropTypes.func.isRequired,
};

export default TextEditor;
