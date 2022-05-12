const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключение плагина HtmlWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключить CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключение mini-css-extract-plugin

module.exports = {
  // Точка входа
  entry: { main: './src/pages/index.js' },

  // Точка выхода
  output: {
    path: path.resolve(__dirname, 'dist'), // вызов path для получения абсолютного пути
    filename: 'main.js',
        publicPath: ''
  },

  // Добавили режим разработчика
  mode: 'development',

  // Настройки локального сервера
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // ускорение загрузки в режиме разработки
    port: 8080, // порт вебсервера
    open: true // сайт будет открываться сам при запуске npm run dev
  },

  // Лоадеры (модули)
  module: {
    rules: [ // массив правил
      // Babel
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },

      // Изображения и шрифты
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource' // переносить исходные файлы в конечную сборку в том же формате
      },

      // MiniCssExtractPlugin.loader и css-loader
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 } // изменение порядка запуска, чтобы правильно работали импорты в css (сначала обработка в PostCSS)
        },
        'postcss-loader'] // PostCSS
      },
    ]
  },

  devtool: 'inline-source-map',

  // Плагины
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), // подключение MiniCssExtractPlugin
  ]
}


