const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//css兼容性插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//css压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//设置node环境变量 css兼容性插件postcss-preset-env   development
process.env.NODE_ENV = 'production';

// "browserslist":{
//node环境变量 process.env.NODE_ENV = 'development'
//     "development":[
//       "last 1 chrome vesion",
//       "last 1 firefox vesion",
//       "last 1 safari vesion"
//     ],
//默认
//     "production":[
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ]
//   }
//定义复用css-loader组件
const commonCssLoader = [
    //创建style标签，将样式放入
    //'style-loader',
    //取代style-loader，将js中的样式提取到单独的文件中
    MiniCssExtractPlugin.loader,
    //将css文件整合到js中
    'css-loader',
    //css兼容 postcss-loader postcss-preset-env
    //缺省配置
    //'post-loader'
    //插件postcss-preset-envbagn 帮post-loader查找package.json中的browserslist里面的配置

    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
];

module.exports = {
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 5 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'img'
                }
            },
            {
                exclude: /\.(html|js|css|less|jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoader
                ]
            },

            /* *js语法检查eslint-loader eslint
               *检查规则   package.json  中的eslintConfig的设置
               "eslintConfig":{
                                    "extends":"airbnb-base"
                               }
                          airbnb风格  依赖 eslint-config-airbnb-base  eslint  eslint-plugin-import
            
            */
            {
                test: /\.js$/,
                //优先执行
                enforce: "pre",
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    //自动修复
                    fix: true
                }
            },

            /*  js兼容性处理   npm i babel-loader "@babel/preset-env" "@babel/core" -D
                安装出错  需加双引号     使用npm install --save-dev "@babel/core"
                   npm install --save-dev "@babel/preset-env"
                        按需 core.js
                        npm install core-js@3 -D
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                //指定兼容版本
                                targets: {
                                    chrome: '60',
                                    firefox: '9',
                                    ie: '8',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/test.html',
            minify:{
                //移除空格
                collapseWhitespace:true,
                //移除注释
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            //添加路径如'css/main.css',css文件里面的图片会找不到
            filename: 'main.css'
        }),
        //new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        port: 3000,
        compress: true,
        open: true,
        //hmr功能,部分编译.js需要设定
        hot:true
    }
}