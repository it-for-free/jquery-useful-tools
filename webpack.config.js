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
          filename: '[name]-min.js',
        },
        externals: [{ // внешние библиотеки
                "jquery": "$",
                "jquery-ui": "null"
            },
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        devtool: "source-map",
    },
    { // как обычная, на ещё и не в ключени библиотека jswl
        mode: 'production',
        entry: {
            'juts': './src/main.js'
        },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: '[name]-no-jswl-min.js',
        },
        externals: [{ // внешние библиотеки
                "jquery": "$",
                "js-wrapper-lib": "jswl", 
                "jquery-ui": "null"
            },
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        devtool: "source-map"
    },
    //-------------НЕМИНИЦИРОВАННЫЕ ВЕРСИИ НИЖЕ------------------     
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
                "jquery-ui": "null"
            },
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        devtool: "source-map",
        optimization: {
            minimize: false
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
        externals: [{ // внешние библиотеки
                "jquery": "$",
                "js-wrapper-lib": "jswl", 
                "jquery-ui": "null"
            },
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000 // порверяем измемения раз в секунду
        },
        devtool: "source-map",
        optimization: {
            minimize: false
        }
    }
];
