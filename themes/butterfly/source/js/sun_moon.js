function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
        setTimeout(function () {
            document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
                setTimeout(function () {
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
                    document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
                    setTimeout(function () {
                        document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
                    }, 1e3);
                }, 2e3)
        })

    // 获取当前模式（优先从 localStorage 获取，若没有则使用 light 作为默认）
    let currentMode = localStorage.getItem('theme');
    if (!currentMode) {
        currentMode = 'light'; // 默认值为白天模式
        localStorage.setItem('theme', currentMode); // 如果没有存储值，则设置为默认白天模式
    }

    // 切换模式，更新 data-theme
    if (currentMode === 'light') {
        // 切换到夜间模式
        document.documentElement.setAttribute('data-theme', 'dark'); // 设置为夜间模式
        localStorage.setItem('theme', 'dark'); // 保存模式
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun'); // 切换为太阳图标
    } else {
        // 切换到白天模式
        document.documentElement.setAttribute('data-theme', 'light'); // 设置为白天模式
        localStorage.setItem('theme', 'light'); // 保存模式
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon'); // 切换为月亮图标
    }

    // 获取太阳和月亮元素
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');

    // 确保 sun 和 moon 元素存在
    if (sun && moon) {
        // 设置太阳月亮图标的透明度和切换动画
        if (currentMode === 'light') {
            // 切换透明度（白天 -> 夜间模式）
            sun.style.opacity = '1'; // 太阳变透明
            moon.style.opacity = '0'; // 月亮变可见
        } else {
            // 切换透明度（夜间 -> 白天模式）
            sun.style.opacity = '0'; // 太阳变可见
            moon.style.opacity = '1'; // 月亮变透明
        }

        // 确保透明度的过渡效果生效
        setTimeout(function () {
            if (currentMode === 'light') {
                sun.style.opacity = '0';
                moon.style.opacity = '1';
            } else {
                sun.style.opacity = '1';
                moon.style.opacity = '0';
            }
        }, 1000); // 延时 1 秒再执行过渡效果
    } else {
        console.warn('未找到 #sun 或 #moon 元素');
    }

    // 动画背景渐变和清理逻辑
    setTimeout(() => {
        const darkSky = document.getElementsByClassName('Cuteen_DarkSky')[0];
        if (darkSky) {
            darkSky.style.transition = 'opacity 3s'; // 设置背景透明度过渡
            darkSky.style.opacity = '0'; // 渐隐背景
            setTimeout(() => {
                darkSky.remove(); // 动画完成后移除 DOM
            }, 3000); // 3 秒后移除
        }
    }, 2000); // 延迟 2 秒触发背景透明度动画

    // 延迟显示提示信息
    setTimeout(() => {
        new Vue({
            data: function () {
                this.$notify({
                    title: currentMode === 'light' ? '关灯啦🌙' : '开灯啦🌞',
                    message: currentMode === 'light' ? '当前已成功切换至夜间模式！' : '歌未竟，东方白',
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: 'success',
                    duration: 5000
                });
            }
        });
    }, 2000);

    // 切换外部插件样式
    if (typeof utterancesTheme === 'function') utterancesTheme();
    if (typeof FB === 'object') window.loadFBComment();
    if (window.DISQUS && document.getElementById('disqus_thread').children.length) {
        setTimeout(() => window.disqusReset(), 200);
    }
}
