// basejs.init
// Copyright (c) 2023 Greg Greene

// Javascript library for basejs

// Init globals, common services and features

var BASEJS_APP_OPT = {
	protocol: window.location.protocol,
	host: window.location.host,
	pathname: window.location.pathname,
	url: '',
	path: '',
	mode: 'normal'
};

BASEJS_APP_OPT.url = '//' + BASEJS_APP_OPT.host + '/' + BASEJS_APP_OPT.path;

//
// init on ready
//
$(document).on('ready', function () {

	$(document).trigger('readyup.before');

	window.BASEJS_APP_OPTION_NO_USERSELECT ??= true;

	// turn off text and images selectability; to give it that mobile "app" feel.
	if (Hammer && BASEJS_APP_OPTION_NO_USERSELECT) {
		delete Hammer.defaults.cssProps.userSelect;
	}

	if (basejs.userAgent.version().indexOf('11.') == 0) {
		$(document.body).addClass('IE11');
		BASEJS_APP_OPT.url = '//' + BASEJS_APP_OPT.host + '/' + BASEJS_APP_OPT.path;
	}
	else {
		BASEJS_APP_OPT.url = document.baseURI;
	}

	$(document).trigger('readyup');

	if (basejs.userAgent.isMobile()) {
		$(document.body).addClass('mobile');
	}
	else {
		$(document.body).addClass('not-mobile');
	}

	$(window).on('resize load scroll orientationchange', function () {
		$(document).trigger('updatedimensions');
	});

	$(document).trigger('readyup.after');
});