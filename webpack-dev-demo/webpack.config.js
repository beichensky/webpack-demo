const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name]-[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        // 必须配置的选项，服务启动的目录，默认为跟目录
        contentBase: './dist',
        // 使用热加载时需要设置为 true
        hot: true,
        /**
         * 下面为可选配置
         */
        // 指定使用一个 host。默认是 localhost
        host: 'localhost',
        // 端口号
        port: 8000,
        // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
        historyApiFallback: {
            disableDotRule: true
        },
        // 出现错误时是否在浏览器上出现遮罩层提示
        overlay: true,
        /**
         * 在 dev-server 的两种不同模式之间切换
         *   默认情况下，应用程序启用内联模式 inline
         *   设置为 false，使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
         */
        inline: true,
        /**
         * 统计信息，枚举类型，可供选项：
         *      "errors-only": 只在发生错误时输出
         *      "minimal": 只在发生错误或有新的编译时输出
         *      "none": 没有输出
         *      "normal": 标准输出
         *      "verbose": 全部输出
         */
        stats: "errors-only",
        // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
        proxy: {
            '/api/': {
                changeOrigin: true,
                // 目标地址
                target: 'http://localhost:3000',
                // 重写路径
                pathRewrite: {
                    '^/api/': '/'
                }
            }
        }
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
        // 添加 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖，由于设置了 mode: 'development'，所以这个插件可以省略
        // new webpack.NamedModulesPlugin(),
        // 进行模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 在命令行进行友好提示
        new FriendlyErrorsWebpackPlugin()
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
                    'style-loader',
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
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    }
}