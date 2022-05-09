import React, { useState } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';

function App() {
  const [fileText, setFileText] = useState<string>(Simple);
  const commonArgs: CommonArgs = { fileText, setFileText };
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <GetFile setFileText={setFileText} />
      {/* </header> */}
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
