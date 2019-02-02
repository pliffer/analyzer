#!/usr/bin/env node

var path     = require('path');
var fs       = require('fs-extra');

global.dir = {};

global.dir.root = __dirname;

console.log(global.dir.root);