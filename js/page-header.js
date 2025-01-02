var path = document.getElementById("post-cover").src;
console.log(path);
if(path !== 'https://tsaihungye.com/'){ //将这里的网站前面替换成你自己的,判断是否是不想变的图片，例如放入主页图片url
    var httpRequest = new XMLHttpRequest();    httpRequest.open('GET', path + '?imageAve', true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;            var obj = eval('(' + json + ')');
            var value = obj.RGB;
            value ="#" + value.slice(2)
            // console.log(value);
            //   document.getElementById('page-header').style.backgroundColor=value;
            document.styleSheets[0].addRule('#page-header:before','background: '+ value +'!important');
        }
    };
}else{
    document.styleSheets[0].addRule('#page-header:before','background: none!important');
}
