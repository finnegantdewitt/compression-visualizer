import React, { useState } from "react";
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import GetFile from "./components/showFile";

function App() {
  const [fileText, setFileText] = useState<string | ArrayBuffer | null>(null);
  return (
    <div className="App">
      <LyricSplit lyrics={Never_Gonna_Lyrics} />
      <header className="App-header">
        <GetFile setFileText={setFileText} />
        <div>{fileText}</div>
      </header>
    </div>
  );
}

export default App;
