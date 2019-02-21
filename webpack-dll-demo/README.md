## webpack-dll-demo 项目内容
该项目详细介绍了 DllPlugin、DllReferencePlugin 和 AddAssetHtmlPlugin 的用法。使用 Webpack 内置的 DllPlugin 和 DllReferencePlugin 进行动态链接库的生成和引用，配合 AddAssetHtmlPlugin 插件自动复制动态链接库文件并在 html 文件中自动引入。


----- 


## 项目运行

### 准备工作

项目下载完成之后，打开项目，打开命令行，运行以下命令:
``` bash
$ cd webpack-dll-demo

$ npm install
```



### 查看运行结果

在命令行执行命令：
``` bash
# 生成动态链接库，只需要执行一次，之后再对项目进行打包不需要再执行这个命令
$ npm run build:dll

# 打包项目
$ npm run build
```


即可在命令行可以看到输出结果

打开 `dist` 文件夹，在浏览器中打开 `index.html` 文件，既可在浏览器看到 `Hello , DllPlugin` 正常显示，说明项目打包成功。



### 项目构建速度对比
如想查看 DllPlugin 使用之后是否对构建速度有所提升，可以将 webpack.config.js 中 DllReferencePlugin 和 AddAssetHtmlPlugin 插件的使用注释掉，执行 `npm run build`，记录项目打包构建时间；再将注释重新打开，再次执行 `npm run build`，记录项目打包构建时间，进行对比，即可发现区别。



> 关于项目更详细的讲解请查看我的博客：**[使用 Webpack 的 DllPlugin 提升项目构建速度](https://juejin.im/post/5c665c6151882562986ce988)**