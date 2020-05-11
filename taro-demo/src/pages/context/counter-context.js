import Taro from '@tarojs/taro';

export const CounterContext = Taro.createContext(0);

// 用户登录 context
export const UserContext = Taro.createContext({
    name: 'Guest',
});