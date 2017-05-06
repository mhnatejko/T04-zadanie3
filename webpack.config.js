const {resolve} = require("path");
const webpack = require("webpack");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(env) {

    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;

    return {

        // entry: "./src/js/app.js",
        entry: {
            app: "./src/js/app.js",
            vendors: ["jquery"]
        },

        output: {
            publicPath: dev ? "/dist/" : "",
            path: resolve(__dirname, "dist/"),
            // filename: "bundle.js"
            filename: prod ? "[name].[chunkhash].js" : "[name].js"
        },

        // opcja, o której zapomniałem wspomnieć w warsztacie
        // pozwoli przy pracy nad aplikacją w konsoli przeglądarki
        // zobaczyć np. w którym pliku oryginalnie zrobione zostało
        // console.log() itd.
        // opcję tę wyłączamy w produkcji
        devtool: !prod ? "source-map": false,

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    }
                },
                {
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "handlebars-loader"
                    }
                },
                {
                    test: /\.scss$/,
                    // use: [
                    //     { loader: "style-loader" },
                    //     { loader: "css-loader" },
                    //     { loader: "sass-loader" }
                    // ]
                    use: ExtractTextWebpackPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader"
                    })
                },
                // {
                //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                //     use: {
                //         loader: "file-loader"
                //     }
                // }
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "[name].[ext]"
                        }
                    }
                }
            ]
        },

        plugins: [
            new ExtractTextWebpackPlugin("main.css"),
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors"
            })
        ]

    };

};