import React, { useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

// TODO introduce a cache?
// TODO give this a better name
/** convert string to a unique representation that's safe to use un-escaped in both a css attribute selector and a html data- property */
export const to_domstr_representation = (s: string): string =>
  [...s].map((c) => c.charCodeAt(0)).join('');

export type HSBData = {
  strIdx: null | number;
  setStrIdx: React.Dispatch<React.SetStateAction<null | number>>;
  char: null | string;
  setChar: React.Dispatch<React.SetStateAction<null | string>>;
};
export function useHsbData(): HSBData {
  const [strIdx, setStrIdx] = useState<null | number>(null);
  const [char, setChar] = useState<null | string>(null);
  return { strIdx, setStrIdx, char, setChar };
}

export const hsbMouseOverListener =
  ({ setChar, setStrIdx }: HSBData) =>
  (e: MouseEvent | React.MouseEvent) => {
    if (!(e.target instanceof HTMLElement || e.target instanceof SVGElement))
      return;
    if ('char' in e.target.dataset || 'stridx' in e.target.dataset) {
      setChar(e.target.dataset.char ?? null);
      setStrIdx(
        e.target.dataset.stridx === undefined
          ? null
          : parseInt(e.target.dataset.stridx),
      );
    }
  };
export const hsbMouseOutListener =
  ({ setChar, setStrIdx }: HSBData) =>
  (e: MouseEvent | React.MouseEvent) => {
    if (!(e.target instanceof HTMLElement || e.target instanceof SVGElement))
      return;
    if ('char' in e.target.dataset || 'stridx' in e.target.dataset) {
      setChar(null);
      setStrIdx(null);
    }
  };

export const HSBStyle: React.FC<{ data: HSBData }> = ({ data }) => {
  let style = '';
  if (data.char !== null) {
    style += `[data-char="${data.char}"] { --hovered-bg: #E49273; }`;
  }
  if (data.strIdx !== null) {
    style += `[data-stridx="${data.strIdx}"] { --hovered-bg: #ff0000; }`;
  }
  return <style>{style}</style>;
};

export const HSBGlobalListener: React.FC<{ data: HSBData }> = ({ data }) => {
  const rootRef = useRef(document.documentElement);
  useEventListener('mouseover', hsbMouseOverListener(data), rootRef);
  useEventListener('mouseout', hsbMouseOutListener(data), rootRef);
  return <></>;
};
