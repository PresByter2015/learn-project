module.exports = {
  env: {
    NODE_ENV: '"development"',
    API_ENV: process.env.API_ENV ? `"${process.env.API_ENV}"` : '"other"',
  },
  defineConstants: {
  },
  mini: {},
  h5: {}
}
