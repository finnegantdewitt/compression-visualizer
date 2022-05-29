const LEFT = 0;
const RIGHT = 1;

interface LeafNode {
  char: string;
  bits: string;
}
interface BranchNode {
  char: null;
  bits: null;
}
type Node = LeafNode | BranchNode;

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

export type { Node };
export { TreeNode };
