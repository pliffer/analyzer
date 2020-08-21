const path = require('path');
const fs   = require('fs-extra');

// Arquivos que não são do tipo texto
// const ignoreExts = ['jpg', 'jpeg', 'mp3', 'ogg', 'wav', 'key', 'crt', 'png', 'gif', 'sql', 'json', 'java', 'xml', 'properties', 'gradle', 'bin', 'c', 'cpp', 'h', 'lock', 'plist', 'jar', 'modulemap', 'sample', 'log', 'pem', 'idx', 'pack', 'm', 'pak', 'asar', 'so', 'dat', 'map', 'nexe', 'ico', 'svg', 'ini', 'db', 'out', 'zip', 'gz', 'tar', 'mp4', 'x-shellscript', '1', 'apk', 'keystore', 'rar', 'webm'];
const allowedExts = ['md', 'js', 'conf', 'css', 'pug', 'html', 'sh', 'jade', 'example', 'scss', 'EXAMPLE', 'bat', 'cs', 'txt', 'ts'];

module.exports = (entries, config) => {

    // Verifica se está ativo
    if(!config.enabled[__filename.split('/').pop().split('.').shift()]) return;

    let todoCount = 0;

	// Passa por todos os arquivos
	entries.forEach(entry => {

		// Pega a extensão do arquivo
		const ext = path.extname(entry).substr(1);

		// Ignora todas as extensões que estão dentro de ignoreExts
		if(!allowedExts.includes(ext) || !ext) return;

        try{            

            // Pega o texto do arquivo
            let txt = fs.readFileSync(entry, 'utf-8');

            // Testa se possui todo
            if(/\s@todo/g.test(txt.toLowerCase())){

                todoCount++;
                console.log(entry, 'Possui todo');

            }

        } catch(e){

            throw e;

        }

        // Pega o texto do arquivo
        // fs.readFileSync(entry, 'utf-8', (err, txt) => {

        //     if(err) throw err;

        //     // Testa se possui todo
        //     if(!/\s@todo/g.test(txt.toLowerCase())){
        //         todoCount++;
        //         console.log(entry, 'Possui todo');
        //     }

        // });

	});

    console.log(`Total de ${todoCount} arquivos com @todo`);

}