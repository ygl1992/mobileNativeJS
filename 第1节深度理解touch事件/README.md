# 1_touch事件

	touchstart	手指触碰
    touchmove	手指移动
    touchend	手指抬起
	在模拟器下 不支持用on的方式来给元素加touch事件，在真机没有问题

----------

# 2_touch事件和mouse事件的区别

	touchstart	手指触碰元素 	———— mousedown
    touchmove	手指触碰元素之后，在屏幕中进行移动 ———— mousemove
    touchend	手指碰触元素之后，在屏幕中抬起 ———— mouseup

	touchstart 	手指触碰元素
	touchmove 	手指触碰元素之后，在屏幕中进行移动
	touchend 	手指触碰元素之后，在屏幕中抬起

----------

# 3_移动端中使用mouse事件
	移动端同样也支持mouse事件
	但是mouse事件 在移动端的执行会有300ms左右的延迟

----------

# 4_事件点透
	事件点透：
		在移动端，我们触碰一个元素的时候，会立即执行，添加在元素上的touch事件，然后记录坐标，300ms之后，在这个坐标点查找元素，如果找到元素有mouse事件，就执行加在元素的mouse事件
    解决方案：
    	给元素清除默认事件

----------

# 5_清除默认事件造成的一系列问题
	新版的Chrome下，不支持直接给document，body的touch事件，阻止默认事件

# 6_清除默认事件造成的一系列问题
	阻止默认事件带来的问题
	给document加阻止默认事件的问题
         —— 解决IOS10+，Safari以及部分安卓浏览器不再支持viewport的最大缩放值和禁止缩放的问题
         —— 解决IOS10+，Safari下给body加overflow:hidden无效的问题
				给元素加了一个绝对定位，但是元素本身没有定位父级，元素超出了body的宽度，body上的overflow对这个元素不起作用
				解决办法：
				1.给body加一个相对定位
				2.给外面的容器加一个相对定位，和overflow
         —— 解决事件点透的问题
         —— 禁止mouse事件执行
         —— 阻止浏览器的回弹效果
         —— 阻止触发浏览器的滚动条
         —— 阻止触发系统菜单
         —— 阻止图片文字被选中
         —— 阻止input的输入

# 8_清除默认事件造成的一系列问题
	最好的解决办法，跳转到一个新页面去，然后让用在新的页面进行输入

# 9_A标签自定义跳转
	touch误触

# 10_如何处理滑屏误触
	el：要点击的元素
		fn：点击之后要执行的事件

		在手指抬起时判断元素有没有发生move事件，如果没有发生move事件，我们就认定用户操作的是一个tap操作

# 11_call
	call的第1个参数代表的是函数执行时的this的指向
    从第2个参数开始就是正常的函数传参
    call的第2个参数，对应函数中的第1个参数

# 12_手指大面积触摸touchmove的问题
	在安卓下，手指触摸元素，容易触发元素的touchmove事件

# 13_touchEvent
	touchEvent:
		touches			当前屏幕上的手指列表
		targetTouches	当前元素上的手指列表
		changedTouches	触发当前事件的手指列表

	clientX和clientY手指相对于可视区的一个坐标
	pageX和pageY手指相对于可视区的一个坐标

# 16_完整的tap封装
	function tap(el, fn){
		var isMove = false;
		var startPoint = {};

		el.addEventListener('touchstart', function(e){
			startPoint = {
				x: e.changedTouches[0].pageX,
				y: e.changedTouches[0].pageY
			}
		});

		el.addEventListener('touchend', function(e){
			var nowPoint = {
				x: e.changedTouches[0].pageX,
				y: e.changedTouches[0].pageY
			}
			
			if( Math.abs(nowPoint.x-startPoint.x)<5 && Math.abs(nowPoint.y-startPoint.y)<5 ){
				fn&&fn.call(el, e);
			}
		});
	}
