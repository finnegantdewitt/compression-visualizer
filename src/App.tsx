import React from 'react';
import './App.css';
import LyricSplit from './components/LyricSplit';
import Never_Gonna_Lyrics from './text/Never_Gonna';

function App() {
  return (
    <div className="App">
      <LyricSplit lyrics={Never_Gonna_Lyrics} />
      <header className="App-header">
        <pre>{Never_Gonna_Lyrics}</pre>
      </header>
    </div>
  );
}

export default App;
