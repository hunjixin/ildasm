

Buffer.prototype.ReadName1=function(buffer,offset){
    var result="";
    while(true){
        var charCode= buffer.readInt8(offset);
        if(charCode==0) return result;
        result+=String.fromCharCode(charCode);
    }
}