import { ReactElement, useEffect, useState } from 'react';
import { assert } from '../util';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';
import './CompressedBinaryPanel.css';

const CompressedBinaryPanel: React.FC<CommonArgs> = ({ compressed }) => {
  const [children, setChildren] = useState<ReactElement[]>([]);
  useEffect(() => {
    // 'key' counters, these are for react performance stuff
    let byteKey = 0;
    let bitKey = 0;
    // current offset within the byte we're writing
    let bitPos: number = 0;
    let cur: ReactElement[] = [];
    const newChildren: ReactElement[] = [];
    function todoNameMe() {
      console.log('todoNameMe', bitPos);
      assert(bitPos < 8, 'assert bitPos < 8');
      if (bitPos === 7 /*> 7*/) {
        bitPos = 0;
        newChildren.push(<div key={byteKey++}>{cur}</div>);
        bitKey = 0;
        cur = [];
      }
    }
    for (const { bits, char, idx } of compressed) {
      let bitsRemaining = bits;
      let isFirstChunk = true;
      while (bitsRemaining.length > 0) {
        const maxBitsToWrite = 7 - bitPos;
        const curBits = bitsRemaining.slice(0, maxBitsToWrite);
        bitsRemaining = bitsRemaining.slice(maxBitsToWrite);
        bitPos += curBits.length;
        const isLastChunk = bitsRemaining.length < 1;
        const clz = (isFirstChunk) ? (isLastChunk ? 'single' : 'first') : (isLastChunk ? 'last' : 'mid');
        cur.push(
          <div
            className={clz}
            data-char={to_domstr_representation(char)}
            data-stridx={idx}
            key={bitKey++}
          >
            {curBits.join('')}
          </div>,
        );
        isFirstChunk = false;
        todoNameMe();
      }
    }
    todoNameMe();
    setChildren(newChildren);
  }, [compressed]);
  return <div className="CompressedBinaryPanel">{children}</div>;
};
export default CompressedBinaryPanel;
