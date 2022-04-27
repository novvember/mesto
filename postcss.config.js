// Подключение плагинов
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // Плагины к PostCSS
  plugins: [
    autoprefixer, // подключите autoprefixer
    cssnano({ preset: 'default' }) // Подключить со стандартными настройками минификации
  ]
};
