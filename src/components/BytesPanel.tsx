import React from 'react';
import './BytesPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';

const BytesPanelEntry = ({
  str,
  char,
  idx,
}: {
  str: string;
  char: string;
  idx: number;
}) => {
  return (
    <div data-char={to_domstr_representation(char)} data-stridx={idx}>
      {str}
    </div>
  );
};
const BytesPanel =
  (displayFunc: (n: number) => string): React.FC<CommonArgs> =>
  ({ fileText }) => {
    const encoder = new TextEncoder();
    return (
      <div className="BytesPanel">
        {[...fileText].flatMap((char, idx) =>
          [...encoder.encode(char)].map((byte) => (
            <BytesPanelEntry
              str={displayFunc(byte)}
              char={char}
              idx={idx}
              key={idx}
            ></BytesPanelEntry>
          )),
        )}
      </div>
    );
  };
export const BinaryPanel = BytesPanel((byte) =>
  byte.toString(2).padStart(8, '0'),
);
export const HexPanel = BytesPanel((byte) =>
  byte.toString(16).padStart(2, '0'),
);
