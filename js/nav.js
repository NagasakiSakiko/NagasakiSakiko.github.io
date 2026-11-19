document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
    const nameContainer = document.getElementById("name-container");
    const menuItems = document.getElementsByClassName("menus_items")[1];
    const pageName = document.getElementById("page-name");
    if (!nameContainer || !menuItems || !pageName) return;

    nameContainer.setAttribute("style", "display:none");
    let position = window.scrollY;

    if (window.tsaiNavScrollHandler) {
        window.removeEventListener('scroll', window.tsaiNavScrollHandler);
    }

    window.tsaiNavScrollHandler = function () {
        const scroll = window.scrollY;
        if (scroll > position) {
            nameContainer.setAttribute("style", "");
            menuItems.setAttribute("style", "display:none!important");
        } else {
            menuItems.setAttribute("style", "");
            nameContainer.setAttribute("style", "display:none");
        }
        position = scroll;
    };

    window.addEventListener('scroll', window.tsaiNavScrollHandler, { passive: true });
    //修复没有弄右键菜单的童鞋无法回顶部的问题
    pageName.innerText = document.title.split(" | Tsaihungye🍃")[0];
}

function scrollToTop() {
    document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
    document.getElementById("name-container").setAttribute("style", "display:none");
    btf.scrollToDest(0, 500);
}
