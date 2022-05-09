import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';

// https://github.com/nomcopter/react-mosaic/issues/184#issue-1211963465
declare module 'react-mosaic-component' {
  export interface MosaicWindowProps<T extends MosaicKey> {
    children: React.ReactNode;
  };
}