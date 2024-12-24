function initTheme() {
    // 从 localStorage 取到上次保存的值，无则默认为 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    // 设置到 <html data-theme="xxx">
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 如果你还想切换按钮的图标：
    const modeIcon = document.getElementById('modeicon');
    if (modeIcon) {
        if (savedTheme === 'dark') {
            // 如果是暗色，就让图标显示“太阳”
            modeIcon.setAttribute('xlink:href', '#icon-sun');
        } else {
            // 否则显示“月亮”
            modeIcon.setAttribute('xlink:href', '#icon-moon');
        }
    }
}

// 首次加载
document.addEventListener('DOMContentLoaded', initTheme);

// 如果 Butterfly 开启了 PJAX，再监听 pjax:complete
document.addEventListener('pjax:complete', initTheme);

function switchNightMode() {
    // ============= 1. 插入太阳/月亮动画 DOM =============
    document.body.insertAdjacentHTML('beforeend', `
      <div class="Cuteen_DarkSky">
        <div class="Cuteen_DarkPlanet">
           <div id="sun"></div>
           <div id="moon"></div>
        </div>
      </div>`
    );

    // ============= 2. 读取当前模式 (light / dark) =========
    const currentTheme =
        document.documentElement.getAttribute('data-theme') || 'light';

    // 将要切换成的新模式
    let newTheme;

    // ============= 3. 判断当前模式，进行切换 =============
    if (currentTheme === 'light') {
        // 当前是白天 -> 切到夜间
        newTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        // 把图标改成“太阳” (暗示：下一次点击可回到白天)
        document.getElementById('modeicon')?.setAttribute('xlink:href', '#icon-sun');

        // 太阳/月亮动画：白天 -> 夜晚
        //   先让太阳可见、月亮透明，然后过 1 秒反转
        document.getElementById('sun').style.opacity = '1';
        document.getElementById('moon').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('sun').style.opacity = '0';
            document.getElementById('moon').style.opacity = '1';
        }, 1000);

        // 弹窗提示（需 Vue & notify）
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: '关灯啦🌙',
                        message: '当前已成功切换至夜间模式！',
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: 'success',
                        duration: 5000
                    });
                }
            });
        }, 2000);

    } else {
        // 当前是夜间 -> 切到白天
        newTheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');

        // 图标改成“月亮”
        document.getElementById('modeicon')?.setAttribute('xlink:href', '#icon-moon');

        // 太阳/月亮动画：夜晚 -> 白天
        document.getElementById('sun').style.opacity = '0';
        document.getElementById('moon').style.opacity = '1';
        setTimeout(() => {
            document.getElementById('sun').style.opacity = '1';
            document.getElementById('moon').style.opacity = '0';
        }, 1000);

        // 弹窗提示
        setTimeout(() => {
            new Vue({
                data: function () {
                    this.$notify({
                        title: '开灯啦🌞',
                        message: '当前已成功切换至白天模式！',
                        position: 'top-left',
                        offset: 50,
                        showClose: true,
                        type: 'success',
                        duration: 5000
                    });
                }
            });
        }, 2000);
    }

    // ============= 4. 让动画 DOM 延迟 2 秒后开始淡出 =============
    setTimeout(() => {
        const darkSky = document.querySelector('.Cuteen_DarkSky');
        if (darkSky) {
            darkSky.style.transition = 'opacity 3s';
            darkSky.style.opacity = '0';
            // 3 秒后移除，确保淡出动画完整
            setTimeout(() => {
                darkSky.remove();
            }, 3000);
        }
    }, 2000);

    // ============= 5. 更新第三方评论区或其他依赖主题的功能 =============
    if (typeof utterancesTheme === 'function') utterancesTheme();
    if (typeof FB === 'object') window.loadFBComment();
    if (
        window.DISQUS &&
        document.getElementById('disqus_thread')?.children.length
    ) {
        setTimeout(() => window.disqusReset(), 200);
    }
}
