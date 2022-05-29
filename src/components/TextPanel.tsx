import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import './TextPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';
import { useTrail, a } from '@react-spring/web';
import { TreeNode, Node } from '../classes/TreeNode';

const display_chars: Record<string, string> = {
  // https://www.compart.com/en/unicode/block/U+2400
  '\u0000': '\u2400',
  '\u0001': '\u2401',
  '\u0002': '\u2402',
  '\u0003': '\u2403',
  '\u0004': '\u2404',
  '\u0005': '\u2405',

  '\u0006': '\u2406',
  '\u0007': '\u2407',
  '\u0008': '\u2408',
  '\u0009': '\u2409',
  '\u000A': '\u240A',
  '\u000B': '\u240B',
  '\u000C': '\u240C',
  '\u000D': '\u240D',
  '\u000E': '\u240E',
  '\u000F': '\u240F',
  '\u0010': '\u2410',
  '\u0011': '\u2411',
  '\u0012': '\u2412',
  '\u0013': '\u2413',
  '\u0014': '\u2414',
  '\u0015': '\u2415',
  '\u0016': '\u2416',
  '\u0017': '\u2417',
  '\u0018': '\u2418',
  '\u0019': '\u2419',
  '\u001A': '\u241A',
  '\u001B': '\u241B',
  '\u001C': '\u241C',
  '\u001D': '\u241D',
  '\u001E': '\u241E',
  '\u001F': '\u241F',

  // ' ': '\u2420', // symbol for space
  '\u007F': '\u2421',

  // ====
  ' ': '•',
};
const TextPanelEntry = ({ char, idx }: { char: string; idx: number }) => {
  const elem = (
    <div data-char={to_domstr_representation(char)} data-stridx={idx}>
      {display_chars[char] ?? char}
    </div>
  );
  if (char === '\n') {
    return (
      <Fragment>
        {elem}
        <br />
      </Fragment>
    );
  } else {
    return elem;
  }
};

const TextPanel: React.FC<CommonArgs> = ({ displayText }) => {
  const [children, setChildren] = useState<ReactElement[]>([]);
  useEffect(() => {
    setChildren(
      [...displayText].map((char, idx) => (
        <TextPanelEntry char={char} idx={idx} key={idx}></TextPanelEntry>
      )),
    );
  }, [displayText]);
  return <div className="TextPanel">{children}</div>;
};
export default TextPanel;

interface Char {
  char: string;
  count: number;
}

export const StepsPanel: React.FC<CommonArgs> = ({
  displayText,
  tree,
  setTree,
}) => {
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
    <>
      <div>
        <ol>
          <li>Read the text</li>
          <li>
            Count the frequency of each letter{' '}
            {/* <button onClick={() => push()}>debug push</button> */}
          </li>
          <li>
            Build the tree <button onClick={() => build()}>Build</button>
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
      <div>
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
    </>
  );
};
