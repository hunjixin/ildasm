class SecurityTable {
  constructor(reader,buffer, pEntity) {
    if(pEntity.sizeOfCertificateTable==0)return;
    var    offset=pEntity.certificateTable;
    this.startOffset = offset;

    this.length = offset - this.startOffset;
  }
}
export default SecurityTable;
module.exports.SecurityTable = SecurityTable;