// JavaScript Document

;(function($){
	
	var slider=function(slider){
		
		var _this=this;
		this.pos=0;
		this.slider=slider;
		this.data={
			"slideType":"roll",
			"speed":400,
			"delay":2000,
			"hasNav":false,
			"sliderHover":true
			//"navName":".slider-nav",
			//"leftright":true,
			//"btnprev":".slider-btn-prev",
			//"btnnext":".slider-btn-next",
			//"gap":10,
			//"distance":1,
			
		};
		$.extend(this.data,this.getSlider());
		this.ul=this.slider.children('ul');
		this.li=this.ul.children('li');
		
		this.wd=this.slider.width();
		this.length=this.li.length;
		
		this.setSliderValue();
		if(this.data.hasNav&&this.data.slideType!='seamless'){
			
			this.nav=this.slider.find(this.data.navName);
			this.setSliderNav();
			
			this.nav.find('span').click(function(){
				$(this).addClass('cur').siblings().removeClass('cur');
				var index=$(this).index();
				_this.navClickMove(index,_this);
			});
		};
		
		if(this.data.sliderHover){
			
			this.slider.hover(function(){
				window.clearInterval(_this.timer);
			},function(){
				_this.autoPlay();
			});
			
		};
		this.autoPlay();

		if(this.data.leftright&&this.data.btnprev&&this.data.btnnext){
			
			this.slider.find(this.data.btnnext).click(function(){
				if(!_this.ul.is(':animated')&&!_this.li.is(':animated')){
					_this.nextClick(_this);
				};
			});
			
			this.slider.find(this.data.btnprev).click(function(){
				if(!_this.ul.is(':animated')&&!_this.li.is(':animated')){
					_this.prevClick(_this);
				};
			});
			
			
		}else{
			return false;
		};
		if(this.data.detail){
			this.slider.find(_this.data.detail).text(this.li.eq(0).find('a').attr('content'));
		};
		
	};
	
	slider.prototype={
		/*ticket:function(con){
			var _this=this;
			var txt=con;
			console.log(txt);
			var ctext=txt.substring(0,_this.pos++)+(_this.pos%2?'-':'_');
			console.log(ctext);
			this.slider.find(_this.data.detail).text(ctext);
			if(ctext.length>=txt.length){
				this.slider.find(_this.data.detail).text(txt);
				_this.pos=0;
			}else{
				setTimeout(function(){
					_this.ticket();
				},30);
			};
		},*/
		
		prevClick:function(_this){
			var page;
			if(_this.data.slideType=="seamless"){
				_this.li.each(function(i){
					
					var left=parseInt($(this).css('left'));
					if(left>=_this.wd*(_this.length-1)){
						page=i;
					};
				});
				_this.li.eq(page).css({'left':-_this.wd});
				_this.li.animate({
					'left':'+='+_this.wd
				},_this.data.speed);
			}else if(_this.data.slideType=="roll"){
				var left=-parseInt(_this.ul.css('left'));
				var page=left/_this.wd;
				if(page==0){
					_this.ul.animate({
						'left':-_this.wd*(_this.length-1)
					},_this.data.speed);
					page=_this.length;
				}else{
					_this.ul.animate({
						'left':'+='+_this.wd
					},_this.data.speed);
				};
				_this.nav.find('span').eq(page-1).addClass('cur')
				.siblings().removeClass('cur');
				if(_this.data.detail){
					var con=this.li.eq(page-1).find('a').attr('content');
					_this.slider.find(_this.data.detail).text(con);
				};
			};
		},
		
		nextClick:function(_this){
			if(_this.data.slideType=="seamless"){
				_this.li.animate({
					'left':'-='+_this.wd	
				},_this.data.speed,function(){
					_this.li.each(function(){
						var left=-parseInt($(this).css('left'));
						if(left>=_this.wd){
							$(this).css({'left':_this.wd*(_this.length-1)})
						};
					});
				});
			}else if(_this.data.slideType=="roll"){
				var left=-parseInt(_this.ul.css('left'));
				var page=left/_this.wd;
				if(page==_this.length-1){
					page=-1;
				};
				
				if(left>=_this.wd*(_this.length-1)){
					_this.ul.animate({
						'left':0
					},_this.data.speed);
				}else{
					_this.ul.animate({
						'left':'-='+_this.wd
					},_this.data.speed);
				}
				_this.nav.find('span').eq(page+1).addClass('cur')
				.siblings().removeClass('cur');
				
				if(_this.data.detail){
					var con=this.li.eq(page+1).find('a').attr('content');
					_this.slider.find(_this.data.detail).text(con);
				};
				
			};
		},
		
		navClickMove:function(index,_this){
		
			if(_this.data.slideType=="fade"){
				_this.li.eq(index).css({'z-index':'10'}).fadeIn(_this.data.speed,function(){
					$(this).css({'z-index':0});
				}).siblings().fadeOut();
			}else if(_this.data.slideType=="roll"){
				
				_this.ul.animate({
					'left':-_this.wd*index
				});
				if(_this.data.detail){
					var con=this.li.eq(index).find('a').attr('content');
					_this.slider.find(_this.data.detail).text(con);
				};
			}else if(_this.data.slideType='seamless'){
				return;
			}
		},
		
		autoPlay:function(){
			var index;
			var _this=this;
			this.timer=window.setInterval(function(){
				
				if(_this.data.slideType=="fade"){
				
					_this.li.each(function(i){
						if($(this).css('display')!=='none'){
							index=i;
						};
					});
					
					_this.li.eq(index).fadeOut(_this.data.speed);
					
					if(index==2){
						index=-1;
					};
					
					_this.li.eq(index+1).css({'z-index':'10'}).fadeIn(_this.data.speed,function(){
						$(this).css({'z-index':'0'})
					});
					if(_this.nav){
						_this.nav.find('span').eq(index+1).addClass('cur').siblings().removeClass('cur');
					};
				}else if(_this.data.slideType=="seamless"){
					if(_this.data.delay>=200){
						
						_this.li.animate({'left':'-='+_this.wd},_this.data.speed,function(){
							$(this).each(function(){
								var left=-parseInt($(this).css('left'));
								if(left>=_this.wd){
									$(this).css({'left':_this.wd*(_this.length-1)});
								};
							});
						});
						
					}else{
						_this.li.css({'left':'-='+_this.data.distance+'px'});
						_this.li.each(function(){
							var left=-parseInt($(this).css('left'));
							if(left>=_this.li.width()+_this.data.gap){
								$(this).css({'left':(_this.li.width()+_this.data.gap)*(_this.length-1)});
							};
						});
					};
				}else if(_this.data.slideType=="roll"){
					var left=-parseInt(_this.ul.css('left'));
					var page=left/_this.wd;
				
					if(page==(_this.length-1)){
						_this.ul.animate({
							'left':0
						},_this.data.speed);
						page=-1;
					}else{
						_this.ul.animate({
							'left':'-='+_this.wd
						},_this.data.speed);
						
					};
					if(_this.data.detail){
						var con=_this.li.eq(page+1).find('a').attr('content');
						_this.slider.find(_this.data.detail).text(con);
					};
					_this.nav.find('span').eq(page+1).addClass('cur')
					.siblings().removeClass('cur');
				}
			},_this.data.delay);
			
			
		},
		
		setSliderNav:function(){
			var span='';
			for(var i=0;i<this.length;i++){
				if(i==0){
					span+='<span class="cur"></span>';
				}else{
					span+='<span></span>';
				};
			};
			this.nav.append(span);
			this.nav.css({'z-index':'100'});
		},
		
		setSliderValue:function(){

			var hi=this.slider.height();
			var type=this.data.slideType;
			
			this.slider.css({
				"position":'relative',
				"overflow":"hidden"
			})
			if(type==="fade"){
				this.li.css({
					
					"position":"absolute",
					"left":0,
					"top":0
					
				});
				this.li.eq(0).siblings().hide();
			}else if(type==="seamless"){
				this.li.css({
					"position":"absolute",
					"top":0
				});
				var gap;
				var liWidth=this.li.width();
				if(this.data.gap){
					gap=this.data.gap;
				}else{
					gap=0;
				};
				this.li.each(function(i){
					$(this).css({
						'left':(liWidth+gap)*i
					});
				});
			}else if(type="roll"){
				this.ul.css({
					'position':'absolute',
					'left':0,
					'top':0,
					'width':this.wd*this.length
				});
				this.li.css({
					'float':'left'
				});
				this.li.find('img').css({
					'display':'block'
				});
			};
		
		},
		
		getSlider:function(){
			
			var data=this.slider.attr("data-slider");
			if(data&&data!=''){
				return $.parseJSON(data);
			}else{
				return{};
			};
			
		}
		
	};
	
	slider.init=function(slider){
		
		var _this=this;
		slider.each(function(){
			new _this($(this));
		});
		
	};
	
	window.slider=slider;
	
})(jQuery)


