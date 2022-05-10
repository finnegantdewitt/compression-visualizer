import React, { useState } from 'react';

// testing file input
function GetFile({
  setFileText,
}: {
  setFileText: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | null>
  >;
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
