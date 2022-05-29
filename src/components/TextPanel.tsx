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

// const LetterRevealAmin: React.FC<{
//   open: boolean;
//   children: React.ReactNode;
// }> = ({ open, children }) => {
//   const items = React.Children.toArray(children);
//   const trail = useTrail(items.length, {
//     config: { mass: 1, tension: 20000, friction: 200 },
//     opacity: open ? 1 : 0,
//     from: { opacity: 0 },
//   });
//   return (
//     <div className="TextPanel">
//       {trail.map((style, index) => (
//         <a.div key={index} style={style}>
//           {items[index]}
//         </a.div>
//       ))}
//     </div>
//   );
// };

// const TextPanel: React.FC<CommonArgs> = ({ displayText }) => {
//   const [children, setChildren] = useState<ReactElement[]>([]);
//   const [open, set] = useState(true);
//   useEffect(() => {
//     setChildren(
//       [...displayText].map((char, idx) => (
//         <TextPanelEntry char={char} idx={idx} key={idx}></TextPanelEntry>
//       )),
//     );
//   }, [displayText]);
//   return (
//     <div onClick={() => set((state) => !state)}>
//       <LetterRevealAmin open={open}>{children}</LetterRevealAmin>
//     </div>
//   );
// };
// export default TextPanel;

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
    let node = new TreeNode(tempNode, false, 7);
    let insertAt = -1;

    // using .every so I can break out of loop
    nodeArray.every((tNode, idx) => {
      if (node.count < tNode.count) {
        insertAt = idx;
        return false;
      } else {
        return true;
      }
    });
    if (insertAt !== -1) {
      setNodeArray((prevNodes) => [
        ...prevNodes.slice(0, insertAt),
        node,
        ...prevNodes.slice(insertAt),
      ]);
    } else {
      setNodeArray((prevNodes) => [...prevNodes, node]);
    }
    // const sorted = [...nodeArray].sort((a, b) => {
    //   return a.count - b.count;
    // });
    // setNodeArray(sorted);
    // console.log(nodeArray);
  };

  return (
    <>
      <div>
        <ol>
          <li>Read the text</li>
          <li>
            Count the frequency of each letter{' '}
            <button onClick={() => push()}>count</button>
          </li>
          <li>
            Build the tree <button>Build</button>
          </li>
          <ol>
            <li>Take the two lowest frequency nodes</li>
            <li>
              Connect them to a new node with the sum of their frequencies
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
