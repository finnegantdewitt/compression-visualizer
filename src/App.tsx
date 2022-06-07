import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import Simple from './text/Simple_Test_Text';
import * as d3 from 'd3';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';
import {
  CompressedHuffmanData,
  TreeNode,
  useHuffmanTree,
  useHuffmanCompressedData,
} from './classes/Huffman';

function App() {
  const hsbData = useHsbData();
  const [displayText, setDisplayText] = useState<string>('');
  const [tree, setTree] = useState<Array<TreeNode | undefined>>([]);
  const [compressed, setCompressed] = useState<
    CompressedHuffmanData | undefined
  >(undefined);
  const [previousTransform, setPreviousTransform] = useState<
    d3.ZoomTransform | undefined
  >(undefined);

  const commonArgs: CommonArgs = {
    displayText,
    setDisplayText,
    tree,
    setTree,
    hsbData,
    compressed,
    setCompressed,
    previousTransform,
    setPreviousTransform,
  };

  return (
    <div className="App">
      <LyricSplit {...commonArgs} />
    </div>
  );
}

export default App;
