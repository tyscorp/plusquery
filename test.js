(function ($) {

	$.addEventListener("ContactSignin ContactSignout ContactStatusChange ContactNameChange ContactPsmChange ContactMediaChange ContactBlocked ContactUnblocked", function () {
		$(Messenger.CurrentChats).toArray().forEach(function (chatWnd) {
			chatWnd.ResetInfoMessage();
		});
	});
	
	$.addEventListener("ChatWndReceiveMessage", function (chatWnd, origin, message, msgKind) {
		if (message.match(/^!eval/i)) {
			var list = [];
		
			function print(str) {
				list.push(str);
			}

			//try {
				new Function(RegExp.$1);
			//} catch(e) {
			//	print(e);
			//}
			
			if (list.length > 0) {
				chatWnd.SendMessage("[c=1][EVAL]\n" + list.join("\n") + "[/c]");
			}
		}
	});
	
})(plusQuery);