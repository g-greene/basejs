// basejs, Mon April 3 12:28:00 -0500 2023
// Copyright (c) 2023 Greg Greene

// Javascript library for basejs


/**
* The root namespace
* @namespace
*/

var basejs = {}, _b = basejs;

basejs.userAgent = {
	isMobile: function() {
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
			return true;
		}
		return false;
	},
	browser: function() {
		return('ua:' + navigator.userAgent);
	},
	version: function() {
		var re = /rv:([0-9.]+)/gim, v=[];
		v = re.exec(navigator.userAgent);
		return(v ? v.length > 1 ? v[1] : '' : '');
	}
};

basejs.device = {
 	isMobile: function () {
 	    return ($(window).width() <= 759) ? true : false;
	},
	isTablet: function () {
        return ($(window).width() <= 1229 && $(window).width() > 759) ? true : false;   
	},      
	isDesktop: function () {
        return ($(window).width() >= 1230) ? true : false;
	}
};

basejs.regExp = {
	guid: '^[{(]?[0-9A-Fa-f]{8}[-]?(?:[0-9A-Fa-f]{4}[-]?){3}[0-9A-Fa-f]{12}[)}]?$',
	alpha: '^[a-zA-Z ]+$',
	numeric: '^[0-9]+$',
	alphaNumeric: '^[a-zA-Z0-9]+$'
};

basejs.rescale = function (e, scale_x, scale_y) {

	e = $(e);

	var height = parseInt(e.css('height'));
	var width = parseInt(e.css('width'));
	var ratio_x = parseFloat(scale_x);
	var ratio_y = parseFloat(scale_y);

	e.css('-webkit-transform', 'scale(' + ratio_x + ', ' + ratio_y + ')');
	e.css('-moz-transform', 'scale(' + ratio_x + ', ' + ratio_y + ')');
	e.css('transform', 'scale(' + ratio_x + ', ' + ratio_y + ')');

	if(ratio_x == 1 && ratio_y == 1)
		e.css('transform-origin', 'unset');
	else
		e.css('transform-origin', '0 0');

	e.parent().css('width', parseInt(width * ratio_x) + 'px');
	e.parent().css('height', (parseInt(height * ratio_x) + 20) + 'px');
};

/**
* Return a boolean result on if a variable is a viable object.
* @method
* @param {Object} obj
*/
basejs.isInstance = function (obj) {
    if (typeof (obj) == "object")
        if (obj != null)
            return true;

    return false;
};

basejs.isGuid = function(s) {
	return (new RegExp(basejs.regExp.guid)).test(s, 'gim');
};

basejs.isEmpty = function(o) {
	if(typeof o == 'string')
		return basejs.isStringEmpty(o);
		
	if(typeof o == 'object' || typeof o == 'array' )
		return basejs.isArrayEmpty(o);
};

basejs.get = function(obj, s, default_fail) {
	default_fail = default_fail || '';
	return typeof obj == 'object' ? (s in obj) ? obj[s] : default_fail : default_fail;
};

basejs.tryGet = function(s, regex, default_fail) {
	if(typeof default_fail == 'undefined')
		default_fail = '';
	
	return ((new RegExp(regex)).test(s, 'gim') ? s : default_fail);
};

basejs.checkGetGuid = function(s) {
	return basejs.tryGet(s, basejs.regExp.guid);
};

basejs.tryGetGuid = function(s) {
	return basejs.tryGet(s, basejs.regExp.guid);
};

basejs.isGuid = function(s) {
	return (new RegExp(basejs.regExp.guid)).test(s, 'gim');
};

/**
* Return a boolean result on if a value is a string that contains characters.
* @method
* @param {Object} obj
*/
basejs.isStringEmpty = function(obj) {
	if(obj == null)
		return true;

	//alert(typeof (obj))

	// Note: "abc" == "string"; new String("abc") == "object"
	if(typeof obj != "string" && typeof obj != "object")
		return true;

	if(typeof (obj) == "object" && !(obj instanceof String))
		return true;

	// if Number?
	obj = new String(obj);

	if(obj.replace(/\s/gi, "") == "")
		return true;

    if(obj.replace(/\s/gi, "") == "undefined")
		return true;

	return false;
};

basejs.isArrayEmpty = function (o, descendants_too, depth) {
	var ret = true,
		count = 0;

	if (typeof o != 'object' || !o)
		return true;

	if (typeof depth == 'undefined')
		depth = 0;

	if (typeof descendants_too == 'undefined')
		descendants_too = false;

	if (depth >= 100)
		throw new Error('isArrayEmpty: possible circular reference');

	count = basejs.count(o);

	if (count > 1) {
		ret = false;
	}
	else {
		if (count == 1 && typeof o[0] == 'object') {
			if (!descendants_too)
				return false;

			ret = basejs.isArrayEmpty(o[0], descendants_too, depth + 1);
		}
		else if (count == 1) {
			ret = basejs.isEmpty(o[0]);
		}
	}

	return ret;
};


basejs.randomf = function (start, end) {
	start = typeof start == 'undefined' ? 0 : start;
	end = typeof end == 'undefined' ? 1 : end;
	return ((end) - start) * Math.random();
};

basejs.randomi = function (start, end) {
	return parseInt(basejs.randomf(start, end));
};

/**
 * Generate a random string using a pattern using c, n, r, or h.
 * (c - a letter, n - a number 0-9, r - a letter or number, h - a hexadecimal character a-f 0-9)
 * e.g. basejs.randomString("hhhhhhhh");  result: f912ca0b
 * @method
 * @param {string} pattern
 */
basejs.random = function (pattern) {
	var tmp = new String(),
		p = new String(pattern);

    for (var sets = 0; sets < p.length; sets++) {
        var c = new String(p.substr(sets, 1));
        var bit = parseInt((2 - 1 + 1) * Math.random() + 1);

        c = c.toLowerCase();

        switch (c) {
            case "n":
                tmp = (tmp + String.fromCharCode(parseInt((56 - 48 + 1) * Math.random() + 48)));
                break;
            case "c":
                bit = parseInt((2 - 1 + 1) * Math.random() + 1);
                if (bit == 1)
                    tmp = (tmp + String.fromCharCode(parseInt((122 - 97 + 1) * Math.random() + 97)));
                else
                    tmp = (tmp + String.fromCharCode(parseInt((90 - 65 + 1) * Math.random() + 65)));

                break;
            case "r":
                bit = parseInt((30 - 1 + 1) * Math.random() + 1);
                if (bit % 3 == 0) {
                    tmp = (tmp + String.fromCharCode(parseInt((56 - 48 + 1) * Math.random() + 48)));
                }
                else {
                    if (bit % 2 == 0)
                        tmp = (tmp + String.fromCharCode(parseInt((122 - 97 + 1) * Math.random() + 97)));
                    else
                        tmp = (tmp + String.fromCharCode(parseInt((90 - 65 + 1) * Math.random() + 65)));
                }
                break;
            case "h":
                bit = parseInt((30 - 1 + 1) * Math.random() + 1);
                if (bit % 3 == 0) {
                    tmp = (tmp + String.fromCharCode(parseInt((56 - 48 + 1) * Math.random() + 48)));
                }
                else {
                    tmp = (tmp + String.fromCharCode(parseInt((70 - 65 + 1) * Math.random() + 65)));
                }
                break;

            default:
                tmp = (tmp + c);
        }
    }

    return tmp;
};

basejs.clone = function (obj) {
	return JSON.parse(JSON.stringify(obj));
};

basejs.hasValue = function (obj, value) {
	if (typeof obj != 'object' && typeof obj != 'Array') {
		return false;
	}

	for (n in obj) {
		if (obj[n] == value) {
			return true;
        }
	}

	return false;
};

/**
* check to see of an object has a member of a certain name
* @method
* @param {Object} object object to check a member for
* @param {string} member_name the member name
*/
basejs.hasMember = function (obj, member_name) {
    var m;
    var tmp = "";
    var member = "";
    var find_any = false;

    if (!basejs.isInstance(obj))
        return false;

    if (typeof (member_name) == "undefined")
        find_any = true;
    else
        tmp = new String(member_name);

    for (m in obj) {
        if (find_any)
            return true;

        member = new String(m);

        // NOTE: added .toString() methods. Comparison would fail otherwise. Why?
        if (member.toString() == tmp.toString())
            return true;
    }

    return false;
};

basejs.getFirstMember = function(obj) {
	var m;
	for(m in obj) {
		break;
	}
	return m;
};

basejs.count = function (o) {
	var i = 0;
	for (m in o)
		i++;
	return i;
};

basejs.padLeft = function(char, total_pos, value) {
	var s = new String(value), 
	to_add = 0, 
	i = 0;

	if(s.length >= total_pos)
		return(value);

	to_add = total_pos - s.length;

	for(i = 0; i < to_add; i++) {
		s = char + s;
	}

	return s;
};

basejs.pad = function (s, c, max_length, side) {

	if (!s || !c || !max_length)
		return s;

	side = !side ? 'left' : side;

	max_length = parseInt(max_length);

	if (isNaN(max_length))
		return s;

	for (var i = 0, max = max_length - s.length; i < max; i++) {
		if (side == 'left')
			s = c + s;
		else if (side == 'right')
			s = s + c;
	}

	return s;
};


basejs.formatDoubleDigit = function(value) {
    var s = new String(value);

    if (s.length == 1)
        s = ("0" + s);

    return s;
};

basejs.toInt = function(value, def) {
	var i = parseInt(value);
	return (isNaN(i) ? (typeof def != 'undefined' ? def : i) : i);
};

basejs.scrollTo = function(id) {
	$('body,html').animate({ scrollTop: $(id).offset().top });
};


basejs.goToUrl = function(redirect_url, timeout, new_instance) {
	if(typeof timeout == undefined) {
		timeout = 0;
	}

	if (typeof new_instance == undefined) {
		new_instance = false;
	}

	if (new_instance) {
		window.open(redirect_url, "_blank");
	}
	else {
		setTimeout("window.location.href = '" + redirect_url + "';", parseInt(timeout));
	}
};

basejs.clickToUrl = function(url, new_tab, timeout) {
	if(typeof(timeout) == undefined)
		timeout = 0;
	
	var f = function() {
		var a = document.createElement('a');
		a.href = url;
		
		if(new_tab) {
			a.target = '_blank';
		}
		
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	
	setTimeout(f, parseInt(timeout));
};

basejs.download = function(url, filename, oncomplete, timeout) {
	if(typeof(timeout) == undefined)
		timeout = 0;
	
	var f = function() {
		var a = document.createElement('a');
		a.href = url;
		
		if(typeof(filename) != 'undefined')
			a.download = filename;
		else 
			a.download = url.split('/').pop();
		
		a.target = "_blank";
		
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	
	setTimeout(f, parseInt(timeout));
};

basejs.toCsv = function(o) {
	var header = [],
		row = [],
		rows = [],
		key = '';
	
	if(!'length' in o)
		return '';
	
	for(key in o[0]) {
		header[header.length] = '"' + key + '"';
	}
	
	for(var i=0;i<o.length;i++) {
		row = [];
		for(key in o[i]) {
			row[row.length] = '"' + o[i][key] + '"';
		}
		rows[rows.length] = row.join(',');
	}
	
	return header.join(',') + '\r\n' + rows.join('\r\n');
};

basejs.nowString = function() {
	return now.getFullYear() + '' + (now.getMonth() + 1) + '' + now.getDate() + '' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds();
};

basejs.urlArg = function (name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
		.exec(window.location.search);

	return (results !== null) ? results[1] || 0 : false;
};

basejs.urlPath = function (n) {
	var results = window.location.pathname.split('/');

	return (results !== null) ? results[n] || '' : '';
};

basejs.selectOption = function (select_id, value) {
	var select = $(select_id),
		opts = select.get(0).options;

	for (var i = 0; i < opts.length; i++) {
		if (opts[i].value == value) {
			var opt = $(opts[i]);

			opt.prop("selected", true);
			opt.attr("selected", "true");
			select.trigger("change");
			//select.get(0).selectedIndex = i;

			console.debug(select.get(0).options);

			return opt;
		}
	}

	return null;
};

basejs.getDateString = function (days) {
	var d = new Date(),
		now = Date.now();

	if (typeof days == 'undefined')
		days = '0';

	days = basejs.toInt(days, 0);

	now += days * 24 * 60 * 60 * 1000;
	d = new Date(now);

	return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
};

basejs.fallbackCopyToClipboard = function(text) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "absolute";
	textArea.style.width = "0px";
	textArea.style.height = "0px";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
};

basejs.copyToClipboard = function (text) {
	if (!navigator.clipboard) {
		basejs.fallbackCopyToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
};


basejs.stopKeyEvent = function(e, key_code) {
	if(typeof(key_code) == 'object') {
		if(typeof(key_code.length) != 'undefined')
		for(var i = 0;i < key_code.length;i++) {
			if(key_code[i] == e.keyCode) {
				e.preventDefault();
				return;
			}
		}
	}
	else if(e.keyCode == key_code) {
		e.preventDefault();
	}
};

basejs.clearValue = function(params) {
	var e = null;
	
	if(!params)
		return;

	if(!params.e)
		return;
	
	e = $(params.e);
	
	e.val('');
};

basejs.revertValue = function(params) {
	var e = null, 
	attr = null;
	
	if(!params)
		return;

	if(!params.e)
		return;
	
	e = $(params.e);
	
	if(typeof(params.compareTo) == 'undefined')
		params.compareTo = '';
	
	if(e.val() == params.compareTo || params.compareTo == '*') {
		if(typeof(params.attr) == 'string')
			attr = [e.attr(params.attr)];
		
		if(typeof(params.attr) == 'object') {
			for(var i = 0;i < params.attr.length;i++) {
				if(e.attr(params.attr[i]) == '' && i+1 < params.attr.length)
					continue;
				
				e.val(e.attr(params.attr[i]));
				break;
			}
		}
		else if(typeof(params.value) == 'string')
			e.val(e.attr(params.value));
	}
};

basejs.getPart = function (s, delimiter, index) {
	var parts = s.split(delimiter);

	if (parts) {
		return parts.length > 0 ? parts[index] : '';
	}
	else {
		return '';
	}
};

basejs.getLastPart = function(s, delimiter) {
	var parts = s.split(delimiter);
	
	if(parts) {
		return parts.length > 0 ? parts[parts.length - 1] : "";
	}
	else {
		return "";
	}
};

basejs.getKey = function (obj, value) {
	if (!obj) {
		return '';
	}

	for (key in obj) {
		if (obj[key] == value)
			return key;
    }
};

basejs.toggleAttr = function(el, attr_name, value1, value2) {
	el = $(el);
	if(el.attr(attr_name) == value2) {
		el.attr(attr_name, value1);
	}
	else {
		el.attr(attr_name, value2);
	}
};

/**
* EventActionItem for associating a callback function for an object, by which an event was triggered.
* @constructor
*/
basejs.EventActionItem = function (action, obj) {
    this.action = action;
    this.context = obj;
};


/**
 * Event. Useful for designing custom events quickly and attaching them to objects. 
 * @constructor
 */
basejs.Event = function () {
    this.eventId = basejs.randomString("crrrrrrrrrrrrrrr");
    this.events = {};
    this.builtinEvents = [];
};


/**
 * Returns a boolean result on if an action already exists for an event.
 * @method
 */
basejs.Event.prototype.actionExists = function (action, event_id) {
    var action_item = null;
    var i = 0;

    if (typeof (event_id) == "undefined")
        event_id = this.eventId;

    if (!basejs.hasMember(this.events, event_id))
        return false;

    for (i = 0; i < this.events[event_id].length; i++) {
        action_item = this.events[event_id][i];

        //DEBUG
        //alert(typeof(action_item));

        // NOTE: cast functions as string literals then do identity
        // comparison.
        if (String(action_item.action) === String(action))
            return true;
    }

    return false;
};



/**
 * Attach an action (function) for a particular event.
 * @method
 * @param {Function} action function to call when event is triggered
 * @param {Object} object object to use for scope under which to execute the function [optional]
 */
basejs.Event.prototype.watch = function (action, obj, event_id) {
    var action_item = null;

    if (typeof (event_id) == "undefined")
        event_id = this.eventId;

    if (!basejs.hasMember(this.events, event_id))
        this.events[event_id] = [];

    if (!this.actionExists(action, event_id)) {
        action_item = new basejs.EventActionItem(action, obj);

        //DEBUG
        //basejs.display("added: " + action);
        (this.events[event_id]).push(action_item);
    }
};


/**
 * unattach an action for a particular event.
 * @method
 */
basejs.Event.prototype.unwatch = function (action, obj, event_id) {

};


/**
 * remove all watchers for an event.
 * @method
 */
basejs.Event.prototype.unwatchAll = function () {
    this.events = {};
};


/**
 * Fire-off all actions associated with an event.
 * @method
 */
basejs.Event.prototype.fire = function (args, event_id) {
    var i;
    var action;
    var obj_events = null;

    if (typeof (event_id) == "undefined")
        event_id = this.eventId;

    if (!basejs.hasMember(this.events, event_id))
        return;

    //basejs.dump(this.events);
    //alert("firing " + obj);

    obj_events = this.events[event_id];

    for (i in obj_events) {
        action_item = obj_events[i];

        action = action_item.action;
        context = action_item.context;

        if (basejs.isInstance(context))
            action = action.bind(context);

        //DEBUG
        //alert(action);

        if (typeof (action) == "function")
            action(null, args);
    }
};


/**
* Capitalize words in a string.
* @method
* @param {string} s
*/
basejs.capitalizeWords = function(text) {

	var ret = "";
	var s = new String(text);
	var ary = [];
	var i = 0;
		
	ary = s.split(" ");
		
	for(i = 0; i < ary.length; i++) {
		var word = ary[i].toString();
		word = (word.substring(0, 1).toUpperCase() + 
					word.substring(1, word.length));
						
		if(i < (ary.length-1))
			word = (word + " ");
			
		word = word.replace(/'/g, "");
			
		ret += word;
	}

	return ret;
};



/**
* Remove spaces in a string.
* @method
* @param {string} s
*/
basejs.removeSpaces = function(text) {
	var ret = "";
	var s = new String(text);
	
	ret = s.replace(/\s/g, '');

	return ret;
};

basejs.fixCase = function(text) {
	var ret = "";
	var s = new String(text);
	var ary = new Array();
	var i = 0;
	
	ary = s.split(' ');
	
	for(i = 0; i < ary.length; i++) {
		var word = ary[i].toString();
		word = (word.substring(0, 1).toUpperCase() + word.substring(1, word.length));

		if(i < (ary.length-1))
			word = (word + " ");

		word = word.replace(/'/g, '');
		ret += word;
	}

	return ret;
}

basejs.shortenMailAddress = function(text) {
				
	var i = 0;
	var ret = text;
	var directions = ["North|N","South|S","West|W","East|E","NorthEast|NE","NorthWest|NW","SouthEast|SE","SouthWest|SW"];

	for(i=0; i < directions.length; i++) {
		var e = new String(directions[i]);
		var items = e.split('|');
		
		if(items.length > 1) {
			var item = new String(items[0]);
			if(item.toLowerCase() == text.toLowerCase()) {
				ret = items[1];
				break;
			}
		}
	}

	return fixCase(ret);
}


basejs.formatMailAddress = function(text) {             
	var ret = "";
	var s = new String(text);
	var ary = new Array();
	var i = 0;

	ary = s.split(' ');

	for(i = 0; i < ary.length; i++) {
		var word = ary[i].toString();
		if(i < (ary.length-1))
			word = (this.shortenMailAddress(word) + " ");
		else
			word = this.shortenMailAddress(word);
		ret += word;
	}
	return ret;
}

basejs.removeAlpha = function(text) {
	var s = new String(text);
	return s.replace(/[A-Za-z\s']/gim, '');
}

basejs.maskNumbersOnly = function(object, e) {
	if(object == null)
		return false;

	if(e.charCode!=0 && (e.charCode < 48 || e.charCode > 58))
		return false;
	
	return true;
}

basejs.maskNumbersDelimiters = function(object, e) {
	if(object == null)
		return false;

	if(e.charCode!=0 && (e.charCode < 48 || e.charCode > 58) && e.charCode!=44 && e.charCode!=59)
		return false;
	
	return true;
}

basejs.maskAlphaNumericOnly = function(object, e) {
	if(object == null)
		return false;

	if(!basejs.isAlphaNumeric(String.fromCharCode(e.charCode)) && e.charCode != 32)
		return false;
	
	return true;
}

basejs.maskAlphaNumericMarks = function(object, e) {
	if(object == null)
		return false;

	if(!basejs.isAlphaNumeric(String.fromCharCode(e.charCode)) 
		&& e.charCode != 32 
		&& !(e.charCode >= 33 && e.charCode <= 47) 
		&& !(e.charCode >= 58 && e.charCode <= 64))
		return false;
	
	return true;
}

basejs.maskPhone = function(object, e) {
	if(object == null)
		return false;

	if(e.charCode!=0&&(e.charCode < 48 || e.charCode > 58)&&!e.ctrlKey&&String.fromCharCode(e.charCode)!='-') {
		return false;
	}
	else if(e.charCode!=0) {
		if(object.value.length == 3 && String.fromCharCode(e.charCode)!='-')
			object.value = (object.value + "-");

		if(object.value.length == 7 && String.fromCharCode(e.charCode)!='-')
			object.value = (object.value + "-");
	}
	return true;
}
	
basejs.maskPostalCode = function(object, e) {
	if(object == null)
		return false;

	if(e.charCode!=0&&(e.charCode < 48 || e.charCode > 58)) {
		return false;
	}
	else if(e.charCode!=0)
		if(object.value.length == 5)
			object.value += '-';

	return true;
}
	

basejs.maskDateCreditCard = function(object, e) {
	if(object == null)
		return false;
	if(e.charCode!=0&&(e.charCode < 48 || e.charCode > 58)) {
		return false;
	}
	else if(e.charCode!=0)
		if(object.value.length == 2)
			object.value = (object.value + "/");
	return true;
}


basejs.maskDate = function(object, e) {
	if(object == null)
		return false;

	if(object.value.length == 10)
		return false;

	if(e.charCode!=0&&(e.charCode < 48 || e.charCode > 58)) {
		return false;
	}
	else if(e.charCode!=0)
		if(object.value.length == 2 || object.value.length == 5)
			object.value = (object.value + "/");
	return true;
}


basejs.isEmptyValue = function(s) {
	return s.replace(/(^\s+)|(\s+$)/g, '').length < 1 ? true : false;
}


basejs.isEmailAddress = function(s) {
	var ret = false;

	ret = (s.search(/^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$/) == -1 || 
		s.search(/(\s+)|(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/) != -1) ? false : true;

	return ret;
}

basejs.isAlpha = function(s) {
	return s.search(/^[a-zA-Z ]+$/) == -1 ? false : true;
}


basejs.isAlphaHyphen = function(s) {
	return s.search(/^[a-zA-Z \- ']+$/) == -1 ? false : true;
}


basejs.isNumeric = function(s) {
	return s.search(/^[0-9]+$/) == -1 ? false : true;
}

basejs.isAlphaNumeric = function(s) {
	return s.search(/^[a-zA-Z0-9]+$/) == -1 ? false : true;
}


basejs.isPhoneNumber = function(s) {
	return s.search(/^[0-9-]+$/) == -1 ? false : true;
}

basejs.getUpcCheckDigit = function(upc) {
	 //calculate the check digit
	var chkDigit = 0,
		chkDigitOdd = 0,
		chkDigitEven = 0,
		digit = "",
		ret = "";

	for (var x = 0; x < 11; x++) {
		digit = upc.charAt(x);
		switch (x + 1) {
			case 1: case 3: case 5: case 7: case 9: case 11:
				chkDigitOdd += parseInt(digit);
				break;
			case 2: case 4: case 6: case 8: case 10:
				chkDigitEven += parseInt(digit);
				break;
			default:
				break;
		}
	}

	chkDigit = (3 * chkDigitOdd) + chkDigitEven;
	chkDigit = (chkDigit % 10);
	if (chkDigit == 0)
		ret = chkDigit + '';
	else
		ret = (10 - chkDigit) + '';

	return ret;
};

basejs.getQueryString = function() {
	var qs  = {},
	decode = function (s) { 
		return decodeURIComponent(s.replace(/\+/g, " ")); 
	},
	query_string = location.search.substring(1),
	kvs = query_string.split('&'); 

	for(var i in kvs) { 
		var key = kvs[i].split('=');
		if (key.length > 1) {
		  qs[decode(key[0])] = decode(key[1]);
		}
	} 

	return qs; 
};


basejs.querystring = function(key, def) {
	var qs = basejs.getQueryString();
	
	if(typeof def == 'undefined')
		def = '';
	
	return(key in qs ? qs[key] : def);
};


basejs.getUrlSegment = function(n, offset_uri) {
	var url = window.location.href,
		path = window.location.pathname,
		pos = -1,
		parts = '';

	if (typeof offset_uri != 'undefined') {
		pos = url.indexOf(offset_uri);
		url = pos > -1 ? url.substring(pos + offset_uri.length, url.length) : url;
	}

	parts = url.split('/');
	return n > -1 ? parts[n] : parts[parts.length - 1];
};

/**
* Convert a query string to an object.
* @method
* @return {Object} the built object
*/
basejs.getQueryStringValue = function(name, s) {

	var ary, query, i, varary, variables, u, v;

	u = new String(s);

	if(u.indexOf("?") > 0)
	{
		ary = u.split("?");
		if(ary instanceof Array)
			if(ary.length > 1)
			query = new String(ary[1]);
	}
	else
	{
		query = u;
	}
	
	variables = new Array(query);
	
	if(query.indexOf("&") > -1)
		variables = query.split("&");

	for(i = 0;i < variables.length;i++)
	{
		v = new String(variables[i]);

		if(v.indexOf("=") > -1)
		{
			var varary = v.split("=");

			if(varary instanceof Array)
			if(varary.length > 1)
			{
				if(varary[0] == name)
					return(varary[1]);
			}
		}
	}

	return "";
};

/**
* Get returned text from an HTML resource (a URL) using a GET request.
* @method
* @param {string} url
* @param {Function} callback
* @return the response text from the GET request
*/
basejs.fetchContent = function (path, callback) {
    var hr = null,
        t = null,
        ret;

    var func = function (req) {
        var content = "";

	    if (req.readyState == 4) {
            content = req.responseText;

		    if (typeof (callback) == "function")
			    callback(content);
		    else
			    return content;
        }
    };

    r = new basejs.AjaxRequest();
    r.verb = "GET";


    if (typeof (callback) == "function")
	    r.readyStateFunction = func;
    else
	    r.async = false;

    ret = r.post(path);

    if (r.async)
	    return r;
    else
	    return ret;
};


/**
 * Make a POST request to a URL using XmlHttpRequest.
 * @method
 * @param {string} url
 * @param {string} data query string
 * @param {boolean} async call to be asynchronous or not
 * @param {Function} readystate_func
 * @param {boolean} encode_request_data
 */
basejs.httpPost = function (url, data, async, readystate_func, encode_request_data) {
    var req = basejs.getXmlHttpRequest();
    var ret = null;

    if (req == null) {
        return null;
    }

    if (typeof (encode_request_data) == "undefined")
        encode_request_data = true;

    req.onreadystatechange = function () {
        //alert("readystate");

        if (readystate_func != null) {
            ret = readystate_func(req);
        }
        else {
            // use fallback handler if there's no function.
            if (req.readyState == 4) {
                ret = req.responseText;
            }
        }
    };

    req.open("POST", url, async);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if (encode_request_data) {
        data = encodeURI(data);
    }

    req.send(data + "\r\n");

    // NOTES:
    // ret will immediately be null or undefined. But, it creates memory location
    // where the results of the AJS post will finally be--we need to wait for this to happen.
    // The function above does this.

    return ret;
};


/**
* Constructor for a AjaxRequest object;
* A complete object for making POST requests and providing the results to a callback function.
* @constructor
*/
basejs.AjaxRequest = function () {
    this.request = basejs.getXmlHttpRequest();
    this.response = null;
    this.hasCompleted = false;
    this.async = true;
    this.readyStateFunction = null;
    this.target = null;
    this.url = "";
    this.encodeRequestData = true;
    this.verb = "POST";

    /**
	* ...
	* @method
 	* @param {string} url
 	* @param {string} data query string
	*/
    this.post = function (url, data) {
        var tmp = "";
        var this_obj = this;
        var ret = "";

        this.hasCompleted = false;
        this.url = url;

        if (typeof (data) == "undefined")
            data = " ";

        if (this.request == null) {
            return null;
        }

        this.request.onreadystatechange = function () {
            //alert(typeof(this_obj.readyStateFunction));

            var content_type = new String();

            if (typeof (this_obj.readyStateFunction) == "function") {
                // Notes: this_obj.readyStateFunction usually returns: eval(this.request.responseText)
                this_obj.response = this_obj.readyStateFunction(this_obj.request);

                if (this_obj.request.readyState == 4)
                    this_obj.hasCompleted = true;
            }
            else {
                if (basejs.isInstance(this_obj.target)) {
                    if (this_obj.request.readyState == 4) {
                        this_obj.response = this_obj.request.responseText;
                        this_obj.hasCompleted = true;

                        if ("callback" in this_obj.target)
                            this_obj.target.callback(this_obj.request);
                    }
                }
                else {
                    // use fallback handler if there's no function.
                    if (this_obj.request.readyState == 4) {
                        content_type = this_obj.request.getResponseHeader("Content-Type");

                        this_obj.response = this_obj.request.responseText;

                        if (typeof (content_type) == "string") {
                            if (content_type.indexOf("application/json") > -1)
                                this_obj.response = eval(this_obj.request.responseText);
                            else if (content_type.indexOf("text/javascript") > -1)
                                this_obj.response = eval(this_obj.request.responseText);
                            else
                                this_obj.response = this_obj.request.responseText;
                        }

                        this_obj.hasCompleted = true;
                    }
                }
            }
        };

        //alert(this.url);

        try {
            this.request.open(this.verb, this.url, this.async);

            if (this.verb == "POST")
                this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            if (this.encodeRequestData) {
                //problem: this encodes encoded data.
                tmp = encodeURI(data);
            }
            else {
                tmp = data;
            }

            //alert(tmp);

            this.request.send(tmp + "\r\n");

            //FIXME: on Linux server, script receives last variable with a CR or LF on the end of it. 
            //The data is received from this post method.
        }
        catch (e) {
            ret += "http request error: " + e.description;
        }


        if (!this.async) {
            ret += this.request.responseText;
            return ret;
        }

        // NOTES:
        // ret will immediately be null or undefined. But, it creates a memory location
        // where the results of the AJS post will finally be--we need to wait for this to happen.
        // The function above does this.

        //return ret;
    };
};


/**
* Return the XML via HTTP object for the current web browser.
* @method
*/
basejs.getXmlHttpRequest = function () {
    var req = null;

    if (typeof (window.ActiveXObject) != "undefined") {
        req = new ActiveXObject("Msxml2.XMLHTTP");
        //req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (typeof (window.XMLHttpRequest) != "undefined") {
        req = new XMLHttpRequest();
    }

    return req;
};


/**
* Wrapper for setTimeout() for calling code at later times. 
* It stores calls for later evaluation. Highly recommened over setTimeout().
* @constructor
*/
basejs.CallBroker = function() {
	this.calls = {};

	this.add = function(obj, code, func, params) {
		var item = {}, 
			id = new String("");

		item.obj = obj;
		item.func = func;
		item.code = code;
		item.params = typeof(params) != 'object' && typeof(params) != 'array' ? [params] : params;

		id = basejs.random("crrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

		this.calls[id] = item;

		return id;
	};

	
    this.evaluate = function(id) {
		var item = this.calls[id],
			tmp = item.code;

		if(typeof(item.func) == 'function') {
			if(item.params)
				item.func.apply(null, item.params);
			else
				item.func();
		}
		else {	
			// apply([thisObj[,argArray]]); thisObj, The object to be used as the current object.
			if(item.func in item.obj)
				item.obj[item.func].apply(item.obj, item.params);
		}

		delete this.calls[id];
	};
	
	
	this.cancel = function(id) {
		var item = this.calls[id];
		clearTimeout(item.timeoutId);
		delete this.calls[id];
	};

	
	this.timeout = function(f, interval, params) {
		var id = this.add(null, null, f, params);
		
		this.calls[id].timeoutId = setTimeout("basejs.callBroker.evaluate('" + id + "');", interval);
		
		return id;
	};
};



/**
* ...
* @instance
*/
basejs.callBroker = new basejs.CallBroker();
basejs.timeout = function(f, interval, params) {
	return basejs.callBroker.timeout(f, interval, params);
};
basejs.cancelTimeout = function(id) {
	return basejs.callBroker.cancel(id);
};

/**
* extend Function to make binding possible to change the scope of
* functions on-the-fly.
* @author Greg
* @method
* @param {Object} object an object to associate scope with for the function
*/
// adding this to Function causes issues with other JavaScript libraries (i.e. jquery, angular)
/*
Function.prototype.bind = function (object) {
	var method = this;
	return function() {
		return method.apply(object, arguments);
	};
};
*/

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};