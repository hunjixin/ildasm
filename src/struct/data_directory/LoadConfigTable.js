class LoadConfigTable {
  constructor(buffer, offset) {
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default LoadConfigTable;
module.exports.LoadConfigTable = LoadConfigTable;