import React from 'react';
import { to_domstr_representation } from './HoverStyleBodge';

const HexPanelEntry = ({
  byte,
  char,
  idx,
}: {
  byte: number;
  char: string;
  idx: number;
}) => {
  return (
    <div data-char={to_domstr_representation(char)} data-stridx={idx}>
      {byte.toString(2).padStart(8, '0')}
    </div>
  );
};
const HexPanel = ({ text }: { text: string }) => {
  const encoder = new TextEncoder();
  return (
    <div className="HexPanel">
      {[...text].flatMap((char, idx) =>
        [...encoder.encode(char)].map((byte) => (
          <HexPanelEntry
            byte={byte}
            char={char}
            idx={idx}
            key={idx}
          ></HexPanelEntry>
        )),
      )}
    </div>
  );
};
export default HexPanel;
