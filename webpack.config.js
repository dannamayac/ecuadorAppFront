const path = require('path');

module.exports = {
  entry: './src/index.js', // Ruta de tu archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
    filename: 'bundle.js', // Nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Expresión regular para archivos JavaScript
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: 'babel-loader', // Usar babel-loader para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets de Babel para JavaScript y React
          },
        },
      },
      // Agrega reglas adicionales para manejar otros tipos de archivos, como CSS, imágenes, etc.
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Extensiones de archivos que webpack resolverá automáticamente
  },
};
