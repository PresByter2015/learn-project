import getterSetter from 'modules/object/getterSetter'

/**
 * const formData = {
 *   'bar_color': [
 *     '#03a9f4'
 *   ],
 *   'bar_stack': false,
 *   'bar_width': 10,
 *   'line_areaStyle_normal_opacity': 50,
 *   'line_areaStyle_normal_show': false,
 *   'line_color': [
 *     '#90ed7d'
 *   ],
 *   'line_itemStyle_normal_borderWidth': 3,
 *   'line_itemStyle_normal_opacity': true,
 *   'line_smoothMode': 1
 * }
 *
 * {
 *   "bar": {
 *     "color": [
 *       "#03a9f4"
 *     ],
 *     "stack": false,
 *     "width": 10
 *   },
 *   "line": {
 *     "areaStyle": {
 *       "normal": {
 *         "opacity": 50,
 *         "show": false
 *       }
 *     },
 *     "color": [
 *       "#90ed7d"
 *     ],
 *     "itemStyle": {
 *       "normal": {
 *         "borderWidth": 3,
 *         "opacity": true
 *       }
 *     },
 *     "smoothMode": 1
 *   }
 * }
 *
 */
export default function formDataToObject(data) {
  let obj = {}
  for (let key in data) {
    getterSetter(obj, key, data[key])
  }
  return obj
}
