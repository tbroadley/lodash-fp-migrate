#! /usr/bin/env node

var glob = require('glob');
var babel = require('babel-core');
var plugin = require('babel-plugin-lodash-fp').default;
var fs = require('fs');

glob(process.argv[2], function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach(function (file) {
    babel.transformFile(
      file,
      { plugins: [plugin], babelrc: false },
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          fs.writeFile(file, result.code, function () {
            console.log('Migrated ' + file);
          });
        }
      }
    );
  });
});
