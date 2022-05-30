import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import {
  CompressedHuffmanData,
  TreeNode,
  useHuffmanTree,
  useHuffmanCompressedData,
} from './classes/Huffman';

function App() {
  const [sourceText, setSourceText] = useState(Simple);
  const [displayText, setDisplayText] = useState<string>('');
  // const [treeText, setTreeText] = useState<string>('');  // FIXME: is this unnecessary? or do we need to differentiate between tree vs display
  const hsbData = useHsbData();

  // animation variables
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animText, setAnimText] = useState(false);

  // state of what is being displayed
  const [isTextDisplayed, setIsTextDisplayed] = useState(false);
  const [isFreqTableDisplayed, setIsFreqTableDisplayed] = useState(false);

  const [tree, setTree] = useState<Array<TreeNode | undefined>>([]);

  // huffman stuff
  // const huffTree = useHuffmanTree(displayText);
  // const compressed = useHuffmanCompressedData(displayText, huffTree);
  const compressed = undefined;

  const commonArgs: CommonArgs = {
    displayText,
    setDisplayText,
    tree,
    setTree,
    hsbData,
    isFreqTableDisplayed,
    compressed,
  };

  // display text anim
  useEffect(() => {
    if (animText) {
      const interval = setInterval(() => {
        animateDisplayText();
      }, 50);
      return () => clearInterval(interval);
    }
  }, [animText, displayText]);

  function animateDisplayText() {
    // display text
    if (displayText.length < sourceText.length) {
      setDisplayText(displayText + sourceText[displayText.length]);
    } else {
      setIsTextDisplayed(true);
      setAnimText(false);
    }
  }

  function clearDisplayText() {
    setDisplayText('');
    setTree([]);
    setIsTextDisplayed(false);
  }

  // function onClock() {}

  function pressPlay() {}

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
        <button onClick={() => clearDisplayText()}>clear_display_text</button>
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
