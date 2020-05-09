/**
 * socket连接模块
 */
import io from 'socket.io-client'
import urls from 'config/urls'

import event from './event'

let socket = {}

const SocketModule = {
  isConnect() {
    let isconnect = socket.connected || false
    return isconnect
  },
  
  connect() {
    socket = io.connect('', {
      path: urls.get('socket'),
      reconnection: false     // 关闭自动重连
    })

    socket.on('connect', () => {})

    socket.on('disconnect', () => {})

    // 接收后端逐条推送过来的数据
    socket.on('receive', data => {
      let decodeData = JSON.parse(decodeURIComponent(data.replace(/\+/g, '%20'))) //转后端编码过的数据
      event.emit(`receiveData.${decodeData.id}`, decodeData)
    })

    //用于保持长时间数据来往 避免自动断开连接
    socket.on('keepConnect', () => {})
  },

  disconnect() {
    socket.emit('disconnection', () => {})
  },

  add(id) {
    socket.emit('add',id)
  },

  remove(id) {
    socket.emit('remove',id)
  },

  //重新获取数据
  refetch(id) {
    socket.emit('refetch',id)
  }
}

export default SocketModule
