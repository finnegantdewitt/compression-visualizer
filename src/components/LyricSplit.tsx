import React, { Fragment, useState } from 'react';
import { HSBGlobalListener, HSBStyle } from './HoverStyleBodge';
import TextPanel from './TextPanel';
import StepsPanel from './StepsPanel';
import { HexPanel, BinaryPanel } from './BytesPanel';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import { CommonArgs } from './common';
import TreePanel from './TreePanel';
import CompressedBinaryPanel from './CompressedBinaryPanel';

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

const TITLE_MAP: Record<PanelType, string> = {
  Text: 'Source Text',
  Steps: 'Steps',
  Hex: 'Hex',
  SourceBinary: 'Source Binary',
  Tree: 'Huffman Tree',
  CompressedBinary: 'Compressed Binary',
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
