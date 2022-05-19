import React, { useState, useEffect } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { Tree, createTree } from './components/Tree';

function App() {
  let tree = createTree(Simple);
  const [fileText, setFileText] = useState<string | ArrayBuffer | null>(null);
  const [clock, setClock] = useState(0);
  const [play, setPlay] = useState(false);
  const [displayString, setDisplayString] = useState('');

  useEffect(() => {
    if (clock !== -1 && play) {
      const interval = setInterval(() => {
        onClock();
      }, 50);
      return () => clearInterval(interval);
    }
  }, [clock, play, displayString]);

  function onClock() {
    if (displayString.length < Simple.length) {
      setDisplayString(displayString + Simple[displayString.length]);
      console.log(displayString);
    }
  }

  function pressPlay() {
    setPlay(!play);
    onClock();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => pressPlay()}>play</button>
        <LyricSplit lyrics={displayString} />
        <GetFile setFileText={setFileText} />
        <Tree treeData={tree} />
        <div>{fileText?.toString()}</div>
      </header>
    </div>
  );
}

export default App;
