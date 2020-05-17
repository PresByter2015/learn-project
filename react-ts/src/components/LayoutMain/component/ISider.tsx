import React from 'react';
// import { observer, inject } from 'mobx-react'
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import routers from '../../../router/router';

const { SubMenu } = Menu;
const { Sider } = Layout;

type IProps = {
    collapsed: boolean;
    [key: string]: any;
};
export interface PathInfo {
    path: string;
    region: string[];
}
const MDiv = (arr: any[]) => {
    return arr.map((item: any) => {
        // if (item.children.length > 0) {
        //     return ({MDiv(item.children)})
        // }
        return (
            <Menu.Item key={item.path}>
                <span>{item.title}</span>
            </Menu.Item>
        );
    });
};
// const ISider: React.FC<IProps> = inject('detailStore')(observer((props: IProps) => {
const ISider: React.FC<IProps> = (props: IProps) => {
    const paths: string | any = (localStorage && localStorage.getItem('path')) || { path: '/home', region: [] };
    const defaultSelectedKeys: string = JSON.parse(paths).path || '';
    const defaultOpenKeys: string[] = JSON.parse(paths).region || [];
    // TODO:默认路由显示
    const handleClick = (e: any) => {
        // 存路径
        const pathContent: PathInfo = {
            path: e.keyPath[0],
            region: e.keyPath.slice(1),
        };
        localStorage.setItem('path', JSON.stringify(pathContent));
        // 跳转
        props.handleRouter(e.keyPath[0]);
    };
    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                onClick={handleClick}
                defaultOpenKeys={defaultOpenKeys}
                defaultSelectedKeys={[defaultSelectedKeys]}
            >
                {routers.length > 0 &&
                    routers.map((item) => {
                        if (!item.hideInMenu && item.children.length > 0) {
                            return (
                                <SubMenu
                                    key={item.path}
                                    title={
                                        <span>
                                            <MailOutlined />
                                            <span>{item.title}</span>
                                        </span>
                                    }
                                >
                                    {MDiv(item.children)}
                                </SubMenu>
                            );
                        } else if (!item.hideInMenu && item.children.length === 0) {
                            return (
                                <Menu.Item key={item.path}>
                                    <AppstoreOutlined />
                                    <span>{item.title}</span>
                                </Menu.Item>
                            );
                        } else {
                            return null;
                        }
                    })}
            </Menu>
        </Sider>
    );
};

export default ISider;
