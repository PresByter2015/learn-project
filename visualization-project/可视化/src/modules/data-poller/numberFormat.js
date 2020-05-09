export default {
  isThousandFormat(number) {
    let match = number.match(/^(\d{1,3},)(\d{3},)*/g)
    return !!match
  },

  parse(number) {
    return number.replace(/,/g,'')
  }
}
