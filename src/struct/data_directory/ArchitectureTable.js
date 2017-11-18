class ArchitectureTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfArchitectureData==0)return;
    var offset=reader.peHeader.optionHeader.RVAToOffset(pEntity.architectureData,reader.sectionHeaders);
    this.startOffset = offset

    this.length = offset - this.startOffset
  }
}

export default ArchitectureTable
module.exports.ArchitectureTable = ArchitectureTable