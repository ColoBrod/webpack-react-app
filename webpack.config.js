const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => ({
  mode: 'development',
  // Входных точек может быть несколько. Здесь указывается имя (main) и 
  // путь до точки входа.
  entry: {
    main: './src/js/main.js',
  },
  // [name] заменяется на название входной точки (e.g. main)
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /.*\.(jpe?g|png|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // name: '[hash].[ext]',
            outputPath: 'img',
            esModule: false,
          }
        }
      },
    ]
  },
  devServer: {
    port: 5000,
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: false,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  // Следующая настройка может чудовищно снижать производительность программы.
  devtool: argv.mode === 'development' ? 'source-map' : false,
})