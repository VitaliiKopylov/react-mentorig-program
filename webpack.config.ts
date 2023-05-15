import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

interface CustomConfiguration extends Configuration {
  devServer?: DevServerConfiguration;
}

module.exports = (argv: any) => {
  const mode: 'none' | 'development' | 'production' | undefined = argv.mode;
  const isProduction: boolean = mode === 'production';

  const config: CustomConfiguration = {
    mode,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // {
        //   test: /\.css$/,
        //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // },
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'sass-loader'],
        // },
        // {
        //   test: /\.module\.s(a|c)ss$/,
        //   loader: [
        //     isProduction ?  MiniCssExtractPlugin.loader : 'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         modules: true,
        //         sourceMap: !isProduction,
        //       },
        //     },
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: !isProduction,
        //       },
        //     },
        //   ],
        // },
        // {
        //   test: /\.s(a|c)ss$/,
        //   exclude: /\.module.(s(a|c)ss)$/,
        //   loader: [
        //     isProduction ?  MiniCssExtractPlugin.loader : 'style-loader',
        //     'css-loader',
        //     {
        //       loader: 'sass-loader',
        //       options: {
        //         sourceMap: !isProduction,
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                // localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      // minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
      minimizer: [new TerserPlugin()],
      // splitChunks: {
      //   chunks: 'all',
      // },
    },
    devtool: isProduction ? false : 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        minify: {
          collapseWhitespace: isProduction,
          removeComments: isProduction,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'styles.[contenthash].css' : 'styles.css',
      }),
      new DefinePlugin({
        React: 'react',
        NODE_ENV: JSON.stringify(mode),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080,
      historyApiFallback: true,
    },
  };

  return config;
};
