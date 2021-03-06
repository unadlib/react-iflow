import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import commonjs from 'rollup-plugin-commonjs'

const pgk = require('./package.json')
const env = process.env.NODE_ENV

export default {
  input: 'lib/index.js',
  output: {
    format: env,
    name: 'iFlowReact',
    sourcemap: true,
    globals: {
      'react': 'React',
      'iflow': 'iFlow',
      'prop-types': 'PropTypes'
    },
    exports: 'named'
  },
  external: ['react', 'prop-types', 'iflow'],
  plugins: [
    resolve(),
    babel({
      presets: [
        [
          'env',
          {
            'modules': false
          }
        ],
        'stage-0'
      ],
      plugins: ['external-helpers'],
      babelrc: false,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    uglify({}, minify)
  ],
}