import Taro, {Component, useState} from '@tarojs/taro';
import {View, Button} from '@tarojs/components';
import {CounterContext, UserContext} from './counter-context.js';
import Child from './child';

class Context extends Component {
  render () {
    const [count, setCount] = useState (0);
    const [name, setName] = useState ('你好');
    return (
      <CounterContext.Provider value={count}>
        <UserContext.Provider value={name}>
          <View className='container'>
            <Child />
            <Button onClick={() => setName ('aaa')}>改名字</Button>
            <Button onClick={() => setCount (0)}>Reset</Button>
            <Button onClick={() => setCount (prevCount => prevCount + 1)}>
              +
            </Button>
            <Button onClick={() => setCount (prevCount => prevCount - 1)}>
              -
            </Button>
          </View>
        </UserContext.Provider>
      </CounterContext.Provider>
    );
  }
}
export default Context;
