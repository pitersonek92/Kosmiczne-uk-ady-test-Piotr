const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PACKAGE = require("./package.json");

const PATHS = {
    STATIC: path.resolve(__dirname, "./static"),
    SRC: path.resolve(__dirname, "./src"),
    BUILD: path.resolve(__dirname, "./build"),
    PACKAGES: path.resolve(__dirname, "./packages"),
    EMULATOR_BUILD: path.resolve(__dirname, "./packages/zpe-emulator/build"),
    EDITOR_BUILD: path.resolve(__dirname, "./packages/zpe-editor/build"),
    DATA: path.resolve(__dirname, "./data")
};

module.exports = function (env, argv) {
    const IS_DEV = env.production ? false : true;
    const SERVER_PORT = env.port || 8080;

    return {
        mode: env.production ? "production" : "development",
        devtool: IS_DEV ? "cheap-module-source-map" : false,
        entry: path.resolve(PATHS.SRC, "main.ts"),
        output: {
            path: PATHS.BUILD,
            libraryTarget: "amd",
            filename: "entry.js",
            clean: true
        },
        externals: {
            // jquery: "jquery:3"
        },
        resolve: {
            alias: {
                "~": path.join(PATHS.SRC),
                "@": path.join(PATHS.PACKAGES)
            },
            modules: ["packages", "node_modules", "src"],
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        devServer: {
            static: [
                path.resolve(PATHS.STATIC),
                path.resolve(PATHS.EMULATOR_BUILD)
            ],
            open: false,
            hot: false,
            host: "0.0.0.0",
            port: SERVER_PORT,
            allowedHosts: "all",
            setupMiddlewares: (middlewares, devServer) => {
                if (!devServer) {
                    throw new Error("webpack-dev-server is not defined");
                }

                devServer.app.get("/engine.json", (req, res) => {
                    if (IS_DEV && env.engine) {
                        const engineFile = path.resolve(PATHS.DATA, env.engine);
                        res.sendFile(engineFile);
                    } else {
                        const defaultEngineFile = path.resolve(
                            PATHS.STATIC,
                            "engine.json"
                        );
                        res.sendFile(defaultEngineFile);
                    }
                });

                devServer.app.get("/savedata.json", (req, res) => {
                    const savedataFile = path.resolve(
                        PATHS.DATA,
                        env.savedata || "savedata.json"
                    );
                    if (fs.existsSync(savedataFile)) {
                        res.sendFile(savedataFile);
                    } else {
                        console.log(
                            "\x1b[35m[devServerMid] Savedata file not found, returning null:",
                            savedataFile,
                            "\x1b[0m"
                        );
                        res.send("null");
                    }
                });

                return middlewares;
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "raw-loader"
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: PATHS.STATIC,
                        to: "./",
                        info: { minimized: true },
                        globOptions: {
                            ignore: ["**/.DS_Store"]
                        }
                    },
                    {
                        from: path.resolve(PATHS.EDITOR_BUILD),
                        to: "./",
                        info: { minimized: true },
                        globOptions: {
                            ignore: ["**/.DS_Store"]
                        }
                    }
                ]
            }),
            IS_DEV
                ? new HtmlWebpackPlugin({
                      inject: false,
                      minify: false,
                      title: `${PACKAGE.name} ${PACKAGE.version} - Development`,
                      favicon: path.resolve(PATHS.EMULATOR_BUILD, "favicon.png"),
                      template: path.resolve(PATHS.EMULATOR_BUILD, "index.html"),
                      filename: "index.html"
                  })
                : null
        ],
        optimization: {
            minimize: false
        },
        performance: {
            hints: false
        }
    };
};
