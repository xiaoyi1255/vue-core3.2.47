// 进行打包 monerepo
// 获取 打包 目录 文件
const fs = require("fs")
const execa = require("execa")
const dirs = fs.readdirSync("packages").filter(item => {
    if (!fs.statSync(`packages/${item}`).isDirectory()) {
        // 判断是一个文件夹
        return false
        // 注意 只打包文件夹 才进行打包
    }
    return true
})
console.log(dirs)

async function build(target) {
    console.log(target, 333)
    // execa  -c 执行rollup配置, 环境变量
    await execa('rollup', ['-c', "--environment",  `TARGET:${target}`], {stdio: 'inherit'}) // 子进程的输出在父包
}

// 并行打包
async function runParaller(dirs, itemsFn) {
    let result = []
    // 遍历
    for (const item of dirs) {
        result.push(itemsFn(item))
    }
    // 存放打包的 promise 等待打包执行完毕后，调用成功
    return Promise.all(result)
}
runParaller(dirs, build).then(() => {
    console.log('成功')
})