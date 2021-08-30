//for checking the exported block class

const block = require("./block");


const obj_block = new block('some','old','new','checking');
console.log(obj_block.toString());
console.log(block.genesis().toString());   