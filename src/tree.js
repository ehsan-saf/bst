class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(array) {
    this.sortedArray = Tree.sortUnique(array);
    this.root = Tree.buildTree(this.sortedArray, 0, this.sortedArray.length);
  }

  static sortUnique(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  static buildTree(arr, start, end) {
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

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (!node) {
      return node;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
      return node;
    }

    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    } else {
      let succParent = node;
      let succ = node.right;
      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;

      return node;
    }
  }

  find(value) {
    let node = this.root;
    let targetNode = null;
    while (node) {
      if (value < node.data) {
        node = node.left;
      } else if (value > node.data) {
        node = node.right;
      } else if (value === node.data) {
        targetNode = node;
        node = null;
      }
    }
    return targetNode;
  }

  levelOrder(callback) {
    let node = this.root;
    let result = [];
    let q = [];
    if (!node) {
      return result;
    }

    q.push(node);
    while (q.length !== 0) {
      let current = q[0];
      if (current.left !== null) q.push(current.left);
      if (current.right !== null) q.push(current.right);
      if (callback) {
        callback(q.shift().data);
      } else {
        result.push(q.shift().data);
      }
    }
    if (!callback) {
      return result;
    }
  }

  // ------- Recursive Level Order ------------
  // levelOrder(callback, node = this.root, q = [], result = []) {
  //   if (node) {
  //     q.push(node);
  //   }
  //   if (q.length === 0) {
  //     if (!callback) {
  //       return result;
  //     }
  //     return;
  //   }
  //   let current = q[0];
  //   if (current.left !== null) q.push(current.left);
  //   if (current.right !== null) q.push(current.right);
  //   let done = q.shift().data;
  //   if (callback) {
  //     callback(done);
  //   } else {
  //     result.push(done);
  //   }
  //   return this.levelOrder(callback, null, q, result);
  // }

  preOrder(callback, node = this.root, result = []) {
    if (!node) return;
    if (!callback) {
      result.push(node.data);
    } else {
      callback(node.data);
    }
    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);
    if (!callback) {
      return result;
    }
  }

  inOrder(callback, node = this.root, result = []) {
    if (!node) return;
    this.inOrder(callback, node.left, result);
    if (!callback) {
      result.push(node.data);
    } else {
      callback(node.data);
    }
    this.inOrder(callback, node.right, result);
    if (!callback) {
      return result;
    }
  }

  postOrder(callback, node = this.root, result = []) {
    if (!node) return;
    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);
    if (!callback) {
      result.push(node.data);
    } else {
      callback(node.data);
    }
    if (!callback) {
      return result;
    }
  }

  height(node) {
    if (!node) {
      return 0;
    } else {
      return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }
  }

  depth(node, root = this.root) {
    // Base case
    if (root == null) return -1;

    // Initialize distance as -1
    let dist = -1;

    // Check if x is current node=
    if (
      root.data == node.data ||
      // Otherwise, check if x is
      // present in the left subtree
      (dist = this.depth(node, root.left)) >= 0 ||
      // Otherwise, check if x is
      // present in the right subtree
      (dist = this.depth(node, root.right)) >= 0
    )
      // Return depth of the node
      return dist + 1;

    return dist;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    let left = this.height(node.left);
    let right = this.height(node.right);
    let diff = Math.abs(left - right);
    if (
      diff <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    ) {
      return true;
    }

    return false;
    // const heightDiff = (node) => {
    //   if (!node) return 0;
    //   let right = heightDiff(node.right);
    //   let left = heightDiff(node.left);
    //   let result = Math.abs(left - right) + 1;
    //   if (node === this.root) {
    //     result -= 1;
    //     console.log(node);
    //   }
    //   return result;
    // };
    // return heightDiff(this.root) <= 1;
  }

  rebalance() {
    let arr = Tree.sortUnique(this.inOrder());
    this.root = Tree.buildTree(arr, 0, arr.length);
  }
}
