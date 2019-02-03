#!/usr/bin/env node

const path = require('path');

global.dir = {};

global.dir.root      = __dirname;
global.dir.pipeline  = path.join(global.dir.root, 'pipeline');

global.dir.app  = process.cwd();

global.opts = {

	ignorePaths: [
		global.dir.app + '/node_modules',
		global.dir.app + '/.git'
	]

}

global.util = require(path.join(global.dir.root, 'util.js'));

global.util.getAllEntries(global.dir.app).then(entries => {

	global.util.toPipeline(entries);

});
