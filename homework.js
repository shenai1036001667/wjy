/*
* @Author: shenai1036001667
* @Date:   2019-12-14 09:36:46
* @Last Modified by:   shenai1036001667
* @Last Modified time: 2019-12-14 09:36:51
*/
window.onload = function(){
	function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, null)[attr];
		}
		}
		function animate(obj,json,callback){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var isStop = true;
				for(var attr in json){
					var now = 0;
					if(attr == 'opacity'){
						now = parseInt(getStyle(obj,attr)*100);
					}else{
						now = parseInt(getStyle(obj,attr));
					}
					var speed = (json[attr] - now) / 8;
					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					var cur = now + speed;
					if(attr == 'opacity'){
						obj.style[attr] = cur / 100;
					}else{
						obj.style[attr] = cur + 'px';
					}
					if(json[attr] !== cur){
						isStop = false;
					}
				}
				if(isStop){
					clearInterval(obj.timer);
					callback&&callback();
				}
			}, 30)
		}
		var p = document.getElementById("p");
		var box = document.getElementById("box");
		var oNavlist = document.getElementById("nav").children;
		var slider = document.getElementById("slider");
		var left = document.getElementById("left");
		var right = document.getElementById("right");
		var index = 1;
		var timer;
		var isMoving = false;	
		var a = setInterval(function(){
			p.style.left = i+"px";
			i-=2;
			if(i <= -400){
				p.style.left = 800 + 'px';
				i = parseInt(p.style.left);
			}
		},30)
		
		box.onmouseover = function(){
			animate(left, {opacity : 50});
			animate(right, {opacity : 50});
			clearInterval(timer);
		}
		box.onmouseout = function(){
			animate(left, {opacity : 0})
			animate(right, {opacity : 0})
			timer = setInterval(next,3000)
		}
		right.onclick = next;
		left.onclick = prev;
		for(var i = 0; i < oNavlist.length; ++i){
			oNavlist[i].index = i;
			oNavlist[i].onclick = function(){
				index = this.index + 1;
				navmove();
				animate(slider,{left:-1200 * index});
			}
		}	
		function next(){
			if(isMoving)
				return;
			isMoving = true;
			index++;
			navmove();
			animate(slider,{left:-1200 * index},function(){
				if(index == 6){
					slider.style.left = "-1200px";
					index = 1;
				}
				isMoving = false;
			});
		}
		function prev(){
			if(isMoving)
				return;
			isMoving = true;
			index--;
			navmove();
			animate(slider,{left:-1200 * index},function(){
				if(index == 0){
					slider.style.left = "-6000px";
					index = 5;
				}
				isMoving = false;
			});
		}
		function navmove(){
			for(var i = 0; i < oNavlist.length; ++i){
				oNavlist[i].className = "";
				if(index === 6){
					oNavlist[0].className = "active";
				}else if(index === 0){
					oNavlist[4].className = "active";
				}else{
					oNavlist[index-1].className = "active";
				}
			}
		}
		timer = setInterval(next,3000);
		}