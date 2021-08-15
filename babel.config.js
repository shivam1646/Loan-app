module.exports = {
    sourceType: 'unambiguous',
    env: {
      test: {
        presets: [
          [
            '@babel/env',
            {
              targets: {
                node: 'current'
              }
            }
          ]
        ]
      }
    }
  };
  