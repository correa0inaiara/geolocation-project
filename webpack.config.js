const path = require('path');

module.exports = {
  context: __dirname,
  target: 'node',
  entry: ['./src/server.ts'], //"@babel/polyfill",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /public/,
          /client/,
          /coverage/,
          /db_backup/,
          /resources/,
          /\.husky/,
          /\.vscode/,
        ],
        //[path.resolve(__dirname, '/public/*'), path.resolve(__dirname, '/node_modules/*')]
        //   or: [
        //     path.resolve(__dirname, '../public'),
        //     path.resolve(__dirname, '../node_modules'),
        //     path.resolve(__dirname, '../coverage')
        //   ]
        // }
        // exclude: /^(node\_modules|public|client|coverage|db\_backup|resources|\.husky|\.vscode)$/,
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: [
          /node_modules/,
          /public/,
          /client/,
          /coverage/,
          /db_backup/,
          /resources/,
          /\.husky/,
          /\.vscode/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      public: false,
      node_modules: false,
      coverage: false,
      client: false,
      db_backup: false,
      resources: false,
      '.husky': false,
      '.vscode': false,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
  stats: 'verbose',
};
