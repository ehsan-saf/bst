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

tree.insert(25);
tree.insert(86);
tree.insert(4);

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);

tree.rebalance();

console.log(`Tree ${tree.isBalanced() ? "IS" : "is NOT"} balanced: `);
prettyPrint(tree.root);
