import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Home from '../pages/home/index';
// import Detail from '../pages/detail/index';
// import List from '../pages/list/index';
import Login from '../pages/login/index';
import NoMatch from '../pages/nomatch/index';
import HomeLayout from '../components/LayoutMain/index';
import routers from './router';
// console.log(JSON.stringify(routers));
export interface Router {
    path: string;
    title: string;
    hideInMenu?: boolean;
    icon?: string;
    Component?: any;
    children?: RouterChild[];
}

export interface RouterChild {
    path: string;
    title: string;
    hideInMenu?: boolean;
    icon?: string;
    children?: any[];
}
// 递归 解构 到函数中...
const enderRouters = (array: Router[] | null) => {
    if (array === null) return [];
    let tmp: any[] = [];
    array.forEach((item) => {
        if (item.children && item.children.length > 0) {
            tmp = [...tmp, ...enderRouters(item.children)];
        } else {
            tmp.push(<Route exact key={item.path} path={item.path} component={item.Component} />);
        }
    });
    return tmp;
};

// console.log(enderRouters(routers));
// HashRouter 哈希路由

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            {/* <Route path="/" component={App} /> */}
            <HomeLayout>
                {/* <HashRouter > */}
                <Switch>
                    {enderRouters(routers)}
                    {/* <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/detail" component={withRouter(Detail)} />
                    <Route exact path="/list" component={withRouter(List)} /> */}
                    <Route path="*" component={NoMatch} />
                </Switch>
                {/* </HashRouter> */}
            </HomeLayout>
        </Switch>
    </BrowserRouter>
);

export default BasicRoute;
