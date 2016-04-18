const path = require('path');
const nodeExternals = require('webpack-node-externals');

function resolve(src) {
    return path.resolve(__dirname, src);
}

const rules = [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader'
        }
    }
];

module.exports = [
    {
        mode: 'development',
        entry: resolve('src/client.js'),
        devtool: 'source-map',
        output: {
            path: resolve('dist/'),
            filename: 'client.js',
            libraryTarget: 'umd'
        },
        module: { rules }
    },
    {
        mode: 'development',
        entry: resolve('src/server.js'),
        devtool: 'source-map',
        output: {
            path: resolve('dist/'),
            filename: 'server.js'
        },
        module: { rules },
        target: 'node',
        externals: [nodeExternals()]
    }
];
