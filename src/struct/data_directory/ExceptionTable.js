class ExceptionTable {
  constructor(buffer, pEntity) {
    if(pEntity.sizeOfExceptionTable==0)return;
    var offset=pEntity.exceptionTable;
    this.startOffset = offset;
    this.pData = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.length = offset - this.startOffset;
  }
}

export default ExceptionTable;
module.exports.ExceptionTable = ExceptionTable;