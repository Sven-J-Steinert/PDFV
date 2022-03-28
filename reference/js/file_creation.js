 var pdf_buffer;
 var audio_buffer;
 var sequence_buffer;
 
 document.getElementById('inputfile_pdf').addEventListener('change', function() {
            var fr=new FileReader();
            fr.onload=function(){
                pdf_buffer = fr.result;
            }
            fr.readAsArrayBuffer(this.files[0]);
        })
       
document.getElementById('inputfile_audio').addEventListener('change', function() {
            var fr=new FileReader();
            fr.onload=function(){
                audio_buffer = fr.result;
            }
            fr.readAsArrayBuffer(this.files[0]);
        })
        
document.getElementById('inputfile_sequence').addEventListener('change', function() {
            var fr=new FileReader();
            fr.onload=function(){
                sequence_buffer = fr.result;
            }
            fr.readAsArrayBuffer(this.files[0]);
        })

function create_PDFV() {
 let header = 'PDFV-0.1#'; 
 let header_buffer = new TextEncoder("utf-8").encode(header); //.concat([version]);
 let sequence_length = sequence_buffer.byteLength;
 let sequence_length_buffer = new Int32Array([sequence_length]).buffer;
 let pdf_length = pdf_buffer.byteLength;
 let pdf_length_buffer = new Int32Array([pdf_length]).buffer;
 let audio_length = audio_buffer.byteLength;
 let audio_length_buffer = new Int32Array([audio_length]).buffer;

 let file_length = 9 + 4 + sequence_length + 4 + pdf_length + 4 + audio_length;
 var file = new Uint8Array(file_length);
 file.set(new Uint8Array(header_buffer), 0);
 file.set(new Uint8Array(sequence_length_buffer), 9);
 file.set(new Uint8Array(sequence_buffer), 13);
 file.set(new Uint8Array(pdf_length_buffer), 13+sequence_length);
 file.set(new Uint8Array(pdf_buffer), 13+sequence_length+4);
 file.set(new Uint8Array(audio_length_buffer), 13+sequence_length+4+pdf_length);
 file.set(new Uint8Array(audio_buffer), 13+sequence_length+4+pdf_length+4);
 
 download(file,"new.pdfv","application/octet-stream");
 }

function append(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

function read_sequence(buffer){
 let int32_array = [];
 let view = new Uint32Array(sequence_bytes);
 for (var i in view){
  int32_array.push(view[i]);
 }
 console.log(int32_array);
 return int32_array;
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
