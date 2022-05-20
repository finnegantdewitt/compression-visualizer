import React, { Fragment, useState } from 'react';
import GetFile from './showFile';
import TextInput from './TextInput'
import Simple from '../text/Simple_Test_Text';


//const [fileText, setFileText] = useState<string | ArrayBuffer | null>(null);

function InputChoice ({fileText, setFileText }: {fileText: string | ArrayBuffer | null, setFileText: React.Dispatch<
    React.SetStateAction<string>
  >;}) {
      
    const [showTextInput, setShowTextInput] = useState(false);
    const [showGetFile, setShowGetFile] = useState(false);

    const showComponent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        switch (e.target.value) {
          case "upload":
            setShowTextInput(false);
            setShowGetFile(true);
            break;
          case "input":
            setShowGetFile(false);
            setShowTextInput(true);
            break;
        case "example":
            setShowGetFile(false);
            setShowTextInput(false);
            setFileText(Simple);
            break;
          default:
            null;
        }
      }
  
    return (
        <div className='InputChoice'>
            <select onChange={(e) => showComponent(e)}>
                <option value="input">Input Text</option>
                <option value="example">Example Text</option>
                <option value="upload">Upload File</option>
            </select>
            <Fragment>
                {showTextInput && <TextInput setFileText={setFileText}></TextInput>}
                {showGetFile && <GetFile setFileText={setFileText} />}
                <div className="FileSubmit">{fileText?.toString()}</div> -- for debugging
            </Fragment>
        </div>
    );
};

export default InputChoice;
