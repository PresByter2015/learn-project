import Taro, {Component,useContext} from '@tarojs/taro';
import {View} from '@tarojs/components';
import { CounterContext,UserContext } from './counter-context.js'

class Counter extends Component {
//   static contextType = CounterContext
//   static contextType = UserContext

  render () {
    // const value = this.context
    // console.log(this.context);
    const count = useContext(CounterContext)
    const user =  useContext(UserContext)
    return (
      <View>
          我是counter.js
          {user}
        Count: {count}
      </View>
    )
  }
}
export default Counter;