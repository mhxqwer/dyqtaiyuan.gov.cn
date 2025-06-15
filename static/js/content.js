/*
$(document).ready(function() {
    $('#fullpage').fullpage({
        // 导航
        menu: '#menu',
        lockAnchors: false,
        anchors:['section1', 'section2', 'section3', 'section4'],
        //navigation: true,
        //navigationPosition: 'right',
        //navigationTooltips: ['景区概况', '景区文鉴', '景区风光', '景区视频'],
        //showActiveTooltip: true,
        //slidesNavigation: false,
        //slidesNavPosition: 'bottom',

        // 滚动
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 600,
        //scrollBar: true,
        // easing: 'easeInOutCubic',
        // easingcss3: 'ease',
        // loopBottom: false,
        // loopTop: false,
        // loopHorizontal: true,
        // continuousVertical: false,
        // continuousHorizontal: false,
        // scrollHorizontally: false,
        // interlockedSlides: false,
        // dragAndMove: false,
        // offsetSections: false,
        // resetSliders: false,
        // fadingEffect: false,
        // normalScrollElements: '#element1, .element2',
        // scrollOverflow: true,
        // scrollOverflowMacStyle: false,
        // scrollOverflowReset: false,
        // touchSensitivity: 15,
        // bigSectionsDestination: null,

        // 可访问
        keyboardScrolling: true,
        // animateAnchor: true,
        // recordHistory: true,

        // 布局
        // controlArrows: true,
        // controlArrowsHTML: [
        //     '<div class="fp-arrow"></div>', 
        //     '<div class="fp-arrow"></div>'
        // ],
        verticalCentered: true,
        // sectionsColor : ['#ccc', '#fff'],
        paddingTop: '5.5em',
        paddingBottom: '10px',
        // fixedElements: '#header, .footer',
        // responsiveWidth: 0,
        // responsiveHeight: 0,
        // responsiveSlides: false,
        // parallax: false,
        // parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        // dropEffect: false,
        // dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
        // waterEffect: false,
        // waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
        // cards: false,
        // cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

        // 自定义选择器
        // sectionSelector: '.section',
        // slideSelector: '.slide',

        // lazyLoading: true,
        // lazyLoadThreshold: 0,
        // observer: true,
        // credits: { enabled: true, label: 'Made with fullPage.js', position: 'right'},

        // 事件
        // beforeLeave: function(origin, destination, direction, trigger){},
        // onLeave: function(origin, destination, direction, trigger){},
        // afterLoad: function(origin, destination, direction, trigger){},
        // afterRender: function(){},
        // afterResize: function(width, height){},
        // afterReBuild: function(){},
        // afterResponsive: function(isResponsive){},
        // afterSlideLoad: function(section, origin, destination, direction, trigger){},
        // onSlideLeave: function(section, origin, destination, direction, trigger){},
        // onScrollOverflow: function(section, slide, position, direction){}
    });
});
*/
/*
$(function(){
	const prevPageUrl = getPrevPageUrlFromParam();
	if (prevPageUrl) {
		console.log('上一页地址：', prevPageUrl);
	} else {
		console.log('无法通过参数获取上一页地址。');
	}					
})
function getPrevPageUrlFromParam() {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('prevPageUrl');
}
*/
$(function(){
	        // 在页面 B 加载时获取上一页地址
        const prevPageUrl = localStorage.getItem('prevPageUrl');
        if (prevPageUrl) {
            console.log('上一页地址：', prevPageUrl);
			$('#backButton').click(function() {
				window.location.href=prevPageUrl;
			});			
            // 使用完后可以清除存储，避免干扰后续操作
            localStorage.removeItem('prevPageUrl');
        } else {
            console.log('无法通过浏览器存储获取上一页地址。');
        }
})

function show(){
	let xml = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHttp');
	xml.open('GET','https://api.jeecms.com/MODULE-ACCESSIBLE-READING/front/readings/checkAvailability?callingCode=4cU3e84wRBad3qyPeq4wU7if3aTD-m3bAkdd33zAtc39AQ1e3oEQBb3qQnxv4rPjd74rP8ym4lTz-j4mUz-b4nEPRv4oS7ek3qyPeq39y49e34A4t93qzkdg4aQjdh4pP7mk4cQl2932ETmS4zU49v39CRW=3fSEyu4XU4ar39TQio4WSBOC3qBjev4eQTig4VT7am3qT7mk4vQPd73eA7mu3fzQ593cy4lc3qzQB93YMh62');
	xml.send();
	xml.onreadystatechange=function(){
		if($('#ABTInterface').length!=0){
			return
		}
		if (xml.readyState==4 && xml.status==200){
			let res = JSON.parse(xml.responseText);
			if (res.code == 200) {
				localStorage.setItem("close", true);
				let script = document.createElement('script');
				// script.src = res.data.abtJsUrl;
				let host = window.location.protocol+"//"+window.location.host;
				script.src = host+"/r/cms/www/default/reading/abt.js";
				//重写为本地js
				res.data.abtJsUrl=host+"/r/cms/www/default//reading/abt.js";
				res.data.gbkJsUrl=host+"/r/cms/www/default//reading/gbk.js";
				res.data.helpHtmlUrl=host+"/r/cms/www/default//reading/help.html";
				res.data.pinyinJsUrl=host+"/r/cms/www/default//reading/pinyin.js";
				res.data.skinCssUrl=host+"/r/cms/www/default//reading/skin.css";
				document.body.appendChild(script);
				console.log(window.location.host)
				console.log(res.data)
				script.onload = function(){ABTshow(res.data);}
			} else if (res.code == 500){
				alert(res.message);
			}
		}
	}
}
function changenav(){
    $(".nav ul").attr({"style":"display:block"})
    $(".nav .mobile_nav").attr({"style":"display:none"})
    $(".nav .mobile_nav_close").attr({"style":"display:block"})
}
function changenavclose(){
    $(".nav ul").attr({"style":"display:none"})
    $(".nav .mobile_nav").attr({"style":"display:block"})
    $(".nav .mobile_nav_close").attr({"style":"display:none"})    
}