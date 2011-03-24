/*  
 *  [[plusQuery.wrappers.*]]
 *
 *  This section defines a group of wrapper objects. Basically, these are
 *  all just objects with pointers to the properties of the original
 *  interfaces included in the Messenger Plus! API.
 *  This is an implementation to get around the fact that these "objects"
 *  have no prototype property, and so can't really be changed.
 *
 *  The property "this.original" is there to access the original interface.
 *  (proxy pattern) You /can/ create objects directly from $.wrappers,
 *  however you should use the plusQuery constructor so you inherit all of 
 *  plusQuery's functions, etc.
 *
 *  This "solves" the problem here: http://msghelp.net/showthread.php?tid=62818
 *
 *  The call to init (this.init.call(this, this.original)) on the interface objects
 *  is there so you can overload the "constructor" of the wrapper.
 *  
 *
 *
 *  Example usage: overload ChatWnd.SendMessage for a single $(ChatWnd) object
 *  to implement a message prefix
 *
 *  var chatWnd = $(chatWnd);
 *  chatWnd.SendMessage = function(Text) {
 *      this.original.SendMessage("[Ye] " + Text);
 *  }
 *
 *
 *  Example usage: overload ChatWnd.SendMessage for all $(ChatWnd) objects to
 *  implement a message prefix.
 *
 *  $.wrappers.ChatWnd.prototype.SendMessage = function(Text) {
 *      this.original.SendMessage("[Ye] " + Text);
 *  }
 *
 *  Example usage: overload the "constructor" of $(ChatWnd) to print something
 *
 *  $.wrappers.ChatWnd.prototype.init = function() {
 *      Debug.Trace("$(ChatWnd) object created");
 *  }
 *
 */
(function ($) {
 
plusQuery.interfaces = {
	Debug: function (object) {
		this.original = object;
		this.type = "Debug";
		
		this.DebuggingWindowVisible = this.original.DebuggingWindowVisible;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Messenger: function (object) {
		this.original = object;
		this.type = "Messenger";
		
		this.Version = this.original.Version;
		this.VersionBuild = this.original.VersionBuild;
		this.ContactListWndHandle = this.original.ContactListWndHandle;
		this.CurrentChats = this.original.CurrentChats;
		this.ReceiveFileDir = this.original.ReceiveFileDir;
		this.MyContacts = this.original.MyContacts;
		this.MyEmail = this.original.MyEmail;
		this.MyUserId = this.original.MyUserId;
		this.MyStatus = this.original.MyStatus;
		this.MyName = this.original.MyName;
		this.MyPersonalMessage = this.original.MyPersonalMessage;
		this.MyCurrentMedia = this.original.MyCurrentMedia;
		this.MyDisplayPicture = this.original.MyDisplayPicture;
		this.CustomEmoticons = this.original.CustomEmoticons;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	MsgPlus: function (object) {
		this.original = object;
		this.type = "MsgPlus";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	ChatWnds: function (object) {
		this.original = object;
		this.type = "ChatWnds";
		
		this.Count = this.original.Count;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	ChatWnd: function (object) {
		this.original = object;
		this.type = "ChatWnd";
	
		this.Handle = this.original.Handle;
		this.Contacts = this.original.Contacts;
		this.EditText = this.original.EditText;
		this.EditChangeAllowed = this.original.EditChangeAllowed;
		this.ChatLogEnabled = this.original.ChatLogEnabled;
		this.OverrideFmtEnabled = this.original.OverrideFmtEnabled;
		this.IsMobileChat = this.original.IsMobileChat;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Contacts: function (object) {
		this.original = object;
		this.type = "Contacts";
		
		this.Count = this.original.Count;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Contact: function (object) {
		this.original = object;
		this.type = "Contact";
		
		this.Email = this.original.Email;
		this.Network = this.original.Network;
		this.Status = this.original.Status;
		this.Name = this.original.Name;
		this.PersonalMessage = this.original.PersonalMessage;
		this.CurrentMedia = this.original.CurrentMedia;
		this.Blocked = this.original.Blocked;
		this.DisplayPicture = this.original.DisplayPicture;
		this.IsFloating = this.original.IsFloating;
		this.ProfileColor = this.original.ProfileColor;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Emoticons: function (object) {
		this.original = object;
		this.type = "Emoticons";
		
		this.Count = this.original.Count;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Emoticon: function (object) {
		this.original = object;
		this.type = "Emoticon";
		
		this.Shortcut = this.original.Shortcut;
		this.Name = this.original.Name;
		this.PictureFile = this.original.PictureFile;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	PlusWnd: function (object) {
		this.original = object;
		this.type = "PlusWnd";
		
		this.Handle = this.original.Handle;
		this.Visible = this.original.Visible;
		this.WindowId = this.original.WindowId;
		this.BaseColor = this.original.BaseColor;
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Interop: function (object) {
		this.original = object;
		this.type = "Interop";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	DataBloc: function (object) {
		this.original = object;
		this.type = "DataBloc";
		
		this.Size = this.original.Size;
		this.DataPtr = this.original.DataPtr;
		
		this.init.call(this, this.original);
		
		return this;
	}
};

/*  
 *  The following define the default methods of the interfaces, plus the "init"
 *  "constructor".
 */
$.wrappers.Debug.prototype = {
	init: function (object) {},
	
	Trace: function (Text) {
		return this.original.Trace(Text);
	},
	
	ClearDebuggingWindow: function () {
		return this.original.ClearDebuggingWindow();
	}	
};

$.wrappers.Messenger.prototype = {
	init: function (object) {},
	
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

$.wrappers.MsgPlus.prototype = {
	init: function (object) {},
	
	DisplayToast: function (Title, Message, SoundFile, Callback, CallbackParam) {
		return this.original.DisplayToast(Title, Message, SoundFile, Callback, CallbackParam);
	},
	
	DisplayToastContact: function (Title, ContactName, Message, SoundFile, Callback, CallbackParam, Contact) {
		return this.original.DisplayToastContact(Title, ContactName, Message, SoundFile, Callback, CallbackParam, Contact);
	},
	
	CreateWnd: function (XmlFile, WindowId, Options) {
		return this.original.CreateWnd(XmlFile, WindowId, Options);
	},
	
	CreateChildWnd: function (Parent, XmlFile, WindowId, PosX, PosY, Visible) {
		return this.original.CreateChildWnd(Parent, XmlFile, WindowId, PosX, PosY, Visible);
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
	
	UploadFileFTP: function (SourceFile, Server, User, Password, Destination, PassiveMode, Port) {	
		return this.original.UploadFileFTP(SourceFile, Server, User, Password, Destination, PassiveMode, Port);
	},
	
	LoadScriptFile: function (ScriptFile) {
		return this.original.LoadScriptFile(ScriptFile);
	},
	
	ExtractFromZIP: function (ZipFile, DestDirectory, FileNames, Password) {
		return this.original.ExtractFromZIP(ZipFile, DestDirectory, FileNames, Password);
	}
};

$.wrappers.ChatWnds.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.original.Iterator();
	}
};

$.wrappers.ChatWnd.prototype = {
	init: function (object) {},
	
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
		return this.original.HistoryText_GetTextRange(StartIdx, EndIdx, AddObjectCodes);
	}
};

$.wrappers.Contacts.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.original.Iterator();
	},
	
	GetContact: function (Email) {
		return this.original.GetContact(Email);
	}
};

$.wrappers.Contact.prototype = {
	init: function (object) {
		
	}
};

$.wrappers.Emoticons.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.original.Iterator();
	},
	
	GetEmoticon: function (Shortcut) {
		return original.GetEmoticon(Shortcut);
	}
};

$.wrappers.Emoticon.prototype = {
	init: function (object) {
		
	}
};

$.wrappers.PlusWnd.prototype = {
	init: function (object) {
		
	}
};

$.wrappers.Interop.prototype = {
	init: function (object) {},
	
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

$.wrappers.DataBloc.prototype = {
	init: function (object) {},
	
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
$.wrappers.Debug.prototype.extend({
	Enabled: true,
	
	Trace: function (Text) {
		if (this.Enabled) {
			this.original.Trace(String(Text));
		}
	}
});
/*
 *  [[plusQuery.interfaces.Messenger]]
 *  Adds 
 *  
 */
$.wrappers.Messenger = function (object) {
	this.original = object;
	this.type = "Messenger";
	
	this.Version = this.original.Version;
	this.VersionBuild = this.original.VersionBuild;
	this.ContactListWndHandle = this.original.ContactListWndHandle;	
	this.ReceiveFileDir = this.original.ReceiveFileDir;
	this.MyEmail = this.original.MyEmail;
	this.MyUserId = this.original.MyUserId;
	this.MyStatus = this.original.MyStatus;
	this.MyName = this.original.MyName;
	this.MyPersonalMessage = this.original.MyPersonalMessage;
	this.MyCurrentMedia = this.original.MyCurrentMedia;
	this.MyDisplayPicture = this.original.MyDisplayPicture;
	
	// Extend these three to become plusQuery objects
	this.CurrentChats = $(this.original.CurrentChats);
	this.MyContacts = $(this.original.MyContacts);
	this.CustomEmoticons = $(this.original.CustomEmoticons);
	
	return this;
};

// MsgPlus
$.wrappers.MsgPlus.prototype.extend({
	// The default DisplayToast function only allows a string as a callback.
	// Apparently the callback function has to be in global scope, too. :(
	// Silly Patchou. I cannot fathom why he would code it like this...
	DisplayToast: function (Title, Message, SoundFile, Callback,
		CallbackParam) {
		if (Callback.isFunction()) {
			return this.original.DisplayToast(Title, Message, (SoundFile || ""),
				"DisplayToastCallback", [Callback, CallbackParam]);
		}
		
		return this.original.DisplayToast(Title, Message, SoundFile, Callback,
			CallbackParam);
	},
	
	// Pretty much the same as above, but with the contact toast.
	DisplayToastContact: function (Title, ContactName, Message,
		SoundFile, Callback, CallbackParam, Contact) {
		
		if (Callback.isFunction()) {
			return this.original.DisplayToastContact(Title, ContactName, Message,
				(SoundFile || ""), "DisplayToastCallback", [Callback, CallbackParam], Contact);
		}
		
		return this.original.DisplayToastContact(Title, ContactName, Message,
			SoundFile, Callback, CallbackParam, Contact);
	}
});

// ChatWnds
$.wrappers.ChatWnds = function (object) {
	this.original = object;
	this.type = "ChatWnds";
	
	for (var e = new Enumerator(this.original), i = 0; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i;
};

// ChatWnd
$.wrappers.ChatWnd.prototype.extend({
	trigger: function (event, args) {
		if (event.object && event.object.Handle && event.object.Handle === this.Handle) {
			return event.callback.apply(this, args);
		}
	}
});

// Contacts
$.wrappers.Contacts = function(object) {
	this.original = object;
	this.type = "Contacts";
	
	this[0] = $.MyContact();
	for (var e = new Enumerator(this.original), i = 1; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i+1;
};

$.wrappers.Contacts.prototype.extend({
	GetContact: function (str) {
		if (str.toLowerCase() === Messenger.MyEmail.toLowerCase()) {
			return this[0];
		} else if (this.original.GetContact(str)) {
			return $(this.original.GetContact(str));
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
