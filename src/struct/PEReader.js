import events from 'events';
import fs from 'fs';

import  {DosHeader} from './DosHeader.js';
import  {PEHeader} from './PEHeader.js';
import  {SectionHeader} from './SectionHeader.js';

import {
  ExportTable,ImportTable,ResourceTable,ExceptionTable,SecurityTable,
  BaserelocTable,DebugTable, ArchitectureTable,GlobalptrTable,TLSTable,
  LoadConfigTable,BoundImportTable,IatTable,DelayImportTable,ComDescriptionTable,
} from './data_directory/index.js';


class PEReader {
  parserFile(filePath) {
    var buffer = fs.readFileSync(filePath);
    // header imformation
    this.dosHeader = new DosHeader(buffer);
    this.dosStub = buffer.toString('ascii', this.dosHeader.length, this.dosHeader.e_lfanew); // 64

    this.peHeader = new PEHeader(buffer, this.dosHeader);
    this.sectionHeaders = []
    var offset = this.peHeader.startOffset + this.peHeader.length;
    for (var i = 0; i < this.peHeader.coffHeader.numberOfSections; i++) {
      var section = new SectionHeader(buffer, offset);
      this.sectionHeaders.push(section);
      offset = offset + section.length;
    }
    // export
    if (this.peHeader.optionHeader.dataDirectory.exportTable != 0)
      this.exportTable = new ExportTable(this,buffer, this.peHeader.optionHeader.dataDirectory[0]);
    // import
    if (this.peHeader.optionHeader.dataDirectory.importTable != 0)
      this.importTable = new ImportTable(this,buffer, this.peHeader.optionHeader.dataDirectory[1]);
    // resource
    if (this.peHeader.optionHeader.dataDirectory.resourceTable != 0)
      this.resourceTable = new ResourceTable(this,buffer, this.peHeader.optionHeader.dataDirectory[2]);
    // exception
    if (this.peHeader.optionHeader.dataDirectory.exceptionTable != 0)
      this.exceptionTable = new ExceptionTable(this,buffer, this.peHeader.optionHeader.dataDirectory[3]);
    // security
    if (this.peHeader.optionHeader.dataDirectory.certificateTable != 0)
      this.certificateTable = new SecurityTable(this,buffer, this.peHeader.optionHeader.dataDirectory[4]);
    // baserloc
    if (this.peHeader.optionHeader.dataDirectory.baserloc != 0)
      this.BaserelocTable = new BaserelocTable(this,buffer, this.peHeader.optionHeader.dataDirectory[5]);
    // debug
    if (this.peHeader.optionHeader.dataDirectory.debugTable != 0)
      this.debugTable = new DebugTable(this,buffer, this.peHeader.optionHeader.dataDirectory[6]);
    // architecture
    if (this.peHeader.optionHeader.dataDirectory.architectureData != 0)
      this.architectureDataTable = new ArchitectureTable(this,buffer, this.peHeader.optionHeader.dataDirectory[7]);
    // globalptr
    if (this.peHeader.optionHeader.dataDirectory.globalPtr != 0)
      this.globalPtr = new GlobalptrTable(this,buffer, this.peHeader.optionHeader.dataDirectory[8]);
    // tls
    if (this.peHeader.optionHeader.dataDirectory.TLSTable != 0)
      this.TLSTable = new TLSTable(this,buffer, this.peHeader.optionHeader.dataDirectory[9]);
    // load_config
    if (this.peHeader.optionHeader.dataDirectory.loadConfigTable != 0)
      this.loadConfigTable = new LoadConfigTable(this,buffer, this.peHeader.optionHeader.dataDirectory[10]);
    // bound_import
    if (this.peHeader.optionHeader.dataDirectory.boundImport != 0)
      this.boundImportTable = new BoundImportTable(this,buffer, this.peHeader.optionHeader.dataDirectory[11]);
    // iat
    if (this.peHeader.optionHeader.dataDirectory.importAddressTable != 0)
      this.importAddressTable = new IatTable(this,buffer, this.peHeader.optionHeader.dataDirectory[12]);
    // delatimport
    if (this.peHeader.optionHeader.dataDirectory.delayImportDescriptor != 0)
      this.delayImportTable = new DelayImportTable(this,buffer, this.peHeader.optionHeader.dataDirectory[13]);
    // comdescriptor
    if (this.peHeader.optionHeader.dataDirectory.CLRRuntimeHeader != 0)
      this.CLRRuntimeHeader = new ComDescriptionTable(this,buffer, this.peHeader.optionHeader.dataDirectory[14]);
  }
}

export default PEReader;
module.exports.PEReader = PEReader;