import React, { useState } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';

function App() {
  const [fileText, setFileText] = useState<string>(Simple);
  const hsbData = useHsbData();
  const commonArgs: CommonArgs = { fileText, setFileText, hsbData };
  return (
    <div className="App">
      <GetFile setFileText={setFileText} />
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
