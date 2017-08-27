import fs from 'fs'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

var babelOptions = JSON.parse(fs.readFileSync(__dirname + '/.babelrc', 'utf-8'))
babelOptions.babelrc = false
babelOptions.exclude = 'node_modules/**'

export default {
  input: 'src/app.jsx',
  output: {
    file: 'renderer.js',
    format: 'umd',
  },
  name: 'Readon',
  plugins:[
    nodeResolve({
      jsnext: true,
      main: true,
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    json(),
    babel(babelOptions)
  ]
}
