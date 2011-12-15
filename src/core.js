/*
 *
 */
plusQuery = (function () {

// Define a local copy of plusQuery
var plusQuery = function (object) {
	return new plusQuery.fn.init(object);
};

plusQuery.extend = plusQuery.prototype.extend = function () {
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
	if (typeof target !== "object" && !plusQuery.isFunction(target)) {
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
				if (deep && copy && (plusQuery.isPlainObject(copy) || (copyIsArray = plusQuery.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && plusQuery.isArray(src) ? src : [];

					} else {
						clone = src && plusQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = plusQuery.extend(deep, clone, copy);

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

// Static functions
plusQuery.extend({
	noop: function () {},

	// A GUID counter for objects
	guid: 1,

	// Current time in MS
	now: function () {
		return (new Date()).getTime();
	},
	
	ScriptMenu: {},
	
	ScriptCommands: {},
	
	MyContact: function () {
		return $({
			Email: Messenger.MyEmail,
			Network: 1,
			Status: Messenger.MyStatus,
			Name: Messenger.MyName,
			PersonalMessage: Messenger.MyPersonalMessage,
			CurrentMedia: Messenger.MyCurrentMedia,
			Blocked: false,
			DisplayPicture: Messenger.MyDisplayPicture,
			IsFloating: false,
			ProfileColor: 0
		});
	},
	
	/*  We can test for all of the Messenger Plus! objects with
	 *  reasonable certainty because the typeof the functions are
	 *  "unknown", not "function".
	 *  For those without functions, (Contact and Emoticon) we do a bit
	 *  more testing just in case.
	 */
	typeofNative: function (object) {
		// HANDLE: $(Debug)
		if (typeof object.Trace === "unknown") {
			return "Debug";
		}
		
		// HANDLE: $(Messenger)
		if (typeof object.AutoSignin === "unknown") {
			return "Messenger";
		}
		
		// HANDLE: $(MsgPlus)
		if (typeof object.LockMessenger === "unknown") {
			return "MsgPlus";
		}
		
		// HANDLE: $(Contacts)
		if (typeof object.GetContact === "unknown") {
			return "Contacts";
		}
		
		// HANDLE: $(Emoticons)
		if (typeof object.GetEmoticons === "unknown") {
			return "Emoticons";
		}
		
		// Handle $(ChatWnds)
		if (object.Count) {
			return "ChatWnds";
		}
		
		// Handle $(ChatWnd)
		if (typeof object.SendMessage === "unknown") {
			return "ChatWnd";
		}
		
		// HANDLE: $(Contact)
		if (typeof object.Email !== "undefined" &&
			typeof object.Network !== "undefined" &&
			typeof object.Status !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PersonalMessage !== "undefined" &&
			typeof object.CurrentMedia !== "undefined" &&
			typeof object.DisplayPicture !== "undefined") {
			
			return "Contact";
		}
		
		// HANDLE: $(Emoticon)
		if (typeof object.Shortcut !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PictureFile !== "undefined") {
			
			return "Emoticon";
		}
		
		// HANDLE: $(PlusWnd)
		if (typeof object.Close === "unknown") {
			return "PlusWnd";
		}
		
		// HANDLE: $(Interop)
		if (typeof object.Call === "unknown") {
			return "Interop";
		}
		
		// HANDLE: $(DataBloc)
		if (typeof object.SetAt === "unknown") {
			return "DataBloc";
		}
	},
	
	$A: function (iterable) {
		if (!iterable) {
			return [];
		}

		if(iterable.toArray) {
			return iterable.toArray();
		}

		var length = iterable.length || 0;
		var results = new Array(length);

		while (length--) {
			results[length] = iterable[length];
		}

		return results;
	},
	
	version: "@VERSION",
	
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
	},
	
	forEach: function (obj, fn) {
		if (obj === undefined || obj === null || typeof fn !== "function") { throw new TypeError(); }
		var object = Object(obj);
		var len = object.length >>> 0;
		var thisp = arguments[1];
		
		for (var property in object)
		{
			if (object.hasOwnProperty(property)) { fn.call(thisp, object[property], property, object); }
		}
	}
});

plusQuery.prototype.extend({

	keys: function () {
		return plusQuery.keys(this);
	},
	
	values: function () {
		return plusQuery.values(this);
	},
	
	clone: function () {
		return plusQuery.clone(this);
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

plusQuery.fn = plusQuery.prototype = {
	constructor: plusQuery,
	// This acts as the constructor.
	init: function (object) {
	
		// HANDLE: $(falsey) and $(plusQuery)
		if (!object || object instanceof plusQuery) {
			return this;
		}
		
		// Event stuff
		$.extend(this, $.EventEmitter.create(object));
	
		// Wrap native object
		if (plusQuery.wrappers[$.typeofNative(object)]) {
			$.extend(this, new plusQuery.wrappers[$.typeofNative(object)](object));
		}
		
		return this;
	},
	
	// The default length of a plusQuery object is 0
	length: 0,
	
	// The number of elements contained in the matched element set
	size: function () {
		return this.length;
	},

	// Converts the object to an array
	toArray: function () {
		return Array.prototype.slice.call(this, 0);
	},
	
	type: "PlusQuery",
	
	toString: function () {
		return "[object " + this.type + "]";
	}
};

// Give the init function the plusQuery prototype for later instantiation
plusQuery.fn.init.prototype = plusQuery.fn;

$ = plusQuery;

return plusQuery;
})();
