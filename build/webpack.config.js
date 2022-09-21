const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'Assets'),
    entry: {
        frontend: ['./css/frontend/main.css'],
        list: ['./javascript/frontend/three/list.js'],
        default: ['./css/default.css'],
        navigation: ['./javascript/navigation.js', './css/navigation.css'],
        product: ['./css/product.css'],
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: 'javascript/[name].js',
        chunkFilename: 'javascript/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(scroll-js|dom7|flatpickr|swiper)\/).*/,
                use: ["babel-loader"],
                parser: {
                    amd: false
                }
            },
            {
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
    ],
};