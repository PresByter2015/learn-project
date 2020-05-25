# canvas
- [Canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

## 绘制矩形
- fillRect(x, y, width, height)
绘制一个填充的矩形
- strokeRect(x, y, width, height)
绘制一个矩形的边框
- clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。

上面提供的方法之中每一个都包含了相同的参数。x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。

## 绘制路径
- beginPath()
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- closePath()
闭合路径之后图形绘制命令又重新指向到上下文中。
- stroke()
通过线条来绘制图形轮廓。
- fill()
通过填充路径的内容区域生成实心的图形。
生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

## 线
lineTo(x, y)
绘制一条从当前位置到指定x以及y位置的直线。
该方法有两个参数：x以及y ，代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点，等等。。。开始点也可以通过moveTo()函数改变。
- [https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)

## 圆弧
arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
arcTo(x1, y1, x2, y2, radius)
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。
这里详细介绍一下arc方法，该方法有六个参数：x,y为绘制圆弧所在圆上的圆心坐标。radius为半径。startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

**注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
弧度=(Math.PI/180)*角度。**

## 二次贝塞尔曲线及三次贝塞尔曲线 
quadraticCurveTo(cp1x, cp1y, x, y)
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
起始点 使用`ctx.moveTo(75,25);`进行设置。
![二次贝塞尔曲线原理图](https://pic002.cnblogs.com/images/2012/436120/2012101521323283.gif)
------------
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
![三次贝塞尔曲线](https://pic002.cnblogs.com/images/2012/436120/2012101521423763.gif)

## 矩形
rect(x, y, width, height)
绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

## 绘制图片
- [绘制图片](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images)
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
其中 image 是 image 或者 canvas 对象，sx 和 sy 是其在目标 canvas 里的起始坐标。
 sWidth, sHeight 是目标的图片宽度和高度
 dx, dy 是目标的图片宽度和高度

当8个参数时
 其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。
![示意图](https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/225/46ffb06174df7c077c89ff3055e6e524/Canvas_drawimage.jpg)

## canvas的save与restore方法的作用
网上搜罗了一堆资料，最后总结一下。

save：用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。

对canvas中特定元素的旋转平移等操作实际上是对整个画布进行了操作，所以如果不对canvas进行save以及restore，那么每一次绘图都会在上一次的基础上进行操作，最后导致错位。比如说你相对于起始点每次30度递增旋转，30，60，90.如果不使用save 以及 restore 就会变成30, 90, 150，每一次在前一次基础上进行了旋转。save是入栈，restore是出栈。