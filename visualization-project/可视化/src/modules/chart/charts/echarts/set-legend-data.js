export default function(partial, entire) {
  if (partial && partial.data && partial.data.length) {
    entire.data = partial.data
  }

  // entire.data.map((item, i) => {
  //   if (typeof entire.data[i] === 'object') {
  //     entire.data[i].name = partial.data[i]
  //   } else {
  //     entire.data[i] = partial.data[i]
  //   }
  // })

  return entire
}
