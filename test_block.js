//for checking the exported block class

const block = require("./block");

const fooBlock=block.mineBlock(block.genesis(),'foo');  
console.log(fooBlock.toString());