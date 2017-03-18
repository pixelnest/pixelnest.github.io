const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

// http://browserl.ist/?q=last+3+versions%2C+not+ie+%3C+10
const browserSupport = [
  'last 2 versions',
  'not ie < 10'
]

// -------------------------------------------------------------
// Sass Loader.
// -------------------------------------------------------------

const sassLoader = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },

      {
        loader: 'postcss-loader', // For autoprefixer.
        options: {
          sourceMap: true,
          plugins: [
            autoprefixer({browsers: browserSupport})
          ]
        }
      },

      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
}

// -------------------------------------------------------------
// Babel Loader.
// -------------------------------------------------------------

const babelLoader = {
  test: /\.js$/,
  exclude: [
    path.resolve(__dirname, 'node_modules')
  ],

  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        'es2015'
      ],
      plugins: [
        'transform-object-rest-spread'
      ]
    }
  }]
}

// -------------------------------------------------------------
// Helpers.
// -------------------------------------------------------------

function getFolderPath (isProduction) {
  if (isProduction) {
    // However, in production, we need to store (and checkout)
    // the files, to let GitHub build these into the final build.
    return path.resolve(__dirname, 'static', 'assets')
  }

  // In dev? Just put the files in the `_site/` folder.
  // They don't matter and are regenerated at will.
  return path.resolve(__dirname, '_site', 'static')
}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

module.exports = (env = {}) => {
  const isProduction = env.production

  const config = {
    entry: './src/index.js',

    output: {
      filename: 'bundle.js',
      path: getFolderPath(isProduction)
    },

    module: {
      rules: [
        sassLoader,
        babelLoader
      ]
    },

    plugins: [
      new ExtractTextPlugin('bundle.css')
    ],

    devtool: 'source-map'
  }

  if (!isProduction) {
    // Add a browser-sync server in development.
    config.plugins.push(new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      ui: false,
      open: false,
      server: {
        baseDir: ['_site']
      }
    }))
  }

  return config
}
