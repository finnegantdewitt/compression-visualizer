import React from 'react';
import { HSBData } from './HoverStyleBodge';
import { CompressedHuffmanData, TreeNode } from '../classes/Huffman';
// import { TreeNode, Node } from '../classes/TreeNode';

export type CommonArgs = {
  readonly displayText: string;
  readonly setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  readonly tree: Array<TreeNode | undefined>;
  readonly setTree: React.Dispatch<
    React.SetStateAction<Array<TreeNode | undefined>>
  >;
  readonly hsbData: HSBData;
  readonly isFreqTableDisplayed: boolean;

  readonly huffTree: Readonly<TreeNode>;
  readonly compressed: Readonly<CompressedHuffmanData>;
};
