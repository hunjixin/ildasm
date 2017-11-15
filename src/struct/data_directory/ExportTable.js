class ExportTable {
    constructor(reader,buffer, pEntity) {
        if(pEntity.sizeOfExportTable==0)return;
        var offset=reader.peHeader.optionHeader.RVAToOffset(pEntity.exportTable,reader.sectionHeaders).foa ;
        this.startOffset = offset;
        this.characteristics = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.timeDataStamp = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.majorVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;
        this.minorVersion = buffer.readUInt16LE(offset);
        offset = offset + 2;

        this.name = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.base = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.numberOfFunctions = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.numberOfNames = buffer.readUInt32LE(offset);
        offset = offset + 4;

        this.addressOfFunctions = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.addressOfNames = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.addressOfNameOrDinals = buffer.readUInt32LE(offset);
        offset = offset + 4;
        this.length = offset - this.startOffset;
    }
}


export default ExportTable;
module.exports.ExportTable = ExportTable;