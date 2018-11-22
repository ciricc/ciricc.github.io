!(function(){
	"use strict";


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
		var currentVersion = "2.0.0";

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
			document.location = ((v) ? ("/" + loc[loc.length - 2] + "/") : "") + "index.html";
		}

		var dots = 0;
		if (v == 2 || !v && !window.pageGot) {
			var phInterval = setInterval(function(){
				dots += 1;
				
				$('h1').html('Документация обновляется' + new Array(dots).fill(".").join(""));

				if (dots >=4) dots = 0;

			}, 500);
		}

		if (v == 2 || !v) {
			var logo = $('.logo img');

			function rotateLogo (){
				logo.animate({
					width: 20
				});
				logo.animateRotate(360, 1000);
				setTimeout(function() {
					logo.animate({
						width: 45
					});
				}, 1000);
			}

			setInterval(rotateLogo, 16000);
			setTimeout(rotateLogo, 1000);
		}	


	});
})();