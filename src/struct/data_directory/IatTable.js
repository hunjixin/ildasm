class IatTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfImportAddressTable==0)return;
    var offset=pEntity.importAddressTable;

    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default IatTable;
module.exports.IatTable = IatTable;