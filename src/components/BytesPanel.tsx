import React, { ReactElement, useEffect, useState } from 'react';
import { assert } from '../util';
import './BytesPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';

const BytesPanel =
  (displayFunc: (n: number) => string): React.FC<CommonArgs> =>
  ({ displayText }) => {
    const [children, setChildren] = useState<ReactElement[]>([]);
    useEffect(() => {
      let key = 0;
      setChildren(
        [...displayText].flatMap((char, idx) =>
          [...encoder.encode(char)].map((byte) => (
            <div
              data-char={to_domstr_representation(char)}
              data-stridx={idx}
              key={++key}
            >
              {displayFunc(byte)}
            </div>
          )),
        ),
      );
    }, [displayText]);
    const encoder = new TextEncoder();
    return <div className="BytesPanel">{children}</div>;
  };
export const BinaryPanel = BytesPanel((byte) =>
  byte.toString(2).padStart(8, '0'),
);
export const HexPanel = BytesPanel((byte) =>
  byte.toString(16).padStart(2, '0'),
);
