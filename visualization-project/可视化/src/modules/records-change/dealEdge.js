export function packEdge(widget) {
  if (widget.chart.type === 'edge') {
    let edge = {
      col: parseInt(widget.x),
      row: parseInt(widget.y),
      sizex: parseInt(widget.width),
      sizey: parseInt(widget.height),
      dataSetting: widget.dataSetting,
      styleSetting: widget.styleSetting,
      chart: widget.chart,
      setting: {
        line: widget.line,
        points: widget.points,
        source: widget.source,
        target: widget.target
      }
    }

    return edge;
  } else {
    return widget;
  }
}

export function packEdgeSetting(widget) {
  return {
    setting: {
      line: widget.line,
      points: widget.points,
      source: widget.source,
      target: widget.target
    },
    col: parseInt(widget.x),
    row: parseInt(widget.y),
    sizex: parseInt(widget.width),
    sizey: parseInt(widget.height)
  }
}


export function unPackEdge(widget) {
  if (widget.chart.type === 'edge') {
    let edge = {
      buuid: widget.buuid,
      id: widget.id,
      x: widget.col,
      y: widget.row,
      width: widget.sizex,
      height: widget.sizey,
      dataSetting: widget.dataSetting,
      styleSetting: widget.styleSetting,
      chart: widget.chart,
      line: widget.setting.line,
      points: widget.setting.points,
      source: widget.setting.source,
      target: widget.setting.target,
      setting: {}
    }

    return edge;
  } else {
    return widget;
  }
}
