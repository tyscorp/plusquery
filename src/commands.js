(function ($) {
	
	var Command = function (commandName, external, callback) {
		this.commandName = commandName.toUpperCase();
		this.external = (external != null ? external : (commandName.substr(0, 1) === "/" ? false : true) );
		this.callback = callback;
		this.guid = $.guid++;
	};
	
	Command.CACHE = {};
	
	$.extend({
		addCommand: function() {
			var commandNames, external, callback;
			if ($.isFunction(arguments[1])) {
				commandNames = arguments[0];
				callback = arguments[1];
			} else {
				commandNames = arguments[0];
				external = arguments[1];
				callback = arguments[2];
			}
			
			commandNames.split(" ").forEach(function (commandName) {
				var cmd = new Command(commandName, external, callback);
				Command.CACHE[cmd.guid] = cmd;
			});
			
			return this;
		},
		
		removeCommand: function(command) {
		//	Command.CACHE[this.guid]
		},
		
		triggerCommand: function(chatWnd, contact, command, parameters, message, external) {
			var ret = message;
			
			$.forEach(Command.CACHE, function (cmd) {
				if (cmd.commandName.toUpperCase() === command.toUpperCase() && cmd.external === external) {
					ret = cmd.callback(chatWnd, contact, parameters, message);
				}
			});
			
			return ret;
		}
	});
	
	$.addListener("ChatWndReceiveMessage", function (chatWnd, origin, message, msgKind) {
		if (msgKind === 1)
		{
			var match = /^([^ \n\r\v\xA0]*)[ \n\r\v\xA0]?([\s\S]*)$/.exec(message);
			
			if (match) {
				var command = match[1];
				var parameters = match[2];
				
				$.triggerCommand($(chatWnd), $(chatWnd.Contacts).GetContact(origin), command, parameters, message, true);
			}
		}
	});
	
	$.addListener("ChatWndSendMessage", function (chatWnd, message) {
		var match = /^\/([^ \n\r\v\xA0\/][^ \n\r\v\xA0]*)(?:[ \n\r\v\xA0]([\s\S]*))?$/.exec(message);
		
		if (match) {
			var command = "/" + match[1];
			var parameters = match[2];
		 
			var tmp = $.triggerCommand($(chatWnd), $.MyContact, command, parameters, message, false);
			return (tmp != null ? tmp : message);
		}
	});
	
	$.addListener("OnGetScriptCommands", function (commands) {
		//Command.CACHE.forEach(function (command) {
			
		//});
	});

})(plusQuery);
