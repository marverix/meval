// Imports
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

import $package from './package.json';

var externals = Object.keys($package.dependencies || []);
var globals = {};

for(let ext of externals) {
  globals[ext] = ext;
}

// Common
var config = {
  input: 'src/index.js',

  output: {
    file: 'dist/meval',
    format: 'umd',
    name: 'meval',
    banner: `/* meval v${$package.version} ` +
      `| Copyright ${new Date().getFullYear()} (c) Marek Sierociński` +
      '| https://github.com/marverix/meval/blob/master/LICENSE ' +
      '*/',
    globals: globals
  },

  extensions: ['.js'],
  external: externals
};

var input = config.input;

var output = function(min) {
  return {
    file: config.output.file + (min ? '.min' : '') + '.js',
    format: config.output.format,
    name:  config.output.name,
    banner: config.output.banner,
    globals: config.output.globals
  };
};

var plugins = [
  nodeResolve({
    extensions: config.extensions
  }),
  commonjs({
    extensions: config.extensions
  }),
  babel({
    exclude: 'node_modules/**'
  })
];

var external = config.external;

// Export
export default [
  // Uncompressed config
  {
    input,
    output: output(),
    plugins,
    external
  },

  // Compressed config
  {
    input,
    output: output(true),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: /license/i
        }
      })
    ]),
    external
  }
];
