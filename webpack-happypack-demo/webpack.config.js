const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 引入 happypack
const HappyPack = require('happypack');

// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

module.exports = {
    mode: 'production',
    devtool: 'hidden-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build-[hash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: ['babel-loader?cacheDirectory'] 之前是使用这种方式直接使用 loader
                // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
                use: ['happypack/loader?id=babel'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(css|less)$/,
                // 之前是使用这种方式直接使用 loader
                // use: ['style-loader', 
                // {
                //     loader: 'css-loader',
                //     options: {
                //         sourceMap: true
                //     }
                // },
                // {
                //     loader: 'postcss-loader',
                //     options: {
                //         plugins: () => [autoprefixer()]
                //     }
                // },
                // {
                //     loader: 'less-loader',
                //     options: {
                //         javascriptEnabled: true,
                //     }
                // }] 
                // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
                use: ['happypack/loader?id=styles'],
                include: path.resolve(__dirname, 'src')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new FriendlyErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HappyPack({
            /*
             * 必须配置项
             */
            // id 标识符，要和 rules 中指定的 id 对应起来
            id: 'babel',
            // 需要使用的 loader，用法和 rules 中 Loader 配置一样
            // 可以直接是字符串，也可以是对象形式
            loaders: ['babel-loader?cacheDirectory'],
            // 使用共享进程池中的进程处理任务
            threadPool: happyThreadPool
        }),
        new HappyPack({
            /*
             * 必须配置
             */
            // id 标识符，要和 rules 中指定的 id 对应起来
            id: 'styles',
            // 需要使用的 loader，用法和 rules 中 Loader 配置一样
            // 可以直接是字符串，也可以是对象形式
            loaders: ['style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer()]
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                    }
                }
            ],
            // 使用共享进程池中的进程处理任务
            threadPool: happyThreadPool
        })
    ]
}