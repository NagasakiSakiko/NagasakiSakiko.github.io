---
title: 昼夜交替和头部图修改
cover: /img/covers/daynight.webp
categories:
  - Hexo学习
tags:
  - Hexo
  - 背景
abbrlink: 3961815d
date: 2024-12-25 00:00:00
description:
---
参考大佬的教程如何进行修改背景的代码，实现手机端和电脑端实现不同背景，以及实现最后的昼夜交替。
# 背景图片更换
在新建一个`source/css/daynight.styl`(名字可以随便起),输入以下代码:
```
/* 白天模式头部背景 */
#page-header
  background-image url(/img/default.png)
  background-size cover
  background-position center
  background-repeat no-repeat
/* 夜间模式头部背景 */
html[data-theme="dark"] #page-header
  background-image url(/img/top_img.jpg)
/* 白天模式底部背景 */
#footer-wrap
  background-image url(/img/default.png)
  background-size cover
  background-position center bottom
  background-repeat no-repeat
  position relative  /* 确保可以添加绝对定位的遮罩层 */
  /* 添加黑色遮罩层 */
  &::after
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.5)  /* 半透明黑色遮罩 */
    z-index 0  /* 确保遮罩层在背景之上 */
   .footer_custom_text
     position relative  /* 确保文字元素在遮罩层之上 */
     z-index 1

/* 夜间模式底部背景 */
html[data-theme="dark"] #footer-wrap
  background-image url(/img/top_img.jpg)
  background-size cover
  background-position center bottom  /* 显示顶部背景图的底部 */
  background-repeat no-repeat
/* 针对手机端设置不同的背景图（白天模式） */
@media screen and (max-width: 768px)
  html[data-theme="light"] #page-header
    background-image url(/img/mobileday.png)  /* 手机端的白天模式背景图 */
    background-size cover
    background-position center top
    background-repeat no-repeat
@media screen and (max-width: 768px)
  html[data-theme="light"] #footer-wrap
    background-image url(/img/mobileday.png)  /* 手机端背景图 */
    background-size cover
    background-position center bottom
    background-repeat no-repeat
/* 针对手机端设置不同的背景图（夜间模式） */
@media screen and (max-width: 768px)
  html[data-theme="dark"] #page-header
    background-image url(/img/moblienight.png)  /* 手机端的夜间模式背景图 */
    background-size cover
    background-position center top
    background-repeat no-repeat
@media screen and (max-width: 768px)
  html[data-theme="dark"] #footer-wrap
    background-image url(/img/moblienight.png)  /* 手机端背景图 */
    background-size cover
    background-position center bottom
    background-repeat no-repeat
/* 确保底部内容在遮罩层之上 */
#footer-wrap > *  /* 针对 footer-wrap 内的所有元素（例如文字、按钮等） */
  position relative
  z-index 1  /* 确保文字和其他内容在遮罩层之上 */
/* 平滑过渡效果 */
#page-header
  transition background-image 0.5s ease-in-out
```
在`_config.butterfly.yml`的`inject`引用:
```
inject:
  head:
  - <link rel="stylesheet" href="/css/daynight.css">
```
这里因为是`.styl`文件，本地部署的时候注意
```
hexo cl; hexo g; hexo s
```
这样实现电脑端和手机端打开白昼和黑夜不同效果

# 昼夜交替
基于以上的背景模式更换，对大佬们的代码修改
在`[Blogroot]/themes/butterfly/layout/includes/custom`创建一个`sun_moon.pug`输入：
```
svg(aria-hidden='true', style='position:absolute; overflow:hidden; width:0; height:0')
    symbol#icon-sun(viewBox='0 0 1024 1024')
        path(d='M960 512l-128 128v192h-192l-128 128-128-128H192v-192l-128-128 128-128V192h192l128-128 128 128h192v192z', fill='#FFD878', p-id='8420')
        path(d='M736 512a224 224 0 1 0-448 0 224 224 0 1 0 448 0z', fill='#FFE4A9', p-id='8421')
        path(d='M512 109.248L626.752 224H800v173.248L914.752 512 800 626.752V800h-173.248L512 914.752 397.248 800H224v-173.248L109.248 512 224 397.248V224h173.248L512 109.248M512 64l-128 128H192v192l-128 128 128 128v192h192l128 128 128-128h192v-192l128-128-128-128V192h-192l-128-128z', fill='#4D5152', p-id='8422')
        path(d='M512 320c105.888 0 192 86.112 192 192s-86.112 192-192 192-192-86.112-192-192 86.112-192 192-192m0-32a224 224 0 1 0 0 448 224 224 0 0 0 0-448z', fill='#4D5152', p-id='8423')
    symbol#icon-moon(viewBox='0 0 1024 1024')
        path(d='M611.370667 167.082667a445.013333 445.013333 0 0 1-38.4 161.834666 477.824 477.824 0 0 1-244.736 244.394667 445.141333 445.141333 0 0 1-161.109334 38.058667 85.077333 85.077333 0 0 0-65.066666 135.722666A462.08 462.08 0 1 0 747.093333 102.058667a85.077333 85.077333 0 0 0-135.722666 65.024z', fill='#FFB531', p-id='11345')
        path(d='M329.728 274.133333l35.157333-35.157333a21.333333 21.333333 0 1 0-30.165333-30.165333l-35.157333 35.157333-35.114667-35.157333a21.333333 21.333333 0 0 0-30.165333 30.165333l35.114666 35.157333-35.114666 35.157334a21.333333 21.333333 0 1 0 30.165333 30.165333l35.114667-35.157333 35.157333 35.157333a21.333333 21.333333 0 1 0 30.165333-30.165333z', fill='#030835', p-id='11346')
```
这一步是定义太阳月亮的图标。
在`[Blogroot]/themes/butterfly/source/css/_layout`新建一个`sun_moon.styl`，输入：
```
.Cuteen_DarkSky,
.Cuteen_DarkSky:before
  content ''
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 88888888

.Cuteen_DarkSky
  background linear-gradient(to top, #f8cd71 0, #5bfde9 80%)
  &:before
    transition 2s ease all
    opacity 0
    background linear-gradient(to top, #30cfd0 0, #330867 100%)

.DarkMode
  .Cuteen_DarkSky
    &:before
      opacity 1

.Cuteen_DarkPlanet
  z-index 99999999
  position fixed
  left -50%
  top -50%
  width 200%
  height 200%
  -webkit-animation CuteenPlanetMove 2s cubic-bezier(0.7, 0, 0, 1)
  animation CuteenPlanetMove 2s cubic-bezier(0.7, 0, 0, 1)
  transform-origin center bottom


@-webkit-keyframes CuteenPlanetMove {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes CuteenPlanetMove {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.Cuteen_DarkPlanet
  #sun
    position absolute
    border-radius 100%
    left 44%
    top 30%
    height 6rem
    width 6rem
    background #ffee94
    box-shadow 0 0 40px #ffee94
  // opacity 0

  #moon
    position absolute
    border-radius 100%
    left 44%
    top 30%
    position absolute
    border-radius 100%
    height 6rem
    width 6rem
    box-shadow -1.8em 1.8em 0 0.2em #fff


.search
  span
    display none

.menus_item
  a
    text-decoration none!important
```
这一步是实现天体的变化和天空层的变化。
在`[Blogroot]/themes/butterfly/source/js`新建`sun_moon.js`输入：
```
// // 页面加载时应用当前主题模式
// document.addEventListener('DOMContentLoaded', function () {
//     // 获取本地存储的主题模式
//     const savedTheme = localStorage.getItem('theme') || 'light';
//
//     // 设置 html 和 body 根据模式
//     if (savedTheme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         document.querySelector('body').classList.add('DarkMode');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'light');
//         document.querySelector('body').classList.remove('DarkMode');
//     }
//
//     // 处理模式图标
//     const modeIcon = document.getElementById('modeicon');
//     if (modeIcon) {
//         if (savedTheme === 'dark') {
//             modeIcon.setAttribute('xlink:href', '#icon-sun');
//         } else {
//             modeIcon.setAttribute('xlink:href', '#icon-moon');
//         }
//     }
// });
// 如果 Butterfly 开启了 PJAX，再监听 pjax:complete
// document.addEventListener('pjax:complete', function () {
//     const savedTheme = localStorage.getItem('theme') || 'light';

// 如果 Butterfly 开启了 PJAX，这里只用了PJAX监听：
// 初始化主题（首次加载页面）
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // 默认是 'light'

    // 设置 <html> 标签的 data-theme 属性
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 设置 body 的 DarkMode 类
    if (savedTheme === 'dark') {
        document.body.classList.add('DarkMode');
    } else {
        document.body.classList.remove('DarkMode');
    }

    // 更新按钮图标
    const modeIcon = document.getElementById('modeicon');
    if (modeIcon) {
        if (savedTheme === 'dark') {
            modeIcon.setAttribute('xlink:href', '#icon-sun');
        } else {
            modeIcon.setAttribute('xlink:href', '#icon-moon');
        }
    }
}

// 页面首次加载时应用主题
document.addEventListener('DOMContentLoaded', initTheme);

// 如果 Butterfly 开启了 PJAX，监听 pjax:complete 事件
document.addEventListener('pjax:complete', initTheme);

function switchNightMode() {
    // 插入太阳月亮动画 DOM
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');

    setTimeout(function () {
        // 切换 DarkMode 类
        if (document.querySelector('body').classList.contains('DarkMode')) {
            document.querySelector('body').classList.remove('DarkMode');
            localStorage.setItem('isDark', '0');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
        } else {
            document.querySelector('body').classList.add('DarkMode');
            localStorage.setItem('isDark', '1');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
        }

        setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function () {
                document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1000);
        }, 2000);
    });

    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    if (nowMode === 'light') {
        // 设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        // 激活夜间模式
        document.documentElement.setAttribute('data-theme', 'dark'); // 设置 data-theme 为 dark
        localStorage.setItem('theme', 'dark'); // 保存到 localStorage
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

        // 弹窗提醒
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "关灯啦🌙",
                        message: "明月装饰了你的窗子，你装饰了别人的梦。",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            });
        }, 2000);
    } else {
        // 设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        // 激活白天模式
        document.documentElement.setAttribute('data-theme', 'light'); // 设置 data-theme 为 light
        localStorage.setItem('theme', 'light'); // 保存到 localStorage
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

        // 弹窗提醒
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: "开灯啦🌞",
                        message: "歌未竟，东方白。",
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: "success",
                        duration: 5000
                    });
                }
            });
        }, 2000);
    }

    // 处理一些特定情况
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
```
这一步是为了实现昼夜更替天空层`.Darkmode`变化和背景变化`html[data-theme="dark"]`。
最后在`_config.butterfly.yml`的`inject`引用:
```
inject:
  bottom:
  - <script src="/js/sun_moon.js" async></script>
```
# 参考文章
- Fomalhaut🥝：[夜间模式切换动画2.0](https://www.fomal.cc/posts/d739261b.html)  
- Akilarの糖果屋：[添加白天夜间模式转换动画](https://akilar.top/posts/d9550c81/)
