var path = require('path')
var projectRoot = path.resolve(__dirname)

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer');

console.log(projectRoot)
module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname, 'src'),
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      // 'components': path.resolve(__dirname, './src/components'),
      // 'util': path.resolve(__dirname, './src/util'),
      'theme': path.resolve(__dirname, './src/styles/variables.styl')
    }
    

  },
  resolveLoader: {
    fallback: [path.join(__dirname, './node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.join('/static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  postcss: function () {
      return [autoprefixer];
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    contentBase: '/'
  },
  devtool: '#eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject: true
    })
  ]
}
