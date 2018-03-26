// JavaScript Document
var position = function(){
	var isIE6 = !-[1,] && !window.XMLHttpRequest,
		html = document.getElementsByTagName('html')[0];
	
	if (isIE6 && document.body.currentStyle.backgroundAttachment !== 'fixed') {
		html.style.backgroundImage = 'url(about:blank)';
		html.style.backgroundAttachment = 'fixed';
	};
	
	return {
		fixed: isIE6 ? function(elem){
				var style = elem.style,
					dom = '(document.documentElement)',
					left = parseInt(style.left) - document.documentElement.scrollLeft,
					top = parseInt(style.top) - document.documentElement.scrollTop;
				this.absolute(elem);
				style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
				style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
			} : function(elem){
				elem.style.position = 'fixed';
		},
		
		absolute: isIE6 ? function(elem){
				var style = elem.style;
				style.position = 'absolute';
				style.removeExpression('left');
				style.removeExpression('top');
			} : function(elem){
				elem.style.position = 'absolute';
		}
	};
}();
$(document).ready(function($){
	var backdiv = '<div class="back_box"></div>';
	$(document.body).append(backdiv); 
	$(".back_box").click(function(){
		var sc=$(window).scrollTop();
		$('body,html').animate({scrollTop:0},500);
	}).mouseenter(function(){
		$(this).addClass("back_hover");
	}).mouseleave(function(){
		$(this).removeClass("back_hover");
	});
});
$(window).scroll(function(){
	var hh = $(window).scrollTop();
	if(hh>100){
		$(".back_box").css("display","block");
		var ele = $(".back_box").get(0);
		position.fixed(ele);
	}else if(hh==0){
		$(".back_box").css("display","none");
	}
});