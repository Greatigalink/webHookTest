var list = document.getElementById("screen-image");//获取轮播图父标签
var button = document.getElementById("foot-button").getElementsByTagName("i");//获取页码按钮
var click = true; //设置锁，在播放动画完成前点击按钮无效，防止频繁点击
var prePage = 0;//设置前一页，确保页码颜色对应图片
button[0].style.color = "#ef5350";//默认第一页高亮

function leftRight(s) { //点击左右时执行函数
  var left = parseInt(list.style.left == "" ? 0 : list.style.left);
  var pre = left;
  var imgWidth = list.offsetWidth/5;
  left = (s==1) ? (left - imgWidth) : (left + imgWidth);//s为1表示向右，为-1表示向左
  if(left < (-4 * imgWidth)) {//处理边界，往左移动到末尾时，回到第一页
    left = 0;
  }
  else if(left > 0) {//处理边界，往右移动到第一页时，回到末尾
    left = (-4 * imgWidth);
  }
  click ? moveImage(pre, left, imgWidth) : '';//锁为 true 时才会移动图片
}

function clickPage(page) {//点击页码直接跳转
  var pre = parseInt(list.style.left == "" ? 0 : list.style.left);
  var imgWidth = list.offsetWidth/5;
  if(click) {
    moveImage(pre, 0 - page * imgWidth, imgWidth);
  }
}

function moveImage(pre,left,imgWidth) {//接受三个参数，参数1为当前位置，参数2为即将要移动到的位置，参数3为当前图片宽度
  console.log(left,imgWidth);
  if(left == (-4 * imgWidth) && pre == 0) {
    list.style.left = (-4 * imgWidth) + 'px';
    left = (-3 * imgWidth);
    pre = (-4 * imgWidth);
  }
  var d = (left - pre)/100, //根据移动前后差值来计算每7毫秒移动的距离和方向
      i = 0;
  click = false; //移动前锁住false
  var loop = setInterval(() => {
    if(i > 99) {
      clearInterval(loop);
      click = true;//移动完后开锁 true
      var index = Math.round((0 - left)/imgWidth);
      if(index < 4) {
        button[index].style.color = "#ef5350";
        button[prePage].style.color = "#757575";
        prePage = index;
      }
      else {
        list.style.left = '0px';
        button[0].style.color = "#ef5350";
        button[index - 1].style.color = "#757575";
        prePage = 0;
      }
    } 
    else {
      pre += d; //每次加上之前算好的间隔
      list.style.left = pre + 'px';//移动图片
      i++;
    }
  }, 6);
}

setInterval(() => {
  leftRight(1);
}, 5000);//每5s执行一次，向左