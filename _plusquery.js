/*!
 * plusQuery JavaScript Library @VERSION
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
 * Date: @DATE
 */
var plusQuery = (function () {

	// Define a local copy of plusQuery
	var plusQuery = function (obj) {
		return new plusQuery.fn.init(obj);
	};
	
	var class2type = {};
	
	// Set $ to plusQuery if it's not already defined
	if (typeof $ === "undefined") {
		$ = plusQuery;
	}
	
	/*  This section defines a group of customs objects. Basically, these are
	 *  all just objects with pointers to the properties of the original
	 *  interfaces included in the Messenger Plus! Live API.
	 *  This is an implementation to get around the fact that these "objects"
	 *  have no prototype property, and so can't really be changed.
	 *
	 *  The property "this.proxy" is there to access the original interface.
	 *  (proxy pattern) You /can/ create objects directly from $.customObjects,
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
	 *  $.customObjects.ChatWnd.prototype.SendMessage = function(Text) {
	 *      this.proxy.SendMessage("[Ye] " + Text);
	 *  }
	 */
	plusQuery.customObjects = {
	
		Debug: function (obj) {
			this.proxy = obj;
			this.type = "Debug";
			
			this.DebuggingWindowVisible = this.proxy.DebuggingWindowVisible;
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		Messenger: function (obj) {
			this.proxy = obj;
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
		
		MsgPlus: function (obj) {
			this.proxy = obj;
			this.type = "MsgPlus";
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		ChatWnds: function (obj) {
			this.proxy = obj;
			this.type = "ChatWnds";
			
			this.Count = this.proxy.Count;
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		ChatWnd: function (obj) {
			this.proxy = obj;
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
		
		Contacts: function (obj) {
			this.proxy = obj;
			this.type = "Contacts";
			
			this.Count = this.proxy.Count;
			
			return this;
		},
		
		Contact: function (obj) {
			this.proxy = obj;
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
		
		Emoticons: function (obj) {
			this.proxy = obj;
			this.type = "Emoticons";
			
			this.Count = this.proxy.Count;
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		Emoticon: function (obj) {
			this.proxy = obj;
			this.type = "Emoticon";
			
			this.Shortcut = this.proxy.Shortcut;
			this.Name = this.proxy.Name;
			this.PictureFile = this.proxy.PictureFile;
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		PlusWnd: function (obj) {
			this.proxy = obj;
			this.type = "PlusWnd";
			
			this.Handle = this.proxy.Handle;
			this.Visible = this.proxy.Visible;
			this.WindowId = this.proxy.WindowId;
			this.BaseColor = this.proxy.BaseColor;
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		Interop: function (obj) {
			this.proxy = obj;
			this.type = "Interop";
			
			this.init.call(this, this.proxy);
			
			return this;
		},
		
		DataBloc: function (obj) {
			this.proxy = obj;
			this.type = "DataBloc";
			
			this.Size = this.proxy.Size;
			this.DataPtr = this.proxy.DataPtr;
			
			this.init.call(this, this.proxy);
			
			return this;
		}
	};

	plusQuery.customObjects.Debug.prototype = {
		init: function (obj) {
			
		},
		
		Trace: function (Text) {
			return this.proxy.Trace(Text);
		},
		
		ClearDebuggingWindow: function () {
			return this.proxy.ClearDebuggingWindow();
		}	
	};
	
	plusQuery.customObjects.Messenger.prototype = {
		init: function () {
			
		},
		
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
	
	plusQuery.customObjects.MsgPlus.prototype = {
		init: function () {
			
		},
		
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
	
	plusQuery.customObjects.ChatWnds.prototype = {
		init: function () {
			
		},
		
		Iterator: function () {
			return this.proxy.Iterator();
		}
	};
	
	plusQuery.customObjects.ChatWnd.prototype = {
		init: function () {
			
		},
		
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
	
	plusQuery.customObjects.Contacts.prototype = {
		init: function () {
			
		},
		
		Iterator: function () {
			return this.proxy.Iterator();
		},
		
		GetContact: function (Email) {
			return this.proxy.GetContact(Email);
		}
	};
	
	plusQuery.customObjects.Contact.prototype = {
		init: function () {
			
		}
	};
	
	plusQuery.customObjects.Emoticons.prototype = {
		init: function () {
			
		},
		
		Iterator: function () {
			return this.proxy.Iterator();
		},
		
		GetEmoticon: function (Shortcut) {
			return original.GetEmoticon(Shortcut);
		}
	};
	
	plusQuery.customObjects.Emoticon.prototype = {
		init: function () {
			
		}
	};
	
	plusQuery.customObjects.PlusWnd.prototype = {
		init: function () {
			
		}
	};
	
	plusQuery.customObjects.Interop.prototype = {
		init: function () {
			
		},
		
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
	
	plusQuery.customObjects.DataBloc.prototype = {
		init: function () {
			
		},
		
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
		init: function (obj) {
		
			// HANDLE: $(null), $(undefined) and $(plusQuery)
			if (!obj || (obj.bind && obj.extend)) {
				return this;
			}
 
			/*  We can test for all of the Messenger Plus! Live objects with
			 *  reasonable certainty because the typeof the functions are
			 *  "unknown", not "function".
			 *  For those without functions, (Contact and Emoticon) we do a bit
			 *  more testing in case.
			 */
			
			// HANDLE: $(Debug)
			if (typeof obj.Trace === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Debug(obj));
			}
			
			// HANDLE: $(Messenger)
			if (typeof obj.AutoSignin === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Messenger(obj));
			}
			
			// HANDLE: $(MsgPlus)
			if (typeof obj.LockMessenger === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.MsgPlus(obj));
			}
			
			// HANDLE: $(Contacts)
			if (typeof obj.GetContact === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Contacts(obj));
			}
			
			// HANDLE: $(Emoticons)
			if (typeof obj.GetEmoticons === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Emoticons(obj));
			}
			
			// Handle $(ChatWnds)
			if (obj.Count) {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.ChatWnds(obj));
			}
			
			// Handle $(ChatWnd)
			if (typeof obj.SendMessage === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.ChatWnd(obj));
			}
			
			// HANDLE: $(Contact)
			if (obj.Email) {// && obj.Network && obj.Status && obj.Name
				//&& obj.PersonalMessage && obj.CurrentMedia
				//&& obj.DisplayPicture) {
				
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Contact(obj));
			}
			
			// HANDLE: $(Emoticon)
			if (obj.Shortcut && obj.Name
				&& obj.PictureFile) {
				
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Emoticon(obj));
			}
			
			// HANDLE: $(PlusWnd)
			if (typeof obj.Close === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.PlusWnd(obj));
			}
			
			// HANDLE: $(Interop)
			if (typeof obj.Call === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.Interop(obj));
			}
			
			// HANDLE: $(DataBloc)
			if (typeof obj.SetAt === "unknown") {
				return plusQuery.extend({}, this,
					new plusQuery.customObjects.DataBloc(obj));
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
		
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function (num) {
			return num === null ?

				// Return a 'clean' array
				this.toArray() :

				// Return just the object
				(num < 0 ? this[ this.length + num ] : this[ num ]);
		},
		
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function(callback, args) {
			return plusQuery.each(this, callback, args);
		}
	};
	
	// Give the init function the jQuery prototype for later instantiation
	plusQuery.fn.init.prototype = plusQuery.fn;
	
	// Allows us to extend an object. Taken from jQuery.
	plusQuery.extend = plusQuery.fn.extend = function () {
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

		// extend jQuery itself if only one argument is passed
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
	
	// Misc functions taken from jQuery
	plusQuery.extend({
	
		isFunction: function (obj) {
			return plusQuery.type(obj) === "function";
		},

		isArray: function (obj) {
			return plusQuery.type(obj) === "array";
		},
		
		isNaN: function(obj) {
			return obj == null || !/\d/.test(obj) || isNaN(obj);
		},
		
		type: function (obj) {
			return obj == null ?
				String(obj) :
				class2type[ Object.prototype.toString.call(obj) ] || "object";
		},

		isPlainObject: function (obj) {
			// Must be an Object.
			if (!obj || plusQuery.type(obj) !== "object") {
				return false;
			}

			// Not own constructor property must be Object
			if (obj.constructor &&
				!Object.prototype.hasOwnProperty.call(obj, "constructor") &&
				!Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for (key in obj) {}

			return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
		},

		isEmptyObject: function (obj) {
			for (var name in obj) {
				return false;
			}
			return true;
		},

		error: function (msg) {
			throw msg;
		},

		noop: function () {},
		
		// args is for internal usage only
		each: function(object, callback, args) {
			var name, i = 0,
				length = object.length,
				isObj = length === undefined || plusQuery.isFunction(object);

			if (args) {
				if (isObj) {
					for (name in object) {
						if (callback.apply(object[ name ], args) === false) {
							break;
						}
					}
				} else {
					for (; i < length;) {
						if (callback.apply(object[ i++ ], args) === false) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if (isObj) {
					for (name in object) {
						if (callback.call(object[ name ], name, object[ name ]) === false) {
							break;
						}
					}
				} else {
					for (var value = object[0];
						i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
				}
			}

			return object;
		},

		// Trims text of whitespace using one of the "fastest" JScript regexps
		trim: function (text) {
			return text === null ?
				"" :
				text.toString().replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1');
		},

		// A GUID counter for objects
		guid: 1,

		// Current time in MS
		now: function () {
				return (new Date()).getTime();
		}
	});
	
	plusQuery.Event = function (obj, type, fn) {
		this.obj = obj;
		this.type = type;
		this.fn = fn;
		this.timeStamp = plusQuery.now();
		this.guid = plusQuery.guid++;
	}
	
	plusQuery.extend({
		event: {
			events: {},
			
			add: function (obj, type, fn) {
				var event = new plusQuery.Event(obj, type, fn);
				plusQuery.event.events[event.guid] = event;
			},

			remove: function (obj, type, fn) {
				
			},
			
			trigger: function (type, args) {
				plusQuery.each(type.split(" "), function (i, type) {
					plusQuery.each(plusQuery.event.events, function (j, event) {
						if (type === event.type) {
							event.fn.apply(this, args);
						}
					}.bind(this));
				}.bind(this));
			}
		},
		
		bind: function (type, fn) {
			plusQuery.event.add(plusQuery, type, fn);
			
			return this;
		},
		
		unbind: function (type, fn) {
			plusQuery.event.remove(plusQuery, type, fn);

			return this;
		},
		
		trigger: function (type, args) {
			return plusQuery.event.trigger(type, args);
		}
	});
	
	plusQuery.fn.extend({
		bind: function (type, fn) {
			if (this.length === 0) {
				plusQuery.event.add(this, type, fn);
			} else {
				for (var i = 0, l = this.length; i < l; i++) {
					plusQuery.event.add(this[i], type, fn);
				}
			}
			
			return this;
		},
		
		unbind: function (type, fn) {
			if (this.length !== 0) {
				plusQuery.event.remove(this, type, fn);
			} else {
				for (var i = 0, l = this.length; i < l; i++) {
					plusQuery.event.remove(this[i], type, fn);
				}
			}

			return this;
		}
	});
	
	plusQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	
	return plusQuery;
	
}());

function OnEvent_Signin() {
	return plusQuery.trigger.call(this, "Signin", arguments);
}

function OnEvent_SigninReady() {
	return plusQuery.trigger.call(this, "SigninReady", arguments);
}

function OnEvent_Signout() {
	return plusQuery.trigger.call(this, "Signout", arguments);
}

function OnEvent_MyStatusChange() {
	return plusQuery.trigger.call(this, "MyStatusChange", arguments);
}

function OnEvent_MyNameChange() {
	return plusQuery.trigger.call(this, "MyNameChange", arguments);
}

function OnEvent_MyPsmChange() {
	return plusQuery.trigger.call(this, "MyPsmChange", arguments);
}

function OnEvent_MyMediaChange() {
	return plusQuery.trigger.call(this, "MyMediaChange", arguments);
}

function OnEvent_ContactSignin() {
	return plusQuery.trigger.call(this, "ContactSignin", arguments);
}

function OnEvent_ContactSignout() {
	return plusQuery.trigger.call(this, "ContactSignout", arguments);
}

function OnEvent_ContactStatusChange() {
	return plusQuery.trigger.call(this, "ContactStatusChange", arguments);
}

function OnEvent_ContactNameChange() {
	return plusQuery.trigger.call(this, "ContactNameChange", arguments);
}

function OnEvent_ContactPsmChange() {
	return plusQuery.trigger.call(this, "ContactPsmChange", arguments);
}

function OnEvent_ContactMediaChange() {
	return plusQuery.trigger.call(this, "ContactMediaChange", arguments);
}

function OnEvent_ContactBlocked() {
	return plusQuery.trigger.call(this, "ContactBlocked", arguments);
}

function OnEvent_ContactUnblocked() {
	return plusQuery.trigger.call(this, "ContactUnblocked", arguments);
}

function OnEvent_ContactListWndCreated() {
	return plusQuery.trigger.call(this, "ContactListWndCreated", arguments);
}

function OnEvent_ContactListWndDestroyed() {
	return plusQuery.trigger.call(this, "ContactListWndDestroyed", arguments);
}

function OnEvent_ChatWndCreated() {
	return plusQuery.trigger.call(this, "ChatWndCreated", arguments);
}

function OnEvent_ChatWndDestroyed() {
	return plusQuery.trigger.call(this, "ChatWndDestroyed", arguments);
}

function OnEvent_ChatWndContactAdded() {
	return plusQuery.trigger.call(this, "ChatWndContactAdded", arguments);
}

function OnEvent_ChatWndContactRemoved() {
	return plusQuery.trigger.call(this, "ChatWndContactRemoved", arguments);
}

function OnEvent_ChatWndReceiveMessage() {
	return plusQuery.trigger.call(this, "ChatWndReceiveMessage", arguments);
}

function OnEvent_ChatWndSendMessage() {
	return plusQuery.trigger.call(this, "ChatWndSendMessage", arguments);
}

/*function OnEvent_ChatWndEditKeyDown() {
	return plusQuery.trigger.call(this, "ChatWndEditKeyDown", arguments);
}*/

function OnEvent_Initialize() {
	return plusQuery.trigger.call(this, "Initialize", arguments);
}

function OnEvent_Uninitialize() {
	return plusQuery.trigger.call(this, "Uninitialize", arguments);
}

function OnEvent_MessengerLocked() {
	return plusQuery.trigger.call(this, "MessengerLocked", arguments);
}

function OnEvent_MessengerUnlocked() {
	return plusQuery.trigger.call(this, "MessengerUnlocked", arguments);
}

function OnEvent_Timer() {
	return plusQuery.trigger.call(this, "Timer", arguments);
}

function OnEvent_MenuClicked() {
	return plusQuery.trigger.call(this, "MenuClicked", arguments);
}

function OnEvent_EnterPersonalizedStatus() {
	return plusQuery.trigger.call(this, "EnterPersonalizedStatus", arguments);
}

function OnEvent_LeavePersonalizedStatus() {
	return plusQuery.trigger.call(this, "LeavePersonalizedStatus", arguments);
}

function OnEvent_DownloadFileComplete() {
	return plusQuery.trigger.call(this, "DownloadFileComplete", arguments);
}

function OnEvent_UploadFileComplete() {
	return plusQuery.trigger.call(this, "UploadFileComplete", arguments);
}

function OnGetScriptMenu() {
	return plusQuery.trigger.call(this, "OnGetScriptMenu", arguments);
}

function OnGetScriptCommands() {
	return plusQuery.trigger.call(this, "OnGetScriptCommands", arguments);
}

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
}(Array.prototype.slice));
