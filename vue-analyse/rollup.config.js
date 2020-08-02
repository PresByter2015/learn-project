import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
  input: './src/index.js', //入口文件
  output: {
    format: 'umd', // 模块化类型 es6Nodule commonjs
    file: 'dist/umd/vue.js', //文件名
    name: 'Vue', // 打包后的全局变量的文件名字
    sourcemap: true, //转换前后 代码对比
  },
  plugins: [
    babel ({
      exclude: 'node_modules/**', //不进行转义
    }),
    process.env.ENV === 'development'
      ? serve ({
          open: true,
          openPage: '/public/index.html',
          port: 3000,
          contentBase: '',//相当于哪个目录
        })
      : null,
  ],
};
