export function getWidgetData(chart, size, col, row, cols, rows, position) {
  let result = {};

  if (position === 'drag') {
    if (col) {
      result.col = col - Math.floor(size.sizex / 2);
    }
    if (row) {
      result.row = row - Math.floor(size.sizey / 2);
    }

    // 超出 cols
    if (result.col > cols - size.sizex) {
      result.col = cols - size.sizex + 1;
    }

    // 超出 rows
    if (result.row > rows - size.sizey) {
      result.row = rows - size.sizey + 1;
    }

    if (result.col < 0) {
      result.col = 0;
    }

    if (result.row < 0) {
      result.row = 0;
    }
  }

  return { chart, ...size, ...result };
}

// let tool = {}
// ['select', 'drag', 'straight', 'broken'].map((action) => {
//   tool[action] = action;
//   tool['is' + action.substring(0, 1).toUpperCase() + action.substring(1)] = (function(action) {
//     return function(tool) {
//       return tool && tool.operate === action;
//     }
//   })(action);
// });
