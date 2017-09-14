/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-14 15:01:46
 * @version $Id$
 */


function tap(el, fn){
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
function css(el, attr, val){
	var transformArrt = [
		'rotate',
		'rotateX',
		'rotateY',
		'rotateZ',
		'skewX',
		'skewY',
		'scale',
		'scaleX',
		'scaleY',
		'translateX',
		'translateY',
		'translateZ'
	]

	for(var i=0; i<transformArrt.length; i++){
		if( attr == transformArrt[i] ){	//如果attr等于transform中的一个值，就代表用户想要操作的是transform
			return transform(el, attr, val)

		}
	}

	if( val == undefined ){	// 当val不为空的时候，就是设置样式
		if( attr == 'opacity' ){
			el.style[attr] = val;
		}else{
			el.style[attr] = val+'px';
		}
	}else{		// 当val为空的时候，就是获取样式
	var val = getComputedStyle(el)[attr];
		val = parseFloat(val);
		return val?val:0;
	}
}

/* transform用来设置和获取transform相关的值 */
function transform(el, attr, val){
	if( !el.transform ){
		el.transform = {
		}
	}

	/* 获取元素相应的值 */
	if( val == undefined ){
		return el.transform[attr]?el.transform[attr]:0;
	}

	el.transform[attr] = val;	// 记录对象中元素的值
	/*
		旋转 deg
		缩放
		斜切 deg
		位移 px
	*/
	var str = '';
	for( var s in el.transform ){
		switch(s){
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'rotateZ':
			case 'skewX':
			case 'skewY':
				str += s + '('+ el.transform[s] +'deg)';
				break;
			case 'scale':
			case 'scaleX':
			case 'scaleY':
				str += s + '('+ el.transform[s] +')';
				break;
			case 'translateX':
			case 'translateY':
			case 'translateZ':
				str += s + '('+ el.transform[s] +'px)';
				break;
		}
	}
		
	// 我们所有的设置都存在transform这个对象中，在真正设置的时候，需要把transform的所有设置都连接过来
	el.style.WebkitTransform = el.style.transform = str;
}