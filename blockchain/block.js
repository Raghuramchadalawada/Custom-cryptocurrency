const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY} = require('../config');

class block{
  constructor(timestamp, lastHash, cur_hash, data, nonce){
      this.timestamp=timestamp;
      this.lastHash=lastHash;
      this.cur_hash=cur_hash;
      this.data=data;
      this.nonce = nonce;
  }
//toString is mainly used for debugging
  toString(){
      return `Block-
      Timestamp    : ${this.timestamp}
      Last hash    : ${this.lastHash.substring(0,10)}
      current hash : ${this.cur_hash.substring(0,10)}
      Nonce        : ${this.nonce}
      data         : ${this.data}`;
  }
//default nonce value is zero.(Last parameter in Genesis Block)
  static genesis(){
    return new this('Dummy time','Nolast','firsthash',[],0);
  }

  static mineBlock(lastBlock,data){
    let cur_hash, timestamp;
    const lastHash = lastBlock.cur_hash;
    let nonce = 0;
    do{ 
      nonce++;
      timestamp = Date.now()
      cur_hash = block.hash(timestamp,lastHash,data,nonce);
    }while (cur_hash.substring(0,DIFFICULTY) !== '0'.repeat(DIFFICULTY));
    

    return new this(timestamp,lastHash,cur_hash,data,nonce);
  }

  static hash(timestamp,lastHash,data,nonce){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce} = block;
    return this.hash(timestamp, lastHash, data, nonce);
  }
}

//sharing block class as module
module.exports = block;