const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const version = Math.random().toString().substr(2, 8);
let resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}
const env = (process.env.NODE_ENV || 'development');
console.log(env);

const config = {
    entry: {
        'ventor': ['vue', 'vue-router'],
        'main': './src/main.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // ...
                    postcss: [require('precss'),
                        require('autoprefixer')({browsers: ['last 2 versions', 'iOS 7']})]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4048,
                    name: '[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'


            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'


            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist', './html']),
        new CommonsChunkPlugin({
            names: ['ventor'],
            minChunks: Infinity
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: '金疙瘩',
            env,
            favicon: './src/images/logo.png',
            chunks: ['ventor', 'main'],
            inject: 'body',
            filename: path.resolve(__dirname, 'html/index.html'),
            template: './index.ejs',
            minify: {//压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        }),
        new FriendlyErrorsPlugin()
    ],
    devtool: '#eval-source-map'
}
if (env == 'production' || env == 'stage' || env == 'test' || env == 'test2') {
    console.log('------->', env)
    config.devtool = '';
    config.output.filename = `[name].[chunkhash:8].${version}.js`;
    config.output.chunkFilename = `[chunkhash:8].[id].chunk.${version}.js`;
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"',
                'kingold': JSON.stringify(env)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new WebpackMd5Hash(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
} else {
    console.log('dev');
}
module.exports = config;
