$(function(){
	/*// 头部导航吸顶
	 var a = $('#header'),
      b =a.offset();//返回或设置导航栏相对于文档的偏移(位置)
  //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
    $(document).on('scroll',function(){
      var c = $(document).scrollTop();
  当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下）252px
      if(b.top<=c){
        a.css({'background':'#fff'});
		$(a 'a').css('color':'#000');

        }else{
          a.css({'position':'absolute','top':'500px'})
          }
     });
*/
1.
	 $(document).on("scroll",function(){
	 	var scrollTop = $(document).scrollTop();
	 	if (scrollTop >=250) {
	 		$("#header").css({"background":"#fff"});
	 		$(".header-item,.login").css({"color":"#000"});
	 		$("#huaban_logo").css({"background":"url(http://huaban.com/img/logo.svg) 0 0 no-repeat"});
	 		$(".login").css({"background":"#ededed"});
	 	}
	 	else{
	 		$("#header").css({"background":"0"});
	 		$(".header-item,.login").css({"color":"#fff"});
	 		$("#huaban_logo").css({"background":"url(http://huaban.com/img/logo_wt.svg) 0 0 no-repeat"});
	 		$(".login").css({"background":""});
 
	 	}
	});

	 // 2.监听头部注册和登录按钮
	 $(".login").click(function(){
	 	$("#mask").css({"display":"block"})
	 });
	 // 关闭登录和注册界面
	 $(".close").click(function(){
	 	$("#mask").css({"display":"none"})
	 })

})