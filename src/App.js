import React from 'react';
import CkEditorComponent from './CkEditorComponent';
import MathLiveEditor from "./MathLiveEditor";
import QuillEditor from './QuillEditor';
import './App.css';
import HybridEditor from './HybridEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CkEditorComponent />
        <MathLiveEditor />
        <QuillEditor />
        <HybridEditor />
      </header>
    </div>
  );
}

export default App;