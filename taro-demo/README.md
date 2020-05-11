# taro
### 使用匿名函数
- [使用匿名函数](https://nervjs.github.io/taro/docs/event.html)
注意：在各小程序端，使用匿名函数，尤其是在 循环中 使用匿名函数，比使用 bind 进行事件传参占用更大的内存，速度也会更慢。
### 枚举条件渲染
- [枚举条件渲染](https://nervjs.github.io/taro/docs/condition.html#%E6%9E%9A%E4%B8%BE%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93)
```js
function Loading (props) {
  const { loadingText, LOADING_STATUS, loadingStatus, onRetry } = props
  return (
    <View className='loading-status'>
      {
        {
          'loading': loadingText,
          'fail': <View onClick={onRetry}> 加载失败, 点击重试 </View>,
          'no-more': '没有更多了'
        }[loadingStatus] /** loadingStatus 是 `loading`、`fail`、`no-more`  其中一种状态 **/
      }
    </View>
  )
}
```
### taroKeys
- [taroKeys](https://nervjs.github.io/taro/docs/list.html#tarokeys)
taroKey 适用于循环渲染原生小程序组件，赋予每个元素唯一确定标识，转换为小程序的 wx:key。

## 函数式组件
- [函数式组件](https://nervjs.github.io/taro/docs/functional-component.html)
### 函数式组件
在 Taro 中使用函数式组件有以下限制：

1. 函数的命名需要遵循帕斯卡式命名法；(首字母大写：UserName)
2. 一个文件中只能定义一个普通函数式组件或一个 Class 组件

### 类函数式组件
1. 函数的命名必须以 render 开头，render 后的第一个字母需要大写
2. 函数的参数不得传入 JSX 元素或 JSX 元素引用
3. 函数不能递归地调用自身

### Children 与组合
- [Children 与组合](https://nervjs.github.io/taro/docs/children.html)
请不要对 this.props.children 进行任何操作。Taro 在小程序中实现这个功能使用的是小程序的 slot 功能，也就是说你可以把 this.props.children 理解为 slot 的语法糖，this.props.children 在 Taro 中并不是 React 的 ReactElement 对象，因此形如 this.props.children && this.props.children、this.props.children[0] 在 Taro 中都是非法的。

this.props.children 无法用 defaultProps 设置默认内容。由于小程序的限制，Taro 也无法知道组件的消费者是否传入内容，所以无法应用默认内容。

不能把 this.props.children 分解为变量再使用。由于普通的 props 有一个确切的值，所以当你把它们分解为变量运行时可以处理，this.props.children 则不能这样操作，你必须显性地把 this.props.children 全部都写完整才能实现它的功能。
