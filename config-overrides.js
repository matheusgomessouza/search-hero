// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function override(config) {
 config.resolve = {
  ...config.resolve, //remove if not needed
  alias: {
   ...config.alias, //remove if not needed
   '@': path.resolve(__dirname, 'src'),
  }
 }
 
 return config;
}