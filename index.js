'use strict';
require('./app/index');

// This is mediation file.
// If Electron source 'app' directory is not same to package.json directory,
// electron-packager does not work corrently.
// 
// Issue: How to set electron-packager start command? · Issue #144 · maxogden/electron-packager
// https://github.com/maxogden/electron-packager/issues/144
