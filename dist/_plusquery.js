/*!
 * plusQuery JavaScript Library 0.0.1
 * http://github.com/tyscorp/plusquery/
 *
 * Copyright (C) 2011 by Tyson Cleary
 * 
 * Licensed under the MIT license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * Contains code and concepts from the jQuery JavaScript Library.
 * http://jquery.com/
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: Thu Mar 24 22:45:52 2011 +1100
 */
 
(function () {
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
		for (var property in object)
			if (object.hasOwnProperty(property)) {
				results.push(object[property]);
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
		i || (i = 0);
		var length = this.length;
		if (i < 0) i = length + i;
		for (; i < length; i++)
		if (this[i] === item) return i;
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
				return arguments.length
					? fn.apply(context, args.concat(slice.call(arguments)))
					: fn.apply(context, args);
			};
		}
		return function () {
			return arguments.length
				? fn.apply(context, arguments)
				: fn.call(context);
		};
	};
})(Array.prototype.slice);
/*
 *
 */
(function () {

// Define a local copy of plusQuery
var plusQuery = function (object) {
	return new plusQuery.fn.init(object);
};

/*  This section defines a group of customs objects. Basically, these are
 *  all just objects with pointers to the properties of the original
 *  interfaces included in the Messenger Plus! Live API.
 *  This is an implementation to get around the fact that these "objects"
 *  have no prototype property, and so can't really be changed.
 *
 *  The property "this.proxy" is there to access the original interface.
 *  (proxy pattern) You /can/ create objects directly from $.interfaces,
 *  however you should use the plusQuery constructor so you inherit all of 
 *  plusQuery's functions, etc.
 *
 *  This "solves" the problem here: http://msghelp.net/showthread.php?tid=62818
 *
 *
 *  Example usage: override ChatWnd.SendMessage for a single $(ChatWnd) object
 *  to implement a message prefix
 *
 *  var chatWnd = $(chatWnd);
 *  chatWnd.SendMessage = function(Text) {
 *      this.proxy.SendMessage("[Ye] " + Text);
 *  }
 *
 *
 *  Example usage: override ChatWnd.SendMessage for all $(ChatWnd) objects to
 *  implement a message prefix.
 *
 *  $.interfaces.ChatWnd.prototype.SendMessage = function(Text) {
 *      this.proxy.SendMessage("[Ye] " + Text);
 *  }
 */
plusQuery.interfaces = {};

plusQuery.interfaces.extend({

	Debug: function (object) {
		this.proxy = object;
		this.type = "Debug";
		
		this.DebuggingWindowVisible = this.proxy.DebuggingWindowVisible;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Messenger: function (object) {
		this.proxy = object;
		this.type = "Messenger";
		
		this.Version = this.proxy.Version;
		this.VersionBuild = this.proxy.VersionBuild;
		this.ContactListWndHandle = this.proxy.ContactListWndHandle;
		this.CurrentChats = this.proxy.CurrentChats;
		this.ReceiveFileDir = this.proxy.ReceiveFileDir;
		this.MyContacts = this.proxy.MyContacts;
		this.MyEmail = this.proxy.MyEmail;
		this.MyUserId = this.proxy.MyUserId;
		this.MyStatus = this.proxy.MyStatus;
		this.MyName = this.proxy.MyName;
		this.MyPersonalMessage = this.proxy.MyPersonalMessage;
		this.MyCurrentMedia = this.proxy.MyCurrentMedia;
		this.MyDisplayPicture = this.proxy.MyDisplayPicture;
		this.CustomEmoticons = this.proxy.CustomEmoticons;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	MsgPlus: function (object) {
		this.proxy = object;
		this.type = "MsgPlus";
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	ChatWnds: function (object) {
		this.proxy = object;
		this.type = "ChatWnds";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	ChatWnd: function (object) {
		this.proxy = object;
		this.type = "ChatWnd";
	
		this.Handle = this.proxy.Handle;
		this.Contacts = this.proxy.Contacts;
		this.EditText = this.proxy.EditText;
		this.EditChangeAllowed = this.proxy.EditChangeAllowed;
		this.ChatLogEnabled = this.proxy.ChatLogEnabled;
		this.OverrideFmtEnabled = this.proxy.OverrideFmtEnabled;
		this.IsMobileChat = this.proxy.IsMobileChat;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Contacts: function (object) {
		this.proxy = object;
		this.type = "Contacts";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Contact: function (object) {
		this.proxy = object;
		this.type = "Contact";
		
		this.Email = this.proxy.Email;
		this.Network = this.proxy.Network;
		this.Status = this.proxy.Status;
		this.Name = this.proxy.Name;
		this.PersonalMessage = this.proxy.PersonalMessage;
		this.CurrentMedia = this.proxy.CurrentMedia;
		this.Blocked = this.proxy.Blocked;
		this.DisplayPicture = this.proxy.DisplayPicture;
		this.IsFloating = this.proxy.IsFloating;
		this.ProfileColor = this.proxy.ProfileColor;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Emoticons: function (object) {
		this.proxy = object;
		this.type = "Emoticons";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Emoticon: function (object) {
		this.proxy = object;
		this.type = "Emoticon";
		
		this.Shortcut = this.proxy.Shortcut;
		this.Name = this.proxy.Name;
		this.PictureFile = this.proxy.PictureFile;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	PlusWnd: function (object) {
		this.proxy = object;
		this.type = "PlusWnd";
		
		this.Handle = this.proxy.Handle;
		this.Visible = this.proxy.Visible;
		this.WindowId = this.proxy.WindowId;
		this.BaseColor = this.proxy.BaseColor;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Interop: function (object) {
		this.proxy = object;
		this.type = "Interop";
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	DataBloc: function (object) {
		this.proxy = object;
		this.type = "DataBloc";
		
		this.Size = this.proxy.Size;
		this.DataPtr = this.proxy.DataPtr;
		
		this.init.call(this, this.proxy);
		
		return this;
	}
});

plusQuery.interfaces.Debug.prototype = {
	init: function (object) {},
	
	Trace: function (Text) {
		return this.proxy.Trace(Text);
	},
	
	ClearDebuggingWindow: function () {
		return this.proxy.ClearDebuggingWindow();
	}	
};

plusQuery.interfaces.Messenger.prototype = {
	init: function (object) {},
	
	AutoSignin: function () {
		return this.proxy.AutoSignin();
	},
	
	Signout: function () {
		return this.proxy.Signout();
	},
	
	OpenChat: function (Contact) {
		return this.proxy.OpenChat(Contact);
	}
};

plusQuery.interfaces.MsgPlus.prototype = {
	init: function (object) {},
	
	DisplayToast: function (Title, Message, SoundFile, Callback, CallbackParam) {
		return this.proxy.DisplayToast(Title, Message, SoundFile, Callback, CallbackParam);
	},
	
	DisplayToastContact: function (Title, ContactName, Message, SoundFile, Callback, CallbackParam, Contact) {
		return this.proxy.DisplayToastContact(Title, ContactName, Message, SoundFile, Callback, CallbackParam, Contact);
	},
	
	CreateWnd: function (XmlFile, WindowId, Options) {
		return this.proxy.CreateWnd(XmlFile, WindowId, Options);
	},
	
	CreateChildWnd: function (Parent, XmlFile, WindowId, PosX, PosY, Visible) {
		return this.proxy.CreateChildWnd(Parent, XmlFile, WindowId, PosX, PosY, Visible);
	},
	
	AddTimer: function (TimerId, Elapse) {
		return this.proxy.AddTimer(TimerId, Elapse);
	},
	
	CancelTimer: function (TimerId) {
		return this.proxy.CancelTimer(TimerId);
	},
	
	PlaySound: function (SoundFile, MaxPlayTime) {
		return this.proxy.PlaySound(SoundFile, MaxPlayTime);
	},
	
	LockMessenger: function (Lock) {
		return this.proxy.LockMessenger(Lock);
	},
	
	LogEvent: function (Origin, Description, Icon) {
		return this.proxy.LogEvent(Origin, Description, Icon);
	},
	
	RemoveFormatCodes: function (Text) {
		return this.proxy.RemoveFormatCodes(Text);
	},
	
	DownloadFile: function (Url, OutFile, User, Password) {
		return this.proxy.DownloadFile(Url, OutFile, User, Password);
	},
	
	UploadFileFTP: function (SourceFile, Server, User, Password, Destination, PassiveMode, Port) {	
		return this.proxy.UploadFileFTP(SourceFile, Server, User, Password, Destination, PassiveMode, Port);
	},
	
	LoadScriptFile: function (ScriptFile) {
		return this.proxy.LoadScriptFile(ScriptFile);
	},
	
	ExtractFromZIP: function (ZipFile, DestDirectory, FileNames, Password) {
		return this.proxy.ExtractFromZIP(ZipFile, DestDirectory, FileNames, Password);
	}
};

plusQuery.interfaces.ChatWnds.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	}
};

plusQuery.interfaces.ChatWnd.prototype = {
	init: function (object) {},
	
	SendMessage: function (Message) {
		return this.proxy.SendMessage(Message);
	},
	
	SendFile: function (FilePath) {
		return this.proxy.SendFile(FilePath);
	},
	
	AddContact: function (Email) {
		return this.proxy.AddContact(Email);
	},
	
	DisplayInfoMessage: function (Message, Duration, ForceNow) {
		return this.proxy.DisplayInfoMessage(Message, Duration, ForceNow);
	},
	
	ResetInfoMessage: function () {
		return this.proxy.ResetInfoMessage();
	},
	
	EditText_SetCurSelStart: function () {
		return this.proxy.EditText_SetCurSelStart();
	},
	
	EditText_SetCurSelEnd: function () {
		return this.proxy.EditText_SetCurSelEnd();
	},
	
	EditText_SetCurSel: function (Start, End) {
		return this.proxy.EditText_SetCurSel(Start, End);
	},
	
	EditText_ReplaceSel: function (Text) {
		return this.proxy.EditText_ReplaceSel(Text);
	},
	
	HistoryText_GetCurSelStart: function () {
		return this.proxy.HistoryText_GetCurSelStart();
	},
	
	HistoryText_GetCurSelEnd: function () {
		return this.proxy.HistoryText_GetCurSelEnd();
	},
	
	HistoryText_GetTextRange: function (StartIdx, EndIdx, AddObjectCodes) {
		return this.proxy.HistoryText_GetTextRange(StartIdx, EndIdx, AddObjectCodes);
	}
};

plusQuery.interfaces.Contacts.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	},
	
	GetContact: function (Email) {
		return this.proxy.GetContact(Email);
	}
};

plusQuery.interfaces.Contact.prototype = {
	init: function (object) {
		
	}
};

plusQuery.interfaces.Emoticons.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	},
	
	GetEmoticon: function (Shortcut) {
		return original.GetEmoticon(Shortcut);
	}
};

plusQuery.interfaces.Emoticon.prototype = {
	init: function (object) {
		
	}
};

plusQuery.interfaces.PlusWnd.prototype = {
	init: function (object) {
		
	}
};

plusQuery.interfaces.Interop.prototype = {
	init: function (object) {},
	
	Call: function (DllName, FunctionName, Param1, Param2,
		Param3, Param4, Param5, Param6, Param7, Param8, Param9,
		Param10, Param11, Param12) {
		
		return this.proxy.Call(DllName, FunctionName, Param1, Param2,
			Param3, Param4, Param5, Param6, Param7, Param8, Param9,
			Param10, Param11, Param12);
	},
	
	Call2: function (DllName, FunctionName, Param1, Param2,
		Param3, Param4, Param5, Param6, Param7, Param8, Param9,
		Param10, Param11, Param12) {
		
		return this.proxy.Call2(DllName, FunctionName, Param1, Param2,
			Param3, Param4, Param5, Param6, Param7, Param8, Param9,
			Param10, Param11, Param12);
	},
	
	FreeDll: function (DllName) {
		return this.proxy.FreeDll(DllName);
	},
	
	GetLastError: function () {
		return this.proxy.GetLastError();
	},
	
	Allocate: function (InitialSize) {
		return this.proxy.Allocate(InitialSize);
	},
	
	GetCallbackPtr: function (FunctionName) {
		return this.proxy.GetCallbackPtr(FunctionName);
	}
};

plusQuery.interfaces.DataBloc.prototype = {
	init: function (object) {},
	
	GetAt: function (Offset) {
		return this.proxy.GetAt(Offset);
	},
	
	SetAt: function (Offset, Byte) {
		return this.proxy.SetAt(Offset, Byte);
	},
	
	ReadString: function () {
		return this.proxy.ReadString();
	},
	
	WriteString: function (Offset, String, WriteUnicode) {
		return this.proxy.WriteString(Offset, String, WriteUnicode);
	},
	
	ReadBSTR: function () {
		return this.proxy.ReadBSTR();
	},
	
	WriteBSTR: function () {
		return this.proxy.WriteBSTR();
	},
	
	ReadWORD: function () {
		return this.proxy.ReadWORD();
	},
	
	WriteWORD: function () {
		return this.proxy.WriteWORD();
	},
	
	ReadDWORD: function () {
		return this.proxy.ReadDWORD();
	},
	
	WriteDWORD: function () {
		return this.proxy.WriteDWORD();
	},
	
	ReadInterfacePtr: function () {
		return this.proxy.ReadInterfacePtr();
	},
	
	WriteInterfacePtr: function () {
		return this.proxy.WriteInterfacePtr();
	}
};

plusQuery.fn = plusQuery.prototype = {
	constructor: plusQuery,
	
	// This acts as the constructor.
	init: function (object) {
	
		// HANDLE: $(falsey) and $(plusQuery)
		if (!object || object instanceof plusQuery) {
			return this;
		}

		/*  We can test for all of the Messenger Plus! objects with
		 *  reasonable certainty because the typeof the functions are
		 *  "unknown", not "function".
		 *  For those without functions, (Contact and Emoticon) we do a bit
		 *  more testing just in case.
		 */
		
		// HANDLE: $(Debug)
		if (typeof object.Trace === "unknown") {
			return this.extend(new plusQuery.interfaces.Debug(object));
		}
		
		// HANDLE: $(Messenger)
		if (typeof object.AutoSignin === "unknown") {
			return this.extend(new plusQuery.interfaces.Messenger(object));
		}
		
		// HANDLE: $(MsgPlus)
		if (typeof object.LockMessenger === "unknown") {
			return this.extend(new plusQuery.interfaces.MsgPlus(object));
		}
		
		// HANDLE: $(Contacts)
		if (typeof object.GetContact === "unknown") {
			return this.extend(new plusQuery.interfaces.Contacts(object));
		}
		
		// HANDLE: $(Emoticons)
		if (typeof object.GetEmoticons === "unknown") {
			return this.extend(new plusQuery.interfaces.Emoticons(object));
		}
		
		// Handle $(ChatWnds)
		if (object.Count) {
			return this.extend(new plusQuery.interfaces.ChatWnds(object));
		}
		
		// Handle $(ChatWnd)
		if (typeof object.SendMessage === "unknown") {
			return this.extend(new plusQuery.interfaces.ChatWnd(object));
		}
		
		// HANDLE: $(Contact)
		if (typeof object.Email !== "undefined" &&
			typeof object.Network !== "undefined" &&
			typeof object.Status !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PersonalMessage !== "undefined" &&
			typeof object.CurrentMedia !== "undefined" &&
			typeof object.DisplayPicture !== "undefined") {
			
			return this.extend(new plusQuery.interfaces.Contact(object));
		}
		
		// HANDLE: $(Emoticon)
		if (typeof object.Shortcut !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PictureFile !== "undefined") {
			
			return this.extend(new plusQuery.interfaces.Emoticon(object));
		}
		
		// HANDLE: $(PlusWnd)
		if (typeof object.Close === "unknown") {
			return this.extend(new plusQuery.interfaces.PlusWnd(object));
		}
		
		// HANDLE: $(Interop)
		if (typeof object.Call === "unknown") {
			return this.extend(new plusQuery.interfaces.Interop(object));
		}
		
		// HANDLE: $(DataBloc)
		if (typeof object.SetAt === "unknown") {
			return this.extend(new plusQuery.interfaces.DataBloc(object));
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

// Misc functions
plusQuery.extend({
	noop: function () {},

	// A GUID counter for objects
	guid: 1,

	// Current time in MS
	now: function () {
		return (new Date()).getTime();
	},
	
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
	}
});

return plusQuery;
})();



// 
function $A(iterable) {
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
}

// 
(function ($) {

// Debug
$.interfaces.Debug.prototype.extend({
	Enabled: true,
	
	Trace: function (Text) {
		if (this.Enabled) {
			this.proxy.Trace(String(Text));
		}
	}
});

// Messenger
$.interfaces.Messenger = function (object) {
	this.proxy = object;
	this.typeOf = "Messenger";
	
	this.Version = this.proxy.Version;
	this.VersionBuild = this.proxy.VersionBuild;
	this.ContactListWndHandle = this.proxy.ContactListWndHandle;	
	this.ReceiveFileDir = this.proxy.ReceiveFileDir;
	this.MyEmail = this.proxy.MyEmail;
	this.MyUserId = this.proxy.MyUserId;
	this.MyStatus = this.proxy.MyStatus;
	this.MyName = this.proxy.MyName;
	this.MyPersonalMessage = this.proxy.MyPersonalMessage;
	this.MyCurrentMedia = this.proxy.MyCurrentMedia;
	this.MyDisplayPicture = this.proxy.MyDisplayPicture;
	
	// Extend these three to become plusQuery objects
	this.CurrentChats = $(this.proxy.CurrentChats);
	this.MyContacts = $(this.proxy.MyContacts);
	this.CustomEmoticons = $(this.proxy.CustomEmoticons);
	
	return this;
};

// MsgPlus
$.interfaces.MsgPlus.prototype.extend({
	// The default DisplayToast function only allows a string as a callback.
	// Apparently the callback function has to be in global scope, too. :(
	// Silly Patchou. I cannot fathom why he would code it like this...
	DisplayToast: function (Title, Message, SoundFile, Callback,
		CallbackParam) {
		if (Callback.isFunction()) {
			return this.proxy.DisplayToast(Title, Message, (SoundFile || ""),
				"DisplayToastCallback", [Callback, CallbackParam]);
		}
		
		return this.proxy.DisplayToast(Title, Message, SoundFile, Callback,
			CallbackParam);
	},
	
	// Pretty much the same as above, but with the contact toast.
	DisplayToastContact: function (Title, ContactName, Message,
		SoundFile, Callback, CallbackParam, Contact) {
		
		if (Callback.isFunction()) {
			return this.proxy.DisplayToastContact(Title, ContactName, Message,
				(SoundFile || ""), "DisplayToastCallback", [Callback, CallbackParam], Contact);
		}
		
		return this.proxy.DisplayToastContact(Title, ContactName, Message,
			SoundFile, Callback, CallbackParam, Contact);
	}
});

// ChatWnds
$.interfaces.ChatWnds = function (object) {
	this.proxy = object;
	this.typeOf = "ChatWnds";
	
	for (var e = new Enumerator(this.proxy), i = 0; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i;
};

// ChatWnd
$.interfaces.ChatWnd.prototype.extend({
	trigger: function (event, args) {
		if (event.object && event.object.Handle && event.object.Handle === this.Handle) {
			return event.callback.apply(this, args);
		}
	}
});

// Contacts
$.interfaces.Contacts = function(object) {
	this.proxy = object;
	this.typeOf = "Contacts";
	
	this[0] = $.MyContact();
	for (var e = new Enumerator(this.proxy), i = 1; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i+1;
};

$.interfaces.Contacts.prototype.extend({
	GetContact: function (str) {
		if (str.toLowerCase() === Messenger.MyEmail.toLowerCase()) {
			return this[0];
		} else if (this.proxy.GetContact(str)) {
			return $(this.proxy.GetContact(str));
		} else {
			for (var i = 0; i < this.length; i++) {
				if (this[i].Name === str) {
					return this[i]; // Only returns the first match
				}
			}
		}
		
		return null;
	}
});

// Ugh, polluting my global object!
DisplayToastCallback = function () {
	arguments[0][0].call(this, arguments[0][1]);
};

})(plusQuery);
(function ($) {
	
	var Event = function (object, eventName, callback) {
		this.object = object;
		this.eventName = eventName;
		this.callback = callback;
		this.guid = $.guid++;
	};
	
	Event.CACHE = {};
	
	Event.RETURNS = {
		ChatWndReceiveMessage: 3,
		ChatWndSendMessage: 2,
		OnGetScriptMenu: 1,
		OnGetScriptCommands: 0
	};

	Event.prototype.extend({
	
		start: function () {
			$.addEventListener(this.object, this.eventName, this.callback);
			return this;
		},
		
		stop: function () {
			$.removeEventListener(this.object, this.eventName, this.callback);
			return this;
		},
		
		trigger: function(args) {
			return this.callback.apply(this, args);
		}
	});
	
	$.extend({
	
		Event: Event,
	
		addEventListener: function () {
			var object, eventName, callback;

			// Simulating parametric polymorphism
			if (arguments[0].isString()) {
				object = $;
				eventName = arguments[0];
				callback = arguments[1];
			} else {
				object = arguments[0];
				eventName = arguments[1];
				callback = arguments[2];
			}
			
			eventName = eventName.split(" ");

			for(var i = 0; i < eventName.length; i++) {
				var event = new Event(object, eventName[i], callback);
				Event.CACHE[event.guid] = event;
			}

			return this;
		},
		
		removeEventListener: function (object, eventName, callback) {
			Event.CACHE.forEach(function (event) {
				if(event.object === object && event.eventName === eventName &&
					event.callback === callback) {
						delete Event.CACHE[event.guid];
				}
			});
			
			return this;
		},
		
		bind: function (object, eventName, callback) {
			return new Event(object, eventName, callback).start();
		},
		
		trigger: function (object, eventName, args) {
			var ret;
			Event.CACHE.forEach(function (event) {
				if(event.eventName === eventName) {
					try {
						if (event.object === $) {
							ret = event.trigger(args);
							if (ret !== undefined) {
								args[Event.RETURNS[eventName]] = ret;
							}
						} else {
							ret = object.trigger(event, args);
							if (ret !== undefined) {
								args[Event.RETURNS[eventName]] = ret;
							}
						}
					} catch (err) {
							$(Debug).Trace(err.name + ": " + err.message + " (" + err.number + ")\n\tEvent: " + eventName);
					}
				}
			});
			
			return args[Event.RETURNS[eventName]];
		}
	});
	
	$.prototype.extend({
		addEventListener: function (eventName, callback) {
			return $.addEventListener(this, eventName, callback);
		},
		
		removeEventListener: function (eventName, callback) {
			return $.removeEventListener(this, eventName, callback);
		},
		
		bind: function (eventName, callback) {
			return $.bind(this, eventName, callback);
		},
		
		trigger: $.noop
	});
	
})(plusQuery);
(function ($) {

	var Timer = function (callback, delay, repeat) {
		this.callback = callback;
		this.delay = delay;
		this.repeat = repeat;
		this.id = "TYSCRIPT#" + TYSCRIPT.guid++;
		Timer.CACHE[this.id] = this;
	};
	
	Timer.CACHE = {};
	
	Timer.prototype.extend({
		start: function () {
			if (this.delay < 300) {
				this.trigger();
			} else {
				MsgPlus.AddTimer(this.id, this.delay);
			}
			return this;
		},
		
		cancel: function () {
			MsgPlus.CancelTimer(this.id);
			delete Timer.CACHE[this.id];
			return this;
		},
		
		trigger: function () {
			this.callback.apply(this);
			if(this.repeat) {
				this.start();
			}
		}
	});
	
	$.extend({
		setTimeout: function (callback, delay) {
			return (new Timer(callback, delay, false)).start();
		},
		
		setInterval: function (callback, delay) {
			return (new Timer(callback, delay, true)).start();
		},
		
		clearTimeout: function (timer) {
			if (timer.id) {
				Timer.CACHE[timer.id].cancel();
			} else {
				Timer.CACHE[timer].cancel();
			}
			
		},
		
		clearInterval: this.clearTimeout
	});
	
	$.addEventListener('Timer', function(timerId) {
		if(timerId.match(/TYSCRIPT#(\d+)/) && Timer.CACHE[timerId].callback)
		{
			Timer.CACHE[this.id].trigger();
		}
	});

})(plusQuery);(function ($) {
	
	var Command = function (commandName, command, callback) {
		this.commandName = commandName.toUpperCase();
		this.command = command;
		this.callback = callback;
		this.guid = $.guid++;
	};
	
	Command.CACHE = {};
	
	$.extend({
		addCommand: function() {
			var commandNames, command, callback;
			if (arguments[1].isFunction()) {
				commandNames = arguments[0];
				callback = arguments[1];
			} else {
				commandNames = arguments[0];
				command = arguments[1];
				callback = arguments[2];
			}
			commandNames.split(" ").forEach(function (commandName) {
				var cmd = new Command(commandName, command, callback);
				Command.CACHE[cmd.guid] = cmd;
			});
			
			return this;
		},
		
		removeCommand: function(command) {
		//	Command.CACHE[this.guid]
		},
		
		triggerCommand: function(chatWnd, contact, parameters, message) {
			
		}
	});
	
	/*$.addEventListener("ChatWndReceiveMessage", function (chatWnd, origin, message, msgKind) {
		if (msgKind === 1)
		{
			$.triggerCommand($(chatWnd), $(chatWnd.Contacts).GetContact(origin), message.split(' ').slice(1).join(' '), message);
		}
	});
	
	$.addEventListener("ChatWndSendMessage", function (chatWnd, message) {
		var tmp = $.triggerCommand($(chatWnd), $(chatWnd).Contacts.GetContact(Messenger.MyEmail), message.split(' ')[0].toUpperCase(), message.split(' ').slice(1).join(' '), message);
		return (tmp === undefined ? message : tmp);
	});
	
	$.addEventListener("OnGetScriptCommands", function (commands) {
		Command.CACHE.forEach(function (command) {
			
		});
	});*/

})(plusQuery);
})();

function OnEvent_Signin() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "Signin", args);
}

function OnEvent_SigninReady() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "SigninReady", args);
}

function OnEvent_Signout() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "Signout", args);
}

function OnEvent_MyStatusChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyStatusChange", args);
}

function OnEvent_MyNameChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyNameChange", args);
}

function OnEvent_MyPsmChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyPsmChange", args);
}

function OnEvent_MyMediaChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyMediaChange", args);
}

function OnEvent_ContactSignin() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactSignin", args);
}

function OnEvent_ContactSignout() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactSignout", args);
}

function OnEvent_ContactStatusChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactStatusChange");
}

function OnEvent_ContactNameChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactNameChange");
}

function OnEvent_ContactPsmChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactPsmChange", args);
}

function OnEvent_ContactMediaChange() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactMediaChange");
}

function OnEvent_ContactBlocked() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactBlocked", args);
}

function OnEvent_ContactUnblocked() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactUnblocked", args);
}

function OnEvent_ContactListWndCreated() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "ContactListWndCreated", args);
}

function OnEvent_ContactListWndDestroyed() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "ContactListWndDestroyed", args);
}

function OnEvent_ChatWndCreated() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndCreated", args);
}

function OnEvent_ChatWndDestroyed() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndDestroyed", args);
}

function OnEvent_ChatWndContactAdded() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndContactAdded", args);
}

function OnEvent_ChatWndContactRemoved() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndContactRemoved", args);
}

function OnEvent_ChatWndReceiveMessage() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndReceiveMessage", args);
}

function OnEvent_ChatWndSendMessage() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndSendMessage", args);
}

/*function OnEvent_ChatWndEditKeyDown() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndEditKeyDown", args);
}*/

function OnEvent_Initialize() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "Initialize", args);
}

function OnEvent_Uninitialize() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "Uninitialize", args);
}

function OnEvent_MessengerLocked() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "MessengerLocked", args);
}

function OnEvent_MessengerUnlocked() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "MessengerUnlocked", args);
}

function OnEvent_Timer() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "Timer", args);
}

function OnEvent_MenuClicked() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery(args[2]), "MenuClicked", args);
}

function OnEvent_EnterPersonalizedStatus() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "EnterPersonalizedStatus", args);
}

function OnEvent_LeavePersonalizedStatus() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "LeavePersonalizedStatus", args);
}

function OnEvent_DownloadFileComplete() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "DownloadFileComplete", args);
}

function OnEvent_UploadFileComplete() {
	var args = $A(arguments);
	return plusQuery.trigger(plusQuery, "UploadFileComplete", args);
}

function OnGetScriptMenu() {
	var args = $A(arguments);
	args.push({});
	return plusQuery.trigger(plusQuery, "OnGetScriptMenu", args);
}

function OnGetScriptCommands() {
	var args = $A(arguments);
	args.push([]);
	return plusQuery.trigger(plusQuery, "OnGetScriptCommands", args);
}
