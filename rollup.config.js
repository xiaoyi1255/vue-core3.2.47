// 通过 rollup 打包
/**
 * 引入相关哈依赖
 */
const ts = require('rollup-plugin-typescript2'); // 解析ts
const json = require('@rollup/plugin-json');
const resolveNodePlugin = require('@rollup/plugin-node-resolve');
// import resolvePlugin form '@rollup/plugin-node-resolve'
const path = require('path');

let packagesDir = path.resolve(__dirname, 'packages');

// 获取需要打包的 包

const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 获取到每个包的配置
const resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve(`package.json`)); // 获取json
// const packageOptions = pkg.buildOptions || {}; // 获取JSON的rollup配置
const name = path.basename(packageDir);
console.log(packageDir, 4444);
// console.log(packageOptions, 555);
const outputOptions = {
	'esm-bundler': {
		file: resolve(`dist/${name}.esm-bundler.js`),
		formatt: 'es'
	},
	'esm-browser': {
		file: resolve(`dist/${name}.esm-browser.js`),
		formatt: 'es'
	},
	cjs: {
		file: resolve(`dist/${name}.cjs.js`),
		formatt: 'cjs'
	},
	global: {
		file: resolve(`dist/${name}.global.js`),
		format: 'iife'
	}
};
// 获取
const options = pkg.buildOptions
function createConfig(format, output) {
    output.name = options.name
    output.sourcemap = true
    // 生成 rollup配置
    return {
        input: resolve('src/index.ts'), // 导入
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolveNodePlugin.default()

        ]
    }
}
const res = options.formats.map(format => createConfig(format, outputOptions[format]))
console.log(res, 1234)
module.exports = [...res]
// module.exports = {
// 	...options.formats.map(format => createConfig(format, outputOptions[format]))
// }
