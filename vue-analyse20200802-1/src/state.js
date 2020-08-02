import {observe} from './observer/index.js'
import {proxy} from './util'

export function initState(vm){
    const opts = vm.$options;
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        // 初始化data
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}
function initProps(){}
function initMethod(){}
// function proxy(vm,source,key){
//     Object.defineProperty(vm,key,{
//         get(){
//             return vm[source][key];
//         },
//         set(newValue){
//             vm[source][key] = newValue;
//         }
//     });
// }
function initData(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // Vue._data.a => Vue.a
    for(let key in data){ // 将_data上的属性全部代理给vm实例
        proxy(vm,'_data',key)
    }
    observe(data);
    // 数据的劫持方案 
    // 对象 
    // 数组 
}
function initComputed(){}
function initWatch(){}