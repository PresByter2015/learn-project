'use strict';

/**
 * @param {Egg.Application} app - egg application  全局应用对象，默认已经设置好
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/article/detail/:id?', controller.article.detail);
  router.get('/article/lists', controller.article.lists);
  router.post('/article/create', controller.article.create);
  router.get('/product', controller.product.index);
  router.get('/product/detail', controller.product.detail);
  router.get('/product/detail2/:id?', controller.product.detail2);
  router.post('/product/create', controller.product.create);
  router.put('/product/update/:id?', controller.product.update);
  router.delete('/product/delete/:id?', controller.product.delete);
};
