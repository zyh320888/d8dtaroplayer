const path = require('path');
const env = process.env.NODE_ENV === 'development'?'dev':'prd';

const config = {
  projectName: 'myApp',
  date: '2023-6-5',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  //outputRoot: 'dist',
  outputRoot: `dist/${process.env.TARO_ENV}/${env}`,
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/appCode.js', to: `dist/${process.env.TARO_ENV}/${env}/appCode.js`},
      { from: 'src/appConfig.js', to: `dist/${process.env.TARO_ENV}/${env}/appConfig.js`},
    ],
    options: {
    }
  },
  framework: 'react',
  //compiler: 'webpack5', 
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:{
    data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain, webpack) {
      //console.log('webpackChain',chain)
      chain.merge({
        externals: {
          './../appCode': `require('./../appCode.js')`, // 将 appcode.js 指定为外部依赖
          './appCode': `require('./appCode.js')`, // 将 appcode.js 指定为外部依赖
          './appConfig': `require('./appConfig.js')`, // 将 appConfig.js 指定为外部依赖
        },
      })
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    // esnextModules: ['nutui-react'],
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-']
        }
      },
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
