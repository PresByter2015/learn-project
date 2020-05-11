import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';

import Counter from './counter';

class Child extends Component {
  shouldComponentUpdate () {
    // 即便返回 false 也不会阻止 CounterContext 更新消费它的组件
    return false;
  }

  render () {
    return <View>我是child
    <Counter />
    </View>;
  }
}

export default Child;
