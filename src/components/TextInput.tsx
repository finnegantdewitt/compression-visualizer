import React, { Fragment, useState } from 'react';
import { assert } from '../util';


function TextInput({
    setFileText,
  }: {
    setFileText: React.Dispatch<
      React.SetStateAction<string>
    >;
  }) {
    const [localFileText, setLocalFileText] = useState<
      string | ArrayBuffer | null
    >(null);

    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const v = e.target!.value
        setLocalFileText(v);
    };
    
    const submitHandler = () => {
        if (localFileText == null) {
            alert('Please type something.');
          } else {
            assert(!(localFileText instanceof ArrayBuffer), 'unreachable case - file input gave us an arraybuffer unexpectedly');
            console.log(localFileText);
            setFileText(localFileText);
          }
    };
    
    return (
        <div className='TextInput'>
            <form onSubmit={submitHandler}>
//           <label>
                <textarea className="bp4-input .modifier" onChange={(e) => changeHandler(e)}/>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
        </div>
    );
};

export default TextInput;
