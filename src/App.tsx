import React, { useState } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import logo from "./logo_white.png"
import Simple from './text/Simple_Test_Text';
import InputChoice from './components/InputChoice';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';

function App() {
  const [fileText, setFileText] = useState<string>(Simple);
  const hsbData = useHsbData();
  
  const commonArgs: CommonArgs = { fileText, setFileText, hsbData };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="" className="App-logo"/>
        &nbsp;Compression Visualizer

      </header>
      <InputChoice fileText={fileText} setFileText={setFileText} ></InputChoice>
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
