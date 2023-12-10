// src/TextEditor.tsx

import React, { useState, useRef, useEffect } from 'react';

const TextEditor: React.FC = () => {
  const [text, setText] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormatClick = (format: string) => {
    if (!textAreaRef.current) return;

    const textarea = textAreaRef.current;
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    if (selectedText) {
      const formattedText = `<${format}>${selectedText}</${format}>`;
      const newText =
        text.substring(0, textarea.selectionStart) +
        formattedText +
        text.substring(textarea.selectionEnd);

      setText(newText);
      textarea.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const textarea = textAreaRef.current;

    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const newValue = textarea.value;

    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter key pressed');

      const newText =
        newValue.substring(0, cursorPos) +
        '\n<br>\n' +
        newValue.substring(cursorPos);

      setText(newText);
    }
  };

  useEffect(() => {
    const textarea = textAreaRef.current;

    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);

      return () => {
        textarea.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-4">
        <button
          className="mr-2 px-3 py-2 border border-gray-400 rounded"
          onMouseDown={(e) => {
            e.preventDefault();
            handleFormatClick('b');
          }}
        >
          Bold
        </button>
        <button
          className="px-3 py-2 border border-gray-400 rounded"
          onMouseDown={(e) => {
            e.preventDefault();
            handleFormatClick('code');
          }}
        >
          Code
        </button>
      </div>
      <div className="flex-1 p-4 border-t border-gray-300 overflow-auto">
        {/* Render the formatted text here */}
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <textarea
          ref={textAreaRef}
          className="w-full h-full border-none outline-none resize-none"
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default TextEditor;
