window.onload = function () {
    searchEffect();

    timeBack();
    bannerEffect();
}
// 京东红颜色滑动渐变效果
// 获取元素
function searchEffect() {
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search")
    window.onscroll = function () {
        //兼容chrome浏览器处理
        if (document.documentElement && document.documentElement.scrollTop) {
            offsetTop = document.documentElement.scrollTop;
        } else if (document.body) {
            offsetTop = document.body.scrollTop;
        }
        var opacity = 0;
        if (offsetTop < bannerHeight) {
            opacity = offsetTop / bannerHeight;
            search.style.backgroundColor = "rgba(255,35,34," + opacity + ")";
        }
    }
}
//  头部搜索快的JS效果：改变透明度
//  1.获取当前banner的高度
//  offsetHeight
//  2.获取当前屏幕滚动时，banner滚动出屏幕的距离
//  onscroll屏幕滚动事件	
//  3.计算比例值，获取透明度，设置背景颜色的样式
//  4.判断，如果当banner还没有完全滚动出屏幕，那么才有必要计算透明度和设置透明度。去除不必要的计算，当滚动出去banner时就没必要去计算，这个时候进行一个判断，banner滚动出去的距离是否小于banner的高度
//  5.最后封装这个函数


// 倒计时效果
function timeBack() {
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    var totaltime = 3700;//演示时间，可随意调整
    var timerId = setInterval(function () {
        totaltime--;
        if (totaltime < 0) {
            clearInterval(timerId);
            return;
        }
        var hour = Math.floor(totaltime / 3600);
        var mimute = Math.floor(totaltime % 3600 / 60);
        var second = Math.floor(totaltime % 60);
        //注意索引
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(mimute / 10);
        spans[4].innerHTML = Math.floor(mimute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }, 1000)
}

// 产品倒计时JS效果：修改span标签的数值
// 	1. 获取用于展示时间得到span
// 	获取jd_sk_time里面的span
// 	2.设置初始的倒计时时间 以秒作为单位
// 	3.开始定时器
// 		得到剩余的时分秒 注意取整Math.floor
// 		hour    mimute    second
// 	4.赋值
// 	5.判断倒计时是否结束，结束就清除定时器 



// 轮播图效果


function bannerEffect() {
    var banner = document.querySelector(".jd_banner");
    var imgBox = banner.querySelector("ul:first-of-type");
    console.log(imgBox);
    // 注意选择器用法
    var first = imgBox.querySelector("li:first-of-type");
    var last = imgBox.querySelector("li:last-of-type");
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);
    // 获取所有的li元素得到li元素的个数
    var lis = imgBox.querySelectorAll("li");
    var count = lis.length;
    // console.log(count); 

    //获取盒子的宽度
    var bannerWidth = banner.offsetWidth;
    //动态设置图片盒子的宽度
    imgBox.style.width = count * bannerWidth + "px";
    //设置每一个li的宽度
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = bannerWidth + "px";
    }
    /*定义图片索引:图片已经有一个宽度的默认偏移*/
    var index = 0;
    // 设置默认的偏移值
    imgBox.style.width = -bannerWidth + "px";

    //  3.当屏幕变化的时候，重新计算宽度
    // 	通过一个叫onresize的事件，在里面函数里面重新设置left值。如果不设置当屏幕发生缩放的时候会出现，图片不能正常显示。	
    //  注意：当实现自动轮播的时候，缩放的时候会发生索引错乱，
    // 	解决方法：重新设置left的宽度的时候让他的索引值乘以盒子的宽度	并且不要让他宽度要覆盖原始的宽度
    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count * bannerWidth + "px";

        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + "px";
        }
        imgBox.style.left = -index * bannerWidth + "px";

    }
    // 轮播图移动相应的点序号高亮显示
var setIndicator=function(index){
    var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
    
    /*先清除其它li元素的active样式*/
    for(var i=0;i<indicators.length;i++){
        indicators[i].classList.remove("active");
    }
    /*为当前li元素添加active样式*/
    indicators[index-1].classList.add("active");
    console.log(index);    
}
    var timerId;
    var startTime = function () {
        timerId = setInterval(function () {
            index++;
            //添加过渡效果
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = (-index * bannerWidth) + "px";

            // 注意： 如果一个元素的某个属性之前添加过过过度效果，那么过度属性会一直存在，如果不想要，则需要清除过渡效果
            // 	并且判断是否最后一张，和过渡效果会同时执行，那么就会造成还没到最后一张，就跳到了第一张
            // 	解决方案：给判断条件加个定时器，让他比过渡晚500毫秒执行 这里是500毫秒是因为过度的时间是0.5s所以刚好能过错开
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index * bannerWidth) + "px";
                    //这里需要重新设置偏移否则会造成结巴                
                }
            }, 500);
        }, 1000);
    }
    startTime();
    //实现手动轮播
    // 因为是横向滑动不需要Y轴坐标
    // 三个参数记录 statX开始位置   moveX移动位置  distanceX差异大小
    //触屏事件
    // 	touchstart:手指触摸屏幕时触发
    // 	touchimove:手指在屏幕上移动时触发（建议使用）
    // 	touchend:手指离开屏幕时触发
    var startX, moveX, distanceX;
    var isEnd = true;
    // 添加事件监听
    imgBox.addEventListener("touchstart", function (e) {
        console.log("touchstart");

        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        console.log("touchmove");
        if (isEnd) {
            /*记录手指在滑动过程中的位置*/
            moveX = e.targetTouches[0].clientX;
            /*计算坐标的差异*/
            distanceX = moveX - startX;
            /*为了保证效果正常，将之前可能添加的过渡样式清除*/
            imgBox.style.transition = "none";
            /*实现元素的偏移  left参照最原始的坐标
             * 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
            imgBox.style.left = (-index * bannerWidth + distanceX) + "px";
            // 注意：touch事件的触发，必须保证元素有具体的宽高，如果宽和高为0则不会进行触发
            // 这里需要清除ul的浮动，浮动后，高度为0；
        }
    });
    // imgBox.addEventListener("touchmove",function(e){
    //     console.log(123);    
    // })
    imgBox.addEventListener("touchend", function (e) {
        console.log("touchend");
        isEnd = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++
            }
            // 重新设置过度和偏移
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (Math.abs(distanceX) > 0) {
            // 当有移动距离的时候大于0小于100就让他回弹
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        // 鼠标离开的时候让上一次三个坐标信息全部为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
    // 什么时候让定时器重新执行呢？
    //     按照正常思路当手指离开触摸的时候就执行
    imgBox.addEventListener("webkitTransitionEnd", function () {
        console.log("webkitTransitionEnd");
        /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
        if (index == count - 1) {
            index = 1;
            /*清除过渡*/
            imgBox.style.transition = "none";
            /*设置偏移*/
            imgBox.style.left = -index * bannerWidth + "px";
        }
        else if (index == 0) {
            index = count - 2;
            /*清除过渡*/
            imgBox.style.transition = "none";
            /*设置偏移*/
            imgBox.style.left = -index * bannerWidth + "px";
        }
        /*设置标记*/
        setIndicator(index);
        setTimeout(function () {
            // 一般手机端都会控制每一次滑动的间隔时间，一般是一到两秒，这里设置100秒是因为为了方便演示。
            // 还要这里因为在这里重新开启定时器，所以要清除之前的定时器，否则会造成定时器叠加
            isEnd = true;
            /*清除之前添加的定时器*/
            clearInterval(timerId);
            //重新开启定时器
            startTime();
        }, 100);
    });
}


// 1.获取轮播图结构
// 		获取图片容器
// 		获取原始最后一张，获取原始第一张
// 		在首尾插入两张图片
// 		插入最前面：appendchild(first.cloneNode,(true));
// 		插入最后面一张：inserBefore(last.cloneNode(true),imgBox.firstChild);

// 1.2.设置对应的样式
// 	还要修改轮播图css样式。图片容器宽度为1000%
// 		让第一张显示，所以让left先等于-100%
// 		给每一个li的宽度重新设置为10%；



// 4.自动轮播
// 		定时器 2秒
// 		全局变量设置图片的索引 从1开始

// 		设置偏移left记得加单位
// 		添加过度效果 ease-in-out中间快两边慢	

// 		判断是否到最后一张，让index=1并偏移到指定位置
// 注意： 如果一个元素的某个属性之前添加过过过度效果，那么过度属性会一直存在，如果不想要，则需要清除过渡效果
// 	并且判断是否最后一张，和过渡效果会同时执行，那么就会造成还没到最后一张，就跳到了第一张
// 	解决方案：给判断条件加个定时器，让他比过渡晚500毫秒执行

// 5.触屏事件
// 	touchstart:手指触摸屏幕时触发
// 	touchimove:手指在屏幕上移动时触发（建议使用）
// 	touchend:手指离开屏幕时触发	  

// 	事件对象：
// 	touches:是指当前屏幕上所有的手指对象
// 	targetTouches:当前元素上的手指对象
// 	changedTouches:当前屏幕上变化的手指对象，从无到有，从有到无。


// 	page坐标相对当前页面的内容--会有滚动条，包含滚动条
// 	client坐标相对于当前视口	
// 	移动端，随便取上面哪一种		

// 	screen坐标是相对于屏幕左上角的的坐标
// 6.实现手动轮播
// 		记录手指的起始位置，
// 		记录手指在滑动过程中的位置，计算出相对于 起始位置的偏移值，通过left样式实现图片的偏移
// 		在松开手指之后进行一个判断，当前的滑动的距离如果超出指定范围就翻页，否则就还原 
// 	重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离：imgBox.style.left=index*bannerWidth+ distanceX+"px";

// 如果一个元素的某个属性之前添加过过过度效果，那么过度属性会一直存在，如果不想要，则需要清除过渡效果。这里滑动的时候也会产生过度效果

// 	在松开手指之后进行一个判断，当前的滑动的距离如果超出指定范围就翻页，否则就还原 
// 	判断距离是否超出指定范围取绝对值是否大于100再在if里面判断滑动方向，>0上一张
// 	否则下一张
//    回弹else if要大于0
// 最后自动轮播要重新调用，先进行一个封装
// 	7.webkitTrasitionEen:可以监听当前元素的过度效果执行完毕，当一个元素的过度效果执行完毕的时候，会触发这个事件
// 	如果到了最后一张count-1回到第一张
// 	到了第一张回到最后一张count-2 



// 注意：touch事件的触发，必须保证元素有具体的宽高，如果宽和高为0则不会进行触发