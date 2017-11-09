class BaserelocTable {
  constructor(buffer, offset) {
    this.startOffset = offset

    this.length = offset - this.startOffset
  }
}

export default BaserelocTable
module.exports.BaserelocTable = BaserelocTable