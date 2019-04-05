const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/main.ts',
    mode: 'production',
    output: {
        publicPath: './',
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "less"]
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.tsx?$/, loader: "awesome-typescript-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.style.css')
    ],
    node: {
        __dirname: true
    }
};
