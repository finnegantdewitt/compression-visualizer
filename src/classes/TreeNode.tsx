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
  isInvisible: boolean; // will be used to create an inviable root for separate trees
  parent?: TreeNode; // if undefined, root
  count: number; // Frequency of node

  constructor(value: Node, isInvisible: boolean, count: number) {
    this.value = value;
    this.descendants = [];
    this.isInvisible = isInvisible;
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
