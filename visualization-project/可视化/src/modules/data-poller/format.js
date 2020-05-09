import numberFormat from './numberFormat'

export default function(value) {
  if (numberFormat.isThousandFormat(value)) {
    return numberFormat.parse(value)
  }

  return value
}
