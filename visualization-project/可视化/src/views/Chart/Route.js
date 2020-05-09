import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Bar from './Bar'
import Pie from './Pie'
import Line from './Line'
import Gauge from './Gauge'
import Funnel from './Funnel'

export default [
  <Route key="chart" path="chart" component={App}>
    <IndexRoute component={Home} />
    <Route path="bar" component={Bar} />
    <Route path="pie" component={Pie} />
    <Route path="line" component={Line} />
    <Route path="gauge" component={Gauge} />
    <Route path="funnel" component={Funnel} />
  </Route>
]
