const path = require('path'); // подключаем path к конфигу вебпак

module.exports = {
  // Точка входа
  entry: { main: './src/scripts/pages/index.js' },
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
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
}
