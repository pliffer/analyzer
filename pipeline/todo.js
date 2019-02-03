const path = require('path');
const fs   = require('fs-extra');

// Arquivos que não são do tipo texto
// const ignoreExts = ['jpg', 'jpeg', 'mp3', 'ogg', 'wav', 'key', 'crt', 'png', 'gif', 'sql', 'json', 'java', 'xml', 'properties', 'gradle', 'bin', 'c', 'cpp', 'h', 'lock', 'plist', 'jar', 'modulemap', 'sample', 'log', 'pem', 'idx', 'pack', 'm', 'pak', 'asar', 'so', 'dat', 'map', 'nexe', 'ico', 'svg', 'ini', 'db', 'out', 'zip', 'gz', 'tar', 'mp4', 'x-shellscript', '1', 'apk', 'keystore', 'rar', 'webm'];
const allowedExts = ['md', 'js', 'conf', 'css', 'pug', 'html', 'sh', 'jade', 'example', 'scss', 'EXAMPLE', 'bat', 'cs', 'txt', 'ts'];

module.exports = (entries) => {

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
			if(!/\s@todo/g.test(txt.toLowerCase())) return;

		})

	});

}