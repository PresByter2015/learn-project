import Chart from '../chart'
import _ from 'lodash'
import { drawDashLine } from 'modules/canvas/util/line'
import { animation } from 'modules/canvas/util/flow'

class Edge extends Chart {
  constructor(data, el, theme, props, scale) {
    super(...arguments)
    // this.option.line是一个配置项
    // this.line = props.line; // straight | broken ， points已经决定了，无意义
    this.points = props.points;
    this.width = props.width;
    this.height = props.height;

    this.active = false;
    this.scale = scale;

    this.graph = document.createElement('canvas');
    this.graph.setAttribute('width', this.width);
    this.graph.setAttribute('height', this.height);
    el.appendChild(this.graph);

    this.ctx = this.graph.getContext('2d');
    this.paint();
  }

  paint() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.option && this.option.line && this.option.line.effect) {
      let flowFrame = animation(this.points);
      this.timer = setInterval(() => {
        let flowPoints = flowFrame.get();
        this.draw(flowPoints);
      }, 1000 / 20);
    } else {
      this.draw();
    }
  }

  draw(flowPoints) {
    let ctx = this.ctx;
    let points = this.points;
    if (points && points.length > 0 && points[0]) {
      ctx.canvas.width = this.width;
      ctx.canvas.height = this.height;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.beginPath();
      let dashLine = 0;
      if (this.option.line) {
        ctx.strokeStyle = this.option.line.color;
        ctx.lineWidth = this.option.line.width;
        if (this.option.line.style !== 'solid') {
          dashLine = this.option.line.style === 'dashed' ? 5 : 3;
        }
        if (this.active) {
          ctx.shadowColor = this.option.line.color;
          ctx.shadowBlur = 8;
        }
      }

      ctx.moveTo(points[0][0] * this.scale, points[0][1] * this.scale);
      for (let i = 1; i < points.length; i++) {
        if (dashLine === 0) {
          ctx.lineTo(points[i][0] * this.scale, points[i][1] * this.scale);
        } else {
          drawDashLine(ctx, points[i - 1][0] * this.scale, points[i - 1][1] * this.scale,
            points[i][0] * this.scale, points[i][1] * this.scale, dashLine);
        }
      }

      ctx.stroke();
      ctx.closePath();
    }

    _.map(flowPoints, (point) => {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.arc(point[0] * this.scale, point[1] * this.scale, 2, 0, 2 * Math.PI, false)
      ctx.fill();
      ctx.closePath();
    })
  }

  resize(props) {
    this.scale = props.scale;
    this.points = props.points;
    this.width = props.width;
    this.height = props.height;
    this.paint()
  }

  setLineStyle(lineConfig) {
    let { line } = this.option;
    if (line) {
      _.merge(this.option.line, lineConfig);
    }
    this.paint();
  }

  changeActiveStatus(active) {
    this.active = active;
    this.paint();
  }

}

export default Edge
