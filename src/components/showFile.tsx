import React, { useState } from "react";



// testing file input
function GetFile() {
  const [state, setState] = useState<string | ArrayBuffer | null>(null);

  const changeHandler = (e:any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target!.result;
      setState(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const submitHandler = () => {
    if (state == null){
      alert("Please select a .txt file.");
    } else {
      console.log(state);
    }
  }

  return(
    <div className="FileSubmit">
      <input type="file"  accept=".txt" onChange={changeHandler} />
      <button onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
}



export default GetFile