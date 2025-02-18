import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CkEditorComponent() {
  const [content, setContent] = useState('<p>Start writing here...</p>');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with content:', content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>CKEditor 5 Demo</h2>
      <div style={{ margin: '20px 0' }}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            licenseKey: 'GPL',
            toolbar: [
              'heading', '|',
              'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
              'undo', 'redo'
            ]
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px' }}>
        Submit
      </button>
    </form>
  );
}

export default CkEditorComponent;