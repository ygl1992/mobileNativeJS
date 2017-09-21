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
	var textList = document.querySelector('.textList');
	var now = 0;
	var length = 20;

	pushCreate()

	swiperBar({
		wrap: page,
		dir: 'y',
		backOut: 'out'
	});

	/* 上滑生成元素，要调用的方法 */
	function pushCreate(){
		var start = now*length;
		var end = start+length;

		for(var i=start; i<end; i++){
			var li = document.createElement('li');
			li.innerHTML = data[i];
			textList.appendChild(li);
		}
	}
})();