import React, { Fragment } from 'react';
import Splitter from '@devbookhq/splitter';
import HoverStyleBodge from './HoverStyleBodge';
import TextPanel from './TextPanel';
import HexPanel from './HexPanel';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import { CommonArgs } from './common';
import TreePanel from './Tree';

type PanelType = 'Text' | 'Hex' | 'Tree';
const paneltypeComponentMap: { [K in PanelType]: React.FC<CommonArgs> } = {
  Text: TextPanel,
  Hex: HexPanel,
  Tree: TreePanel,
};

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
          first: 'Tree',
          second: {
            direction: 'row',
            first: 'Text',
            second: 'Hex',
          }
        }}
      />
    </Fragment>
  );
};
export default LyricSplit;
