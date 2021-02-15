const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        filename: 'js/bundle.js'
    },
    plugins: [
        definePlugin,
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            filename: 'index.html', // path.resolve(__dirname, 'build', 'index.html'),
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            },
            hash: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets',
                    to: 'assets'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(vert|frag)$/,
                use: 'raw-loader'
            }
        ]
    },
    optimization: {
        minimize: true
    }
};
