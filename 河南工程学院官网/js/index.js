
/*轮播图js*/
window.onload=function(){
    var picswrap=document.getElementById('banner');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    var picwidth=984;//图片宽度
    var picnum=8;//图片数量
    var index=0;
    var interval=20;//移动时间间隔
    var duration=500;//移动时间
    var stoptime=6500;//在一张图片上的停留时间
    var spans=document.getElementById('controls').getElementsByTagName('span');
//设定定时切换
    var timer=setInterval(auto,duration+stoptime);
//给控制点绑定事件
    for(var i=0;i<spans.length;i++){
        spans[i].onclick=function(){
            index=this.dataset.index;
            changeControls();
            moveTo(picswrap,-index*picwidth,duration,interval);
        };
        spans[i].onmouseover=function(){clearInterval(timer);}
        spans[i].onmouseout=function(){timer=setInterval(auto,duration+stoptime);}
    }
//给前一页和后一页绑定事件
    next.onclick=function(){
        index++;
        index=index%picnum;
        changeControls();
        moveTo(picswrap,-index*picwidth,duration,interval);
    };
    prev.onclick=function(){
        index--;
        index=index<0?picnum-1:index;
        changeControls();
        moveTo(picswrap,-index*picwidth,duration,interval);
    };

//处理控制按钮的颜色
    function changeControls(){
        for(var i=0;i<spans.length;i++){
            spans[i].className='';
        }
        spans[index].className='on';
    }


    function auto(){
        index++;
        index=index%picnum;
        changeControls();
        moveTo(picswrap,-index*picwidth,duration,interval);
    }

    //移到某一个位置
    function moveTo(elem,to,duration,interval){
        var currPos=parseInt(getStyle(elem,'left'));
        var dis=Math.abs(to-currPos);
        var symbol=(to-currPos)/dis;
        var cover=0;
        var stepLength=dis/(duration/interval);
        var step=function(){
            if(cover+stepLength<dis){
                elem.style.left=parseInt(getStyle(elem,'left'))+stepLength*symbol+'px';
                cover+=stepLength;
            }else{
                elem.style.left=to+'px';
                clearInterval(intervalId);
            }

        };
        var intervalId=setInterval(step,interval);
    }

    //获得元素的样式
    //获得一个元素的某个实际样式
    function getStyle(elem,cssname){
        if(window.getComputedStyle) {
            return window.getComputedStyle(elem)[cssname];
        }
        else{
            return elem.currentStyle[cssname];
        }
    }


};











