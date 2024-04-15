/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

//export default config;

// rename postcss.config.mjs to postcss.config.cjs
//export default config; to:

module.exports = config;
