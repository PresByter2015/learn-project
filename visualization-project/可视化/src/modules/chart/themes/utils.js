import intl from 'src/intl'

function colorGroup(opts = {}) {
  let config = Object.assign({
    name: 'color',
    label:  intl.formatMessage({ id: 'polyline color', defaultMessage: '折线颜色' }),
    type: 'colorGroup',
    props: {
      type: 'group'
    },
    value: ['#03a9f4', '#90ed7d'],
    visibleCount: 2,
    canIncrease: true
  }, opts)

  return {
    type: 'computed',
    computed(props = {}) {
      let { series } = props

      if (series) {
        config.visibleCount = series.length
        //config.canIncrease = false

        // if (series.length === 1) {
        //   config.canIncrease = true
        // }
      }

      return config
    }
  }
}

export default {
  colorGroup
}
