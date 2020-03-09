"use strict";

const isWsl = require("is-wsl");
const path = require("path");
const webpack = require("webpack");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const paths = require("./paths");
const modules = require("./modules");
const getClientEnvironment = require("./env");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
const eslint = require("eslint");

const appPackageJson = require(paths.appPackageJson);

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false";
const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
);

module.exports = function(webpackEnv) {
  const isDev = webpackEnv === "development";
  const isProd = webpackEnv === "production";
  const isProdProfile = isProd && process.argv.includes("--profile");
  const publicPath = isProd ? paths.servedPath : isDev && "/";
  const publicUrl = isProd ? publicPath.slice(0, -1) : isDev && "";
  const env = getClientEnvironment(publicUrl);

  return {
    mode: isProd ? "production" : isDev && "development",
    // Stop compilation early in production
    bail: isProd,
    devtool: isProd
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isDev && "cheap-module-source-map",
    entry: [
      isDev && require.resolve("react-dev-utils/webpackHotDevClient"),
      paths.appIndexJs
    ].filter(Boolean),
    output: {
      path: isProd ? paths.appBuild : undefined,
      pathinfo: isDev,
      filename: isProd
        ? "static/js/[name].[contenthash:8].js"
        : isDev && "static/js/bundle.js",
      futureEmitAssets: true,
      chunkFilename: isProd
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isDev && "static/js/[name].chunk.js",
      publicPath: publicPath,
      devtoolModuleFilenameTemplate: isProd
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, "/")
        : isDev &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: "this"
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            keep_classnames: isProdProfile,
            keep_fnames: isProdProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: !isWsl,
          cache: true,
          sourceMap: shouldUseSourceMap
        })
      ],
      splitChunks: {
        chunks: "all",
        name: false
      },
      // Keep the runtime chunk separated to enable long term caching
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    resolve: {
      // This allows you to set a fallback for where Webpack should look for modules.
      modules: ["node_modules", paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => !ext.includes("ts")),
      alias: {
        // Allows for better profiling with ReactDevTools
        ...(isProdProfile && {
          "react-dom$": "react-dom/profiling",
          "scheduler/tracing": "scheduler/tracing-profiling"
        }),
        ...(modules.webpackAliases || {})
      },
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // Prevents users from importing files from outside of src/ (or node_modules/).
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
      ]
    },
    resolveLoader: {
      plugins: [
        // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        // First, run the linter.
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: "pre",
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve("react-dev-utils/eslintFormatter"),
                eslintPath: require.resolve("eslint"),
                resolvePluginsRelativeTo: __dirname
              },
              loader: require.resolve("eslint-loader")
            }
          ],
          include: paths.appSrc
        },
        {
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: imageInlineSizeLimit,
                name: "static/media/[name].[hash:8].[ext]"
              }
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve("babel-loader"),
              options: {
                customize: require.resolve(
                  "babel-preset-react-app/webpack-overrides"
                ),

                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            "@svgr/webpack?-svgo,+titleProp,+ref![path]"
                        }
                      }
                    }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: false,
                compact: isProd
              }
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve("babel-loader"),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve("babel-preset-react-app/dependencies"),
                    { helpers: true }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: false
              }
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },
          isProd
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      isProd &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin(env.stringified),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new CaseSensitivePathsPlugin(),
      isDev && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: publicPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith(".map")
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles
          };
        }
      }),
      isProd &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: "cdn",
          navigateFallback: publicUrl + "/index.html",
          navigateFallbackBlacklist: [
            new RegExp("^/_"),
            new RegExp("/[^/?]+\\.[^/]+$")
          ]
        })
    ].filter(Boolean),
    performance: false
  };
};
