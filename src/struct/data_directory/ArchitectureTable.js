class ArchitectureTable {
  constructor(buffer, offset) {
    this.startOffset = offset

    this.length = offset - this.startOffset
  }
}

export default ArchitectureTable
module.exports.ArchitectureTable = ArchitectureTable