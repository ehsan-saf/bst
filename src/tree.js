class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.sortedArray, 0, this.sortedArray.length);
  }

  buildTree(arr, start, end) {
    const mid = parseInt((start + end) / 2);
    if (start > end || arr[mid] === undefined) {
      return null;
    }
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(value) {
    this.root = this.insertRec(this.root, value);
    // let node = this.root;
    // let new_node = new Node(value);
    // while (!node) {
    //   if (value < node.data) {
    //     node = node.left;
    //   } else if (value > node.data) {
    //     node = node.right;
    //   } else {
    //     break;
    //   }
    // }
  }

  insertRec(node, value) {
    if (!node) {
      node = new Node(value);
      return node;
    }
    if (value < node.data) {
      node.left = this.insertRec(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertRec(node.right, value);
    }

    return node;
  }
}
