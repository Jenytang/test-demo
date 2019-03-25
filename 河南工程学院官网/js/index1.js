

// JS实现选项卡切换左边
 function fn(){
    var oUl1 = document.getElementById('ul1');
    var aLi = oUl1.getElementsByTagName('li');
    var oDiv = document.getElementById('vew_tab');
    var aDiv = oDiv.getElementsByTagName('div');
    for(var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function() {
            for(var i = 0; i < aLi.length; i++) {
                aLi[i].className = "";
            }
            this.className = "active";
            for(var j = 0; j < aDiv.length; j++) {
                aDiv[j].className = "hide";
            }
            aDiv[this.index].className = "show";
        }
    }
}
// JS实现选项卡切换右边
 function a() {
    var oUl1 = document.getElementById('ul2');
    var aLi = oUl1.getElementsByTagName('li');
    var oDiv = document.getElementById('vew_tab1');
    var aDiv = oDiv.getElementsByTagName('div');
    for(var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function() {
            for(var i = 0; i < aLi.length; i++) {
                aLi[i].className = "";
            }
            this.className = "active";
            for(var j = 0; j < aDiv.length; j++) {
                aDiv[j].className = "hide";
            }
            aDiv[this.index].className = "show";
        }
    }
}
/*调用选项卡切换函数*/
window.download=fn()
a()
