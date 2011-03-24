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