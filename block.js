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
}

//sharing block class as module
module.exports = block;