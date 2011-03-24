var type = (function () {

	var types = [
		"Boolean",
		"Number",
		"String",
		"Function",
		"Array",
		"Date",
		"RegExp",
		"Object"
	];
	
	var class2type = {};
	
	for (var i = 0; i < types.length; i++) {
		class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
	}
	
	var toString = Object.prototype.toString;

	return function (object) {
		if (object === null) { return "null"; }
		if (typeof object === "undefined") { return "undefined"; }
		return class2type[toString.call(object)];
	};
})();

Object.extend = Object.prototype.extend = function () {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !Object.isFunction(target)) {
		target = {};
	}

	// Extend the object itself if only one argument is passed
	if (length === i) {
		target = this;
		--i;
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[ i ]) !== null) {
			// Extend the base object
			for (name in options) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (Object.isPlainObject(copy) || (copyIsArray = Object.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Object.isArray(src) ? src : [];

					} else {
						clone = src && Object.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = Object.extend(deep, clone, copy);

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

Object.extend({
	isFunction: function (object) {
		return type(object) === "function";
	},
	isArray: function (object) {
		return type(object) === "array";
	},
	isString: function (object) {
		return type(object) === "string";
	},
	isNumber: function (object) {
		return type(object) === "number";
	},
	isDate: function (object) {
		return type(object) === "date";
	},
	isUndefined: function (object) {
		return type(object) === "undefined";
	},
	isNaN: function (object) {
		return object == null || !/\d/.test(object) || isNaN(object);
	},
	isPlainObject: function (object) {
		// Must be an Object.
		if (!object || type(object) !== "object") {
			return false;
		}

		// Not own constructor property must be Object
		if (object.constructor &&
			!Object.prototype.hasOwnProperty.call(object, "constructor") &&
			!Object.prototype.hasOwnProperty.call(object.constructor.prototype, "isPrototypeOf")) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var property;
		for (property in object) {}

		return key === undefined || Object.prototype.hasOwnProperty.call(object, property);
	},
	isEmptyObject: function (object) {
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				return false;
			}
		}
		return true;
	},
	error: function (msg) {
		throw msg;
	},
	keys: function (object) {
		if (type(object) !== "object") { throw new TypeError(); }
		var results = [];
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				results.push(property);
			}
		}
		return results;
	},
	values: function (object) {
		var results = [];
		for (var property in object) {
			if (object.hasOwnProperty(property)) {
				results.push(object[property]);
			}
		}
		return results;
	},
	clone: function (object) {
		return Object.extend({}, object);
	}
});

Object.prototype.extend({
	isFunction: function () {
		return Object.isFunction(this);
	},
	isArray: function () {
		return Object.isArray(this);
	},
	isString: function () {
		return Object.isString(this);
	},
	isNumber: function () {
		return Object.isNumber(this);
	},
	isDate: function () {
		return Object.isDate(this);
	},
	isUndefined: function () {
		return Object.isUndefined(this);
	},
	isNaN: function() {
		return Object.isNaN(this);
	},
	keys: function () {
		return Object.keys(this);
	},
	values: function () {
		return Object.values(this);
	},
	clone: function () {
		return Object.clone(this);
	},
	forEach: function (fn) {
		if (this === undefined || this === null || typeof fn !== "function") { throw new TypeError(); }
		var object = Object(this);
		var len = object.length >>> 0;
		var thisp = arguments[1];
		
		for (var property in object)
		{
			if (object.hasOwnProperty(property)) { fn.call(thisp, object[property], property, object); }
		}
	}
});

Array.prototype.extend({
	forEach: function (fn) {
		if (this === undefined || this === null || typeof fn !== "function") { throw new TypeError(); }
		var object = Object(this);
		var len = object.length >>> 0;
		var thisp = arguments[1];

		for (var i = 0; i < len; i++)
		{
			if (i in object) { fn.call(thisp, object[i], i, object); }
		}
	},
	clone: function () {
		return [].slice.call(this, 0);
	},
	indexOf: function (item, i) {
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
	}
});

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
