const merge = require('webpack-merge');
const base = require('./webpack.base')
const path = require('path');
const HtmlWebpackPlguin = require('html-webpack-plugin');

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

// 需要打包的是服务端，打包的是给node来用的
module.exports = merge(base,{
    mode:'development',
    entry: {
        server:path.resolve(__dirname,'../src/server-entry.js')
    },
    target:"node", // 打包的目标是给node来使用的
    output:{ // 使用module.exports 导出结果 
        libraryTarget:"commonjs2"
    },
    plugins:[
        new HtmlWebpackPlguin({
            filename:'index.ssr.html',
            template:path.resolve(__dirname,'../public/index.ssr.html'),
            excludeChunks:['server'] // 排除掉自动引用服务端打包的包
        }),
         new VueSSRServerPlugin()
    ]
})