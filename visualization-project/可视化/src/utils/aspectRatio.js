export default function aspectRatio(width, height, ratio, isKeepAspectRatio) {
  if (width <= 0 || height <= 0 || !isKeepAspectRatio) {
    return { width, height };
  }
  let [w, h] = ratio.split(':');
  let dstWidth = width;
  let dstHeight = height;

  // height = width * 9 / 16
  // width = height * 16 / 9
  // 宽度大于高度，根据高度获取宽度的值
  if (width > height) {
    dstWidth = height * w / h;

    // 如果计算之后的宽度大于了原始宽度
    if (dstWidth > width) {
      dstWidth = width;
    }

    dstHeight = dstWidth * h / w;
  } else {
    // 高度大于宽度, 根据宽度获取高度的值
    dstHeight = width * h / w;

    // 如果计算后的高度大于原始高度，这时候要根据宽度获取高度
    if (dstHeight > height) {
      dstHeight = height;
    }
    dstWidth = dstHeight * w / h;
  }

  //console.log(`宽高比: ${ratio} ${parseInt(dstHeight)}/${parseInt(dstWidth)} = ${dstHeight / dstWidth}`)

  return {
    width: dstWidth,
    height: dstHeight
  };
}
