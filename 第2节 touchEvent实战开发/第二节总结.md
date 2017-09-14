# 1_电话簿索引功能	
![](https://github.com/ygl1992/mobileNativeJS/blob/master/%E7%AC%AC2%E8%8A%82%20touchEvent%E5%AE%9E%E6%88%98%E5%BC%80%E5%8F%91/images/pic1.jpg?raw=true)

# 2_滑屏操作
	1.按下时，获取元素坐标和手指坐标
	2.move时，获取手指坐标
	3.用move的手指 - start时的手指坐标 = 手指移动距离
	4.start时元素坐标 + 手指移动距离 = 元素的当前距离

# 3_transform获取
	1.通过计算后的样式，获取transform时，只能获取到matrix
	2.matrix不可逆推回给咱们的rotate、translate、scale、skew等等，这些具体的值

	解决方法：
		1.不在把transform通过css去设置
		2.所有的transform设置都在js进行
		3.在transform设置的时候，同步去记录所有的值