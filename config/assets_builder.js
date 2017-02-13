const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SetupEntryPoints = require('frontrockets-builder/lib/setup-entry-points');

const autoprefixer = require('autoprefixer');

const options = {
  entry: {
    application: {
      javascripts: './app/assets/javascripts/application.entry.js',
      stylesheets: './app/assets/stylesheets/application.entry.scss',
    },
  },
  path: './vendor/assets',
  filenameJs: 'javascripts/dist/[name].js',
  filenameCss: 'stylesheets/dist/[name].css.scss',
  filenameFont: 'fonts/[name].[ext]',
  dirForFontsRelativeToOutputPath: '/assets/',
  filenameImg: 'images/components/[name]-[sha512:hash:hex:6].[ext]',
  dirForImageRelativeToOutputPath: '/assets/',
};

module.exports = {
  entry: new SetupEntryPoints(options.entry, './tmp/entry_points'),
  output: {
    path: options.path,
    filename: options.filenameJs,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(woff2?|ttf|otf|eot|svg)/,
        loader: 'frontrockets-builder/lib/assets-loader',
        query: {
          limit: 1024,
          name: options.filenameFont,
          publicPrefix: options.dirForFontsRelativeToOutputPath,
        },
      },
      {
        test: /\.(jpe?g|tiff|gif|bmp|png|webp|svg)/,
        loader: 'frontrockets-builder/lib/assets-loader',
        query: {
          limit: 1024,
          name: options.filenameImg,
          publicPrefix: options.dirForImageRelativeToOutputPath,
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader',
        ]),
        include: path.resolve(__dirname, '../app/'),
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
        include: path.resolve(__dirname, '../app/'),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(options.filenameCss, {
      allChunks: true,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions', '> 1%', 'IOS >= 8'],
      }),
    ];
  },
};
