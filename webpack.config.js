const HtmlWebPackPlugin = require('html-webpack-plugin')
const workboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              name: 'assets/svg/[name].[hash].[ext]'
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/font/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize:true,
    minimizer: [
      new TerserPlugin({
        cache:true,
        parallel: true,
        terserOptions: {
          ecma: 6,
          compress:true,
          mangle:true
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      minSize: 400000,
      maxSize: 550000,
      minChunks: 2,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'lib',
          chunks: 'initial',
          enforce: true,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          name: 'app',
          enforce: true,
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/logo.png'
    }),
    new CopyWebpackPlugin([
      { from: './public/extras/manifest.json', to: 'extras' },
      { from:'./src/assets/font/segoeui', to:'assets/css/assets/font' },
      { from:'./src/assets/font/monserrat', to:'assets/css/assets/font' }
    ]),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }),
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
