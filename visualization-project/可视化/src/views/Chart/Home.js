import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="chart/bar">柱状图 bar</Link></li>
          <li><Link to="chart/pie">饼图 pie</Link></li>
          <li><Link to="chart/line">折线图 line</Link></li>
          <li><Link to="chart/gauge">仪表盘 gauge</Link></li>
          <li><Link to="chart/funnel">漏斗图 funnel</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;
