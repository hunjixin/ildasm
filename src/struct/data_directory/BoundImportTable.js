class BoundImportTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfBoundImport==0)return;
    var offset=pEntity.boundImport;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default BoundImportTable;
module.exports.BoundImportTable = BoundImportTable;