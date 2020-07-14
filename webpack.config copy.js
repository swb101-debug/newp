const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    LoaderOptionsPlugin
} = require("webpack");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { Hash } = require("crypto");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "js/bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.css$/,
                /*  从下往上从右到左执行顺序 */
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                /*
                处理样式中的img
                下载url-loader file-loader        
                */
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    /* 小图片被base64处理直接嵌入 */
                    limit: 8 * 1024,
                    /* 默认es6解释  设false则按照commonjs,以免html中的img无法处理*/
                    esModule:false,
                    /* 重命名图片  取图片hash值前10位, [ext]原扩展名 */
                    name:'[Hash:10].[ext]',
                    outputPath:"img"
                }
            },
            {
                /*处理html中的img图片,负责引入,然后被url-loader处理,按照commonjs*/
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                //用以下这行图片不显示
                exclude:/\.(css|js|html|less|gif|jpg|png)$/,
                  /*  test:/\.(ttf|svg|eot|woff|woff2|json)/,*/
                    loader:"file-loader",
                    options:{
                        name:'[Hash:10].[ext]',
                        outputPath:"media"
                    }
            }
        ]
    },
    plugins: [
        /* 按照模板生成html,自动插入输出的js .plugin需要先引入*/
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/test.html")
        })
    ],
    mode: "development",
    /*  npx webpack-dev-server  */
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        port:3000,
        open:true
    }
}