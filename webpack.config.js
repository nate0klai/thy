const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  // watch: true,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/js/utils'),
      components: path.resolve(__dirname, 'src/js/components/'),
      containers: path.resolve(__dirname, 'src/js/containers/'),
      actions: path.resolve(__dirname, 'src/js/actions/'),
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: ['syntax-dynamic-import', 'transform-class-properties']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};