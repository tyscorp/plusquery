Array.prototype.forEach = function (fn) {
	if (this === undefined || this === null || typeof fn !== "function") { throw new TypeError(); }
	var object = Object(this);
	var len = object.length >>> 0;
	var thisp = arguments[1];

	for (var i = 0; i < len; i++)
	{
		if (i in object) { fn.call(thisp, object[i], i, object); }
	}
};

Array.prototype.clone = function () {
	return [].slice.call(this, 0);
};

Array.prototype.indexOf = function (item, i) {
	if (!i) { i = 0; }
	var length = this.length;
	if (i < 0) {
		i = length + i;
	}
	for (; i < length; i++) {
		if (this[i] === item) {
			return i;
		}
	}
	return -1;
};

// Fastest JScript trim function I could find.
String.prototype.trim = function () {
	return this.replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1');
};

// Bind function written by Juriy "kangax" Zaytsev, refactored slightly
Function.prototype.bind = (function (slice) {
	return function (context) {
		var fn = this,
			args = slice.call(arguments, 1);

		if (args.length) {
			return function () {
				return arguments.length ?
					fn.apply(context, args.concat(slice.call(arguments))) :
					fn.apply(context, args);
			};
		}
		return function () {
			return arguments.length ?
			fn.apply(context, arguments) :
			fn.call(context);
		};
	};
})(Array.prototype.slice);
