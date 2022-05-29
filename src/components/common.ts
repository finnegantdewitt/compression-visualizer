import React from 'react';
import { CompressedHuffmanData, TreeNode } from '../Huffman';
import { HSBData } from './HoverStyleBodge';

export type CommonArgs = {
  readonly displayText: string;
  readonly setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  readonly hsbData: HSBData;
  readonly isFreqTableDisplayed: boolean;
  readonly tree: Readonly<TreeNode>;
  readonly compressed: Readonly<CompressedHuffmanData>;
};
