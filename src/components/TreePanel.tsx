import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import './TreePanel.css';
import * as d3 from 'd3';
import { CommonArgs } from './common';
import {
  HSBData,
  hsbMouseOutListener,
  hsbMouseOverListener,
  to_domstr_representation,
} from './HoverStyleBodge';

import { TreeNode, Node } from '../classes/Huffman';

interface TreeProps {
  treeData: TreeNode | undefined;
  hsbData: HSBData;
  previousTransform: d3.ZoomTransform | undefined;
  setPreviousTransform: React.Dispatch<React.SetStateAction<any>>;
}

function Tree(props: TreeProps) {
  const margin = { top: 50, right: 0, bottom: 30, left: 100 };
  let currentZoom = 1;

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

    // place the root in the top center
    let cliHeight = ref.current?.clientHeight;
    let cliWidth = ref.current?.clientWidth;
    if (
      typeof cliHeight === 'number' &&
      typeof cliWidth === 'number' &&
      cliHeight > 0 &&
      cliWidth > 0
    ) {
      margin.left = cliWidth / 2;
    }

    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (e) => {
      // console.log(e);
      g.attr('transform', e.transform);
      props.setPreviousTransform(e.transform);
    });

    svg.call(zoom);

    // trigger tha initial zoom with an initial transform.
    if (props.previousTransform === undefined) {
      svg.call(
        zoom.transform,
        d3.zoomIdentity.scale(currentZoom).translate(margin.left, margin.top),
      );
    } else {
      svg.call(zoom.transform, props.previousTransform);
    }

    // adds the links between the nodes
    const link = g
      .selectAll('.link')
      .data(nodes.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        if (d.parent === null || d.parent.data.isInvisible)
          return ''; // should be unreachable since we do the slice, but just in case
        else return `M${d.x},${d.y} ${d.parent.x},${d.parent.y}`;
      });

    // adds each node as a group
    const node = g
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('g')
      .attr('opacity', (d) => {
        return d.data.isInvisible ? 0 : 1;
      })
      .attr(
        'class',
        (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf'),
      )
      .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');

    // adds the square to the node
    node
      .append('rect')
      .attr('x', -20)
      .attr('y', -20)
      .attr('width', 40)
      .attr('height', 40)
      .attr('opacity', (d) => {
        return d.data.isInvisible ? 0 : 1;
      })
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
      .attr('opacity', (d) => {
        return d.data.isInvisible ? 0 : 1;
      })
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
      .attr('opacity', (d) => {
        return d.data.isInvisible ? 0 : 1;
      })
      .text((d) => {
        return d.data.count;
      });
  }, [props.treeData, margin.left, margin.top]);

  // ==== put all hook calls above this line ====

  if (props.treeData === undefined) {
    return <></>;
  }
  // console.log('Page Height: %d', pageHeight);
  // console.log('Page Width: %d', pageWidth);

  // Declares a tree layout and assigns the size
  const treemap = d3
    .tree<TreeNode>()
    .nodeSize([40, 40])
    .separation((a, b) => {
      return a.parent === b.parent ? 3 : 4;
    });

  //  assigns the data to a hierarchy using parent-child relationships
  const nodes_hierarchy: d3.HierarchyNode<TreeNode> = d3.hierarchy(
    props.treeData,
    (d) => d.descendants,
  );

  // maps the node data to the tree layout
  const nodes: d3.HierarchyPointNode<TreeNode> = treemap(nodes_hierarchy);

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

const TreePanel: React.FC<CommonArgs> = ({
  tree,
  displayText,
  hsbData,
  previousTransform,
  setPreviousTransform,
}) => {
  const [treeRoot, setTreeRoot] = useState<TreeNode | undefined>();

  useEffect(() => {
    setTreeRoot(undefined);
    if (tree.length > 1) {
      const branchNode: Node = { char: null, bits: null };
      let invisibleRoot = new TreeNode(branchNode, true, 0);
      tree.forEach((t) => {
        if (t !== undefined) invisibleRoot.descendants.push(t);
      });
      setTreeRoot(invisibleRoot);
    } else {
      if (tree !== undefined && tree.length > 0) setTreeRoot(tree[0]);
    }
    // console.log(treeRoot);
  }, [tree, displayText]);

  if (displayText === undefined) {
    return <></>;
  }

  return (
    <Tree
      treeData={treeRoot}
      hsbData={hsbData}
      previousTransform={previousTransform}
      setPreviousTransform={setPreviousTransform}
    />
  );
};

export default TreePanel;
