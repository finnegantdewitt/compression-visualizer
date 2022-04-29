import React from 'react';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextPanel from './TextPanel';
import userEvent from '@testing-library/user-event';
import { textContentMatcher } from '../util/testutil';
import { text } from 'stream/consumers';

test('renders', () => {
  render(<TextPanel text="" />);
});

test('printable characters displayed directly', () => {
  render(<TextPanel text="helloworld" />);
  expect(
    screen.getByText(textContentMatcher('helloworld')),
  ).toBeInTheDocument();
});

test('non-printable/whitespace characters displayed with printable version', () => {
  render(<TextPanel text="hello \r\n\t\u0000world" />);
  // regex explanation: matches "hello" and "world" joined by one or more
  // non-control and non-whitespace characters
  expect(
    screen.getByText(textContentMatcher(/hello(?:[^\p{C}\p{Z}])+world/u)),
  ).toBeInTheDocument();
});
