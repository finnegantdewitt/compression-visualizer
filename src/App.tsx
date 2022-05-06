import React from 'react';
import './App.css';
import Never_Gonna_Lyrics from './text/Never_Gonna';
import {displayTree, createTree} from './components/Tree'



function App() {
  
  let tree = createTree(Never_Gonna_Lyrics);
  displayTree(tree);

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            justifyItems: 'center'
          }}
        >
          <div>
            <pre>{Never_Gonna_Lyrics}</pre>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
