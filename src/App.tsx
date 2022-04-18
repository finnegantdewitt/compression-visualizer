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
  count: number; // Frequency of node

  constructor(value: Node, isBranch: boolean, count: number) {
    this.value = value;
    this.descendants = [];
    this.isBranch = isBranch;
    this.parent = undefined;
    this.count = count;
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

// Added to print out the nodeArray
type NodeArrayTableProps = {
  nodeArray: Array<TreeNode>;
};

const NodeArrayTable = ({ nodeArray }: NodeArrayTableProps) => {
  return (
    <table style={{ fontSize: "16px" }}>
      {nodeArray.map((treenode, index) => {
        let displayChar = treenode.value.char;
        if (displayChar === "\n") {
          displayChar = "\\n";
        }
        return (
          <tr>
            <td>{index}</td>
            <td>{displayChar}</td>
            <td>{treenode.count}</td>
          </tr>
        );
      })}
    </table>
  );
};

// const 

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

  // make an array of nodes
  const nodeArray = new Array<TreeNode>();
  const branchNode: Node = { char: "*", bits: "*" };
  let root = new TreeNode(branchNode, true, 0);
  charArray.forEach(ch => {
    // Create new treenode with count and char
    let tempNode: Node = { char: ch.char, bits: ""};
    let node = new TreeNode(tempNode, false, ch.count);
    // node.left = root;
    // node.right = root;
    // append it to the nodeArray 
    nodeArray.push(node);
  });

  // build a tree from the nodes
  while(nodeArray.length > 1){ // I think this does it but I don't have a good way to display it
    let tempCount = nodeArray[0].count + nodeArray[1].count;
    let temp = new TreeNode(branchNode, true, tempCount);
    temp.left = nodeArray[0];
    temp.right = nodeArray[1];
    nodeArray.splice(0,2); // Remove first 2 nodes from array
    let index = nodeArray.findIndex( (element) => {
      return element.count >= tempCount;
    })
    nodeArray.splice(index, 0, temp); // Add temp node to start of array
  }

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
          <div>
            <NodeArrayTable nodeArray={nodeArray} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
