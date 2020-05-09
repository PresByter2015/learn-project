export default {
  //最小不缩放的尺寸
  WIDTH_THRESHOLD: 350,
  HEIGHT_THRESHOLD: 100,
  //放大时字体缩放相对于宽度缩放的比例
  FONT_ZOOM_UP_STEP: 0.3,
  //缩小时字体缩放相对于宽度缩放的比例
  FONT_ZOOM_DOWN_STEP: 0.8,

  //仪表盘色条宽度相对于宽度缩放的比例
  GUAGE_AXIS_LINE_STEP: 0.5,

  //仪表盘指示刻度值距色条的距离相对于宽度缩放的比例
  GUAGE_SPLIT_LINE_STEP: 0.2,

  //饼图图例距右侧的距离相对于宽度缩放的比例
  PIE_LEGEND_RIGHT_STEP: 1,

  TEXT_BASE_FONT_SIZE: 28,

  calculateZoom(width, height) {
    return Math.min(width / this.WIDTH_THRESHOLD, height / this.HEIGHT_THRESHOLD) //系数
  },

  getScale(zoom, coefficient) {
    if (zoom < 1) {
      return (1 - (1 - zoom) * coefficient)
    } else {
      return (1 + (zoom - 1) * coefficient)
    }
  }
}
