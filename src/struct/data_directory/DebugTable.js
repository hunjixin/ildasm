class DebugTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfDebug==0)return;
    var offset=pEntity.debug;
    this.startOffset = offset;
    this.characteristics = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.timeDataStamp = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.majorVersion = buffer.readUInt16LE(offset);
    offset = offset + 2;
    this.minorVersion = buffer.readUInt16LE(offset);
    offset = offset + 2;

    this.type = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.sizeOfData = buffer.readUInt32LE(offset);
    offset = offset + 4;

    this.addressOfRawData = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.pointerToRawData = buffer.readUInt32LE(offset);
    offset = offset + 4;
    this.length = offset - this.startOffset;
  }
}


export default DebugTable;
module.exports.DebugTable = DebugTable;