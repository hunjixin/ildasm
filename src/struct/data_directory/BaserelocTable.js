class BaserelocTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfBaseRelocationTable==0)return;
    var offset=pEntity.baseRelocationTable;
    this.startOffset = offset

    this.length = offset - this.startOffset
  }
}

export default BaserelocTable
module.exports.BaserelocTable = BaserelocTable