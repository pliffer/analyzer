const path = require('path');
const fs   = require('fs-extra');

let Util = {

	populateRecursively(entriesPath, entries){

		return new Promise((resolve, reject) => {

			fs.readdirSync(entriesPath).forEach(entry => {

				let entryPath = path.join(entriesPath, entry);

				if(global.opts.ignorePaths.includes(entryPath)){

					return;

				}

				if(/node_modules/.test(entryPath)) return;

				let stat = fs.lstatSync(entryPath)

				if(!stat.isFile()){

					Util.populateRecursively(entryPath, entries);

				} else{
					entries.push(entryPath);
				}

			});

			resolve(entries);

		});

	},

	getAllEntries(entriesPath){

		let entries = [];

		return Util.populateRecursively(entriesPath, entries).then(() => {

			return entries;

		});

	},

	toPipeline(entries){

		fs.readdirSync(global.dir.pipeline).forEach(pipeFile => {

			require(path.join(global.dir.pipeline, pipeFile))(entries);

		});

	}

}

module.exports = Util;