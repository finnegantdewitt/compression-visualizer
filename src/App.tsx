import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import Simple from './text/Simple_Test_Text';
import * as d3 from 'd3';
import { CommonArgs } from './components/common';
import { useHsbData } from './components/HoverStyleBodge';
import { CompressedHuffmanData, TreeNode } from './classes/Huffman';

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

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [userHasBeenWarned, setUserHasBeenWarned] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 1000;

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
      {isMobile && !userHasBeenWarned ? (
        <div style={{ marginTop: '1em', marginLeft: '1em' }}>
          <div style={{ marginBottom: '1em' }}>
            Please use this on a wider screen <br />
            (This site doesn't look very good on a phone)
          </div>
          <div>
            <button
              onClick={() => {
                setUserHasBeenWarned(true);
              }}
            >
              I know better just show me the site
            </button>
          </div>
        </div>
      ) : (
        <LyricSplit {...commonArgs} />
      )}
    </div>
  );
}

export default App;
