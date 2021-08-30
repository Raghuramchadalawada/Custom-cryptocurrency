const SHA256 = require('crypto-js/sha256');

class block{
  constructor(timestamp, lastHash, cur_hash, data){
      this.timestamp=timestamp;
      this.lastHash=lastHash;
      this.cur_hash=cur_hash;
      this.data=data;
  }
//toString is mainly used for debugging
  toString(){
      return `Block-
      Timestamp    : ${this.timestamp}
      Last hash    : ${this.lastHash.substring(0,10)}
      current hash : ${this.cur_hash.substring(0,10)}
      data         : ${this.data}`;
  }

  static genesis(){
    return new this('Dummy time','Nolast','firsthash',[]);
  }

  static mineBlock(lastBlock,data){
    const timestamp = Date.now();
    const lastHash = lastBlock.cur_hash;
    const cur_hash = block.hash(timestamp,lastHash,data);

    return new this(timestamp,lastHash,cur_hash,data);
  }

  static hash(timestamp,lastHash,data){
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }
}

//sharing block class as module
module.exports = block;