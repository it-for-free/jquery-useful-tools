"use strict";
var path = require('path'); // для работы с path

module.exports = [
    {  // обычная сборка, jquery и jqueryUi не включены
        mode: 'production',
        entry: {
            'juts': './src/main.js'
        },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: '[name].js',
        },
        externals: { // внешние библиотеки
            "jquery": "$", 
            "jquery-ui": "JQueryUi"
        },
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        }
    },
    { // как обычная, на ещё и не в ключени библиотека jswl
        mode: 'production',
        entry: {
            'juts': './src/main.js'
        },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: '[name]-no-jswl.js',
        },
        externals: { // внешние библиотеки
            "js-wrapper-lib": "jswl",
            "jquery": "$", 
            "jquery-ui": "JQueryUi"
        },
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        }
    }
];
