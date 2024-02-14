import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const printOrder = () => {
  console.log("Level Order");
  tree.levelOrder(print);

  console.log("Pre Order");
  tree.preOrder(print);

  console.log("Post Order");
  tree.postOrder(print);

  console.log("In Order");
  tree.inOrder(print);
};

function randomNumArr() {
  let random = () => Math.floor(Math.random() * 20);
  let arr = [];
  for (let i = 0; i <= 99; i++) {
    arr[i] = random();
  }
  return arr;
}

let tree = new Tree(randomNumArr());

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);

const print = (val) => console.log(val);

printOrder();

tree.insert(13);
tree.insert(658);
tree.insert(414);

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);

tree.rebalance();

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);

printOrder();
