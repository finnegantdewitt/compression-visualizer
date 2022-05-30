import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import './TextPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';
import { CompressedHuffmanData, TreeNode, Node } from '../classes/Huffman';
import { display_chars } from '../util/DisplayChars';

const TextPanelEntry = ({ char, idx }: { char: string; idx: number }) => {
  const elem = (
    <div data-char={to_domstr_representation(char)} data-stridx={idx}>
      {display_chars[char] ?? char}
    </div>
  );
  if (char === '\n') {
    return (
      <Fragment>
        {elem}
        <br />
      </Fragment>
    );
  } else {
    return elem;
  }
};

const TextPanel: React.FC<CommonArgs> = ({ displayText }) => {
  const [children, setChildren] = useState<ReactElement[]>([]);
  useEffect(() => {
    setChildren(
      [...displayText].map((char, idx) => (
        <TextPanelEntry char={char} idx={idx} key={idx}></TextPanelEntry>
      )),
    );
  }, [displayText]);
  return <div className="TextPanel">{children}</div>;
};
export default TextPanel;
