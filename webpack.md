#webpack 笔记
Webpack 是一个模块加载器，它同时支持AMD、CMD加载规范。与其他模块化加载器相比，他具有以下优势：

1. 代码分割
    
    Webpack支持两种依赖加载：同步和异步。
    同步的依赖会在编译时直接打包输出到目的文件中；异步的依赖会单独生成一个代码块，只有在浏览器运行需要的时候才会异步加载该代码块。

2. Loaders
    
    在默认的情况下，Webpack 只能处理JS文件，但是通过加载器我们可以将其他类型的资源转换为JS输出。

3. 插件机制

    Webpack 提供了强打的插件系统，当 Webpack 内置的功能不能满足我们的构建需求时，我们可以通过使用插件来提高工作效率。

##安装
全局安装：

    $ npm install webpack -g

初始化npm项目：

    $ npm init

项目中安装：

    $ npm install webpack -save-dev


##基本使用
先看一个最简单的基于webpack命令行参数打包的例子

> 目录结构：

    example
      |- app.js
      |- demo.js

> 基于CommonJS规范引用依赖文件，文件内容：

    // demo.js
    var names = ['aaa','bbb','ccc'];
    module.exports = names;


    // app.js
    names = require('./demo.js');
    console.log(cats);

app.js是JavaScript入口文件，webpack将会从该文件开始对依赖文件进行打包

> 执行命令：

1. 初始化npm项目

        $ npm init

2. 项目中安装webpack

        $ npm install webpack -save-dev

3. 执行打包命令

        $ webpack ./app.js app.bundle.js

    - ```app.js``` 打包的入口文件
    - ```app.bundle.js``` 最终输出文件

以上命令运行后，webpack会解析依赖的文件，然后打包输出到app.bundle.js文件

> 在node中运行打包后的app.bundle.js

    $ node app.bundle.js

    ['aaa','bbb','ccc']


## webpack命令行
> 简单打包：

    $ webpack <entry> <output>

* entry 要打包的入口文件路径
* output 打包后的文件路径

> 自定义打包过程（常用参数）

* -p 对打包后的代码进行压缩
* --watch 文件变化时，重新打包
* --config 指定webpack打包配置文件
* --progress 在终端显示打包过程

## 配置文件
对于复杂的打包，我们可以在项目的根目录下提供一个配置文件，在配置文件中对打包过程进行更详细的配置。

> 在项目根目录不提供参数直接调用webpack命令：

    $ webpack

webpack默认会调用项目根目录下的 webpack.config.js 文件。

> 我们也可以通过 -config 参数指定配置文件：

    $ webpack -config webpack.config.build.js

配置文件的内容需要通过 module.exports 进行导出：

    // webpack.config.js
    module.exports = {
        // 配置选项
    }


#####看看webpack中包含的配置选项：
* externals
* target
* cache
* loader
* devServer
* plugins
* -·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-·-
* context
* entry
* output
* module
* resolve
* resolveLoader

#####看看常用选项的含义和用法：
* context

    配置基础路径（必须问绝对路径），默认为 process.cwd() ,即运行webpack命令的目录

* entry

    配置要打包的入口文件，值可以是字符串、数组、对象。该选项指定的路径会相对context选项指定的路径进行查找

    - **字符串**：
        直接指定路径，该路径相对于context选项
        ```entry: "./entry"```

    - **数组**：
        路径数组，webpack会按序打包，但是只导出最后一个文件
        ```entry: ["./entry1", "./entry2"]```

    - **对象**：
        当entry值为对象是，键名为块名，可以随意指定，键值可以为字符串或数组类型。该块名可以在output选项中使用。

            {
                entry:{
                    page1: "./page1",
                    page2: ["./entry1", "./entry2"]
                },
                output: {
                    // 打包后输出文件名，name为entry中对应的键名
                    filename: "[name].bundle.js"
                }
            }

        以上选项配置后，运行命令在项目根目录下会生成 page1.bundle.js 和 page2.bundle.js 文件。

* output

    配置输出信息：```output.filename```
    配置打包后的文件名，注意值不是绝对路径。我们应该通过 output.path 来指定输出路径，filename 会相对 output.path 来输出。

        // 单入口示例
        {
            entry: "./src/app.js"
            output: {
                filename: "bundle.js"
                path: __dirname + "/build"
            }
        }
        // 写入磁盘路径为 ./build/bundle.js

    如果项目有多个入口，对于每个入口打包后的文件名我们需要保证其唯一性。webpack 提供了一下模式来动态生成输出文件名：

    - [name]，入口文件块名。
    - [hash]，每个入口打包后的hash值。
    - [chunkhash]，在使用代码分割时，异步加载的文件的hash值。

    代码示例：

        // 多入口示例
        {
            entry: {
                app: "./src/app.js",
                search: "./src/search.js"
            },
            output: {
                filename: "[name].js",
                // filename: "[hash].js",
                // filename: "[chunkhash].js",
                path: __dirname + "/build"
            }
        }
        // 写入磁盘路径为 ./build/app.js 、 ./build/search.js

    output.path——打包后的文件根目录（绝对路径）

* module

    用来进行模块加载相关配置。

    module.loaders——加载器数组，当依赖文件匹配指定的 test 模式时，Webpack 会自动调用数组中的相应加载器去处理该文件，然后返回JS格式的文件。

    加载器是一个对象，该对象有以下属性：

    - test ：正则表达式，Webpack 用其去匹配相应的文件，通常用来匹配文件后缀。
    - exclude ：不应该被 loader 处理的文件。
    - include ：一个数组路径，这些路径将会被 loader 处理。
    - loader ：test匹配到的文件对应的加载器，值是一个加载器名字字符串，多个加载器之间用 "!" 分隔。

    代码示例：

        module: {
            loaders: [
                {
                    // 匹配 jsx 后缀的文件
                    test: /\.jsx$/,
                    // include 中的目录会被loader解析
                    include: [
                        path.resolve(__dirname, "app/src"),
                        path.resolve(__dirname, "app/test")
                    ],
                    // label loader，该 loader 可以用来解析ES 6语法
                    loader: "babel-loader"
                    // 或者 "babel" ，Webpack 将会自动添加 '-loader'
                }
            ]
        }


* resolve

    用来配置依赖文件的匹配，如依赖文件别名配置、模块的查找目录、默认查找的文件后缀等。

    - resolve.alias
        
        配置依赖文件的别名，值是一个对象，该对象的键是别名，值是实际路径。

    - resolve.root
    
        指定模块的查找根路径，必须为绝对路径，只可以是路径字符串或者路径数组。若是数组路径， Webpack会以此在这些路径中查找，如果找到则终止；否则会继续在下一个路径中查找。

        代码示例：

            // webpack.config.js
            var path = require('path');
            // ...

            resolve: {
                root: [
                    path.resolve('./app/modules'),
                    path.resolve('./vendor/modules')
                ]
            }

    - resolve.modulesDirectories
        
        指定模块目录，值是一个路径数组，默认值为 ```["web_modules","node_modules"]``` 。

* devServer

    配置 webpack-dev-server 的行为。以下代码用来指定服务器的根路径：

        {
            devServer: {
                contentBase: "./build",
            }
        }


## 开发调试
开发代码时，可以使用 webpack-dev-server 在浏览器中进行调试。

> webpack-dev-server 是一个基于 Express 的 Node.js 服务器。在文件发生改变时，它会自动触发打包过程，然后通过 Socket.IO 通知浏览器刷新页面，可以大大提高工作效率。

* 安装

        $ npm i -g webpack-dev-server

* 启动服务

        $ webpack-dev-server

    不带参数运行以上命令，默认会读取 webpack.config.js 进行打包，我们可以通过 ```-config``` 来指定配置文件。

* 命令行参数

    所有的 webpack 命令接受的参数，webpack-dev-server 都可以接受。
    除此之外，我们还可以向 webpack-dev-server 传递额外的参数：

    - ```--content-base``` ：指定请求的根路径

    - ```--host``` ：指定服务器监听的地址可以是IP地址或者域名。当值为 0.0.0.0 时，可以监听一台机器的所有IP地址，如 127.0.0.1 或机器在局域网中的IP地址。

    - ```--port``` ：指定服务器的端口号

    - ```--compress``` ：启用gzip压缩

    - ```--inline``` ：自动将 Socket.IO 代码注入到打包后的文件中。启用该选项，当文件内容改变时可以自动刷新浏览器。

* 配置文件

    除了通过命令行传参来配置 webpack-dev-server 外，我们可以通过 Webpack 配置文件如 webpack.config.js 中的 devServer 选项对齐进行配置，所有命令行参数都支持在配置文件中设定。

    例如：

        // webpack.config.js
        module.exports = {
            // ...
            devServer: {
                inline: true
            }
        }

## 使用插件
在 Webpack 提供的基本功能不能满足需求的情况下，Webpack 还允许我们使用插件来控制打包的各个过程。

* 外置插件

    我们需要通过 npm 安装相关的插件。

    以 WebpackBrowerPlugin 为例，WebpackBrowerPlugin 用来在 Webpack 或 webpack-dev-server 运行完成后启动浏览器。

    - 安装插件，执行如下命令：

            $ npm install --save-dev webpack-brower-plugin

    - 在 webpack.config.js 中引用插件，并在插件选项中注册该插件

            // webpack.config.js
            var WebpackBrowerPlugin = require('webpack-brower-plugin');
            module.exports = {
                ...
                ...
                plugins: [
                    new WebpackBrowerPlugin()
                ],
                ...
            }

* 内置插件

    以 DefinePlugin 为例，DefinePlugin 可以在打包时替换指定变量。

    - 首先需要在项目中安装 Webpack，执行如下命令：

            $ npm install -save-dev webpack

    - 然后在配置文件中引用并注册插件：

            // webpack.config.js
            // 首先需要引入 Webpack
            var Webpack = require('webpack');
            module.exports = {
                ...
                ...
                plugins: [
                    // 注册Webpack内置插件
                    new webpack.DefinePlugin({
                        VERSION: JSON.stringify("5fa3b9"),
                        BROWSER_SUPPORTS_HTML5: true,
                        TWO: "1+1",
                        "typeof window": JSON.stringify("object")
                    })
                ],
                ...
            }


####常用插件
> 介绍几款 Webpack 内置的常用插件的使用。

1. DefinePlugin

    DefinePlugin 插件用来替换指定变量，代码示例如下：

        // webpack.config.js
        // 首先需要引入 Webpack
        var Webpack = require('webpack');
        module.exports = {
            ...
            ...
            plugins: [
                // 注册Webpack内置插件
                new webpack.DefinePlugin({
                    VERSION: JSON.stringify("5fa3b9"),
                    BROWSER_SUPPORTS_HTML5: true,
                    TWO: "1+1"
                })
            ],
            ...
        }

        // 待编译的文件
        console.log("Running App versin " + VERSION)
        // 编译后：console.log("Running App versin 5fa3b9")

        if(!BROWSER_SUPPORTS_HTML5) require("html5shiv")
        // 编译后：if(!true) require("html5shiv")

        var two = TWO
        // 编译后：var two = 1+1

2. ProvidePlugin

    ProvidePlugin 可以自动加载当前模块依赖的其他模块并以指定别名注入到当前模块中。假如当前模块依赖 jQuery 模块，同时我们想在模块中直接用 “$” 引用 jQuery 对象，但是不想手动 require jquery 模块。代码示例如下：

        // 当前模块
        $("#item")

    此时我们只需要在 Webpack 配置文件中配置 ProvidePlugin 插件将 jquery 模块导出为 $ 变量即可。代码示例如下：

        // webpack.config.js
        var webpack = require('webpack');
        module.exports = {
            ...
            ...
            plugins: [
                // 自动引入 jquery 模块并导出为 $ 变量，
                // 使各个模块可以直接通过 $ 来引用 jquery 对象
                new webpack.ProvidePlugin({
                    $: "jquery"
                })
            ],
            ...
        }


