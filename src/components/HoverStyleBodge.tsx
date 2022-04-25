import React, { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

// TODO introduce a cache?
// TODO give this a better name
/** convert string to a unique representation that's safe to use un-escaped in both a css attribute selector and a html data- property */
export const to_domstr_representation = (s: string): string =>
  [...s].map(c => c.charCodeAt(0)).join('');

const HoverStyleBodge = () => {
  const [stridx, setStridx] = useState<null | number>(null);
  const [char, setChar] = useState<null | string>(null);
  const rootRef = useRef(document.documentElement);
  // using mouseover rather than mouseenter since former bubbles
  useEventListener('mouseover', (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return;
    if ('char' in event.target.dataset || 'stridx' in event.target.dataset) {
      setChar(event.target.dataset.char ?? null);
      setStridx((event.target.dataset.stridx === undefined) ? null : parseInt(event.target.dataset.stridx));
    }
  }, rootRef);
  useEventListener('mouseout', (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) return;
    if ('char' in event.target.dataset || 'stridx' in event.target.dataset) {
      setChar(null);
      setStridx(null);
    }
  }, rootRef);
  let style = '';
  if (char !== null) style += `[data-char="${char}"] { --hovered-bg: cyan; }`;
  if (stridx !== null) style += `[data-stridx="${stridx}"] { --hovered-bg: lime; }`;
  return (
    <style>
      {style}
    </style>
  );
};
export default HoverStyleBodge;
