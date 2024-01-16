const fs = require('fs');
const path = require('path');

export default{
    examplesFiles: () => {
        let listFiles = []

        fs.readdir(path.join(__dirname, 'app/(examples)/'), (err, arquivos) => {
            arquivos.forEach(arquivo => {
              listFiles.push(arquivo);
            });
        });

        return listFiles;
    }
}