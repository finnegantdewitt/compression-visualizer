import React, { useState } from 'react';
import { assert } from '../util';

// testing file input
function GetFile({
  setFileText,
}: {
  setFileText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [localFileText, setLocalFileText] = useState<
    string | ArrayBuffer | null
  >(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target!.result;
      setLocalFileText(text);
    };
    reader.readAsText(e.target.files![0]);
  };

  const submitHandler = () => {
    if (localFileText == null) {
      alert('Please select a .txt file.');
    } else {
      // should be unreachable since we would only get an arraybuffer if that
      // was what we asked the browser for, which we don't, but typescript
      // doesn't know that in this situtation so we still need either a cast or
      // a condition to narrow the type
      assert(!(localFileText instanceof ArrayBuffer), 'unreachable case - file input gave us an arraybuffer unexpectedly');
      console.log(localFileText);
      setFileText(localFileText);
    }
  };

  return (
    <div className="FileSubmit">
      <input type="file" accept=".txt" onChange={(e) => changeHandler(e)} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default GetFile;
