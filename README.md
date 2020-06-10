# Node-TS-Koa-vue
妙味课堂公开课
慕课网--
# [Node+TS+Koa+vue 商城全栈（前后端）开发](https://www.bilibili.com/video/av68998172?from=search&seid=9668820013369664535)
# [egg.js 项目](https://www.imooc.com/video/20383)
# [UmiJS](https://umijs.org/zh/)
## 共屏插件
browser-sync start --server --files "es6/*.html,*.*"
### 进度 
[p190](https://www.bilibili.com/video/av68998172?p=190)

[https://es6console.com/](https://es6console.com/)
[https://www.babeljs.cn/repl](https://www.babeljs.cn/repl)


位 -> 字节 -> 字符 -> KB -> MB ...
0&1 -> 8位 (11111111)  256
ascII 
## node开发方向
- GUI 图形用户界面  office，vscode  [electron](https://electronjs.org/)


- CLI 命令行界面 比较节省计算机资源        
- Server 服务提供（网络服务）
 
### CLI
   command [subCommand] [options] [arguments]

   command:命令 ，比如 vue
   [subCommand]：子命令，比如 vue create
   [options]：选项，配置，同一个命令不同的选项会有不一样的操作结果，eg：vue -h;vue -v
   [arguments]: 参数，某些命令需要使用的值，比如 vue create App

   选项与参数的区别：选项是命令内置实现，用户进行选择，参数一般是用户决定传入的值
   选项一般会有全拼与简写形式（具体看使用的命令帮助），比如 --version = -v
	全拼：以 -- 开头 / 简写：以 - 开头
	选项也可以接受值，值写在选项之后，通过空格分隔
	多个简写的选项可以连写，开头使用一个 - 即可，需要注意的是，如果有接受值的选项需要放在最后，比如：
		vue create -d -r <-r的值> myApp
		vue create -dr <-r的值> myApp

## windows 下 ls命令的实现

## npm包
- package.json 文件
- dependencies 项目包，第三方包
- devDependencies  仅开发使用的第三方包
1. 新增一个文件夹（不能是汉字）
2. npm init
3. 注册npmjs.org账号[https://www.npmjs.com/](https://www.npmjs.com/)
4. npm login / npm adduser  登录  
5. 输入Username、Password、Email (提示：Logged in as presbyter on https://registry.npm.taobao.org/.)
6. npm publish (如果报错403，可能是package.json中登记的name已近被采用了。重名了，所以你得换一个)



# npm切换源
1. npm install -g nrm
2. nrm ls  列出可选的源
 ```bash
$ nrm ls

*  npm ---- https://registry.npmjs.org

    cnpm --- http://r.cnpmjs.org/

    taobao -http://registry.npm.taobao.org/

    eu ----- http://registry.npmjs.eu/

    au -----  http://registry.npmjs.org.au/

    sl ----- http://npm.strongloop.com/

    nj -----  https://registry.nodejitsu.com/

#带*的是当前使用的源，上面的输出表明当前源是官方源。

 ```
 3. nrm use taobao 切换到taobao
 4. nrm最常有的命令有 ：
 ```bash
1.nrm ls 查看已有的源 

2.nrm add <源名称> <源地址> 新增源 

3.nrm use <源名称>切换到现有的源

4.nrm test  测速
 ```
# 数据库
	数据库(Database)是按照数据结构来组织、存储和管理数据的仓库。
	MySQL
		最流行数据管理系统
	安装
		官网：https://www.mysql.com/
		下载：https://dev.mysql.com/downloads/mysql/
		XAMPP：https://www.apachefriends.org/index.html
			注意：安装路径不要出现中文空格等字符
    MySQL特点
		- 数据以表格的形式出现
		- 表格中每一行表示一组数据
		- 表格中每一列表示某组数据对应的字段（属性）
		- 若干这样的行和列就组成了一张表
		- 若干个表格组成一个库
		
		MySQL 服务就是维护了若干个这样的库
    启动服务
		注意：如果需要使用MySQL，需要首先启动MySQL服务器
	连接MySQL
		通过 CLI 进行连接管理数据
		通过 GUI 程序进行连接管理数据库
		通过程序（Node.js、PHP、Java……）提供的 API 连接管理数据库
    创建（或选择）要操作的数据库
		- 连接
			mysql -uroot -p
		- 查看所有数据库
			show databases;
		- 选择要操作的数据库
			use <database>;
		- 创建新的数据库
			create database <database>;
    SQL：结构化查询语言(Structured Query Language)
		- DDL（Data Definition Language）数据库定义语言
		- DML（Data Manipulation Language）数据操纵语言
		- DCL（Data Control Language）数据库控制语言
		- TCL（Transaction Control Language）事务控制语言
    数据库
	node & mysql - mysql2
	安装
		npm i mysql2
	使用
		const mysql = require('mysql2/promise')
    连接数据库
		const connection = await mysql.createConnection(opts)
	选项
		host：数据库服务器
		user：数据库连接用户名称
		password：数据连接密码
		database：要操作的数据库
    查询所有数据
		SELECT * FROM table_name
		实际使用中，并不推荐 * 
		SELECT column_name,column_name FROM table_name
	别名
		可以给 字段 和 表 加别名
		SELECT column_name as c1,column_name as c2 FROM table_name as t WHERE t.column_name = val
    Node.js - mysql2
		connection.query( SQL语句 )

		返回值依据其操作来决定
			- SELECT：[数据集合，字段集合]

# 数据库基本操作
	创建数据库
		CREATE DATABASE 数据库名称 

		CREATE DATABASE 数据库名称 DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_bin

		CREATE TABLE 数据库表名称 (
			字段名称 字段属性...,
			PRIMARY KEY (主键字段名称),
			INDEX 索引名称(索引字段...)...
		) ENGINE=InnoDB DEFAULT CHARSET=utf8

	字段属性设置
		字段类型：int(10)、char(10)、varchar(200)
		是否为null：NOT NULL
		无符号：UNSIGNED
		自动增长：AUTO_INCREMENT
		默认值：DEFAULT 0

	数据添加
		   INSERT INTO 表名称 (字段名称...) VALUES (值)
	批量添加
		   INSERT INTO 表名称 (字段名称...) VALUES (值),(值)...
	数据修改
		UPDATE 表名称 SET 字段名称=值
	多字段修改
		UPDATE 表名称 SET 字段名称=值, 字段名称=值...
	条件修改
		UPDATE 表名称 SET 字段名称=值 WHERE 条件表达式
	数据删除
		DELETE  FROM 表名称 WHERE 条件表达式
	整表删除
		DELETE  FROM 表名称
	删除表的其他方法
		DROP 表名称：删除表、数据以及结构

		TRUNCATE 表名称：删除表的数据，保留结构，不支持事务，不可撤销恢复

		DELETE 表名称：删除表的数据, 保留结构，支持事务
	数据查询
		SELECT 字段,字段... FROM 表名称
	通配符
		SELECT * FROM 表名称
	数据查询 - 去重
		SELECT DISTINCT 字段,字段... FROM 表名称
		
		- DISTINCT 必须在字段名之前
		- 如果有多个字段，则为 AND
	数据查询 - 分组
		SELECT 字段,字段... FROM 表名称 GROUP BY 字段名称,字段名称...
		
		- 如果有多个字段，则为 AND
	数据查询 - 别名
		SELECT 字段 as 别名,字段 as 别名... FROM 表名称		
		- 通配符不能设置别名	
	数据查询 - 条件
		SELECT 字段... FROM 表名称	 WHERE 条件表达式
		表达式的格式为：
			字段名称 运算符 值
			=、<>、>、<、>=、<=、BETWEEN、LIKE、IN
		AND、OR
	数据查询 - 模糊查询
		SELECT 字段... FROM 表名 WHERE 字段名 LIKE '规则'
	通配符
		%：一个或多个字符
		_：一个字符
	数据查询 - 模糊查询 - 正则
		SELECT 字段... FROM 表名 WHERE 字段名 REGEXP '规则'
		规则：正则表达式
		注意：字符串转义，\d 需要写成 '\\d'
	数据查询 - 排序
		SELECT 字段 FROM 表名 ORDER BY 字段 ASC|DESC, 字段 ASC|DESC;
		
		- ASC：升序，从小到大，默认
		- DESC：降序，从大到小
		- 如果有多个排序字段和规则，执行顺序为从做到右
	数据查询 - 限制和偏移
		SELECT 字段 FROM 表名 LIMIT n OFFSET m
		
		SELECT 字段 FROM 表名 LIMIT n

		SELECT 字段 FROM 表名 LIMIT m,n

		- ORDER BY 必须在 LIMIT 之前 WHERE（GROUP BY） 之后
	数据查询 - 函数
		count、sum、avg、lcase、ucase、len……

	数据查询 - 多表查询
		SELECT * FROM 表一, 表二 WHERE 表一.字段 运算符 表二.字段

	数据查询 - 内连接（同上）
		SELECT * FROM 表一 JOIN 表二 ON 表一.字段 运算符 表二.字段
		SELECT * FROM 表一 INNER JOIN 表二 ON 表一.字段 运算符 表二.字段
	数据查询 - 左连接
		SELECT 字段 FROM 表一 LEFT JOIN 表二
ON 表一.字段 运算符 表二.字段
		
		LEFT JOIN 关键字从左表（表一）返回所有的行，即使右表（表二）中没有匹配。如果右表中没有匹配，则结果为 NULL。
	数据查询 - 右连接
		SELECT 字段 FROM 表一 RIGHT JOIN 表二
ON 表一.字段 运算符 表二.字段
		
		RIGHT JOIN 关键字从右表（表二）返回所有的行，即使左表（表一）中没有匹配。如果左表中没有匹配，则结果为 NULL。	



豆瓣电影测试地址
https://api.douban.com/v2/movie/top250?start=1&count=40&apikey=0df993c66c0c636e29ecbb5344252a4a
文档地址
http://www.doubanapi.com/movie.html#top250