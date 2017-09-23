/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-21 11:43:25
 * @version $Id$
 */

/* 滑动导航 */
(function(){
	var nav = document.querySelector('.nav');

	swiper({
		wrap: nav,
		dir: 'x',
		backOut: 'out'
	});
})();

/* 点击展开导航 */
(function(){
	var nav = document.querySelector('#nav');
	var winH = document.documentElement.clientHeight;
	var navOpen = document.querySelector('.navOpen');
	var navDetails = document.querySelector('.navdetails');
	var openH = winH - nav.getBoundingClientRect().bottom;

	tap(navOpen, function(){
		if( css(navDetails, 'height') ){
			//收缩
			css(navDetails, 'height', 0)
		}else{
			//展开
			css(navDetails, 'height', openH)
		}
	});
})();

/* 幻灯片 */
(function(){
	var tabImg = document.querySelector('#tabImg');
	var imgs = document.querySelector('.imgs');
	var number = document.querySelector('.number');
	var now = 0;

	imgs.innerHTML += imgs.innerHTML;
	var img = imgs.querySelectorAll('li');
	var imgW = css(tabImg, 'width');

	imgs.style.width = img.length+'00%';
	for(var i=0; i<img.length; i++){
		img[i].style.width = 100/img.length+'00%';
	}

	toNum();

	/* 修改number的页码 */
	function toNum(){
		number.innerHTML = '<span class="t">'+(now%(img.length/2)+1)+'</span>/<span class="d">'+(img.length/2)+'</span>';
	}
	
	/* 滑屏修改幻灯片 */
	swiper({
		wrap: tabImg,
		dir: 'x',
		backOut: 'none',
		start: function(){
			imgs.style.transition = 'none';
			imgW = css(tabImg, 'width');
			
			/* 处理无缝 */
			if( now == 0 ){
				now = img.length/2;
			}else if( now==img.length-1 ){
				now=img.length/2-1;
			}
			css(imgs, 'translateX',  -now*imgW);
		},
		end: function(){
			cancelAnimationFrame(imgs.timer);
			var nowX = css(imgs, 'translateX');
			now = -Math.round(nowX/imgW);
			nowX = -now*imgW;
			imgs.style.transition = '0.3s';
			css(imgs, 'translateX', nowX);
			toNum();
		}
	});
})();

/* 假的页面数据 */
var data = [];
for(var i=0; i<100; i++){
	data.push('<img src="img/img.jpg" alt=""><p>这是第'+i+'个li的内容</p>');
}

/* 整个页面的滑屏 */
(function(){
	var page = document.querySelector('.page');
	var scroll = document.querySelector('.scroll');
	var header = document.querySelector('#header');
	var textList = document.querySelector('.textList');
	var nav = document.querySelector('#nav');
	var navTop  = nav.getBoundingClientRect().top;
	var footer = document.querySelector('footer');
	var footerH = css(footer, 'height');
	var min = 0;	//移动出去的最大距离
	var now = 0;
	var length = 20;
	var pullState = document.querySelector('.pullState');
	var pullStateRange = 60; //下拉刷新的临界点

	pushCreate()

	swiperBar({
		wrap: page,
		dir: 'y',
		backOut: 'out',
		start: function(){
			min = css(page, 'height') - css(scroll, 'height');
		},
		move: function(){
			//导航吸附
			var scrollY = css(scroll, 'translateY');
			toNav();

			/* 下拉状态更新 */
			if( scrollY>pullStateRange ){
				pullState.innerHTML = '松开立即更新';
			}else{
				pullState.innerHTML = '下拉加载最新消息';
			}
		},
		end: function(){
			var scrollY = css(scroll, 'translateY');
			if( scrollY>pullStateRange ){
				//当下拉到达临界点时
				cancelAnimationFrame(scroll.timer);
				
				startMove({
					el: scroll,
					type: 'easeOut',
					time: 200,
					target: {
						translateY: pullStateRange
					},
					callIn: function(){
						toNav();
					},
					callBack: function(){
						pullState.innerHTML = '更新中';
						pullCreate();
						startMove({
							el: scroll,
							type: 'easeOut',
							time: 200,
							target: {
								translateY: 0
							},
							callIn: function(){
								toNav();
							}
						});
					}
				});
			}
		},
		over: function(){
			//滚动到底部
			var scrollY = css(scroll, 'translateY');

			toNav();
			
			if( scrollY-footerH <= min ){
				setTimeout(function(){
					now++;
					pushCreate();
				}, 500);
			}
		}
	});

	/*下拉更新最新消息 */
	function pullCreate(){
		var length = Math.round( Math.random()*10);
		var first = textList.children[0];

		for(var i=0; i<length; i++){
			var li = document.createElement('li');
			li.innerHTML = '最新消息'+i;
			textList.insertBefore(li, first);
		}
	}

	// 导航吸附
	function toNav(){
		var scrollY = css(scroll, 'translateY');
		if( -scrollY >= navTop ){
			css(header, 'translateY', 0);
			css(nav, 'translateY', -(navTop+scrollY));
		}else if( scrollY >= 0 ){ // 如果顶部超出了，保持header和导航在顶部的位置保持不变
			css(header, 'translateY', -scrollY);
			css(nav, 'translateY', -scrollY);
		}
	}

	/* 上滑生成元素，要调用的方法 */
	function pushCreate(){
		var start = now*length;
		var end = start+length;
		if( start>=data.length ){
			footer.innerHTML = '我是有底线的';
		}
		end = end>data.length?data.length:end;

		for(var i=start; i<end; i++){
			var li = document.createElement('li');
			li.innerHTML = data[i];
			textList.appendChild(li);
		}
	}
})();	