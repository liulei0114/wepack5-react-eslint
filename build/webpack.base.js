// webpack.base.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包好的js和css注入到html里面
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development'; // 是否是开发模式
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 这个插件会把打包后最终的css从style抽离成独立的css文件
// const browserslistConfig = require('../.browserslistrc'); // 要兼容的浏览器版本控制

// process.env.NODE_ENV环境变量webpack会自动根据设置的mode字段来给业务代码注入对应的development和prodction,
// 这里在命令中再次设置环境变量NODE_ENV是为了在webpack和babel的配置文件中访问到。

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
  output: {
    // 输出位置
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'),
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], // 只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: [
          'thread-loader',
          'babel-loader'
        ],
      },
      // less-loader 识别less，css-loader解析css，style-loader样式提取到头部
      {
        test: /.css$/, //匹配 css文件
        include: [path.resolve(__dirname, '../src')],
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /.less$/, //匹配less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  // extensions是webpack的resolve解析配置下的选项，在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，因为ts不支持引入以 .ts, tsx为后缀的文件，所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
  resolve: {
    extensions: ['.js', '.tsx', 'ts'],
    alias: {
      '@': path.join(__dirname, '../src'), // 配置别名，但要注意tsconfig.json也要加
    },
    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
  ],
};
