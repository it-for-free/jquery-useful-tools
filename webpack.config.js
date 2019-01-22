"use strict";
var path = require('path'); // для работы с path
var webpack = require('webpack');

// определим игнорируемые правила
var ignore = new webpack.IgnorePlugin(/^jquery-ui$/);

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
        externals: [{ // внешние библиотеки
                "jquery": "$", 
            } 
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        plugins: [ignore],
        devtool: "source-map"
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
        externals: [{ // внешние библиотеки
                "jquery": "$",
                "js-wrapper-lib": "jswl", 
            }
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        plugins: [ignore],
        devtool: "source-map"
    }
];
