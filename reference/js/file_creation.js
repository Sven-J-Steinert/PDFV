 var pdf_bytes;
 
 document.getElementById('inputfile').addEventListener('change', function() {
            var fr=new FileReader();
            fr.onload=function(){
                pdf_bytes = fr.result;
                //console.log(pdf_bytes);
            }
            fr.readAsArrayBuffer(this.files[0]);
        })

function create_PDFV() {
 var identifyer = 'PDFV'; 
 var version = 1;
 var header = utf8_to_byte(identifyer).concat([version]);
 console.log(header);
 console.log(pdf_bytes.byteLength);
 download(pdf_bytes,"new.pdf","application/octet-stream");
 }


function utf8_to_byte(str) {
var bytes = []; // char codes

for (var i = 0; i < str.length; ++i) {
  var code = str.charCodeAt(i);
  bytes = bytes.concat([code]);
}
return bytes;
}


// Function to download data to a file
function download(data, filename, type) {

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
