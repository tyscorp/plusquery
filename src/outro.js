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
