import Index from '../views/Index';
import Editor from '../views/editor/index';
import Output from '../views/output/index';
import DataSet from '../views/data-set/index';
import AppHome from '../views/home/index';

const childRoutes = [];
childRoutes.push({
  path: '/editor',
  childRoutes: [{
    path: ':id',
    component: Editor
  }]
});
childRoutes.push({
  path: '/output',
  childRoutes: [{
    path: ':id',
    component: Output
  }]
});
childRoutes.push({
  path: '/data-set',
  component: DataSet
});

export default {
  path: '/',
  component: Index,
  indexRoute: {
    component: AppHome
  },
  childRoutes
};

