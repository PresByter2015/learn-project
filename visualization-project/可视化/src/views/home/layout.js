/**
 * 首页布局方式
 */
export function layout(count) {
  let col, sectionw, articlew, snapshotHeight, sectionlr;

  //获取dashboard宽度
  let rectCollection = document.body.getClientRects();
  let dashboardWidth = rectCollection[0].width;

  //count为1或0都当做1(0的时候是新建)
  if (count < 2) {
    col = 1;
    sectionw = 0.5 * dashboardWidth;
  } else if (count === 2) {
    col = 2;
    sectionw = 0.8 * dashboardWidth;
  } else if (count >= 3) {
    col = 3;
    sectionw = 0.85 * dashboardWidth;
  }

  articlew = sectionw / col;
  snapshotHeight = (articlew - 20 - 2) * (9 / 16) + 2;//减掉的2px是snapshot-wrap的左右边框,加上的2px是snapshot-wrap的上下边框
  sectionlr = (dashboardWidth - sectionw) / 2;

  return { sectionw, articlew, snapshotHeight, sectionlr };
}
