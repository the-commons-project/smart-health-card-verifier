// Import path for resolving file paths
var path = require('path');
// module.exports = {
//   // Specify the entry point for our app.
//   entry: [
//     path.join(__dirname, 'index.ts')
//   ],
//   // Specify the output file containing our bundled code
//   output: {
//     path: path.join( __dirname, 'bundle' ),
//     filename: 'index.js'
//   },
//   target: "node",
//   module: {
//     loaders: [
//       {
//         test: /\.json$/, 
//         loaders: ['json']
//       }
//     ]
//   }
// }



module.exports = {
  entry: ['./src/index.js'],
  target: 'node',
  output: {
    path: `${process.cwd()}/bundle`,
    filename: 'index.js',
    libraryTarget: 'umd'
  }
};