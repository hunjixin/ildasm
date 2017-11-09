/**
 * coffHeader
 */
class COFFHeader {
    constructor(buffer, offset) {
        this.startOffset = offset;
        this.machine = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.numberOfSections = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.timeDateStamp = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.poUInterToSymbolTable = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.numberOfSymbols = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.sizeOfOptionHeader = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.characteristics = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.length = offset - this.startOffset;
    }
    isX64() {
        return this.machine == 'x64';
    }
}


export default COFFHeader;
module.exports.COFFHeader = COFFHeader;