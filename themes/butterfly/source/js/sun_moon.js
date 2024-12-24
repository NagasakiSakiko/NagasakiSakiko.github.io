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
                        message: "当前已成功切换至夜间模式！",
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
                        message: "当前已成功切换至白天模式！",
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

