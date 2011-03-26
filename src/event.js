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
			
			if (args[Event.RETURNS[eventName]]) {
				return args[Event.RETURNS[eventName]];
			}
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

OnEvent_Signin = function () {
	var args = plusQuery.plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "Signin", args);
};

OnEvent_SigninReady = function () {
	var args = plusQuery.plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "SigninReady", args);
};

OnEvent_Signout = function () {
	var args = plusQuery.plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "Signout", args);
};

OnEvent_MyStatusChange = function () {
	var args = plusQuery.plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyStatusChange", args);
};

OnEvent_MyNameChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyNameChange", args);
};

OnEvent_MyPsmChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyPsmChange", args);
};

OnEvent_MyMediaChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery.MyContact(), "MyMediaChange", args);
};

OnEvent_ContactSignin = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactSignin", args);
};

OnEvent_ContactSignout = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactSignout", args);
};

OnEvent_ContactStatusChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactStatusChange");
};

OnEvent_ContactNameChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactNameChange");
};

OnEvent_ContactPsmChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactPsmChange", args);
};

OnEvent_ContactMediaChange = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactMediaChange");
};

OnEvent_ContactBlocked = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactBlocked", args);
};

OnEvent_ContactUnblocked = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(Messenger.MyContacts.GetContact(args[0])), "ContactUnblocked", args);
};

OnEvent_ContactListWndCreated = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "ContactListWndCreated", args);
};

OnEvent_ContactListWndDestroyed = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "ContactListWndDestroyed", args);
};

OnEvent_ChatWndCreated = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndCreated", args);
};

OnEvent_ChatWndDestroyed = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndDestroyed", args);
};

OnEvent_ChatWndContactAdded = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndContactAdded", args);
};

OnEvent_ChatWndContactRemoved = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndContactRemoved", args);
};

OnEvent_ChatWndReceiveMessage = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndReceiveMessage", args);
};

OnEvent_ChatWndSendMessage = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndSendMessage", args);
};

/*OnEvent_ChatWndEditKeyDown = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[0]), "ChatWndEditKeyDown", args);
};*/

OnEvent_Initialize = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "Initialize", args);
};

OnEvent_Uninitialize = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "Uninitialize", args);
};

OnEvent_MessengerLocked = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "MessengerLocked", args);
};

OnEvent_MessengerUnlocked = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "MessengerUnlocked", args);
};

OnEvent_Timer = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "Timer", args);
};

OnEvent_MenuClicked = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery(args[2]), "MenuClicked", args);
};

OnEvent_EnterPersonalizedStatus = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "EnterPersonalizedStatus", args);
};

OnEvent_LeavePersonalizedStatus = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "LeavePersonalizedStatus", args);
};

OnEvent_DownloadFileComplete = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "DownloadFileComplete", args);
};

OnEvent_UploadFileComplete = function () {
	var args = plusQuery.$A(arguments);
	return plusQuery.trigger(plusQuery, "UploadFileComplete", args);
};

OnGetScriptMenu = function () {
	var args = plusQuery.$A(arguments);
	args.push({});
	return plusQuery.trigger(plusQuery, "OnGetScriptMenu", args);
};

OnGetScriptCommands = function () {
	var args = plusQuery.$A(arguments);
	args.push([]);
	return plusQuery.trigger(plusQuery, "OnGetScriptCommands", args);
};
