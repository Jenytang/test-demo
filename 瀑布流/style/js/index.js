// JavaScript Document

window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":"style/images/17.jpg"},
	{"src":"style/images/16.jpg"},
	{"src":"style/images/15.jpg"},
	{"src":"style/images/14.jpg"},
	{"src":"style/images/12.jpg"},
	{"src":"style/images/11.jpg"},
	{"src":"style/images/10.jpg"},
	{"src":"style/images/9.jpg"},
	{"src":"style/images/8.jpg"},
	{"src":"style/images/7.jpg"},
	{"src":"style/images/6.jpg"},
	{"src":"style/images/5.jpg"},
	{"src":"style/images/4.jpg"},
	{"src":"style/images/3.jpg"},
	{"src":"style/images/2.jpg"},
	{"src":"style/images/1.jpg"},
	]};
	window.onscroll=function(){
		//alert(dataInt.data.length);
		var oparent=document.getElementById('main');
		if(checkScrollSlide()){
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oparent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src=dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	var oparent=document.getElementById(parent);
	var oBoxs=getByClass(oparent,box);
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	oparent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight)
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}

function getByClass(parnet,Name){
	var boxArr=new Array(),
		oElements=parnet.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==Name){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}
