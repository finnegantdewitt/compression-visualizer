import React from "react";
import "./App.css";
import Never_Gonna_Lyrics from "./text/Never_Gonna";

const LEFT = 0;
const RIGHT = 1;

interface Node {
  char: string;
  bits: string;
}

class TreeNode {
  value: Node;
  descendants: Array<TreeNode>;
  isBranch: boolean;
  parent?: TreeNode; // if undefined, root

  constructor(value: Node, isBranch: boolean) {
    this.value = value;
    this.descendants = [];
    this.isBranch = isBranch;
    this.parent = undefined;
  }

  get left() {
    return this.descendants[LEFT];
  }

  set left(node: TreeNode) {
    this.descendants[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendants[RIGHT];
  }

  set right(node: TreeNode) {
    this.descendants[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }
}

interface Char {
  char: string;
  count: number;
}

type CharFreqTableProps = {
  charArray: Array<Char>;
};

const CharFreqTable = ({ charArray }: CharFreqTableProps) => {
  return (
    <table style={{ fontSize: "16px" }}>
      {charArray.map((ch, index) => {
        let displayChar = ch.char;
        if (displayChar === "\n") {
          displayChar = "\\n";
        }
        return (
          <tr>
            <td>{index}</td>
            <td>{displayChar}</td>
            <td>{ch.count}</td>
          </tr>
        );
      })}
    </table>
  );
};

function App() {
  // count the freqs of chars with a hashmaps
  const charFreqs = new Map<string, number>();
  for (let i = 0; i < Never_Gonna_Lyrics.length; i++) {
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
      count: value,
    };
    charArray.push(ch);
  });
  charArray.sort((a, b) => {
    return a.count - b.count; // ascending order
  });

  // make the tree
  // const branchNode: Node = { char: "*", bits: "*" };
  // let root = new TreeNode(branchNode, true);
  // charArray.forEach(ch => {});

  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          <div>
            <pre>{Never_Gonna_Lyrics}</pre>
          </div>
          <div>
            <CharFreqTable charArray={charArray} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
