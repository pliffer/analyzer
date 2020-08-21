const path = require('path');
const fs   = require('fs-extra');

module.exports = (entries, config) => {

	// Verifica se está ativo
	if(!config.enabled[__filename.split('/').pop().split('.').shift()]) return;

	const allowedExts = global.util._extensions.programming;

    let filesAnalyzed = 0;

    let normalizedLines = {};

	// Passa por todos os arquivos
	entries.forEach((entry, k) => {

		// Pega a extensão do arquivo
		const ext = path.extname(entry).substr(1);

		// Ignora todas as extensões que estão dentro de ignoreExts
		if(!allowedExts.includes(ext) || !ext) return;

        filesAnalyzed++;

        try{

            // Pega o texto do arquivo
            let txt = fs.readFileSync(entry, 'utf-8');

            let lines = txt.split("\n");

            lines.forEach(line => {

                line = line.trim().replace(/\t/g, '');

                if(line){

                    if(typeof normalizedLines[line] === 'undefined'){

                        normalizedLines[line] = 0;

                    }

                    normalizedLines[line]++;

                }

            });

        } catch(e){

            throw e;

        }

	});

    console.log(`${filesAnalyzed} arquivos analizados`);

    Object.keys(normalizedLines).sort(function(keyA, keyB){

        return normalizedLines[keyB] - normalizedLines[keyA];

    }).forEach((line, k) => {

        if(k > 30) return;

        console.log(k, line, normalizedLines[line]);

    });

}