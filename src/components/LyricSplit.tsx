import React, { Fragment, useState, useEffect } from 'react';
import { HSBGlobalListener, HSBStyle } from './HoverStyleBodge';
import TextPanel from './TextPanel';
import StepsPanel from './StepsPanel';
import { HexPanel, BinaryPanel } from './BytesPanel';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import { CommonArgs } from './common';
import TreePanel from './TreePanel';
import CompressedBinaryPanel from './CompressedBinaryPanel';
import { CompressedHuffmanData } from '../classes/Huffman';

// calculates the entropy of the binary in average bits per symbol
const calcEntropy = (compHuffData: Readonly<CompressedHuffmanData>) => {
  let entropy = 0.0;
  compHuffData.forEach(({ char, idx, bits }) => {
    entropy += bits.length;
  });
  entropy /= compHuffData.length;
  return entropy;
};

type PanelType =
  | 'Text'
  | 'Hex'
  | 'Tree'
  | 'SourceBinary'
  | 'Steps'
  | 'CompressedBinary';
const paneltypeComponentMap: { [K in PanelType]: React.FC<CommonArgs> } = {
  Text: TextPanel,
  Steps: StepsPanel,
  Hex: HexPanel,
  SourceBinary: BinaryPanel,
  Tree: TreePanel,
  CompressedBinary: CompressedBinaryPanel,
};

// TODO: should rename `LyricSplit` to something more accurate
const LyricSplit: React.FC<CommonArgs> = (params) => {
  const [mosaicValue, setMosaicValue] = useState<MosaicNode<PanelType> | null>({
    direction: 'row',
    splitPercentage: 100 / 3,
    first: {
      direction: 'column',
      first: 'Text',
      second: 'Steps',
    },
    second: {
      direction: 'column',
      first: {
        direction: 'row',
        first: 'SourceBinary',
        second: 'CompressedBinary',
      },
      second: 'Tree',
    },
  });

  const [sourceBinarySize, setSourceBinarySize] = useState(0); // in bytes
  const [compressedBinarySize, setCompressedBinarySize] = useState(0); // in bytes
  const [compressedBinaryEntropy, setCompressedBinaryEntropy] = useState(0.0); // in bytes

  useEffect(() => {
    setSourceBinarySize(params.displayText.length);
  }, [params.displayText]);

  useEffect(() => {
    if (params.compressed !== undefined) {
      let length = 0;
      params.compressed.forEach(({ char, bits, idx }) => {
        length += bits.length;
      });
      setCompressedBinarySize(Math.ceil(length / 8));
      setCompressedBinaryEntropy(calcEntropy(params.compressed));
    } else {
      setCompressedBinarySize(0);
      setCompressedBinaryEntropy(0.0);
    }
  }, [params.compressed]);

  const TITLE_MAP: Record<PanelType, string> = {
    Text: `Source Text`,
    Steps: 'Steps',
    Hex: 'Hex',
    SourceBinary: `Source Binary: ${sourceBinarySize} bytes, 8 bits/symbol`,
    Tree: 'Huffman Tree',
    CompressedBinary: `Compressed Binary: ${compressedBinarySize} bytes, ${compressedBinaryEntropy.toFixed(
      4,
    )} bits/symbol`,
  };

  return (
    <Fragment>
      <HSBStyle data={params.hsbData} />
      <HSBGlobalListener data={params.hsbData} />
      <Mosaic<PanelType>
        className="mosaic-blueprint-theme bp4-dark"
        blueprintNamespace="bp4"
        renderTile={(id, path) => (
          <MosaicWindow<PanelType> path={path} title={TITLE_MAP[id]}>
            {React.createElement(paneltypeComponentMap[id], params, null)}
          </MosaicWindow>
        )}
        value={mosaicValue}
        onChange={setMosaicValue}
      />
    </Fragment>
  );
};
export default LyricSplit;
