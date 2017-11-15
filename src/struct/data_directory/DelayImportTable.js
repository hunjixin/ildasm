class DelayImportTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfDelayImportDescriptor==0)return;
    var offset=pEntity.delayImportDescriptor;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default DelayImportTable;
module.exports.DelayImportTable = DelayImportTable;