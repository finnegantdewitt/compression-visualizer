import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from './components/showFile';
import Simple from './text/Simple_Test_Text';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';
import {
  CompressedHuffmanData,
  TreeNode,
  useHuffmanTree,
  useHuffmanCompressedData,
} from './classes/Huffman';

function App() {
  const [sourceText, setSourceText] = useState(Simple);
  const [displayText, setDisplayText] = useState<string>('');
  const hsbData = useHsbData();

  const [tree, setTree] = useState<Array<TreeNode | undefined>>([]);

  // huffman stuff
  // const huffTree = useHuffmanTree(displayText);
  // const compressed = useHuffmanCompressedData(displayText, huffTree);
  const [compressed, setCompressed] = useState<
    CompressedHuffmanData | undefined
  >(undefined);

  const commonArgs: CommonArgs = {
    displayText,
    setDisplayText,
    tree,
    setTree,
    hsbData,
    compressed,
    setCompressed,
  };

  function clearDisplayText() {
    setDisplayText('');
    setTree([]);
  }

  return (
    <div className="App">
      <div>
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
