class ImportByName {
    constructor(buffer, offset) {
        this.startOffset = offset;
        this.hint = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.name = buffer.toString('ascii', offset, 1);
        offset = offset + 1;
        this.length = offset - this.startOffset;
    }
}

export default ImportByName;
module.exports.ImportByName = ImportByName;