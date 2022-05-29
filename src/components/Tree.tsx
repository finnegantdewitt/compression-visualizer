import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import './Tree.css';
import * as d3 from 'd3';
import { CommonArgs } from './common';
import { HierarchyPointNode } from 'd3';
import { assert } from '../util';
import {
  HSBData,
  hsbMouseOutListener,
  hsbMouseOverListener,
  to_domstr_representation,
} from './HoverStyleBodge';

import { TreeNode, Node } from '../classes/TreeNode';

interface Char {
  char: string;
  count: number;
}

function createTree(text: string) {
  // count the freqs of chars with a hashmaps
  const charFreqs = new Map<string, number>();
  for (let i = 0; i < text.length; i++) {
    let letter = text[i];
    let letterFreq = charFreqs.get(letter);
    if (letterFreq === undefined) {
      letterFreq = 0;
    }
    letterFreq += 1;
    charFreqs.set(letter, letterFreq);
  }

  // sort them in an array
  const charArray = new Array<Char>();
  charFreqs.forEach((value, key) => {
    let ch: Char = {
      char: key,
      count: value,
    };
    charArray.push(ch);
  });
  charArray.sort((a, b) => {
    return a.count - b.count; // ascending order
  });

  // make an array of nodes
  const nodeArray = new Array<TreeNode>();
  charArray.forEach((ch) => {
    // Create new treenode with count and char
    let tempNode: Node = { char: ch.char, bits: '' };
    let node = new TreeNode(tempNode, false, ch.count);
    // node.left = root;
    // node.right = root;
    // append it to the nodeArray
    nodeArray.push(node);
  });

  // build a tree from the nodes
  const branchNode: Node = { char: null, bits: null };
  while (nodeArray.length > 1) {
    // I think this does it but I don't have a good way to display it
    let tempCount = nodeArray[0].count + nodeArray[1].count;
    let temp = new TreeNode(branchNode, true, tempCount);
    temp.left = nodeArray[0];
    temp.right = nodeArray[1];
    nodeArray.splice(0, 2); // Remove first 2 nodes from array
    let index = nodeArray.findIndex((element) => {
      return element.count >= tempCount;
    });
    nodeArray.splice(index, 0, temp); // Add temp node to start of array
  }

  return nodeArray[0];
}

interface TreeProps {
  treeData: TreeNode;
  hsbData: HSBData;
}

function Tree(props: TreeProps) {
  if (props.treeData === undefined) {
    return <></>;
  }
  // console.log(props);
  const margin = { top: 50, right: 0, bottom: 30, left: 0 };
  const [width, setHeight] = useState<any>(750 - margin.top - margin.bottom);
  const [height, setWidth] = useState<any>(600 - margin.left - margin.right);

  const [pageHeight, setPageHeight] = useState<number | undefined>(0);
  const [pageWidth, setPageWidth] = useState<number | undefined>(0);
  useLayoutEffect(() => {
    setPageHeight(ref.current?.clientHeight);
    setPageWidth(ref.current?.clientWidth);
    if (
      typeof pageHeight === 'number' &&
      typeof pageWidth === 'number' &&
      pageHeight > 0 &&
      pageWidth > 0
    ) {
      setHeight(pageHeight - margin.top - margin.bottom);
      setWidth(pageWidth - margin.left - margin.right);
      // console.log('Page Height: %d', pageHeight);
      // console.log('Page Width: %d', pageWidth);
    }
  });
  // console.log('Page Height: %d', pageHeight);
  // console.log('Page Width: %d', pageWidth);

  const nodeRadius = 15;

  // Declares a tree layout and assigns the size
  const treemap = d3
    .tree<TreeNode>()
    .nodeSize([nodeRadius * 3, nodeRadius * 3])
    .size([height, width]);

  //  assigns the data to a hierarchy using parent-child relationships
  const nodes_hierarchy: d3.HierarchyNode<TreeNode> = d3.hierarchy(
    props.treeData,
    (d) => d.descendants,
  );

  // maps the node data to the tree layout
  const nodes: d3.HierarchyPointNode<TreeNode> = treemap(nodes_hierarchy);

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // don't do anything if we don't have a ref to the svg yet.
    // (this is mostly here to make sure typescript knows the ref will be non-null before we continue)
    if (ref.current === null) return;

    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select(ref.current);

    // clear out any existing elements
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.call(
      d3.zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
        g.attr('transform', e.transform);
      }),
    );

    // adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        if (d.parent === null)
          return ''; // should be unreachable since we do the slice, but just in case
        else return `M${d.x},${d.y} ${d.parent.x},${d.parent.y}`;
      });

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf'),
      )
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

    // adds the circle to the node
    node
      .append('rect')
      .attr('x', -20)
      .attr('y', -20)
      .attr('width', 40)
      .attr('height', 40)
      .attr('data-char', (d) =>
        d.data.value.char === null
          ? null
          : to_domstr_representation(d.data.value.char),
      );

    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', '-0')
      .attr('y', '10')
      .text((d) => {
        switch (d.data.value.char) {
          case ' ':
            return '_';
          case '\n':
            return '\\n';
          default:
            return d.data.value.char;
        }
      });
    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('x', '-0')
      .attr('y', '-10')
      .text((d) => {
        return d.data.count;
      });
  }, [props.treeData, width, height]);

  return (
    <>
      <svg
        className="Tree"
        ref={ref}
        onMouseOver={hsbMouseOverListener(props.hsbData)}
        onMouseOut={hsbMouseOutListener(props.hsbData)}
      />
    </>
  );
}

const TreePanel: React.FC<CommonArgs> = ({ displayText, hsbData }) => {
  if (displayText === undefined) {
    return <></>;
  }
  const [tree, setTree] = useState<TreeNode>(() => createTree(displayText));

  useEffect(() => {
    setTree(createTree(displayText));
  }, [displayText]);
  return <Tree treeData={tree} hsbData={hsbData} />;
};

export default TreePanel;
