import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import './TextPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';
import { useTrail, a } from '@react-spring/web';

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
  isFreqTableDisplayed,
}) => {
  // count the freqs of chars with a hashmaps
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

  return (
    <>
      <div>
        <ol>
          <li>Read the text</li>
          <li>Count the frequency of each letter</li>
          <li>Build the tree</li>
        </ol>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>char</th>
              <th>freq</th>
            </tr>
          </thead>
          <tbody>
            {charArray.map((char, idx) => {
              return (
                <tr key={idx}>
                  <td>{display_chars[char.char] ?? char.char}</td>
                  <td>{char.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
