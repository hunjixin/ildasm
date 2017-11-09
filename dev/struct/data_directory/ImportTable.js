class ImportTable {
    constructor(buffer, offset) {
        this.startOffset = offset;
        this.originalFirstThunk = buffer.readUInt32LE(offset); // ImportByName
        offset = offset + 4;
        this.timeDateStamp = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.forwarderChain = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.name = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.firstThunk = buffer.readUInt32LE(offset); // ImportByName
        offset = offset + 4;
        this.length = offset - this.startOffset;
    }
}


export default ImportTable;
module.exports.ImportTable = ImportTable;