/*!
 * plusQuery JavaScript Library @VERSION
 * https://github.com/tyscorp/plusquery/
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
	 *  The property "this.original" is there to access the original interface.
	 *  You /can/ create objects directly from $.customObjects, however you should
	 *  use the plusQuery constructor so you inherit all of plusQuery's functions, etc.
	 *
	 *  This "solves" the problem here: http://msghelp.net/showthread.php?tid=62818
	 *
	 *
	 *  Example usage: override ChatWnd.SendMessage for a single $(ChatWnd) object
	 *  to implement a message prefix
	 *
	 *  var chatWnd = $(chatWnd);
	 *  chatWnd.SendMessage = function(Text) {
	 *      this.original.SendMessage("[Ye] " + Text);
	 *  }
	 *
	 *
	 *  Example usage: override ChatWnd.SendMessage for all $(ChatWnd) objects to
	 *  implement a message prefix.
	 *
	 *  $.customObjects.ChatWnd.prototype.SendMessage = function(Text) {
	 *      this.original.SendMessage("[Ye] " + Text);
	 *  }
	 */
	plusQuery.customObjects = {
	
		Debug: function (obj) {
			this.original = obj;
			this.DebuggingWindowVisible = this.original.DebuggingWindowVisible;
			
			return this;
		},
		
		Messenger: function (obj) {
			this.original = obj;
			
			this.Version = obj.Version;
			this.VersionBuild = obj.VersionBuild;
			this.ContactListWndHandle = obj.ContactListWndHandle;
			this.CurrentChats = obj.CurrentChats;
			this.ReceiveFileDir = obj.ReceiveFileDir;
			this.MyContacts = obj.MyContacts;
			this.MyEmail = obj.MyEmail;
			this.MyUserId = obj.MyUserId;
			this.MyStatus = obj.MyStatus;
			this.MyName = obj.MyName;
			this.MyPersonalMessage = obj.MyPersonalMessage;
			this.MyCurrentMedia = obj.MyCurrentMedia;
			this.MyDisplayPicture = obj.MyDisplayPicture;
			this.CustomEmoticons = obj.CustomEmoticons;
			
			return this;
		},
		
		MsgPlus: function (obj) {
			this.original = obj;
			
			this.Version = obj.Version;
			this.VersionBuild = obj.VersionBuild;
			this.ScriptRegPath = obj.ScriptRegPath;
			this.ScriptFilesPath = obj.ScriptFilesPath;
			this.MessengerIsLocked = obj.MessengerIsLocked;
			this.UILangCode = obj.UILangCode;
			
			return this;
		},
		
		ChatWnds: function (obj) {
			this.original = obj;
			
			this.Count = obj.Count;
			
			return this;
		},
		
		ChatWnd: function (obj) {
			this.original = obj;
		
			this.Handle = obj.Handle;
			this.Contacts = obj.Contacts;
			this.EditText = obj.EditText;
			this.EditChangeAllowed = obj.EditChangeAllowed;
			this.ChatLogEnabled = obj.ChatLogEnabled;
			this.OverrideFmtEnabled = obj.OverrideFmtEnabled;
			this.IsMobileChat = obj.IsMobileChat;
			
			return this;
		},
		
		Contacts: function (obj) {
			this.original = obj;
			
			this.Count = obj.Count;
			
			return this;
		},
		
		Contact: function (obj) {
			this.original = obj;
			this.Email = obj.Email;
			this.Network = obj.Network;
			this.Status = obj.Status;
			this.Name = obj.Name;
			this.PersonalMessage = obj.PersonalMessage;
			this.CurrentMedia = obj.CurrentMedia;
			this.Blocked = obj.Blocked;
			this.DisplayPicture = obj.DisplayPicture;
			this.IsFloating = obj.IsFloating;
			this.ProfileColor = obj.ProfileColor;
			
			return this;
		},
		
		Emoticons: function (obj) {
			this.original = obj;
			
			this.Count = obj.Count;
			
			return this;
		},
		
		Emoticon: function (obj) {
			this.original = obj;
			
			this.Shortcut = obj.Shortcut;
			this.Name = obj.Name;
			this.PictureFile = obj.PictureFile;
			
			return this;
		},
		
		PlusWnd: function (obj) {
			this.original = obj;
			
			this.Handle = obj.Handle;
			this.Visible = obj.Visible;
			this.WindowId = obj.WindowId;
			this.BaseColor = obj.BaseColor;
			
			return this;
		},
		
		Interop: function (obj) {
			this.original = obj;
			
			return this;
		},
		
		DataBloc: function (obj) {
			this.original = obj;
			
			this.Size = obj.Size;
			this.DataPtr = obj.DataPtr;
			
			return this;
		}
	};
	
	plusQuery.customObjects.Debug.prototype = {
		Trace: function (Text) {
			return this.original.Trace(Text);
		},
		ClearDebuggingWindow: function () {
			return this.original.ClearDebuggingWindow();
		}
	};
	
	plusQuery.customObjects.Messenger.prototype = {
		AutoSignin: function () {
			return this.original.AutoSignin();
		},
		Signout: function () {
			return this.original.Signout();
		},
		OpenChat: function (Contact) {
			return this.original.OpenChat(Contact);
		}
	};
	
	plusQuery.customObjects.MsgPlus.prototype = {
		DisplayToast: function (Title, Message, SoundFile, Callback,
			CallbackParam) {
				
			return this.original.DisplayToast(Title, Message, SoundFile, Callback,
				CallbackParam);
		},
		DisplayToastContact: function (Title, ContactName, Message,
			SoundFile, Callback, CallbackParam, Contact) {
				
			return this.original.DisplayToastContact(Title, ContactName, Message,
				SoundFile, Callback, CallbackParam, Contact);
		},
		CreateWnd: function (XmlFile, WindowId, Options) {
			return this.original.CreateWnd(XmlFile, WindowId, Options);
		},
		CreateChildWnd: function (Parent, XmlFile, WindowId, PosX,
			PosY, Visible) {
			
			return this.original.CreateChildWnd(Parent, XmlFile, WindowId, PosX,
				PosY, Visible);
		},
		AddTimer: function (TimerId, Elapse) {
			return this.original.AddTimer(TimerId, Elapse);
		},
		CancelTimer: function (TimerId) {
			return this.original.CancelTimer(TimerId);
		},
		PlaySound: function (SoundFile, MaxPlayTime) {
			return this.original.PlaySound(SoundFile, MaxPlayTime);
		},
		LockMessenger: function (Lock) {
			return this.original.LockMessenger(Lock);
		},
		LogEvent: function (Origin, Description, Icon) {
			return this.original.LogEvent(Origin, Description, Icon);
		},
		RemoveFormatCodes: function (Text) {
			return this.original.RemoveFormatCodes(Text);
		},
		DownloadFile: function (Url, OutFile, User, Password) {
			return this.original.DownloadFile(Url, OutFile, User, Password);
		},
		UploadFileFTP: function (SourceFile, Server, User, Password,
			Destination, PassiveMode, Port) {
			
			return this.original.UploadFileFTP(SourceFile, Server, User, Password,
				Destination, PassiveMode, Port);
		},
		LoadScriptFile: function (ScriptFile) {
			return this.original.LoadScriptFile(ScriptFile);
		},
		ExtractFromZIP: function (ZipFile, DestDirectory, FileNames,
			Password) {
			
			return this.original.ExtractFromZIP(ZipFile, DestDirectory, FileNames,
				Password);
		}
	};
	
	plusQuery.customObjects.ChatWnds.prototype = {
		Iterator: function () {
			return this.original.Iterator();
		}
	};
	
	plusQuery.customObjects.ChatWnd.prototype = {
		SendMessage: function (Message) {
			return this.original.SendMessage(Message);
		},
		SendFile: function (FilePath) {
			return this.original.SendFile(FilePath);
		},
		AddContact: function (Email) {
			return this.original.AddContact(Email);
		},
		DisplayInfoMessage: function (Message, Duration, ForceNow) {
			return this.original.DisplayInfoMessage(Message, Duration, ForceNow);
		},
		ResetInfoMessage: function () {
			return this.original.ResetInfoMessage();
		},
		EditText_SetCurSelStart: function () {
			return this.original.EditText_SetCurSelStart();
		},
		EditText_SetCurSelEnd: function () {
			return this.original.EditText_SetCurSelEnd();
		},
		EditText_SetCurSel: function (Start, End) {
			return this.original.EditText_SetCurSel(Start, End);
		},
		EditText_ReplaceSel: function (Text) {
			return this.original.EditText_ReplaceSel(Text);
		},
		HistoryText_GetCurSelStart: function () {
			return this.original.HistoryText_GetCurSelStart();
		},
		HistoryText_GetCurSelEnd: function () {
			return this.original.HistoryText_GetCurSelEnd();
		},
		HistoryText_GetTextRange: function (StartIdx, EndIdx, AddObjectCodes) {
			return this.original.HistoryText_GetTextRange(StartIdx, EndIdx,
				AddObjectCodes);
		}
	};
	
	plusQuery.customObjects.Contacts.prototype = {
		Iterator: function () {
			return this.original.Iterator();
		},
		GetContact: function (Email) {
			return this.original.GetContact(Email);
		}
	};
	
	plusQuery.customObjects.Contact.prototype = {
		// No functions here!
	};
	
	plusQuery.customObjects.Emoticons.prototype = {
		Iterator: function () {
			return this.original.Iterator();
		},
		GetEmoticon: function (Shortcut) {
			return original.GetEmoticon(Shortcut);
		}
	};
	
	plusQuery.customObjects.Emoticon.prototype = {
		// No functions here!
	};
	
	plusQuery.customObjects.PlusWnd.prototype = {
		// So...many...cbf.
	};
	
	plusQuery.customObjects.Interop.prototype = {
		Call: function (DllName, FunctionName, Param1, Param2,
			Param3, Param4, Param5, Param6, Param7, Param8, Param9,
			Param10, Param11, Param12) {
			
			return this.original.Call(DllName, FunctionName, Param1, Param2,
				Param3, Param4, Param5, Param6, Param7, Param8, Param9,
				Param10, Param11, Param12);
		},
		Call2: function (DllName, FunctionName, Param1, Param2,
			Param3, Param4, Param5, Param6, Param7, Param8, Param9,
			Param10, Param11, Param12) {
			
			return this.original.Call2(DllName, FunctionName, Param1, Param2,
				Param3, Param4, Param5, Param6, Param7, Param8, Param9,
				Param10, Param11, Param12);
		},
		FreeDll: function (DllName) {
			return this.original.FreeDll(DllName);
		},
		GetLastError: function () {
			return this.original.GetLastError();
		},
		Allocate: function (InitialSize) {
			return this.original.Allocate(InitialSize);
		},
		GetCallbackPtr: function (FunctionName) {
			return this.original.GetCallbackPtr(FunctionName);
		}
	};
	
	plusQuery.customObjects.DataBloc.prototype = {
		GetAt: function (Offset) {
			return this.original.GetAt(Offset);
		},
		SetAt: function (Offset, Byte) {
			return this.original.SetAt(Offset, Byte);
		},
		ReadString: function () {
			return this.original.ReadString();
		},
		WriteString: function (Offset, String, WriteUnicode) {
			return this.original.WriteString(Offset, String, WriteUnicode);
		},
		ReadBSTR: function () {
			return this.original.ReadBSTR();
		},
		WriteBSTR: function () {
			return this.original.WriteBSTR();
		},
		ReadWORD: function () {
			return this.original.ReadWORD();
		},
		WriteWORD: function () {
			return this.original.WriteWORD();
		},
		ReadDWORD: function () {
			return this.original.ReadDWORD();
		},
		WriteDWORD: function () {
			return this.original.WriteDWORD();
		},
		ReadInterfacePtr: function () {
			return this.original.ReadInterfacePtr();
		},
		WriteInterfacePtr: function () {
			return this.original.WriteInterfacePtr();
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

		// Trims text of whitespace using fastest /JScript/ regexp
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
	
	plusQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	return plusQuery;
	
}());

// Bind prototype written by Juriy Zaytsev
Function.prototype.bind = (function (_slice) {
	return function (context) {
		var fn = this,
			args = _slice.call(arguments, 1);

		if (args.length) {
			return function () {
				return arguments.length
					? fn.apply(context, args.concat(_slice.call(arguments)))
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
