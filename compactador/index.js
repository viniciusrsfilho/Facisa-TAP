const fs = require('fs');
const archiver = require('archiver')
const extract = require('extract-zip')

if(process.argv.length <= 4) {
    console.log('É necessário informar dois paths');
    process.exit(-1);
}

var todo = process.argv[2];
var arq1 = process.argv[3];
var arq2 = process.argv[4];

if(todo == 'compactar') {

    var saida = fs.createWriteStream(arq2);
    var compactador = archiver('zip');

    saida.on('close', () => {
        console.log(compactador.pointer() + ' bytes totais')
    })

    compactador.pipe(saida)

    compactador.directory(arq1, false);
    compactador.finalize()

} else if(todo == 'descompactar') {
    
    extract(arq1, {dir: arq2}, function (err) {
        // extraction is complete. make sure to handle the err
    })

}