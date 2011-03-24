/*  
 * plusQuery.interfaces.*
 *
 *  This section defines a group of customs objects. Basically, these are
 *  all just objects with pointers to the properties of the original
 *  interfaces included in the Messenger Plus! API.
 *  This is an implementation to get around the fact that these "objects"
 *  have no prototype property, and so can't really be changed.
 *
 *  The property "this.proxy" is there to access the original interface.
 *  (proxy pattern) You /can/ create objects directly from $.interfaces,
 *  however you should use the plusQuery constructor so you inherit all of 
 *  plusQuery's functions, etc.
 *
 *  This "solves" the problem here: http://msghelp.net/showthread.php?tid=62818
 *
 *  The call to init (this.init.call(this, this.proxy)) on the interface objects
 *  is there so you can overload the "constructor" of the interfaces.
 *  
 *
 *
 *  Example usage: overload ChatWnd.SendMessage for a single $(ChatWnd) object
 *  to implement a message prefix
 *
 *  var chatWnd = $(chatWnd);
 *  chatWnd.SendMessage = function(Text) {
 *      this.proxy.SendMessage("[Ye] " + Text);
 *  }
 *
 *
 *  Example usage: overload ChatWnd.SendMessage for all $(ChatWnd) objects to
 *  implement a message prefix.
 *
 *  $.interfaces.ChatWnd.prototype.SendMessage = function(Text) {
 *      this.proxy.SendMessage("[Ye] " + Text);
 *  }
 *
 *  Example usage: overload the "constructor" of $(ChatWnd) to print something
 *
 *  $.interfaces.ChatWnd.prototype.init = function() {
 *      Debug.Trace("$(ChatWnd) object created");
 *  }
 *
 */
(function ($) {
 
plusQuery.interfaces = {
	Debug: function (object) {
		this.proxy = object;
		this.type = "Debug";
		
		this.DebuggingWindowVisible = this.proxy.DebuggingWindowVisible;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Messenger: function (object) {
		this.proxy = object;
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
	
	MsgPlus: function (object) {
		this.proxy = object;
		this.type = "MsgPlus";
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	ChatWnds: function (object) {
		this.proxy = object;
		this.type = "ChatWnds";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	ChatWnd: function (object) {
		this.proxy = object;
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
	
	Contacts: function (object) {
		this.proxy = object;
		this.type = "Contacts";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Contact: function (object) {
		this.proxy = object;
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
	
	Emoticons: function (object) {
		this.proxy = object;
		this.type = "Emoticons";
		
		this.Count = this.proxy.Count;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Emoticon: function (object) {
		this.proxy = object;
		this.type = "Emoticon";
		
		this.Shortcut = this.proxy.Shortcut;
		this.Name = this.proxy.Name;
		this.PictureFile = this.proxy.PictureFile;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	PlusWnd: function (object) {
		this.proxy = object;
		this.type = "PlusWnd";
		
		this.Handle = this.proxy.Handle;
		this.Visible = this.proxy.Visible;
		this.WindowId = this.proxy.WindowId;
		this.BaseColor = this.proxy.BaseColor;
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	Interop: function (object) {
		this.proxy = object;
		this.type = "Interop";
		
		this.init.call(this, this.proxy);
		
		return this;
	},
	
	DataBloc: function (object) {
		this.proxy = object;
		this.type = "DataBloc";
		
		this.Size = this.proxy.Size;
		this.DataPtr = this.proxy.DataPtr;
		
		this.init.call(this, this.proxy);
		
		return this;
	}
};

/*  
 *  The following define the default methods of the interfaces, plus the "init"
 *  "constructor".
 */
$.interfaces.Debug.prototype = {
	init: function (object) {},
	
	Trace: function (Text) {
		return this.proxy.Trace(Text);
	},
	
	ClearDebuggingWindow: function () {
		return this.proxy.ClearDebuggingWindow();
	}	
};

$.interfaces.Messenger.prototype = {
	init: function (object) {},
	
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

$.interfaces.MsgPlus.prototype = {
	init: function (object) {},
	
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

$.interfaces.ChatWnds.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	}
};

$.interfaces.ChatWnd.prototype = {
	init: function (object) {},
	
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

$.interfaces.Contacts.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	},
	
	GetContact: function (Email) {
		return this.proxy.GetContact(Email);
	}
};

$.interfaces.Contact.prototype = {
	init: function (object) {
		
	}
};

$.interfaces.Emoticons.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.proxy.Iterator();
	},
	
	GetEmoticon: function (Shortcut) {
		return original.GetEmoticon(Shortcut);
	}
};

$.interfaces.Emoticon.prototype = {
	init: function (object) {
		
	}
};

$.interfaces.PlusWnd.prototype = {
	init: function (object) {
		
	}
};

$.interfaces.Interop.prototype = {
	init: function (object) {},
	
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

$.interfaces.DataBloc.prototype = {
	init: function (object) {},
	
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

/*
 *  These are "enhanced" interface objects. They add misc features to make
 *  scripting in Messenger Plus! more... Friendly.
 *
 */
 
/*
 *  [[plusQuery.interfaces.Debug]]
 *  Adds a switch to turn off debug messages to use in shipped code.
 *  
 *  [[plusQuery.interfaces.Debug.Enabled]]
 *  boolean to determine whether to trace or not.
 *
 *  [[plusQuery.interfaces.Debug.Trace]]
 */
$.interfaces.Debug.prototype.extend({
	Enabled: true,
	
	Trace: function (Text) {
		if (this.Enabled) {
			this.proxy.Trace(String(Text));
		}
	}
});
/*
 *  [[plusQuery.interfaces.Messenger]]
 *  Adds 
 *  
 */
$.interfaces.Messenger = function (object) {
	this.proxy = object;
	this.type = "Messenger";
	
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
	this.type = "ChatWnds";
	
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
	this.type = "Contacts";
	
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
