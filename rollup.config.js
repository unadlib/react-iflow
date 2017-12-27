import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const pgk = require('./package.json')

export default {
  input: 'lib/index.js',
  output: {
    file: `dist/index.js`,
    format: 'umd',
    name: pgk.name,
    sourcemap: true
  },
  external: ['react', 'prop-types'],
  globals: {
    'react': 'React',
    'prop-types': 'PropTypes'
  },
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
    uglify({}, minify)
  ],
}