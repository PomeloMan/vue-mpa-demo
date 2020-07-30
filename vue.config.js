'use strict'
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProduction = process.env.NODE_ENV === 'production';
// const Timestamp = new Date().getTime();
module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index.ts',
      template: 'public/index.html',
      filename: 'index.html'
    },
    main: {
      entry: 'src/pages/registration/summary.ts',
      template: 'public/index.html',
      filename: 'main.html'
    },
    user: {
      entry: 'src/pages/user/index',
      template: 'public/index.html',
      filename: 'user.html'
    }
  },
  publicPath: isProduction ? './' : '', // 部署应用包时的基本 URL
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: './', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false, // 是否为生产环境构建生成 source map
  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  configureWebpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    config.resolve.alias['@assets'] = path.resolve(__dirname, 'src/assets')
    // 打包忽略的第三方库,public/index.html配置引入这些js文件
    config.externals = {
      'vue': 'Vue',
      'moment': 'moment',
      'ant-design-vue': 'antd',
      '@antv/g2': 'G2',
      'axios': 'axios'
    }
    if (process.env.npm_config_analyzer === 'true') {
      // npm run serve --analyzer
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    if (isProduction) {
      // 为生产环境修改配置...
      // config.output.filename = `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
      // config.output.chunkFilename = `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
      config.optimization.splitChunks = {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 1,
          },
        }
      }
    } else {
      // 为开发环境修改配置...
      config.devtool = 'inline-source-map'
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  }
}
