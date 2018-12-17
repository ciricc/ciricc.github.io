function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
	
!(function(){
	"use strict";



	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}

	Prism.plugins.NormalizeWhitespace.setDefaults({
		'remove-trailing': true,
		'remove-indent': true,
		'left-trim': true,
		'right-trim': true,
		// 'break-lines': 80,
		// 'indent': 2,
		'remove-initial-line-feed': false,
		// 'tabs-to-spaces': 4,
		'spaces-to-tabs': 4
	});

	var $ = jQuery;

	jQuery.fn.justtext = function() {
  
		return $(this)	.clone()
				.children()
				.remove()
				.end()
				.text();

	}


	$.fn.animateRotate = function(angle, duration, easing, complete) {
	  return this.each(function() {
	    var $elem = $(this);

	    $({deg: 0}).animate({deg: angle}, {
	      duration: duration,
	      easing: easing,
	      step: function(now) {
	        $elem.css({
	           transform: 'rotate(' + now + 'deg)'
	         });
	      },
	      complete: complete || $.noop
	    });
	  });
	};

	function rand(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function Nav () {
		this.DOM = $('.nav');
		this.controller = $('.opener')
		this.opened = false;
		this.docs = this.DOM.parents('.docs')
		this.opBlock = $('.opacity-block')
	}


	//This method set active link on <li> in navigation
	Nav.prototype.setActive = function (link) {

		var active = this.DOM.find('li')
			.removeClass('active')
			.find('a[href="' + link + '"]')
			.parent('li');

		active.addClass('active');

		$('#sidebar,.docs-nav-wrap').animate({
			scrollTop: active.offset().top - 170
		}, 'fast');

		return this;
	}

	Nav.prototype.init = function () {
		var self = this;

		self.controller.on('click', _initToggleNav)
		self.opBlock.on('click', _initToggleNav)
		self.DOM.find('a,li').on('click', _initToggleNav)

		function _initToggleNav (_event) {
			(self.opened) ? self.close() : self.open();
		}
	}

	Nav.prototype.close = function () {
		var self = this;

		self.docs.removeClass('active');
		self.opBlock.removeClass('visible');

		setTimeout(function() {
			
			self.docs.removeClass('visible');
			self.opened = false;

		}, 300);

	}

	Nav.prototype.open = function () {
		
		this.docs.addClass('active');
		this.docs.addClass('visible');
		this.opBlock.addClass('visible');
		this.opened = true;
	}

	$(document).ready(function () {
		
		var switcherMode = $('.switch-mode');
		var darkThemeCss = "body{color:#B8B8B8}#content,#sidebar,.docs,.header,body{background-color:#111!important;color:#B8B8B8!important}.header{background:#0E0E0E!important}.logo{display:none}.logo-white{display:inline-block}code,pre{background:#1D1D1D!important;border:none!important}code[class*=language-],pre[class*=language-]{text-shadow:none;color:#B8B8B8}.big-quote p,.nav li.active,.soc-link{background:#222!important;border:none}.post .white{background:#111!important;border:none;width:110%}.post{background-color:#111;box-shadow:none;border-radius:0}.nav li.active{background:#0D0D0D!important}.soc-link,p{color:#DADADA!important}#sidebar{border-right:none}.nav li.active>a{color:#EEE}.nav li a{color:#B8B8B8}.nav .method{color:#07A282}.nav .object{color:#C6C6C6}.nav .property{color:#07A282}.selectric,.selectric .button,select{background:#222!important;color:#EEE!important}.selectric .button:after,.selectric .label{color:#EEE!important;border-top-color:#EEE}.token.punctuation{color:#B8B8AB}.token.class-name,.token.function{color:#FFA33D}.token.string{color:#39BAB9}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#F29718}.spoiler .spoiler-name,.token.interpolation{color:#B8B8B8}.spoiler{border:none;background-color:#0C0C0C}.line-numbers .line-numbers-rows{color:#000!important;border-right-color:#B8B8B8!important}.line-numbers-rows>span:before{color:#B8B8B8!important}.nav>li>ul li a:hover{background-color:#171717}.nav>li>a:focus,.nav>li>a:hover{background-color:#0E0E0E}img{opacity:.7}.selectric-items{background:#222}.selectric-items li.selected{background:#191919}.selectric-items li{color:#EEE}.selectric-items li:hover{background:#191919;color:#EEE}.notify-block.white{background:#0D0D0D}.st-map ul{color:#B8B8B8!important}.opener{color: #ABABAB !important;}";
		var hours = new Date().getHours()
		if (getCookie("dark-mode") == "yes" || (hours >= 22 || hours < 8)) {

			if ((hours >= 22 || hours < 8) && getCookie("dark-mode") == "no") {
			} else {
				switcherMode.find("span").removeClass("fa-moon-o").addClass("fa-sun-o");
				loadDarkTheme();
			}
		}

		function loadDarkTheme() {
			$("#theme-mode").text(darkThemeCss);
			$("meta[name='theme-color']").attr("content", "#0E0E0E")
			// $.ajax({
			// 	url: "/assets/css/dark-theme.css",
			// 	success: function (data) {
			// 		$("#theme-mode").text(darkThemeCss);
			// 	}
			// });
		}

		$('.nav svg').remove();
		
		$('.spoiler .spoiler-name').on("click", function() {

			if ($(this).data('spoiled')) {
				$(this).parent().find('> .spoiler-content').stop(true,false).slideUp('fast');
				$(this).data('spoiled', false);
				$(this).find('.spoiler-state').html('[+]')
				// $('#content')[0].scroll(0, $(this).data('current-pos'));
			} else {
				$(this).find('.spoiler-state').html('[ - ]')
				$(this).data('current-pos', $('#content').scrollTop());

				var spoiler = $(this).parent();
				var spolilerContent = spoiler.find('> .spoiler-content');
				spolilerContent.stop(true,false).slideDown('fast', function (){
					// $('#content')[0].scroll(0, $('#content').scrollTop() + spoiler.position().top - 25);
				});

				$(this).data('spoiled', true);
			}

		});

		var fullOful = $('.tree ul').length;

		function sortULS (iB) {
			var ul = $($('.tree ul')[iB]);

			var sortArray = [];

			ul.find('> li').each(function(a, li) {
				li = $(li)
				if (li.hasClass("opened")) {
					sortArray.push([li.html()])
				} else {
					sortArray.push(li.html())
				}
			});

			sortArray.sort();
			ul.find("> li").remove();
			for (var i = 0; i < sortArray.length; i++) {
				if (Array.isArray(sortArray[i])) {
					ul.append($("<li class='opened'></li>").html(sortArray[i][0]))
				} else {
					ul.append($("<li></li>").html(sortArray[i]))
				}
			}
			
			iB = iB + 1;

			if (iB < fullOful) {
				return sortULS(iB);
			}

			return;
		}

		sortULS(0);

		$('.tree').each(function(a, b) {
			var th = $(b);

			th.find("ul").hide();
			th.find("a").attr("target", "_blank");
			th.find('li').each(function (a, li){
				
				if ($(this).find("> ul").length) {
					$(this).css("margin-left", "0px");
					$(this).find("> .name").prepend($("<span class='state'>[+] </span>"))
					$(this).find("> .name").css("cursor", "pointer");
					
					if ($(this).hasClass("opened")) {
						$(li).find("> ul").toggle().toggleClass("showen");
						$(li).find("> .name .state").html("[ - ]");
					}

					$(this).find("> .name").on("click", function () {
						$(li).find("> ul").toggle().toggleClass("showen");
						if ($(li).find("> ul").hasClass("showen")) {
							$(li).find("> .name .state").html("[ - ]");
						} else {
							$(li).find("> .name .state").html("[+]");
						}
					})
				}
			})
		});

		($('select').selectric) ? $('select').selectric() : null;

		var version = $("#version");
		var currentVersion = "2.1.0";

		var loc = document.location;
			loc = loc.pathname.split('/');

		version.on("change", function (e) {
			var v = version.val();
			var locVersion = parseFloat(loc[loc.length - 2]);
			if (locVersion) {
				document.location = (v == currentVersion) ? "../index.html" : "../" + v + "/index.html";
			} else {
				document.location = (v == currentVersion) ? "index.html" : v + "/index.html";
			}
		});

		var nav = new Nav();
		
		nav.setActive(loc[loc.length - 1] || 'index.html')
		nav.init();
		var page = loc[loc.length - 1];
		var v = parseFloat(loc[loc.length - 2]);

		if (page == "") {
			// document.location = ((v) ? ("/" + loc[loc.length - 2] + "/") : "") + "index.html";
			page = "index.html";
		}

		var dots = 0;
		// if (v == 2 || !v && !window.pageGot) {
		// 	var phInterval = setInterval(function(){
		// 		dots += 1;
				
		// 		$('h1').html('Документация обновляется' + new Array(dots).fill(".").join(""));

		// 		if (dots >=4) dots = 0;

		// 	}, 500);
		// }

		if (v == 2 || !v) {
			var logo = $('.logo img');

			function rotateLogo (){
				logo.animate({
					width: 20
				});
				logo.animateRotate(360, 1000);
				setTimeout(function() {
					logo.animate({
						width: 55
					});
				}, 1000);
			}

			if (!isMobile) {
				setInterval(rotateLogo, 16000);
				setTimeout(rotateLogo, 1000);
			}
		}

		switcherMode.on("click", function () {
			if (getCookie("dark-mode") == "no") {
				setCookie("dark-mode", "yes", {
					expires: 3600 * 24,
					path: "/"
				});
				
				loadDarkTheme();

				return switcherMode.find("span").removeClass("fa-moon-o").addClass("fa-sun-o");
			} else {
				
				$("meta[name='theme-color']").attr("content", "#fff");

				setCookie("dark-mode", "no", {
					expires: 3600 * 24,
					path: "/"
				});

				$("#theme-mode").text("");

				return switcherMode.find("span").removeClass("fa-sun-o").addClass("fa-moon-o");
			}

		});


	});
})();