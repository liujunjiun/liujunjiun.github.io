```

方案一：
$("#myInput").on("focus", function(){
  var _this = this;
  setTimeout(function(){
    _this.scrollIntoView(true);
    _this.scrollIntoViewIfNeeded();
  },200)
})

方案二：
监听input元素的focus事件，以及window的resize事件。因为focus事件将在resize事件前触发。在focus事件中，将获得焦点的input元素保存变量中。在resize事件中，获得浏览器可视区域的top和bottom。获得浏览器可视区域的位置：var viewTop = $(window).scrollTop(),            // 可视区域顶部
    viewBottom = viewTop + window.innerHeight;  // 可视区域底部
// 不使用jQuery
    var viewTop = document.body.scrollTop,
    viewBottom = viewTop + window.innerHeight;
获得元素的在文档中的位置：var elementTop = $element.offset().top, // $element是保存的input
    elementBottom = elementTop + $element.height();
// 不使用jQuery
/* 获得元素的位置信息 */
var getElementPosition = function(elem) {
    var defaultRect = {top: 0, left: 0};
    var rect = (elem.getBoundingClientRect && elem.getBoundingClientRect()) || defaultRect;
    var ret = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    }
    return ret;
}
var elementTop = getElementPosition(element).top, // 元素顶部位置
    elementBottom = elementTop + element.clientHeight; // 元素底部位置
    
    
    方案三：
    我解决了这个问题，我去掉html和body设置的100%就好了
    
    方案四：
    使用flex布局能解决这个问题！
    codepen上做得demo:https://codepen.io/JoeZheng2015/pen/dMQvqg
    
    方案五：
    设置input的父元素。overflow-x:hidden.这样子就算键盘弹出，也可以滚动找到被压缩而隐藏的输入框。
    
    ```
