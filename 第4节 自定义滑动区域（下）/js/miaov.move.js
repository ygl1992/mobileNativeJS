(function(){
	window.requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
	window.cancelAnimationFrame = window.cancelAnimationFrame|| window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame; 
	if(!requestAnimationFrame){
		var lastTime = Date.now();
		window.requestAnimationFrame = function(callback){
			var id;
			var nowTime = Date.now();
			var delay = Math.max(16.7-(nowTime-lastTime),0);
			id = setTimeout(callback,delay);
			lastTime = nowTime + delay;
			return id;
		};
	}
	if(!cancelAnimationFrame){
		window.cancelAnimationFrame = function(index){
			clearTimeout(index);
		};
	}
})();

function startMove(init){
	var t = 0;
	var b = {};//样式的初始值
	var c = {};//样式的差值	
	var d = Math.ceil(init.time/16.7);
	cancelAnimationFrame(init.el.timer);
	for(var s in init.target) {
		b[s] = css(init.el,s);
		c[s] = init.target[s] - b[s];
	}
	init.el.timer = requestAnimationFrame(move);
	function move(){
		if(t > d){
			cancelAnimationFrame(init.el.timer);
			init.callBack&&init.callBack.call(init.el);
		} else {
			t++;
			for(var s in init.target){
				var val = Tween[init.type](t,b[s],c[s],d);
				css(init.el,s,val);
			}
			init.callIn&&init.callIn.call(init.el);
			init.el.timer = requestAnimationFrame(move);
		}
	}
}	
