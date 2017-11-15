class TLSTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfTLSTable==0)return;
    var   offset=pEntity.TLSTable;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default TLSTable;
module.exports.TLSTable = TLSTable;