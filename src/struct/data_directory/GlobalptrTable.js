class GlobalptrTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfGlobalPtr==0)return;
    var offset=pEntity.globalPtr;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default GlobalptrTable;
module.exports.GlobalptrTable = GlobalptrTable;