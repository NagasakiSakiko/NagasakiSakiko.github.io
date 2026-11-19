// 如果 Butterfly 开启了 PJAX，这里只用了PJAX监听：
// 初始化主题（首次加载页面）
document.addEventListener('pjax:complete', initTheme);
document.addEventListener('DOMContentLoaded', initTheme);
function initTheme() {
    const savedTheme = btf.saveToLocal.get('theme') || document.documentElement.getAttribute('data-theme') || 'light';
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
        btf.saveToLocal.set('theme', 'dark', 2); // 保存到 localStorage
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');

        // 弹窗提醒
        setTimeout(() => {
            window.siteNotify?.({
                title: "关灯啦🌙",
                message: "明月装饰了你的窗子，你装饰了别人的梦。",
                duration: 5000
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
        btf.saveToLocal.set('theme', 'light', 2); // 保存到 localStorage
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');

        // 弹窗提醒
        setTimeout(() => {
            window.siteNotify?.({
                title: "开灯啦🌞",
                message: "歌未竟，东方白。",
                duration: 5000
            });
        }, 2000);
    }
    // 处理一些特定情况
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}
