import React, { Fragment } from 'react';
import { to_domstr_representation } from './HoverStyleBodge';

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
  return (
    <Fragment>
      <div data-char={to_domstr_representation(char)} data-stridx={idx}>
        {display_chars[char] ?? char}
      </div>
      {
        char === '\n' ? (
          <br></br>
        ) : (
          <Fragment></Fragment>
        ) /* TODO prob a cleaner way to write this */
      }
    </Fragment>
  );
};
const TextPanel = ({ text }: { text: string }) => {
  return (
    <div className="TextPanel">
      {[...text].map((char, idx) => (
        <TextPanelEntry char={char} idx={idx} key={idx}></TextPanelEntry>
      ))}
    </div>
  );
};
export default TextPanel;
