var iframeNum = 0;
var iframeHeight = [];
var zoneHeight = 0;
var zoneMaxHeight = 0;
$(function(){
  	PBL("#pubu_pc","#pubu_pc .subclass_main",2);
	PBL("#pubu_diy","#pubu_diy .subclass_main",2);
	PBL("#pubu_zb","#pubu_zb .subclass_main",2);
	PBL("#pubu_shouji","#pubu_shouji .subclass_main",2);
	PBL("#pubu_sm","#pubu_sm .subclass_main",2);
	PBL("#pubu_oa","#pubu_oa .subclass_main",2);
	PBL("#pubu_haocai","#pubu_haocai .subclass_main",2);
	PBL("#pubu_wl","#pubu_wl .subclass_main",2);
	PBL("#pubu_af","#pubu_af .subclass_main",2);
	if($("#pubu_dq").length > 0){
		PBL("#pubu_dq","#pubu_dq .subclass_main",2);
	}
	if($(".logo_top img").length > 0){
		grayscale($(".logo_top img"));
		$(".logo_top img").mouseenter(function(){
			grayscale.reset($(this));
		}).mouseleave(function(){
			grayscale($(this));
		});
	}
	if($(".site").length > 0){
		var siteContent='<iframe name="sBox" id="sBox" frameborder="0" scrolling="no" src="" width="358" height="82" allowTransparency="true"></iframe>';
		var siteObj = document.createElement("div");
		siteObj.setAttribute("id","site_map");
		siteObj.innerHTML = siteContent;
		$(".site").append(siteObj);
		$(".site").mouseenter(function(){
			$(this).addClass("site_cur");
			$("#site_map").show();
			$("#sBox").attr("src",$(this).attr('msrc'));
		}).mouseleave(function(){
			$(this).removeClass("site_cur");
			$("#site_map").hide();
		});
	}
	if($('.fx_zone').length > 0){
		$('.fx_zone').each(function() {
			zoneMaxHeight = zoneHeight > $(this).outerHeight(true) ? zoneHeight : $(this).outerHeight(true);
		});
		zoneMaxHeight += 30;
	}
	if($("#menu_xy",window.parent.document).length > 0){
		var maxIframeHeight = Math.max.apply({},iframeHeight)+22+zoneMaxHeight;
		$("#menu_xy",window.parent.document).height(maxIframeHeight);
	}
});
function PBL(outer,boxs,style){
    var pubu = $(outer);
    var box = $(boxs);
	  
    var num = Math.floor(pubu.width()/box.outerWidth(true));
    var allHeight = [];
    for(var i=0;i<box.length;i++){
        if (i<num) {
            allHeight[i]=box.eq(i).outerHeight(true);
        }else{
            minHeight = Math.min.apply({},allHeight);
            var sy = getSy(minHeight,allHeight);
            getStyle(box.eq(i),minHeight,sy*box.eq(i).outerWidth(true),i,style);
            allHeight[sy] += box.eq(i).outerHeight(true);
        }
    }
	var popHeight = Math.max(
	    maxHeight = Math.max.apply({},allHeight)
		,shopHeight = pubu.parent().next().height()
		,menuHeight = 637
	);
	pubu.height(popHeight);
	iframeHeight[iframeNum] = popHeight;
	iframeNum++;
}
function getSy(minH,allH){
    for(sy in allH){
        if(allH[sy]==minH) return sy;
    }
}
var getStartNum = 0;
function getStyle(boxs,top,left,index,style){
    if (getStartNum>=index) {
        return;
    }
    boxs.css("position","absolute");
    switch(style){
        case 1:
            boxs.css({
                "top":top+$(window).height(),
                "left":left
            });
            boxs.stop().animate({
                "top":top,
                "left":left
            },999);
        break;
        case 2:
            boxs.css({
                "top":top,
                "left":left,
                "opacity":"0"
            });
            boxs.stop().animate({
                "opacity":"1"
            },999);
    }
}
function menu_pop(e){
	var obj = document.getElementById(e);
	obj.className = "m_li li_hover";
}
function menu_hih(e){
	var obj = document.getElementById(e);
	obj.className = "m_li";
}