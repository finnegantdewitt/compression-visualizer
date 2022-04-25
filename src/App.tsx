import React, { useState } from "react";
import "./App.css";
import Never_Gonna_Lyrics from "./text/Never_Gonna";
import GetFile from "./components/showFile";

function App() {
  const [fileText, setFileText] = useState<string | ArrayBuffer | null>(null);

  return (
    <div className="App">
      <GetFile setFileText={setFileText} />
      <div>{fileText}</div>
    </div>
  );
}

export default App;
