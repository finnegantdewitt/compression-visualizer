import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';
import { CompressedHuffmanData, TreeNode, Node } from '../classes/Huffman';
import { display_chars } from '../util/DisplayChars';
import './StepsPanel.css';

interface Char {
  char: string;
  count: number;
}

const StepsPanel: React.FC<CommonArgs> = ({ displayText, tree, setTree }) => {
  // should always be sorted in ascending order
  const [nodeArray, setNodeArray] = useState<Array<TreeNode>>([]);

  useEffect(() => {
    setNodeArray([]); // reset nodeArray for when text changes
    //get the char frequencies
    const charFreqs = new Map<string, number>();
    for (let i = 0; i < displayText.length; i++) {
      let letter = displayText[i];
      let letterFreq = charFreqs.get(letter);
      if (letterFreq === undefined) {
        letterFreq = 0;
      }
      letterFreq += 1;
      charFreqs.set(letter, letterFreq);
    }

    // sort them in an array (need to do this cause
    // can't sort right after setState cause it's
    // not set yet :|)
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

    charArray.forEach((ch) => {
      let tempNode: Node = { char: ch.char, bits: '' };
      let node = new TreeNode(tempNode, false, ch.count);
      setNodeArray((prevNodes) => [...prevNodes, node]);
    });
  }, [displayText]); // should only trigger when the display text changes

  const push = () => {
    let tempNode: Node = { char: null, bits: null };
    let node = new TreeNode(tempNode, false, 10);

    // finds the index to insert node at
    let insertAt = nodeArray.findIndex((element) => {
      return element.count >= node.count;
    });

    // inserts the node at insertAt,
    // or appends if it didn't find one
    if (insertAt !== -1) {
      setNodeArray((prevNodes) => [
        ...prevNodes.slice(0, insertAt),
        node,
        ...prevNodes.slice(insertAt),
      ]);
    } else {
      setNodeArray((prevNodes) => [...prevNodes, node]);
    }
  };

  const build = () => {
    const branchNode: Node = { char: null, bits: null };
    if (nodeArray.length > 1) {
      let tempCount = nodeArray[0].count + nodeArray[1].count;
      let temp = new TreeNode(branchNode, false, tempCount);
      temp.left = nodeArray[0];
      temp.right = nodeArray[1];
      let insertAt = nodeArray.findIndex((element) => {
        return element.count > tempCount;
      });
      // I have to do all this messy setArray stuff in
      // a single statement because otherwise it won't
      // update before calling the next setArray.
      // Everything done in here is assuming that the
      // first two element we will remove are still in
      // the array.
      if (insertAt !== -1) {
        // inserts temp at the insertAt
        // then removes the first two elements
        setNodeArray((prevNodes) => {
          let inserted = [
            ...prevNodes.slice(0, insertAt),
            temp,
            ...prevNodes.slice(insertAt),
          ];
          let firstTwoRemoved = inserted.slice(2);
          return firstTwoRemoved;
        });
      } else {
        // inserts temp at the end
        // then removes the first two elements
        setNodeArray((prevNodes) => {
          let pushed = [...prevNodes, temp];
          let firstTwoRemoved = pushed.slice(2);
          return firstTwoRemoved;
        });
      }
      setTree((prev) => {
        let treeNodes = [];
        prev.forEach((tNode) => {
          if (tNode?.parent === undefined) {
            treeNodes.push(tNode);
          }
        });
        treeNodes.push(temp);
        return treeNodes;
      });
    }
  };

  return (
    <div className="StepsPanel">
      <div style={{ marginLeft: '1em', marginTop: '1em' }}>
        <button>Reset</button>
      </div>
      <div>
        <ol>
          <li>Read the text</li>
          <li>
            Count the frequency of each letter{' '}
            {/* <button onClick={() => push()}>debug push</button> */}
          </li>
          <li>
            Build the tree{' '}
            <button
              style={{ float: 'right', marginRight: '1em' }}
              onClick={() => build()}
            >
              Build
            </button>
          </li>
          <ol>
            <li>Take the two lowest frequency nodes</li>
            <li>
              Connect them to a new intermediate node (inter) with the sum of
              their frequencies
            </li>
          </ol>
        </ol>
      </div>
      <div className="row">
        <div className="column">
          <table>
            <thead>
              <tr>
                <th>Node</th>
                <th>freq</th>
              </tr>
            </thead>
            <tbody>
              {nodeArray.map((treeNode, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      {treeNode.value.char !== null
                        ? display_chars[treeNode.value.char] ??
                          treeNode.value.char
                        : 'inter'}
                    </td>
                    <td>{treeNode.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="column">
          <table>
            <thead>
              <tr>
                <th>Node</th>
                <th>freq</th>
              </tr>
            </thead>
            <tbody>
              {nodeArray.map((treeNode, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      {treeNode.value.char !== null
                        ? display_chars[treeNode.value.char] ??
                          treeNode.value.char
                        : 'inter'}
                    </td>
                    <td>{treeNode.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StepsPanel;
