export const Demo = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./index').default)
  }, 'demo')
}
