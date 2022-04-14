import React from "react";
import "./App.css";
import Never_Gonna_Lyrics from "./text/Never_Gonna";

interface Char {
  char: string,
  count: number,
}

type CharFreqTableProps = {
  charArray: Array<Char>,
}

const CharFreqTable = ({ charArray }: CharFreqTableProps) => {
  return(
    <table style={{fontSize: "16px"}}>
        {charArray.map((ch, index) => {
          let displayChar = ch.char;
          if(displayChar === "\n") {
            displayChar = "\\n";
          }
          else if(displayChar === " ") {
            displayChar = "[ ]"
          }
          return(
            <tr>
            <td>{index}</td>
            <td>{displayChar}</td>
            <td>{ch.count}</td>
            </tr>
          )
        })}
    </table>
  );
}

function App() {
  // count the freqs of chars with a hashmaps
  const charFreqs = new Map<string, number>();
  for(let i = 0; i < Never_Gonna_Lyrics.length; i++) {
    let letter = Never_Gonna_Lyrics[i];
    let letterFreq = charFreqs.get(letter);
    if (letterFreq === undefined) {
      letterFreq = 0;
    }
    letterFreq += 1;
    charFreqs.set(letter, letterFreq);
  }

  // sort them in an array
  const charArray = new Array<Char>();
  charFreqs.forEach((value, key) => {
    let ch: Char = { 
      char: key, 
      count: value 
    };
    charArray.push(ch);
  });
  charArray.sort((a, b) => {return b.count - a.count});


  return (
    <div className="App">
      <header className="App-header">
        <pre>{Never_Gonna_Lyrics}</pre>
        <CharFreqTable charArray={charArray} />
      </header>
    </div>
  );
}

export default App;
