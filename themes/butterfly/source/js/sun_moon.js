// 切换夜间/白天模式函数
function switchNightMode() {
    // 插入太阳和月亮的 DOM 元素
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');

    setTimeout(function () {
        // 切换模式：如果当前是夜间模式，则切换为白天模式，反之亦然
        if (document.querySelector('body').classList.contains('DarkMode')) {
            // 切换到白天模式
            document.querySelector('body').classList.remove('DarkMode');
            localStorage.setItem('theme', 'light');  // 保存白天模式
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

            // 设置 html[data-theme="light"]
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            // 切换到夜间模式
            document.querySelector('body').classList.add('DarkMode');
            localStorage.setItem('theme', 'dark');  // 保存夜间模式
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

            // 设置 html[data-theme="dark"]
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // 延时处理 Cuteen_DarkSky 的渐变效果
        setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function () {
                document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1000);
        }, 2000);
    });

    // 获取当前模式
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    // 切换主题
    if (nowMode === 'light') {
        // 切换到夜间模式
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";

        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

        // 弹窗通知
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
        // 切换到白天模式
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";

        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

        // 弹窗通知
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

    // 处理其他情况
    if (typeof utterancesTheme === 'function') utterancesTheme();
    if (typeof FB === 'object') window.loadFBComment();
    if (window.DISQUS && document.getElementById('disqus_thread').children.length) {
        setTimeout(() => window.disqusReset(), 200);
    }

    // =============== 确保全站模式统一 ===============
    // 获取本地存储的主题模式
    const themeFromLocalStorage = localStorage.getItem('theme') || 'light';

    // 根据本地存储的模式，设置全站模式
    if (themeFromLocalStorage === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('body').classList.add('DarkMode');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('body').classList.remove('DarkMode');
    }
}

// 页面加载时应用当前主题模式
document.addEventListener('DOMContentLoaded', function () {
    // 获取本地存储的主题模式
    const savedTheme = localStorage.getItem('theme') || 'light';

    // 设置 html 和 body 根据模式
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('body').classList.add('DarkMode');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('body').classList.remove('DarkMode');
    }

    // 处理模式图标
    const modeIcon = document.getElementById('modeicon');
    if (modeIcon) {
        if (savedTheme === 'dark') {
            modeIcon.setAttribute('xlink:href', '#icon-sun');
        } else {
            modeIcon.setAttribute('xlink:href', '#icon-moon');
        }
    }
});

// 如果 Butterfly 开启了 PJAX，再监听 pjax:complete
document.addEventListener('pjax:complete', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';

    // 设置 html 和 body 根据模式
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('body').classList.add('DarkMode');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('body').classList.remove('DarkMode');
    }

    // 处理模式图标
    const modeIcon = document.getElementById('modeicon');
    if (modeIcon) {
        if (savedTheme === 'dark') {
            modeIcon.setAttribute('xlink:href', '#icon-sun');
        } else {
            modeIcon.setAttribute('xlink:href', '#icon-moon');
        }
    }
});



