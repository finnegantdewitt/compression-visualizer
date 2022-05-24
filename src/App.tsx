import React, { useState, useEffect } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [sourceText, setSourceText] = useState(Simple);
  const [displayText, setDisplayText] = useState<string>('');
  const [treeText, setTreeText] = useState<string>('');
  const hsbData = useHsbData();
  const commonArgs: CommonArgs = { displayText, setDisplayText, hsbData };

  const [clock, setClock] = useState(0);
  const [play, setPlay] = useState(false);
  const [animText, setAnimText] = useState(false);

  // display text anim
  useEffect(() => {
    if (animText) {
      const interval = setInterval(() => {
        showText();
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animText, displayText]);

  function showText() {
    // display text
    if (displayText.length < sourceText.length) {
      setDisplayText(displayText + sourceText[displayText.length]);
    } else {
      setAnimText(false);
    }
  }

  // anim tree
  useEffect(() => {
    if (clock !== -1 && play) {
      const interval = setInterval(() => {
        onClock();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [clock, play, displayText]);

  function onClock() {}

  function pressPlay() {
    setPlay(!play);
    onClock();
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => pressPlay()}>
          {play ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button onClick={() => setAnimText(!animText)}>anim_text</button>
        <button onClick={() => setDisplayText(sourceText)}>
          display_source
        </button>
        <button onClick={() => setDisplayText('')}>clear_display_text</button>
        <button onClick={() => setSourceText(Simple)}>simple</button>
        <button onClick={() => setSourceText(Never_Gonna_Lyrics)}>
          Never_Gonna
        </button>
      </div>
      <GetFile setDisplayText={setDisplayText} />
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
