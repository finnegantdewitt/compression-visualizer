import React, { useState } from 'react';
import { assert } from '../util';

// testing file input
function GetFile({
  setDisplayText,
  resetPage,
}: {
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  resetPage: Function;
}) {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetPage();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target!.result;
      if (text === null) {
        alert('Please select a file with text');
      } else {
        // should be unreachable since we would only get an arraybuffer if that
        // was what we asked the browser for, which we don't, but typescript
        // doesn't know that in this situtation so we still need either a cast or
        // a condition to narrow the type
        assert(
          !(text instanceof ArrayBuffer),
          'unreachable case - file input gave us an arraybuffer unexpectedly',
        );
      }
      if (text !== null) {
        setDisplayText(text);
      }
    };
    reader.readAsText(e.target.files![0]);
  };

  return <input type="file" accept=".txt" onChange={(e) => changeHandler(e)} />;
}

export default GetFile;
