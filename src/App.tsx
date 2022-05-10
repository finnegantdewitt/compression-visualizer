import React, { useState } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { Tree, createTree } from './components/Tree';

function App() {
  const [fileText, setFileText] = useState<string | ArrayBuffer | null>(null);
  let tree = createTree('');
  return (
    <div className="App">
      <header className="App-header">
        <LyricSplit lyrics={Simple} />
        <GetFile setFileText={setFileText} />
        <Tree treeData={tree} />
        <div>{fileText?.toString()}</div>
      </header>
    </div>
  );
}

export default App;
