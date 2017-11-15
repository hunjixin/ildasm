class ComDescriptionTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfCLRRuntimeHeader==0)return;
    var offset=pEntity.CLRuntimeHeader;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default ComDescriptionTable;
module.exports.ComDescriptionTable = ComDescriptionTable;