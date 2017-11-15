class LoadConfigTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfLoadConfigTable==0)return;
    var offset=pEntity.loadConfigTable;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}

export default LoadConfigTable;
module.exports.LoadConfigTable = LoadConfigTable;