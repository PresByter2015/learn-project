import $ from 'jquery';

const decode = decodeURIComponent;

$.deparam = function (params, coerce) {
  let obj = {},
    coerceTypes = { 'true': !0, 'false': !1, 'null': null };

  // Iterate over all name=value pairs.
  $.each(params.replace(/\+/g, ' ').split('&'), function (j, v) {
    let param = v.split('='),
      key = decode(param[0]),
      val,
      cur = obj,
      i = 0,

      // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
      // into its component parts.
      keys = key.split(']['),
      keysLast = keys.length - 1;

    // If the first keys part contains [ and the last ends with ], then []
    // are correctly balanced.
    if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLast])) {
      // Remove the trailing ] from the last keys part.
      keys[keysLast] = keys[keysLast].replace(/\]$/, '');

      // Split first keys part into two parts on the [ and add them back onto
      // the beginning of the keys array.
      keys = keys.shift().split('[').concat(keys);

      keysLast = keys.length - 1;
    } else {
      // Basic 'foo' style key.
      keysLast = 0;
    }

    // Are we dealing with a name=value pair, or just a name?
    if (param.length === 2) {
      val = decode(param[1]);

      // Coerce values.
      if (coerce) {
        val = val && !isNaN(val) ? +val              // number
          : val === 'undefined' ? undefined         // undefined
            : coerceTypes[val] !== undefined ? coerceTypes[val] // true, false, null
              : val;                                                // string
      }

      if (keysLast) {
        // Complex key, build deep object structure based on a few rules:
        // * The 'cur' pointer starts at the object top-level.
        // * [] = array push (n is set to array length), [n] = array if n is
        //   numeric, otherwise object.
        // * If at the last keys part, set the value.
        // * For each keys part, if the current level is undefined create an
        //   object or array based on the type of the next keys part.
        // * Move the 'cur' pointer to the next level.
        // * Rinse & repeat.
        for (; i <= keysLast; i++) {
          key = keys[i] === '' ? cur.length : keys[i];
          cur = cur[key] = i < keysLast
            ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
            : val;
        }

      } else {
        // Simple key, even simpler rules, since only scalars and shallow
        // arrays are allowed.

        if ($.isArray(obj[key])) {
          // val is already an array, so push on the next value.
          obj[key].push(val);

        } else if (obj[key] !== undefined) {
          // val isn't an array, but since a second value has been specified,
          // convert val into an array.
          obj[key] = [obj[key], val];

        } else {
          // val is a scalar.
          obj[key] = val;
        }
      }

    } else if (key) {
      // No value was defined, so set something meaningful.
      obj[key] = coerce
        ? undefined
        : '';
    }
  });

  return obj;
};

/**
 * [deparamObj 将表单键值对象转换成js对象]
 * @param  {[type]} obj    例
 * {
 *   "a[0][color]":"#2170bf",
 *   "a[0][opacity]":1,
 *   "a[0][borderColor]":"#1f80ad",
 *   "a[1][show]":false,
 *   "a[1][textStyle][fontSize]":12,
 *   "a[1][textStyle][color]":"#ffffff"
 * }
 * @param  {[type]} coerce 是否修正 boolen undefined null 值类型，
 * 不修正将是以字符串表示 'true','false', 'null', 'undefined'
 *
 * @return {[type]}        例
 * {
 *   a: [
 *     {
 *       color: "#2170bf",
 *       opacity: 1,
 *       borderColor: "#1f80ad"
 *     },
 *     {
 *       show: false,
 *       textStyle: {
 *         fontSize: 12,
 *         color: "#ffffff"
 *       }
 *     }
 *   ]
 * }
 */
$.deparamObj = function (obj, coerce) {
  if ($.isPlainObject(obj)) {
    let data = {};
    for (let param in obj) {
      if (obj[param] === undefined) {
        data[param] = 'undefined';
      } else if (obj[param] === null) {
        data[param] = 'null';
      } else {
        data[param] = obj[param];
      }
    }
    return $.deparam($.param(data), coerce);
  } else {
    return obj;
  }
};

export default $;
