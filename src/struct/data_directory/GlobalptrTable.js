class GlobalptrTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default GlobalptrTable;
module.exports.GlobalptrTable = GlobalptrTable;