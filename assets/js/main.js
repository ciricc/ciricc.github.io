!(function(){
	"use strict";

	var $ = jQuery;

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
				$(this).parent().find('.spoiler-content').stop(true,false).slideUp('fast');
				$(this).data('spoiled', false);
				// $('#content')[0].scroll(0, $(this).data('current-pos'));
			} else {
				$(this).data('current-pos', $('#content').scrollTop());

				var spoiler = $(this).parent();
				var spolilerContent = spoiler.find('.spoiler-content');
				spolilerContent.stop(true,false).slideDown('fast', function (){
					// $('#content')[0].scroll(0, $('#content').scrollTop() + spoiler.position().top - 25);
				});

				$(this).data('spoiled', true);
			}

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