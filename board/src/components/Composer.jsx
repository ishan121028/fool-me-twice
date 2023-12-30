import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Tooltip from '@material-ui/core/Tooltip';
import createHighlightPlugin from './draft-js-highlight-plugin.js';

export default function Composer({ highlight, onChange, disabled, placeholder }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hasFocus, setFocus] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const editor = useRef();

  const focusEditor = () => {
    if (disabled || hasFocus) return;
    editor.current.focus();
    setFocus(true);
  };

  const onChangeEditorState = (editorState) => {
    setEditorState(editorState);
    onChange(editorState.getCurrentContent().getPlainText());
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const borderColor = hasFocus && !disabled ? '#3f51b5' : 'rgba(0, 0, 0, 0.26)';
  const height = expanded ? '10em' : '5em'; // Adjust the height based on the expanded state

  const decorator = useMemo(
    () => new CompositeDecorator(createHighlightPlugin({ highlight }).decorators),
    [highlight]
  );

  useEffect(() => setEditorState((e) => EditorState.set(e, { decorator })), [
    decorator,
  ]);

  return (
    <div
      style={{
        borderWidth: 'thin',
        borderStyle: 'solid',
        height,
        overflowY: 'scroll',
        borderColor,
        position: 'relative',
      }}
      onClick={focusEditor}
      className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
    >
      <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-multiline MuiOutlinedInput-multiline">
        <Editor
          spellCheck
          ref={editor}
          readOnly={disabled}
          placeholder=" " // Set an empty space as the placeholder
          editorState={editorState}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onChange={onChangeEditorState}
          style={{ height: '100%', overflowY: 'scroll', border: 'none' }} // Remove border to prevent double placeholder
        />
      </div>
      <Tooltip title={expanded ? 'Collapse' : 'Expand More'} arrow>
        <IconButton
          onClick={toggleExpand}
          style={{
            position: 'absolute',
            bottom: '0.5em',
            right: '1em',
            padding: '8px',
            fontSize: '16px',
            backgroundColor: 'transparent', // Set to transparent
            color: expanded ? '#3f51b5' : '#2196f3',
            borderRadius: '4px',
            transition: 'color 0.3s',
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
