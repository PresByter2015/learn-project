import GridStack from 'modules/gridstack';

let gridStack = null;

export default function (el, opts) {
  return new Promise(resolve => {
    if (gridStack || !opts) {
      return resolve(gridStack);
    }

    let resizeOpts = {
      enabled: true,
      start: (/* event, ui, widget */) => {
        opts.resize.onStart();
      },
      resize: (event, ui, widget) => {
        let id = widget.data('id');
        opts.resize.onResize(id, widget.coords().grid);
      },
      stop: (event, ui, widget) => {
        let id = widget.data('id');
        opts.resize.onStop(id, widget.coords().grid);
      }
    };

    /**
     * 拖拽配置
     */
    function getDragData(elem) {
      let id = +elem.attr('data-id');
      let col = +elem.attr('data-col');
      let row = +elem.attr('data-row');
      return { id, col, row };
    }

    let last = {};
    let draggableOpts = {
      start(event, ui) {
        last = getDragData(ui.$player);
      },

      stop(event, ui, data) {
        let { id, col, row } = data;

        if ((id && id === last.id)
          && (col && col === last.col)
          && (row && row === last.row)) {
          return;
        }

        opts.onDragStop(id, { col, row });
        last = {};
      }
    };

    // 初始化 GridStack
    gridStack = new GridStack(el, Object.assign({}, opts, {
      resize: resizeOpts,
      draggable: draggableOpts
    }));

    const destroy = gridStack.destroy;

    gridStack.destroy = () => {
      destroy.bind(gridStack)();
      gridStack = null;
    };

    return resolve(gridStack);
  });
}

export { gridStack };
