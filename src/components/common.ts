import React from 'react';
import { HSBData } from './HoverStyleBodge';

export type CommonArgs = {
  readonly fileText: string;
  readonly setFileText: React.Dispatch<React.SetStateAction<string>>;
  readonly hsbData: HSBData;
};
