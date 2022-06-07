import React from 'react';
import { HSBData } from './HoverStyleBodge';
import { CompressedHuffmanData, TreeNode } from '../classes/Huffman';
import * as d3 from 'd3';
// import { TreeNode, Node } from '../classes/TreeNode';

export type CommonArgs = {
  readonly displayText: string;
  readonly setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  readonly tree: Array<TreeNode | undefined>;
  readonly setTree: React.Dispatch<
    React.SetStateAction<Array<TreeNode | undefined>>
  >;
  readonly hsbData: HSBData;
  readonly compressed: Readonly<CompressedHuffmanData | undefined>;
  readonly setCompressed: React.Dispatch<
    React.SetStateAction<CompressedHuffmanData | undefined>
  >;

  // this state keeps track of the zoom and drag position
  // of the huffman tree, need to make it global so steps
  // panel can reset it
  readonly setPreviousTransform: React.Dispatch<
    React.SetStateAction<d3.ZoomTransform | undefined>
  >;
  readonly previousTransform: Readonly<d3.ZoomTransform | undefined>;
};
