// basejs.app
// Copyright (c) 2023 Greg Greene

// Javascript library for basejs

// Common app services and features

basejs.app = {};
basejs.app.session = {};
basejs.app.session.current = {};
basejs.app.animate = {};
basejs.app.refs = {};
basejs.app.states = {
	'loading': {},
	'creating': {},
	'deleting': {}
};

window.BASEJS_APP_OPTION_SWIPE_LEFT ??= false;
window.BASEJS_APP_OPTION_SWIPE_RIGHT ??= false;
window.BASEJS_APP_OPTION_SWIPE_UP ??= false;
window.BASEJS_APP_OPTION_SWIPE_DOWN ??= false;

window.BASEJS_APP_OPTION_SWIPE_REVERSE_ANY ??= false;

window.BASEJS_APP_OPTION_SWIPE_LEFT_REVERSE ??= BASEJS_APP_OPTION_SWIPE_LEFT;
window.BASEJS_APP_OPTION_SWIPE_RIGHT_REVERSE ??= BASEJS_APP_OPTION_SWIPE_RIGHT;
window.BASEJS_APP_OPTION_SWIPE_UP_REVERSE ??= BASEJS_APP_OPTION_SWIPE_UP;
window.BASEJS_APP_OPTION_SWIPE_DOWN_REVERSE ??= BASEJS_APP_OPTION_SWIPE_DOWN;

window.BASEJS_APP_OPTION_SWIPE_LEFT_SWIPEAREA ??= false;
window.BASEJS_APP_OPTION_SWIPE_RIGHT_SWIPEAREA ??= false;
window.BASEJS_APP_OPTION_SWIPE_UP_SWIPEAREA ??= false;
window.BASEJS_APP_OPTION_SWIPE_DOWN_SWIPEAREA ??= false;

window.BASEJS_APP_MAX_SWIPE_AREA_WIDTH = (16 * 3) * 5; // 1rem = 16px * 3 = 48px (* 3 for extra swipe area)
window.BASEJS_APP_MAX_SWIPE_AREA_HEIGHT = (16 * 3) * 5;

basejs.app.shiftOptions = {
	left: {
		side: 'left',
		enabled: BASEJS_APP_OPTION_SWIPE_RIGHT,
		handler: function (e) { if (e.direction != Hammer.DIRECTION_RIGHT) { return; } BASEJS_APP_SWIPE_HANDLER(e); },
		reverse: {
			enabled: BASEJS_APP_OPTION_SWIPE_RIGHT_REVERSE,
			handler: function (e) { if (e.direction != Hammer.DIRECTION_LEFT) { return; } BASEJS_APP_SWIPE_REVERSE_HANDLER(e); },
			toSwipeDirection: Hammer.DIRECTION_LEFT
		},
		swipeArea: {
			enabled: BASEJS_APP_OPTION_SWIPE_RIGHT_SWIPEAREA,
			area: { top: function () { return 0; }, left: function () { return 0; }, width: function () { return BASEJS_APP_MAX_SWIPE_AREA_WIDTH; }, height: function () { return window.innerHeight; } }, 
			class: 'absolute cover-height absolute-top-left', 
			style: 'width:2rem;opacity:0.0;'
		},
		toSwipeDirection: Hammer.DIRECTION_RIGHT
	},
	right: {
		side: 'right', 
		enabled: BASEJS_APP_OPTION_SWIPE_LEFT, 
		handler: function (e) { if (e.direction != Hammer.DIRECTION_LEFT) { return; } BASEJS_APP_SWIPE_HANDLER(e); },
		reverse: {
			enabled: BASEJS_APP_OPTION_SWIPE_RIGHT_REVERSE,
			handler: function (e) { if (e.direction != Hammer.DIRECTION_RIGHT) { return; } BASEJS_APP_SWIPE_REVERSE_HANDLER(e); },
			toSwipeDirection: Hammer.DIRECTION_RIGHT
		},
		swipeArea: {
			enabled: BASEJS_APP_OPTION_SWIPE_LEFT_SWIPEAREA,
			area: { top: function () { return 0; }, left: function () { return window.innerWidth - BASEJS_APP_MAX_SWIPE_AREA_WIDTH; }, width: function () { return BASEJS_APP_MAX_SWIPE_AREA_WIDTH; }, height: function () { return window.innerHeight; } }, 
			class: 'absolute cover-height absolute-top-right', 
			style: 'width:2rem;opacity:0.0;'
		},
		toSwipeDirection: Hammer.DIRECTION_LEFT
	},
	top: { 
		side: 'top', 
		enabled: BASEJS_APP_OPTION_SWIPE_DOWN, 
		handler: function (e) { if (e.direction != Hammer.DIRECTION_DOWN) { return; } BASEJS_APP_SWIPE_HANDLER(e); }, 
		reverse: { 
			enabled: BASEJS_APP_OPTION_SWIPE_DOWN_REVERSE, 
			handler: function (e) { if (e.direction != Hammer.DIRECTION_UP) { return; } BASEJS_APP_SWIPE_REVERSE_HANDLER(e); }, 
			toSwipeDirection: Hammer.DIRECTION_UP 
		},
			swipeArea: { 
				enabled: BASEJS_APP_OPTION_SWIPE_DOWN_SWIPEAREA, 
				area: { top: function () { return 0; }, left: function () { return 0; }, width: function () { return window.innerWidth; }, height: function () { return BASEJS_APP_MAX_SWIPE_AREA_HEIGHT; } }, 
				class: 'absolute cover-width absolute-top-left', 
				style: 'height:2rem;opacity:0.0;' 
			}, 
			toSwipeDirection: Hammer.DIRECTION_DOWN 
	},
	bottom: { 
		side: 'bottom', 
		enabled: BASEJS_APP_OPTION_SWIPE_UP, 
		handler: function (e) { if (e.direction != Hammer.DIRECTION_UP) { return; } BASEJS_APP_SWIPE_HANDLER(e); }, 
		reverse: { 
			enabled: BASEJS_APP_OPTION_SWIPE_UP_REVERSE, 
			handler: function (e) { if (e.direction != Hammer.DIRECTION_DOWN) { return; } BASEJS_APP_SWIPE_REVERSE_HANDLER(e); }, 
			toSwipeDirection: Hammer.DIRECTION_DOWN 
		}, 
		swipeArea: { 
			enabled: BASEJS_APP_OPTION_SWIPE_UP_SWIPEAREA, 
			area: { top: function () { return window.innerHeight - BASEJS_APP_MAX_SWIPE_AREA_HEIGHT; }, left: function () { return 0; }, width: function () { return window.innerWidth; }, height: function () { return BASEJS_APP_MAX_SWIPE_AREA_HEIGHT; } }, 
			class: 'absolute cover-width absolute-bottom-left', 
			style: 'height:2rem;opacity:0.0;' 
		}, 
		toSwipeDirection: Hammer.DIRECTION_UP 
	}
};

window.BASEJS_APP_SWIPE_REVERSE_HANDLER = function(e) {
	var opt = null,
		side = null;

	if(BASEJS_DEBUG) {
		console.debug('reverse: ' + e.direction);
	}

	if (BASEJS_APP_OPTION_SWIPE_MOBILEONLY && !rmd.userAgent.isMobile()) {
		return;
	}
	
	if(BASEJS_DEBUG) {
		console.debug('swiped reverse: ' + e.direction);
	}

	for(side in basejs.app.shiftOptions) {
		if(basejs.app.shiftOptions[side].reverse.toSwipeDirection == e.direction) {
			opt = basejs.app.shiftOptions[side];
			break;
		}
	}

	if(!opt) {
		return;
	}

	basejs.app.closeShift({ direction: opt.direction });

	setTimeout(function() {
		if(BASEJS_DEBUG) {
			console.debug('reverse swipe handler deleted (' + side + ')');
		}
		basejs.app.refs.hammertime['swipe-' + side + '-reverse'].off('swipe', BASEJS_APP_SWIPE_REVERSE_HANDLER);
		delete basejs.app.refs.hammertime['swipe-' + side + '-reverse'];
	}, 300);
};

window.BASEJS_APP_SWIPE_HANDLER = function(e) {
	var opt = null,
		side = null,
		area = null;

	if (BASEJS_APP_OPTION_SWIPE_MOBILEONLY && !rmd.userAgent.isMobile()) {
		return;
	}
	
	if(BASEJS_DEBUG) {
		console.debug('swiped: ' + e.direction);
	}

	for(side in basejs.app.shiftOptions) {
		if(basejs.app.shiftOptions[side].toSwipeDirection == e.direction) {
			opt = basejs.app.shiftOptions[side];
			area = opt.swipeArea.area;
			break;
		}
	}

	if(!opt) {
		return;
	}

	if(BASEJS_DEBUG) {
		console.debug('side: ' + side);
		// console.debug('area left: (' + area.left() + ',' + (area.left() + area.width()) + ')');
		// console.debug('area top: (' + area.top() + ',' + (area.top() + area.height()) + ')');
		// console.debug('mouse coord: ' + JSON.stringify(e.center));
	}

	if(
		!(e.center.x >= area.left() && e.center.x <= area.left() + area.width()) &&
		(e.center.y >= area.top() && e.center.y <= area.top() + area.height())
	) {
		if(BASEJS_APP_OPTION_SWIPE_REVERSE_ANY) {
			basejs.app.closeShift();
		}
		return;
	}

	if(BASEJS_DEBUG) {
		console.debug(e);
		console.debug(area);
	}

	if(opt.reverse.enabled) {
		setTimeout(function() {
			if(BASEJS_DEBUG) {
				console.debug('reverse swipe handler added: ' + side);
			}
			basejs.app.refs.hammertime['swipe-' + side + '-reverse'] = new Hammer(window);
			basejs.app.refs.hammertime['swipe-' + side + '-reverse'].on('swipe', opt.reverse.handler);
		}, 300);
	}

	basejs.app.setLayoutShift({ direction: e.direction });
};

basejs.app.search = function (params) {
	$(document).trigger('search', params);
};

basejs.app.applyTheme = function (params) {
	params = params || {};

	var el = $(params.element),
		id = typeof params.id == 'undefined' ? '' : params.id,
		type = typeof params.type == 'undefined' ? '' : params.type;

	el.addClass(id + '-theme-' + type.toLowerCase());
};

basejs.app.removeTheme = function (params) {
	params = params || {};

	var el = $(params.element),
		id = typeof params.id == 'undefined' ? '' : params.id,
		type = typeof params.type == 'undefined' ? '' : params.type;

	el.removeClass(function (index, className) {
		return (className.match('(^|\s)' + id + '-theme-\S+') || []).join(' ');
	});
};

basejs.app.setState = function (params) {
	var state = '',
		body = $(document.body);

	params = params || {};

	if (params.state) {
		state = params.state;
	}

	if (!state || state == '' || state == 'NORMAL') {
		body.removeClass('app-state-loading');
		body.removeClass('app-state-creating');
		body.removeClass('app-state-updating');
		body.removeClass('app-state-deleting');
		body.removeClass('loading');
		body.modal('hide');
	}
	else {
		for(s in basejs.app.states) {
			if (state == s.toUpperCase()) {
				body.addClass('app-state-' + s);
				body.addClass('loading');
				body.modal('show');
				break;
			}
		}
	}

	$(document).trigger('setstate', params);
};

basejs.app.directionToNumber = function(direction) {

	direction??= 0;

	directions = { 
		'left': Hammer.DIRECTION_LEFT,
		'right': Hammer.DIRECTION_RIGHT,
		'up': Hammer.DIRECTION_UP,
		'down': Hammer.DIRECTION_DOWN
	};

	return isNaN(parseInt(direction)) ? directions[direction] : direction;
}

basejs.app.toggleLayoutShift = function(params) {
	params = params || {};

	if((document.body.classList.contains('mode--layout-shift-left')) || 
		(document.body.classList.contains('mode--layout-shift-right')) || 
		(document.body.classList.contains('mode--layout-shift-top')) || 
		(document.body.classList.contains('mode--layout-shift-bottom'))
		) {
			basejs.app.closeShift(params);
			setTimeout(function () {
				document.body.classList.remove('mode--layout-shift-noscroll-y');
			}, 700);
		}
		else {
			basejs.app.setLayoutShift(params);
		}
};

basejs.app.setLayoutShift = function (params) {
	params = params || {};

	var e = null, 
		direction = Hammer.DIRECTION_LEFT,
		shift_option = null,
		side = null,
		body = $(document.body);

	if(params.direction) {
		direction = params.direction;
	}

	direction = basejs.app.directionToNumber(direction);

	if(BASEJS_DEBUG) {
		console.debug('basejs.app.setLayoutShift (params): ' + JSON.stringify(params));
		console.debug('basejs.app.setLayoutShift: ' + direction);
	}

	for(side in basejs.app.shiftOptions) {
		if(basejs.app.shiftOptions[side].toSwipeDirection == direction) {
			shift_option = basejs.app.shiftOptions[side];
			break;
		}
	}

	if(!shift_option) {
		if(BASEJS_DEBUG) {
			console.debug('basejs.app.setLayoutShift: ' + 'shift option not found.'); 
		}
		return;
	}
	
	if(params.e) {
		if(BASEJS_DEBUG) {
			console.debug(JSON.stringify(params));
		}
		
		e = $(params.e);
		e.detach();
		e.appendTo('.site-layout-shift > div[style*="grid-area:' + side + '"]');
		e.removeClass('hide');
		
		$(document).on('layout.shift.' + side + '.close', function() {
			e.addClass('hide');
		});
	}

	if(BASEJS_DEBUG) {
		console.debug('basejs.app.setLayoutShift (side): ' + side);
	}
	
	body.addClass('mode--noscroll-y');
	body.addClass('mode--layout-shift-' + side);
	
	$(document).trigger('layout.shift.' + side + '.afterset');
		
	return e ? $(e) : null;
};

basejs.app.closeShift = function(params) {
	params = params || {};

	var direction = basejs.app.directionToNumber(params.direction) ?? null,
		side = (function() { for(side in basejs.app.shiftOptions) { if(basejs.app.shiftOptions[side].toSwipeDirection == direction) { return side; } } })(),
		f = function() {
			document.body.classList.remove('mode--layout-shift-' + side);
			$(document).trigger('layout.shift.' + side + '.close');
		};

	side ? f() : (function() { for(side in basejs.app.shiftOptions) { f(); } })();

	setTimeout(function() {
		document.body.classList.remove('mode--noscroll-y');
	}, 700);
};


$(document).on('ready', function() {
	var e = null,
		opt = null,
		direction = '';

	// $(document).bind('layout.shift.set', function(e, detail) {
	// });
	
	// $(document).bind('layout.shift.close', function(e, detail) {
	// });
	
	// $(document).bind('layout.shift.afterset', function(e, detail) {
	// });

	// NOTE: Official modes for rmd-base-layout:
	// .mode--layout-shift-left
	// .mode--layout-shift-right
	// .mode--layout-shift-top
	// .mode--layout-shift-bottom

	if (Hammer) {
		basejs.app.refs.hammertime = {};
	}

	// basejs.app.refs.hammertime['swipe-any'] = new Hammer(window);
	// basejs.app.refs.hammertime['swipe-any'].on('swipe', function(e) {
	// 	if (BASEJS_APP_OPTION_SWIPE_MOBILEONLY && !rmd.userAgent.isMobile()) {
	// 		return;
	// 	}
		
	// 	if(BASEJS_DEBUG) {
	// 		console.debug('swiped any: ' + e.direction);
	// 	}

	// 	// basejs.app.closeShift();
	// });

	if(BASEJS_APP_OPTION_SWIPE_LEFT || 
		BASEJS_APP_OPTION_SWIPE_RIGHT || 
		BASEJS_APP_OPTION_SWIPE_UP ||
		BASEJS_APP_OPTION_SWIPE_DOWN) {

		for(side in basejs.app.shiftOptions) {
			opt = basejs.app.shiftOptions[side];

			if(!opt.enabled) {
				continue;
			}

			if(BASEJS_DEBUG) {
				console.debug('adding swipe handler: ' + side);
			}

			if(opt.swipeArea.enabled) {
				e = document.body.appendChild(document.createElement('DIV'));
				e.className = opt.class;
				e.style = opt.style;
			}
			else {
				e = window;
			}

			if('swipe-' + side in basejs.app.refs.hammertime) {
				continue;
			}

			basejs.app.refs.hammertime['swipe-' + side] = new Hammer(e);
			basejs.app.refs.hammertime['swipe-' + side].on('swipe', opt.handler);

		};
	}	
});

basejs.app.animate.onOff = function(ids, animation_id) {
	$(ids).removeClass(animation_id);
			
	setTimeout(function() {
		$(ids).addClass(animation_id);
	}, 250);
};

basejs.app.dialog = function (e, f_ok, f_cancel) {

	var dialog = $(e).dialog({
		id: "rmd_dialog_" + rmd.random('ccccccccccc'),
		autoOpen: false,
		width: 390,
		height: 225,
		modal: true,
		dialogClass: 'ui-dialog-notitlebar',
		buttons: [{
			id: "rmd_dialog_ok",
			text: "OK",
			click: function () {
				if (typeof (f_ok) == "function") {
					f_ok(this);
				}
				else {
					dialog.dialog("close");
				}
			}
		},
		{
			id: "rmd_dialog_cancel",
			text: "Cancel",
			click: function () {
				if (typeof (f_cancel) == "function") {
					f_cancel(this);
				}
				else {
					dialog.dialog("close");
				}
			}
		}],
		close: function () {

		}
	});

	return dialog;
};

basejs.app.dialogOk = function (e, f_ok, f_cancel) {
	var d = rmd.qa.dialog(e, f_ok, f_cancel);

	buttons = d.dialog("option", "buttons");
	buttons.splice(1, 1);
	d.dialog("option", "buttons", buttons);

	return d;
};

basejs.app.notifyTape = function (message) {
	var p = $('#site_notifier_tape');

	p.removeClass('active');
	p.removeClass('hide');
	p.css('z-index', '2000');

	setTimeout(function () {
		p.css('top', $(document).scrollTop() + 'px');
		//p.css('top', '0px');
		p.css('left', '0px');
	}, 500);

	if (message) {
		$('#site_notifier_tape .message').text(message);
	}

	//p.addClass('run');
	p.addClass('active');

	setTimeout(function () {
		p.css('top', '-90px');
		//p.addClass('anim-fadeout active');

		setTimeout(function () {
			//p.removeClass('anim-fadeout active');
			p.addClass('hide');
		}, 1000);
	}, 3500);

	return p;
};

basejs.app.closeNotifyTape = function () {
	var p = $('#site_notifier_tape');
	p.addClass('hide');
	return p;
};

basejs.app.notifyBadge = function (message) {
	var p = $('#site_notifier_badge');
	var w = $(window);

	p.removeClass('active');
	p.removeClass('hide');

	p.modal('show');

	//p.css('top', $(document).scrollTop() + 'px');
	p.css('top', (w.height() / 2) - (p.height() / 2) + $(document).scrollTop() - 50 + 'px');
	p.css('left', (w.width() / 2) - (p.width() / 2) + 'px');

	if (message) {
		$('#site_notifier_badge .site-notifier-badge-content').text(message);
	}

	//p.addClass('run');
	p.addClass('active');

	return p;
};

basejs.app.notifyBadgeOk = function (message) {
	var p = $('#site_notifier_badge_ok');
	var w = $(window);

	p.removeClass('active');
	p.removeClass('hide');

	p.modal('show');

	//p.css('top', $(document).scrollTop() + 'px');
	p.css('top', (w.height() / 2) - (p.height() / 2) + $(document).scrollTop() - 50 + 'px');
	p.css('left', (w.width() / 2) - (p.width() / 2) + 'px');

	if (message) {
		$('#site_notifier_badge_ok .site-notifier-badge-content').text(message);
	}

	//p.addClass('run');
	p.addClass('active');

	setTimeout(function () {
		p.modal('hide');
	}, 2000);

	return p;
};

basejs.app.balloon = function (message, target, at, f_ok, f_cancel) {
	var balloon = $("#site_balloon").clone();
	balloon.attr('id', 'site_balloon_' + rmd.random('hhhhhhhh'));
	balloon.removeClass("hide");

	var d = rmd.qa.dialog(balloon, f_ok, f_cancel);
	var t = $(target);

	d.dialog("option", {
		buttons: null,
		width: 250,
		height: 85,
		modal: false,
		resizable: false,
		dialogClass: 'ui-dialog-notitlebar ui-dialog-nopadding site-dialog-balloon ui-dialog-noshadow noborder',
		position: { my: "top-7px", at: "center bottom", of: t }
	});

	var content = balloon.find('.content');
	content.text(message);

	var gotit = content.prepend("<div class='show-table site-closex cursor-pointer font-lg cover-width'>&nbsp;X&nbsp;</div>");
	gotit.on('click', function () {
		d.dialog('destroy');
	});

	d.dialog("open");

	$(window).on('resize scroll', function () {
		if (d) {
			d.dialog("option", {
				position: { my: "top-5px", at: "bottom", of: t }
			});
		}
	});

	balloon.addClass("active");

	//d.prepend("<img class='nav-menu-arrow' src='../images/icon-arrow-up-40x16.svg' />");

	//d.css("left", t.position().left);
	//d.css("top", t.position().top);

	return d;
};

basejs.app.session.current = {
	authenticated: false,
	timeoutIn: -1,
	timeoutIds: {
		affirm: -1,
		autoLogout: -1
	},
	callbacks: {
		affirm: {},
		reset: {}
	}
};

basejs.app.session.reset = function() {
	clearTimeout(basejs.app.session.current.timeoutIds['autoLogout']);
	clearTimeout(basejs.app.session.current.timeoutIds['affirm']);

	basejs.app.session.affirm();
};


basejs.app.session.affirm = function(params, callbacks) {

	params = params || {};

	callbacks = callbacks || basejs.app.session.current.callbacks['affirm'] || {};

	basejs.app.session.current.callbacks['affirm'] = callbacks;
	
	if (basejs.app.session.current.authenticated) {
		var timeout_minutes = basejs.app.session.current.timeoutIn,
			timeout_milliseconds = !isNaN(parseInt(timeout_minutes)) ? parseInt(timeout_minutes) * 60 * 1000 : 30 * 60 * 1000,
			timeout_left_milliseconds = (timeout_milliseconds * 0.25),
			f = function () {

				basejs.app.session.current.timeoutIds['affirm'] = setTimeout(function () {
					var time_type = (timeout_left_milliseconds / 1000) < 60 ? 'second' : 'minute',
						time_left = (timeout_left_milliseconds / 1000) < 60 ? timeout_left_milliseconds / 1000 : Math.round(timeout_left_milliseconds / 1000 / 60),
						then = Date.now();

						basejs.app.session.current.timeoutIds['autoLogout'] = setTimeout(function () {
							if('logout' in callbacks) {
								callbacks.logout();
							}
						}, timeout_left_milliseconds);


					// TODO: replace with custom dialog
					if (confirm('Your session is going to expire in about ' + time_left + '(s) ' + time_type + '. Do you wish to stay logged in?')) {
						if (Math.floor((Date.now() - then) / 1000 / (time_type == 'minute' ? 60 : 1)) > time_left) {
							if('logoutWaited' in callbacks) {
								callbacks.logoutWaited();
							}
						}
						else {
							if('sessionReset' in callbacks) {
								callbacks.sessionReset();
							}
							f();
						}
					}
					else {
						if('logoutOk' in callbacks) {
							callbacks.logoutOk();
						}
					}

					clearTimeout(basejs.app.session.current.timeoutIds['autoLogout']);

				}, timeout_left_milliseconds * 0.75);
			};

		f();
	}
};