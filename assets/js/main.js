!(function(){
	"use strict";

	var $ = jQuery;

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

		if (loc[loc.length - 1] == "") {
			var v = parseFloat(loc[loc.length - 2]);
			document.location = ((v) ? (v + "/") : "") + "index.html";
		}
		
	});
})();