import { ReactElement, useEffect, useState } from 'react';
import { assert } from '../util';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';

const CompressedBinaryPanel: React.FC<CommonArgs> = ({ compressed }) => {
  const [children, setChildren] = useState<ReactElement[]>([]);
  useEffect(() => {
    if (compressed !== undefined) {
      setChildren(
        compressed.map(({ bits, char, idx }, i) => (
          <div
            data-char={to_domstr_representation(char)}
            data-stridx={idx}
            key={i}
          >
            {bits.join('')}
          </div>
        )),
      );
    } else {
      setChildren([<div key={0}></div>]);
    }
  }, [compressed]);
  return <div className="BytesPanel">{children}</div>;
};
export default CompressedBinaryPanel;
