const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            // 用于生成的HTML文档的标题
            title: 'Webpack 开发环境配置',
            // webpack 生成模板的路径
            template: './public/index.html'
        }),
        // 用法：new CleanWebpackPlugin(paths [, {options}])
        new CleanWebpackPlugin(['dist']),
        // 在命令行进行友好提示
        new FriendlyErrorsWebpackPlugin(),
        // 打包后提取出css文件
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css'
        }),
        // 区分环境
        new webpack.DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader?cacheDirectory'
            },
            // 解析 css
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // 还可以给 loader 添加一些配置
                    {
                        loader: 'css-loader',
                        options: {
                            // 开启 sourceMop
                            sourceMap: true
                        }
                    }
                ]
            },
            // 解析图片资源
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // 解析数据资源
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // 解析 MakeDown 文件
            {
                test: /\.md$/,
                use: [
                    "html-loader", 
                    "markdown-loader"
                ]
            }
        ]
    },
    optimization: {
        // 打包压缩js/css文件
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
}