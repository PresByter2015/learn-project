function gridCoord2absCoord(gridCoord, cellWidth, cellHeight, scale) {
  if (gridCoord) {
    return {
      x: (gridCoord.col - 1) * cellWidth * scale,
      y: (gridCoord.row - 1) * cellHeight * scale,
      width: gridCoord.sizex * cellWidth * scale,
      height: gridCoord.sizey * cellHeight * scale
    };
  } else {
    return {};
  }
}

export { gridCoord2absCoord };
