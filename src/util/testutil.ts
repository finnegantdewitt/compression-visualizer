// from https://github.com/testing-library/dom-testing-library/issues/410#issuecomment-1060917305
//   (and further modified a bit)

import { MatcherFunction } from "@testing-library/react";

// helper for use in screen.getByText to match text possibly split across multiple elements
export function textContentMatcher(textMatch: string | RegExp): MatcherFunction {
  const hasText =
    typeof textMatch === 'string'
      ? (node: Element) => node.textContent === textMatch
      : (node: Element) => textMatch.test(node.textContent ?? '');
  return (content: string, node: Element | null) => {
    if (node === null || !hasText(node)) {
      return false;
    }
    return Array.from(node?.children ?? []).every((child) => !hasText(child));
  };
}
