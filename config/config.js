import { defineConfig } from 'umi'
import theme from '../src/theme/variables'
import routes from './router.config'
import env from './env'

const path = require('path')

export default defineConfig({
  ...env,
  hash: true,
  dynamicImport: {
    loading: '@/pages/loading',
  },
  targets: {
    ie: 11,
  },
  define: {
    environment: process.env.ENV,
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
    '@assets': path.resolve(__dirname, '../src/assets/images'),
    '@less':path.resolve(__dirname, '../src/theme/mixins.less')
  },
  routes,
  theme,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  webpack5: {},
  exportStatic: {},
  inlineLimit: 10000,
  // extraBabelPlugins: [
  //   [
  //     'react-css-modules',
  //     {
  //       exclude: 'node_modules',
  //       generateScopedName: '[name]__[local]___[hash:base64:5]',
  //       filetypes: {
  //         '.less': {
  //           syntax: 'postcss-less',
  //         },
  //       },
  //     },
  //   ],
  // ],
  // cssLoader: {
  //   modules: {
  //     auto: function (opt) {
  //       const index = path.normalize('src/styles/index.less')
  //       const components = path.normalize('src/components')

  //       return !opt.includes('node_modules')
  //         && !opt.includes(index)
  //         && !opt.includes(components)
  //     },
  //     localIdentName: '[name]__[local]___[hash:base64:5]'
  //   },
  // },
  // dva: {
  //   immer: true,
  // }
  // mfsu: {},
})
