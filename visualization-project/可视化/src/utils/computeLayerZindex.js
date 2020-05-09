export default function computeLayerzIndex(id, zIndex, crossItem, action) {
  let count = crossItem.length;
  let dstZIndex;

  if (count === 0) {
    return {};
  }

  let sorted = crossItem.sort((a, b) => {
    return parseInt(a.zIndex) - parseInt(b.zIndex);
  });

  // 上移一层
  if (action === 'forward') {
    zIndex = zIndex || 1;

    dstZIndex = parseInt(zIndex, 10) + 1;
  }

  // 下移一层
  if (action === 'backward') {
    zIndex = zIndex || 1;

    dstZIndex = parseInt(zIndex, 10) - 1;
  }

  // 顶层
  if (action === 'top') {
    dstZIndex = parseInt(sorted[count - 1].zIndex, 10) + 1;
  }

  // 底层
  if (action === 'bottom') {
    dstZIndex = parseInt(sorted[0].zIndex, 10) - 1;
  }

  return {
    [id]: dstZIndex
  };
}
