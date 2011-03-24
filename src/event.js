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
