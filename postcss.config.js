module.exports = {
    plugins: [
      require('autoprefixer')({
        // Ignorar específicamente esos warnings
        ignoreWarnings: [216, 118]
      })
    ]
  };