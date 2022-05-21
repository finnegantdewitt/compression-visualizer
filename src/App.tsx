import React, { useState, useEffect } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';

function App() {
  const [fileText, setFileText] = useState<string>(Never_Gonna_Lyrics);
  const hsbData = useHsbData();
  const commonArgs: CommonArgs = { fileText, setFileText, hsbData };

  const [clock, setClock] = useState(0);
  const [play, setPlay] = useState(false);
  const [displayString, setDisplayString] = useState('');

  useEffect(() => {
    if (clock !== -1 && play) {
      const interval = setInterval(() => {
        onClock();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [clock, play, displayString]);

  function onClock() {
    if (displayString.length < Simple.length) {
      setDisplayString(displayString + Simple[displayString.length]);
    }
  }

  function pressPlay() {
    setPlay(!play);
    onClock();
  }

  return (
    <div className="App">
      <button onClick={() => pressPlay()}>play</button>
      <GetFile setFileText={setFileText} />
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
