const path = require('path');
const fs   = require('fs-extra');

module.exports = (entries, config) => {

	// Verifica se está ativo
	if(!config.enabled[__filename.split('/').pop().split('.').shift()]) return;

	const allowedExts = global.util._extensions.programming;

	// Passa por todos os arquivos
	entries.forEach(entry => {

		// Pega a extensão do arquivo
		const ext = path.extname(entry).substr(1);

		// Ignora todas as extensões que estão dentro de ignoreExts
		if(!allowedExts.includes(ext) || !ext) return;

		// Pega o texto do arquivo
		fs.readFile(entry, 'utf-8', (err, txt) => {

			if(err) throw err;

			// Testa se possui todo
			if(!/\sfunction/g.test(txt.toLowerCase())) return;

			console.log(entry, 'Possui function');

		})

	});

}