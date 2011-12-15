// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
(function ($) {

	var isArray = function (arg) {  
		return Object.prototype.toString.call(arg) == '[object Array]';  
	};

	function EventEmitter() { }
	$.EventEmitter = EventEmitter;

	// By default EventEmitters will print a warning if more than
	// 10 listeners are added to it. This is a useful default which
	// helps finding memory leaks.
	//
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	var defaultMaxListeners = 10;
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!this._events) this._events = {};
	  this._maxListeners = n;
	};


	EventEmitter.prototype.emit = function() {
	  var type = arguments[0];
	  
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
		if (!this._events || !this._events.error ||
			(isArray(this._events.error) && !this._events.error.length))
		{
		  if (arguments[1] instanceof Error) {
			throw arguments[1]; // Unhandled 'error' event
		  } else {
			throw new Error("Uncaught, unspecified 'error' event.");
		  }
		  return false;
		}
	  }

	  if (!this._events) return false;
	  
	  var handler = this._events[type];
	  if (!handler) return false;

	  if (typeof handler == 'function') {
		switch (arguments.length) {
		  // fast cases
		  case 1:
			handler.call(this);
			break;
		  case 2:
			handler.call(this, arguments[1]);
			break;
		  case 3:
			handler.call(this, arguments[1], arguments[2]);
			break;
		  // slower
		  default:
			var l = arguments.length;
			var args = new Array(l - 1);
			for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
			handler.apply(this, args);
		}
		return true;

	  } else if (isArray(handler)) {
		var l = arguments.length;
		var args = new Array(l - 1);
		for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

		var listeners = handler.slice();
		for (var i = 0, l = listeners.length; i < l; i++) {
		  listeners[i].apply(this, args);
		}
		return true;

	  } else {
		return false;
	  }
	};

	// EventEmitter is defined in src/node_events.cc
	// EventEmitter.prototype.emit() is also defined there.
	EventEmitter.prototype.addListener = function(type, listener) {
	  if ('function' !== typeof listener) {
		throw new Error('addListener only takes instances of Function');
	  }

	  if (!this._events) this._events = {};
	
	  // To avoid recursion in the case that type == "newListeners"! Before
	  // adding it to the listeners, first emit "newListeners".
	  this.emit('newListener', type, listener);

	  if (!this._events[type]) {
		// Optimize the case of one listener. Don't need the extra array object.
		this._events[type] = listener;
	  } else if (isArray(this._events[type])) {

		// If we've already got an array, just append.
		this._events[type].push(listener);

		// Check for listener leak
		if (!this._events[type].warned) {
		  var m;
		  if (this._maxListeners !== undefined) {
			m = this._maxListeners;
		  } else {
			m = defaultMaxListeners;
		  }

		  if (m && m > 0 && this._events[type].length > m) {
			this._events[type].warned = true;
			Debug.Trace('(node) warning: possible EventEmitter memory ' +
						  'leak detected. ' + this._events[type].length + ' listeners added. ' +
						  'Use emitter.setMaxListeners() to increase limit.');
		  }
		}
	  } else {
		// Adding the second element, need to change to array.
		this._events[type] = [this._events[type], listener];
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if ('function' !== typeof listener) {
		throw new Error('.once only takes instances of Function');
	  }

	  var self = this;
	  function g() {
		self.removeListener(type, g);
		listener.apply(this, arguments);
	  };

	  g.listener = listener;
	  self.on(type, g);

	  return this;
	};

	EventEmitter.prototype.removeListener = function(type, listener) {
	  if ('function' !== typeof listener) {
		throw new Error('removeListener only takes instances of Function');
	  }

	  // does not use listeners(), so no side effect of creating _events[type]
	  if (!this._events || !this._events[type]) return this;

	  var list = this._events[type];

	  if (isArray(list)) {
		var position = -1;
		for (var i = 0, length = list.length; i < length; i++) {
		  if (list[i] === listener ||
			  (list[i].listener && list[i].listener === listener))
		  {
			position = i;
			break;
		  }
		}

		if (position < 0) return this;
		list.splice(position, 1);
		if (list.length == 0)
		  delete this._events[type];
	  } else if (list === listener ||
				 (list.listener && list.listener === listener))
	  {
		delete this._events[type];
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  if (arguments.length === 0) {
		this._events = {};
		return this;
	  }

	  // does not use listeners(), so no side effect of creating _events[type]
	  if (type && this._events && this._events[type]) this._events[type] = null;
	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  if (!this._events) this._events = {};
	  if (!this._events[type]) this._events[type] = [];
	  if (!isArray(this._events[type])) {
		this._events[type] = [this._events[type]];
	  }
	  return this._events[type];
	};
	
	/* Hack to make binding to certain plusQuery objects work */
	EventEmitter.create = function (object) {
		var emitter = new EventEmitter();
		
		emitter.realAddListener = emitter.addListener;
		
		emitter.addListener = emitter.on = function (type, callback) {
			switch (type) {
				case 'ContactSignin':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactSignin', function (email) {
							if (email === object.Email) {
								emitter.emit('ContactSignin', email);
							}
						});
					}
					break;
				case 'ContactSignout':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactSignout', function (email) {
							if (email === object.Email) {
								emitter.emit('ContactSignout', email);
							}
						});
					};
					break;
				case 'ContactStatusChange':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactStatusChange', function (email, newStatus) {
							if (email === object.Email) {
								emitter.emit('ContactStatusChange', email, newStatus);
							}
						});
					}
					break;
				case 'ContactNameChange':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactNameChange', function (email, newName) {
							if (email === object.Email) {
								emitter.emit('ContactNameChange', email, newName);
							}
						});
					}
					break;
				case 'ContactPsmChange':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactPsmChange', function (email, newPsm) {
							if (email === object.Email) {
								emitter.emit('ContactPsmChange', email, newPsm);
							}
						});
					}
					break;
				case 'ContactMediaChange':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactMediaChange', function (email, newMedia) {
							if (email === object.Email) {
								emitter.emit('ContactMediaChange', email, newMedia);
							}
						});
					}
					break;
				case 'ContactBlocked':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactBlocked', function (email) {
							if (email === object.Email) {
								emitter.emit('ContactBlocked', email);
							}
						});
					}
					break;
				case 'ContactUnblocked':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactUnblocked', function (email) {
							if (email === object.Email) {
								emitter.emit('ContactUnblocked', email);
							}
						});
					}
					break;
				case 'ContactBlocked':
					if ($.typeofNative(object) === 'Contact') {
						$.addListener('ContactBlocked', function (email) {
							if (email === object.Email) {
								emitter.emit('ContactBlocked', email);
							}
						});
					}
					break;
				case 'ChatWndCreated':
					if ($.typeofNative(object) === 'ChatWnd') {
						$.addListener('ChatWndCreated', function (chatWnd) {
							if (chatWnd.Handle === object.Handle) {
								emitter.emit('ChatWndSendMessage', chatWnd);
							}
						});
					}
					break;
				case 'ChatWndDestroyed':
					if ($.typeofNative(object) === 'ChatWnd') {
						$.addListener('ChatWndDestroyed', function (chatWnd) {
							if (chatWnd.Handle === object.Handle) {
								emitter.emit('ChatWndDestroyed', chatWnd);
							}
						});
					}
					break;
				case 'ChatWndContactAdded':
					if ($.typeofNative(object) === 'ChatWnd' || $.typeofNative(object) === 'Contact') {
						$.addListener('ChatWndContactAdded', function (chatWnd, email) {
							if (chatWnd.Handle === object.Handle || email === object.Email) {
								emitter.emit('ChatWndDestroyed', chatWnd);
							}
						});
					}
					break;
				case 'ChatWndContactRemoved':
					if ($.typeofNative(object) === 'ChatWnd' || $.typeofNative(object) === 'Contact') {
						$.addListener('ChatWndContactRemoved', function (chatWnd, email) {
							if (chatWnd.Handle === object.Handle || email === object.Email) {
								emitter.emit('ChatWndContactRemoved', chatWnd);
							}
						});
					}
					break;
				case 'ChatWndReceiveMessage':
					if ($.typeofNative(object) === 'ChatWnd') {
						$.addListener('ChatWndReceiveMessage', function (chatWnd, origin, message, messageKind) {
							if (chatWnd.Handle === object.Handle) {
								emitter.emit('ChatWndReceiveMessage', chatWnd, origin, message, messageKind);
							}
						});
					}
					break;
				case 'ChatWndSendMessage':
					if ($.typeofNative(object) === 'ChatWnd') {
						$.addListener('ChatWndSendMessage', function (chatWnd, message) {
							if (chatWnd.Handle === object.Handle) {
								emitter.emit('ChatWndSendMessage', chatWnd, message);
							}
						});
					}
					break;
				case 'ChatWndEditKeyDown':
					if ($.typeofNative(object) === 'ChatWnd') {
						$.addListener('ChatWndEditKeyDown', function (chatWnd, keyCode, ctrlKeyDown, shiftKeyDown) {
							if (chatWnd.Handle === object.Handle) {
								emitter.emit('ChatWndEditKeyDown', chatWnd, keyCode, ctrlKeyDown, shiftKeyDown);
							}
						});
					}
					break;
			}
			emitter.realAddListener(type, callback);
		}
		
		return emitter;
	};
	
	$.extend(EventEmitter.prototype);
	
	OnEvent_Signin = function () {
		$.emit("Signin", arguments[0]);
	};

	OnEvent_SigninReady = function () {
		$.emit("SigninReady", arguments[0]);
	};

	OnEvent_Signout = function () {
		$.emit("Signout", arguments[0]);
	};

	OnEvent_MyStatusChange = function () {
		$.emit("MyStatusChange", arguments[0]);
	};

	OnEvent_MyNameChange = function () {
	
		$.emit("MyNameChange", arguments[0]);
	};

	OnEvent_MyPsmChange = function () {
		$.emit("MyPsmChange", arguments[0]);
	};

	OnEvent_MyMediaChange = function () {
		$.emit("MyMediaChange", arguments[0]);
	};

	OnEvent_ContactSignin = function () {
		$.emit("ContactSignin", arguments[0]);
	};

	OnEvent_ContactSignout = function () {
		$.emit("ContactSignout", arguments[0]);
	};

	OnEvent_ContactStatusChange = function () {
		$.emit("ContactStatusChange", arguments[0], arguments[1]);
	};

	OnEvent_ContactNameChange = function () {
		$.emit("ContactNameChange", arguments[0], arguments[1]);
	};

	OnEvent_ContactPsmChange = function () {
		$.emit("ContactPsmChange", arguments[0], arguments[1]);
	};

	OnEvent_ContactMediaChange = function () {
		$.emit("ContactMediaChange", arguments[0], arguments[1]);
	};

	OnEvent_ContactBlocked = function () {
		$.emit("ContactBlocked", arguments[0]);
	};

	OnEvent_ContactUnblocked = function () {
		$.emit("ContactUnblocked", arguments[0]);
	};

	OnEvent_ContactListWndCreated = function () {
		$.emit("ContactListWndCreated");
	};

	OnEvent_ContactListWndDestroyed = function () {
		$.emit("ContactListWndDestroyed");
	};

	OnEvent_ChatWndCreated = function () {
		$.emit("ChatWndCreated", arguments[0]);
	};

	OnEvent_ChatWndDestroyed = function () {
		$.emit("ChatWndDestroyed", arguments[0]);
	};

	OnEvent_ChatWndContactAdded = function () {
		$.emit("ChatWndContactAdded", arguments[0], arguments[1]);
	};

	OnEvent_ChatWndContactRemoved = function () {
		$.emit("ChatWndContactRemoved", arguments[0], arguments[1]);
	};

	OnEvent_ChatWndReceiveMessage = function () {
		$.emit("ChatWndReceiveMessage", arguments[0], arguments[1], arguments[2], arguments[3]);
	};

	OnEvent_ChatWndSendMessage = function () {
		$.emit("ChatWndSendMessage", arguments[0], arguments[1]);
	};

	/*OnEvent_ChatWndEditKeyDown = function () {
		$.emit("ChatWndEditKeyDown", arguments[0], arguments[1], arguments[2], arguments[3]);
	};*/

	OnEvent_Initialize = function () {
		$.emit("Initialize", arguments[0]);
	};

	OnEvent_Uninitialize = function () {
		$.emit("Uninitialize", arguments[0]);
	};

	OnEvent_MessengerLocked = function () {
		$.emit("MessengerLocked");
	};

	OnEvent_MessengerUnlocked = function () {
		$.emit("MessengerUnlocked");
	};

	OnEvent_Timer = function () {
		$.emit("Timer", arguments[0]);
	};

	OnEvent_MenuClicked = function () {
		$.emit("MenuClicked", arguments[0], arguments[1], arguments[2]);
	};

	OnEvent_EnterPersonalizedStatus = function () {
		$.emit("EnterPersonalizedStatus", arguments[0], arguments[1], arguments[2], arguments[3]);
	};

	OnEvent_LeavePersonalizedStatus = function () {
		$.emit("LeavePersonalizedStatus");
	};

	OnEvent_DownloadFileComplete = function () {
		$.emit("DownloadFileComplete", arguments[0], arguments[1], arguments[2]);
	};

	OnEvent_UploadFileComplete = function () {
		$.emit("UploadFileComplete", arguments[0], arguments[1], arguments[2], arguments[3]);
	};

	OnGetScriptMenu = function () {
		$.emit("OnGetScriptMenu", arguments[0]);
		
		return $.ScriptMenu;
	};

	OnGetScriptCommands = function () {
		$.emit("OnGetScriptCommands", arguments[0]);
		
		return $.ScriptCommands;
	};
	
})(plusQuery);
