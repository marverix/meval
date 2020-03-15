// Imports
import cjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

import $package from './package.json';

const input = 'src/index.js';
const external = Object.keys($package.dependencies || []);
const globals = {};

for(let ext of external) {
  globals[ext] = ext;
}

var output = function(min) {
  return {
    file: 'dist/meval' + (min ? '.min' : '') + '.js',
    format: 'umd',
    name:  'meval',
    banner: `/* meval v${$package.version} ` +
    `| Copyright ${new Date().getFullYear()} (c) Marek Sierociński` +
    '| https://github.com/marverix/meval/blob/master/LICENSE ' +
    '*/',
    globals
  };
};

var plugins = [
  cjs(),
  resolve(),
  babel({
    exclude: 'node_modules/**'
  })
];

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
