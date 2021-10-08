const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');

class block{
  constructor(timestamp, lastHash, cur_hash, data, nonce,difficulty){
      this.timestamp=timestamp;
      this.lastHash=lastHash;
      this.cur_hash=cur_hash;
      this.data=data;
      this.nonce = nonce;
      this.difficulty = difficulty || DIFFICULTY;
  }
//toString is mainly used for debugging
  toString(){
      return `Block-
      Timestamp    : ${this.timestamp}
      Last hash    : ${this.lastHash.substring(0,10)}
      current hash : ${this.cur_hash.substring(0,10)}
      Nonce        : ${this.nonce}
      Difficulty   : ${this.difficulty}
      data         : ${this.data}`;
  }
//default nonce value is zero.(Last parameter in Genesis Block)
  static genesis(){
    return new this('Dummy time','Nolast','firsthash',[],0,DIFFICULTY);
  }

  static mineBlock(lastBlock,data){
    let cur_hash, timestamp;
    const lastHash = lastBlock.cur_hash;
    let {difficulty} = lastBlock;
    let nonce = 0;
    do{ 
      nonce++;
      timestamp = Date.now()
      difficulty = block.adjustDifficulty(lastBlock,timestamp);
      cur_hash = block.hash(timestamp,lastHash,data,nonce,difficulty);
    }while (cur_hash.substring(0,difficulty) !== '0'.repeat(difficulty));
    

    return new this(timestamp,lastHash,cur_hash,data,nonce,difficulty);
  }

  static hash(timestamp,lastHash,data,nonce,difficulty){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static blockHash(block) {
    //const { timestamp, lastHash, data, nonce,difficulty} = block;
    const timestamp=block.timestamp;
    const lastHash= block.lastHash;
    const data = block.data;
    const nonce = block.nonce;
    const difficulty = block.difficulty;
    return this.hash(timestamp, lastHash, data, nonce,difficulty);
  }

  static adjustDifficulty(lastBlock,cur_time){
    let {difficulty} = lastBlock; 
    difficulty = lastBlock.timestamp + MINE_RATE > cur_time ?difficulty+1 : difficulty-1;
    return difficulty;

  }
}

//sharing block class as module
module.exports = block;