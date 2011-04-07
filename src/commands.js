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
			if (arguments[1].isFunction()) {
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
			$.forEach(Command.CACHE, function (cmd) {
				if (cmd.commandName === command && cmd.external === external) {
					cmd.callback(chatWnd, contact, parameters, message);
				}
			});
		}
	});
	
	$.addEventListener("ChatWndReceiveMessage", function (chatWnd, origin, message, msgKind) {
		if (msgKind === 1)
		{
			$.triggerCommand($(chatWnd), $(chatWnd.Contacts).GetContact(origin), message.split(' ')[0].toUpperCase(), message.split(' ').slice(1).join(' '), message, true);
		}
	});
	
	$.addEventListener("ChatWndSendMessage", function (chatWnd, message) {
		var tmp = $.triggerCommand($(chatWnd), $(chatWnd).Contacts.GetContact(Messenger.MyEmail), message.split(' ')[0].toUpperCase(), message.split(' ').slice(1).join(' '), message, false);
		return (tmp === undefined ? message : tmp);
	});
	
	$.addEventListener("OnGetScriptCommands", function (commands) {
		Command.CACHE.forEach(function (command) {
			
		});
	});

})(plusQuery);
