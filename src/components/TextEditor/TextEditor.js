import React from 'react';
import PropTypes from 'prop-types';

import 'codemirror/lib/codemirror.css';
import './Themes/Material.css';
import './TextEditor.css';

import 'codemirror/mode/javascript/javascript';

import Resizable from 're-resizable';
import CodeMirror from 'react-codemirror';

import DraggableIcon from '../UI/Icons/DraggableIcon/DraggableIcon';

const resizableOptions = {
  bottom: true,
  top: false,
  right: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

const TextEditor = ({ handleCharacterInput }) => {
  const options = {
    lineNumbers: true,
    mode: 'application/json',
    theme: 'material',
  };
  return (
    <Resizable
      defaultSize={{
        height: 300,
      }}
      enable={resizableOptions}
      className="TextEditor"
    >
      <CodeMirror
        options={options}
        onChange={handleCharacterInput}
      />
      <div className="DraggableArea">
        <DraggableIcon />
      </div>
    </Resizable>
  );
};

TextEditor.propTypes = {
  handleCharacterInput: PropTypes.func.isRequired,
};

export default TextEditor;
