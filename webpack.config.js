const path = require('path');

module.exports = {
    entry: {
        app: './kaybee_bulma/index.js',
        kaybee_bulma: './kaybee_bulma/scss/kaybee_bulma.scss'
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'kaybee_bulma/static')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};