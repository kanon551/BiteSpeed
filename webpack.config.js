module.exports = {
    // ... other webpack configuration options
  
    module: {
      rules: [
        // ... other rules
  
        // Add this rule for reactflow
        {
          test: /node_modules[\/\\]@?reactflow[\/\\].*.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator',
              ],
            },
          },
        },
      ],
    },
  };