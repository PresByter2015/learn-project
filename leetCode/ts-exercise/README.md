# ts 做LeetCode

# 配置等问题
## 安装环境
```bash
npm init -y
npm i typescript
npm i ts-node
```

```bash
tsc .\2.ts --outDir ./dist  #生成的js 放到 dist 目录下
.\node_modules\.bin\ts-node .\2.ts #直接生成js并运行 

./node_modules/.bin/ts-node ./35.ts # linux 执行

npm run dev 70.ts # 直接运行 需要运行的ts文件即可
```
这里 设置了一个`tsconfig.json`文件;直接运行 `tsc`,自动生成js 放到 dist 目录下
# TS
[https://www.tslang.cn/](https://www.tslang.cn/)
[https://www.npmjs.com/package/ts-node](https://www.npmjs.com/package/ts-node)
### bug 收集
- 使用promise 提示错误
	1. tsconfig.json->lib->esnext dom   
	2.  Func http.Some<T>() -> promise<T>
### 安装 TypeScript 编译器
		npm i typescript / npm i -g typescript

	TypeScript 文件
		TypeScript 文件默认以 .ts 为后缀
		TypeScript 是 JavaScript 的扩展，所以 TypeScript 代码要在 浏览器/Node 环境下运行，需要把 TypeScript 代码编译为 JavaScript 代码

```bash
    tsc 1.ts
     .\node_modules\.bin\ts-node src\b\1.ts  
```       
### 编译
	tsc 命令
		tsc 要编译的ts文件 [编译后输出目录及文件]

	tsconfig.json
    [https://www.tslang.cn/docs/handbook/compiler-options.html](https://www.tslang.cn/docs/handbook/compiler-options.html)
		当使用 tsc 并不指定 要编译的ts文件 的情况下，会从当前运行命令所在的目录开始逐级向上查找 tsconfig.json 文件
		tsconfig.json 文件用来配置 tsc 的编译配置选项
		我们也可以通过 --project（-p） 来指定一个包含 tsconfig.json 文件的目录来进行编译
    tsconfig.json 基本配置
		compilerOptions：编译相关设置
			module：指定编译后的代码要使用的模块化系统
			target：指定编译后的代码对应的ECMAScript版本
			outDir：指定编译后的代码文件输出目录
			outFile：将输出文件合并成一个文件（合并的文件顺序为加载和依赖顺序）
        include：指定要包含的编译文件目录
			[]：目录数组，使用 glob 模式
				* 匹配0或多个字符（不包括目录分隔符）
				? 匹配一个任意字符（不包括目录分隔符）
				**/ 递归匹配任意子目录
		exclude：指定不要包含的编译文件目录
			[]：设置同 include ，默认会排除 node_modules 和 <outDir> 指定的目录
### 类型系统
- [basic-types](https://www.tslang.cn/docs/handbook/basic-types.html)
	类型注解（类型声明、类型约束）
		JavaScript 是动态语言，变量随时可以被赋予不同类型的值，变量值的类型只有在运行时才能决定
			- 在编码（编译）阶段无法确定数据类型，会给程序在实际运行中带来极大的隐患
			- 不利于编码过程中的错误排查
		使用类型注解能够在变量声明的时候确定变量存储的值的类型，用来约束变量或参数值的类型，这样在编码阶段就可以检查出可能出现的问题，避免把错误带到执行期间
    语法
		let 变量: 类型

		当变量接收了与定义的类型不符的数据会导致编译失败（警告）
    类型
		TypeScript 定义的类型包括：
			- 数字、字符串、布尔值
			- null、undefined
			- 数组、元组、枚举
			- void、any、Never
            - string、number、boolean：基本类型-小写
		    - String、Number、Boolean：对象类型-大写

		注意：
			基本类型可以赋值给对应包装对象
			包装对象不可以赋值给对应基本类型

		✅ let s: String = 'miaov'
		❎ let s: string = new String('miaov')
    数组
		数组声明语法
			基本语法：
				let list: number[];
			 泛型方式：
				let list: Array<number>;
		注意
			具有相同类型的一组有序数据的集合
			声明数组同时要确定数组存储的数据的类型
			同一个数组中的数据只能有一种类型
    元组
		元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
		对于下标内的数据，数据顺序必须与声明中的类型一一对应
		对于越界下标数据，使用联合类型（新版本 不能使用联合类型）
			(联合类型：声明类型的集合)
    联合类型
		多个类型中的一个，或的关系
			let v: string|number|boolean
	交叉类型
		多个类型的叠加，并且的关系
			let v:string&number&boolean
    枚举
		使用枚举可以为一组数据赋予友好的名字
	格式
		enum Color {Red, Green, Blue}
		
		默认情况下，元素编号从0开始，也可以手动编号
		enum Color {Red=1...}
    其他类型
		null、undefined
		void
		any
		never
    类型推导
		有的时候不一定需要强制使用类型声明，在某些情况下 TS 可以根据语境进行类型推导
		变量初始化
			TS 会根据变量初始化的时候赋予的值进行类型推断
		上下文推断
			TS 也会根据上下文进行类型的推断，比如在事件函数中，函数的第一个参数会根据当前绑定的事件类型推断处理事件对象
### 函数
	基本语法
		function fn(x: Type, y: Type): Type {}
		let fn: (x: Type, y: Type) => Type = 函数实体

		类型约束：
			函数参数
			函数返回值
			无返回值的函数类型约束为 void
    可选参数
		通过 ? 来定义可选参数
			function fn(x: Type, y?: Type): Type
		可选参数默认为 undefined
		可选参数必须在必传参数之后
	参数默认值
		参数默认值与 JavaScript（ES6）一致
		有默认值的参数不是必须在必填参数之后，但是不推荐如此
		有默认值的参数可以不需要明确类型约束
    剩余参数
		参数默认值与 JavaScript（ES6）一致
		剩余参数类型为数组
		如果剩余参数类型多余一个，可以使用 Tuple
    函数重载
		用同名函数实现不同功能
		名称相同，但参数个数、类型、顺序不同
		注：与返回值无关

		any类型 与 联合类型 实现的问题
    函数中的 this
		因为普通函数中的 this 具有执行期绑定的特性，所以在 ts 中的this 在有的时候会指向隐式的指向类型 - any（并不是所有，比如事件函数）
		--noImplicitThis
			我们可以通过 --noImplicitThis 选项来指出 this 隐式 any 类型的错误
		this参数
			我们可以在函数参数中提供一个显示的 this 参数，this 参数是一个假的参数，它出现在参数列表的最前面
### 类
	与 ES2015 中的 class 类似，同时新增了很都实用特性

	成员属性与成员方法
		与 ES2015 不同，TS 中的成员属性可以提取到构造函数以外进行定义
    修饰符
		通过修饰符可以对类中成员属性与成员方法进行访问控制
		public、protected、private、readonly
        public      公开的（默认），所有的地方都能访问，属性和方法 默认是public
        protected   受保护的，在类的内部和他的子类中才能访问
        private     私有的，只能在该对象（类）的内部才可以访问
        readonly    只读的，
		参数属性
			我们可以在参数中使用修饰符，它可以同时定义并初始化一个成员属性
    存取器
		TS 支持 getters/setters 来截取对对象成员的访问

		使用存取器的成员
			private 修饰
			编译目标为 ES5+
			只有 get 的存取器自动被腿短为 readonly
    静态成员
		类的一般成员属性和方法都属于实例对象的，也就是原型链上的，静态成员属于类（也就是构造函数）的，静态成员不需要实例化对象，直接通过类即可调用
    继承
		TS 中类可以通过 extends 类进行继承
			- extends 关键字
			- 单继承
			- super 关键字
			- 修饰符
    抽象类
		类是对具有相同特性的对象的抽象，抽象是对具有相同特性的类的抽象，当派生类（子类）具有的相同的方法但有不同实现的时候，可以定义抽象类并定义抽象方法
        abstract
			抽象方法只定义结构不定义实现
			拥有抽象方法的类必须是抽象类，但是抽象类不一定拥有抽象方法，抽象类中也可以包含有具体细节的方法
			abstract 关键字可以与 修饰符一起使用
			继承了抽象类的子类必须实现了所有抽象方法才能被实例化，否则该子类也必须声明为抽象的
### 接口
	TS 的核心原则之一是对值所具有的结构进行类型检查，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
	interface 关键字
		interface 接口名 {
			attribute: Type,
			...
		}
		let val: 接口;
    类型检查器会检查变量是否符合接口定义的结构
		类型检查器只会检查必须的属性是否存在，以及类型是否匹配
		类型检查器不会检查属性的顺序
    可选属性
		interface 接口名 {
			attribute?: string
		}
	只读属性
		interface 接口名 {
			readonly attribute?: string
		}
    额外属性检查 - 绕开类型检测
		类型断言
			fn({} as Interface)
		通过变量进行转换，先存变量，如何把变量作为参数传入
			let obj = {...}
			fn(obj)
		索引签名
			interface 接口名{
				[attribute: string]: any
			}
    函数类型
		通过接口的形式来定义函数
		函数类型接口并不是定义对象方法
		interface 接口名{
			(param1: string, param2: string): boolean;
		}
    类类型
		通过接口，我们可以明确一个类去符合某种契约

		implements 关键字
		class 类 extends 接口{}
			继承接口的类必须拥有接口定义的必须属性或方法
			一个类可以实现多个接口
			接口之间也可以继承    
### 泛型
	通常我们会使用变量来表示是一个可变的值，通过变量我们就可以使代码具有很高的可重用性，但是在有类型约束的语言中，有时候不利于代码的复用，通过使用泛型，我们就可以解决这个问题，简单的理解可以说是给类型定义变量
    泛型变量
		function fn(arg: string): string{}
		function fn<T>(arg: T): T{}
		function fn<T, S>(arg1: T, arg2: S): [T,S]{}
	数组形式
		function fn<T>(arg: T[]): T[]{}
		function fn<T>(arg: Array<T>): Array<T>{}
    泛型类型
		把泛型作为一种类型使用
		let fn: <T>(arg: T) => T;

	泛型接口
		interface 接口名<T> {
			<T>(arg: T): T;
		}
		let fn: 接口名<number> = function T(arg: T): T {
			return arg;
		}
    泛型类
		class 类名<T> {}
	
	泛型约束
		<T extends 类型>

	类类型
		<T>(c: {new(): T})
### 装饰器
	- [装饰器](https://www.tslang.cn/docs/handbook/decorators.html)
	在尽可能不改变类（对象）结构的情况下，扩展其功能
		启用装饰器模式
			--experimentalDecorators
		装饰器是一种特殊类型的声明，它可以被附加到类声明、属性、方法、参数或访问符上
    装饰器函数
		我们要在一个类或方法上使用装饰器，首先需要提供一个装饰器函数，这个函数会在该装饰器被使用的时候调用

	使用装饰器
		在需要被装饰的类或方法前通过 @装饰器名称 来调用装饰器
		@f
		class 类名 {}
		装饰器可以累加，可以一行也可以多行书写
    类装饰器
		类装饰器应用于构造函数，可以用来监视、修改或替换类定义
		类的构造函数会作为类装饰器函数的唯一一个参数
			function f(constructor: Function) {}
        修改构造函数
			function f<T extends {new(...args: any[]):{}}>(constructor: T) {
                return class extends constructor {
                    age: number = 35;
                }
            }
        装饰器工厂函数
			function f(arg: Object) {
                return function<T extends {new(...args: any[]):{}}>(constructor: T) {
                    return class extends constructor {
                        age: number = arg.age;
                    }
                }
            }
            @f({age: 35})
    方法装饰器
		用来监视、修改或者替换方法定义
		方法装饰器会在调用时传入下列3个参数：
			对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
			成员的名称
			成员属性描述符
































