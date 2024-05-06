const { defineConfig } = require('@vue/cli-service')
const glob = require('glob')
function getEntry() {
    let entrys = {}
    // 获取pages目录下后缀为html的路径
    glob.sync('./src/pages/**?/*.html').forEach(item => {
        // 获取页面匹配名称
        let urlArr = item.split('/').splice(-3)
        entrys[urlArr[1]] = {
            entry: 'src/pages/' + urlArr[1] + '/index.js',
            template: 'src/pages/' + urlArr[1] + '/index.html',
            filename: urlArr[1] + '.html',
            title: 'pages-' + urlArr[1]
        }
    })
    return entrys
}

let pages = getEntry()
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: '/',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        // open: true,//设置自动打开
        port: 9090,//设置端口
        proxy: {
        '/api': {
                target: `http://localhost:8000`,
                changeOrigin: true,
                pathRewrite: {
                '^/api': ''
                }
            }
        }
    }, 
})
