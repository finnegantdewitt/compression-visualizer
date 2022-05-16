import React, { Fragment } from 'react';
import HoverStyleBodge from './HoverStyleBodge';
import TextPanel from './TextPanel';
import { HexPanel, BinaryPanel } from './BytesPanel';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { CommonArgs } from './common';
import TreePanel from './Tree';

type PanelType = 'Text' | 'Hex' | 'Tree' | 'Binary';
const paneltypeComponentMap: { [K in PanelType]: React.FC<CommonArgs> } = {
  Text: TextPanel,
  Hex: HexPanel,
  Binary: BinaryPanel,
  Tree: TreePanel,
};

// TODO: should rename `LyricSplit` to something more accurate
const LyricSplit: React.FC<CommonArgs> = (params) => {
  return (
    <Fragment>
      <HoverStyleBodge></HoverStyleBodge>
      <Mosaic<PanelType>
        className="mosaic-blueprint-theme bp4-dark"
        blueprintNamespace="bp4"
        renderTile={(id, path) => (
          <MosaicWindow<PanelType> path={path} title={id}>
            {React.createElement(paneltypeComponentMap[id], params, null)}
          </MosaicWindow>
        )}
        initialValue={{
          direction: 'row',
          splitPercentage: 100 / 3,
          first: 'Text',
          second: {
            direction: 'row',
            first: {
              direction: 'column',
              first: 'Hex',
              second: 'Binary',
            },
            second: 'Tree',
          },
        }}
      />
    </Fragment>
  );
};
export default LyricSplit;
