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
 
plusQuery.wrappers = {
	Debug: function (object) {
		this.original = object;
		this.type = "Debug";

		this.init.call(this, this.original);
		
		return this;
	},
	
	Messenger: function (object) {
		this.original = object;
		this.type = "Messenger";
		
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

		this.init.call(this, this.original);
		
		return this;
	},
	
	ChatWnd: function (object) {
		this.original = object;
		this.type = "ChatWnd";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Contacts: function (object) {
		this.original = object;
		this.type = "Contacts";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Contact: function (object) {
		this.original = object;
		this.type = "Contact";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Emoticons: function (object) {
		this.original = object;
		this.type = "Emoticons";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	Emoticon: function (object) {
		this.original = object;
		this.type = "Emoticon";
		
		this.init.call(this, this.original);
		
		return this;
	},
	
	PlusWnd: function (object) {
		this.original = object;
		this.type = "PlusWnd";
		
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
	},
	
	DebuggingWindowVisible: function (visibility) {
		if (typeof visibility !== "undefined") {
			this.original.DebuggingWindowVisible = visibility;
		}
		
		return visibility;
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
	},
	
	Version: function () {
		return this.original.Version;
	},
	
	VersionBuild: function () {
		return this.original.VersionBuild;
	},
	
	ContactListWndHandle: function () {
		return this.original.ContactListWndHandle;
	},
	
	CurrentChats: function () {
		return this.original.CurrentChats;
	},
	
	ReceiveFileDir: function () {
		return this.original.ReceiveFileDir;
	},
	
	MyContacts: function () {
		return this.original.MyContacts;
	},
	
	MyEmail: function () {
		return this.original.MyEmail;
	},
	
	MyUserId: function () {
		return this.original.MyUserId;
	},
	
	MyStatus: function (newStatus) {
		if (typeof newStatus !== "undefined") {
			this.original.MyStatus = newStatus;
		}
		
		return this.original.MyStatus;
	},
	
	MyName: function (newName) {
		if (typeof newName !== "undefined") {
			this.original.MyName = newName;
		}
		
		return this.original.MyName;
	},
	
	MyPersonalMessage: function (newPersonalMessage) {
		if (typeof newPersonalMessage !== "undefined") {
			this.original.MyPersonalMessage = newPersonalMessage;
		}
		
		return this.original.MyPersonalMessage;
	},
	
	MyCurrentMedia: function (newMedia) {
		if (typeof newMedia !== "undefined") {
			/*
			 *  The following was written by -dt-
			 *  Taken from http://version.thedt.net/scripts/plusscripts/musicNowplaying/main.js
			 */
			var media = Interop.Allocate(512);
				media.WriteString(0, "\\0" + newMedia.type + "\\0" + newMedia.enabled + "\\0" + newMedia.format +"\\0" + newMedia.title +"\\0" + newMedia.artist + "\\0" + newMedia.album + "\\0" + newMedia.contentID + "\\0");
			
			//write our copyDataStruct Structure
			var copyDataStruct = Interop.Allocate(12);
			copyDataStruct.WriteDWORD(0, 0x547); //dwData
			copyDataStruct.WriteDWORD(4, media.Size); //cbData
			copyDataStruct.WriteDWORD(8, media.DataPtr);  //lpData
			
			
			//Send it to all open messengers
			var hMSGRUI = 0;
			do {
				hMSGRUI = Interop.Call("User32", "FindWindowExW", 0, hMSGRUI, "MsnMsgrUIManager", 0);
				if (hMSGRUI > 0) {
					Interop.Call("User32", "SendMessageW", hMSGRUI, 0x4A, 0, copyDataStruct);	
				}
			} while(hMSGRUI !== 0);
			
			media = null;
			copyDataStruct = null;
		}
		
		return this.original.MyCurrentMedia;
	},
	
	MyDisplayPicture: function (newDisplayPicture) {
		if (typeof newDisplayPicture !== "undefined") {
			this.original.MyDisplayPicture = newDisplayPicture;
		}
		
		return this.original.MyDisplayPicture;
	},
	
	CustomEmoticons: function () {
		return this.original.CustomEmoticons;
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
	},
	
	Count: function () {
		return this.original.Count;
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
	},
	
	Handle: function () {
		return this.original.Handle;
	},
	
	Contacts: function () {
		return this.original.Contacts;
	},
	
	EditText: function (newEditText) {
		if (typeof newEditText !== "undefined") {
			this.original.EditText = newEditText;
		}
		
		return this.original.EditText;
	},
	
	EditChangeAllowed: function () {
		return this.original.EditChangeAllowed;
	},
	
	ChatLogEnabled: function (newChatLogEnabled) {
		if (typeof newChatLogEnabled !== "undefined") {
			this.original.ChatLogEnabled = newChatLogEnabled;
		}
		
		return this.original.ChatLogEnabled;
	},
	
	OverrideFmtEnabled: function (newOverrideFmtEnabled) {
		if (typeof newOverrideFmtEnabled !== "undefined") {
			this.original.OverrideFmtEnabled = newOverrideFmtEnabled;
		}
		
		return this.original.OverrideFmtEnabled;
	},
	
	IsMobileChat: function () {
		return this.original.IsMobileChat;
	}
};

$.wrappers.Contacts.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.original.Iterator();
	},
	
	GetContact: function (Email) {
		return this.original.GetContact(Email);
	},
	
	Count: function () {
		return this.original.Count;
	}
};

$.wrappers.Contact.prototype = {
	init: function (object) {
		
	},
	
	Email: function () {
		return this.original.Email;
	},
	
	Network: function () {
		return this.original.Network;
	},
	
	Status: function () {
		return this.original.Status;
	},
	
	Name: function () {
		return this.original.Name;
	},
	
	PersonalMessage: function () {
		return this.original.PersonalMessage;
	},
	
	CurrentMedia: function () {
		return this.original.CurrentMedia;
	},
	
	Blocked: function (newBlocked) {
		if (typeof newBlocked !== "undefined") {
			this.original.Blocked = newBlocked;
		}
		
		return this.original.Blocked;
	},
	
	DisplayPicture: function () {
		return this.original.DisplayPicture;
	},
	
	IsFloating: function (newIsFloating) {
		if (typeof newIsFloating !== "undefined") {
			this.original.IsFloating = newIsFloating;
		}
		
		return this.original.IsFloating;
	},
	
	ProfileColor: function (newProfileColor) {
		if (typeof newProfileColor !== "undefined") {
			this.original.ProfileColor = newProfileColor;
		}
		
		return this.original.ProfileColor;
	}
};

$.wrappers.Emoticons.prototype = {
	init: function (object) {},
	
	Iterator: function () {
		return this.original.Iterator();
	},
	
	GetEmoticon: function (Shortcut) {
		return original.GetEmoticon(Shortcut);
	},
	
	Count: function () {
		return this.original.Count;
	}
};

$.wrappers.Emoticon.prototype = {
	init: function (object) {
		
	},
	
	Shortcut: function () {
		return this.original.Shortcut;
	},
	
	Name: function () {
		return this.original.Name;
	},
	
	PictureFile: function () {
		return this.original.PictureFile;
	}
};

//really can't be bothered...
$.wrappers.PlusWnd.prototype = {
	init: function (object) {
		
	},
	
	//[...]
	
	Handle: function () {
		return this.original.Handle;
	},
	
	Visible: function (newVisible) {
		if (typeof newVisible !== "undefined") {
			this.original.Visible = newVisible;
		}
		
		return this.original.Visible;
	},
	
	WindowId: function () {
		return this.original.WindowId;
	},

	BaseColor: function (newBaseColor) {
		this.original.BaseColor = newBaseColor;
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
	
	ReadString: function (Offset, ReadUnicode, Size) {
		return this.original.ReadString(Offset, ReadUnicode, Size);
	},
	
	WriteString: function (Offset, Str, WriteUnicode) {
		return this.original.WriteString(Offset, Str, WriteUnicode);
	},
	
	ReadBSTR: function (Offset) {
		return this.original.ReadBSTR(Offset);
	},
	
	WriteBSTR: function (Offset, Str) {
		return this.original.WriteBSTR(Offset, Str);
	},
	
	ReadWORD: function (Offset) {
		return this.original.ReadWORD(Offset);
	},
	
	WriteWORD: function (Offset, Data) {
		return this.original.WriteWORD(Offset, Data);
	},
	
	ReadDWORD: function (Offset) {
		return this.original.ReadDWORD(Offset);
	},
	
	WriteDWORD: function (Offset, Data) {
		return this.original.WriteDWORD(Offset, Data);
	},
	
	ReadInterfacePtr: function (Offset) {
		return this.original.ReadInterfacePtr(Offset);
	},
	
	WriteInterfacePtr: function (Offset, Obj) {
		return this.original.WriteInterfacePtr(Offset, Obj);
	},
	
	Size: function (newSize) {
		if (typeof newSize !== "undefined") {
			this.original.Size = newSize;
		}
		
		return this.original.Size;
	},
	
	DataPtr: function () {
		return this.original.DataPtr;
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
$.extend($.wrappers.Debug.prototype, {
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
$.extend($.wrappers.Messenger.prototype, {
	CurrentChats: function () {
		return $(this.original.CurrentChats);
	},
	
	MyContacts: function () {
		return $(this.original.MyContacts);
	},
	
	CustomEmoticons: function () {
		return $(this.original.CustomEmoticons);
	}
});

// MsgPlus
$.extend($.wrappers.MsgPlus.prototype, {
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
$.wrappers.ChatWnds.prototype.init = function (object) {
	for (var e = new Enumerator(original), i = 0; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i;
};

// ChatWnd
$.extend($.wrappers.ChatWnd.prototype, {
	trigger: function (event, args) {
		if (event.object && event.object.Handle && event.object.Handle === this.Handle) {
			return event.callback.apply(this, args);
		}
	}
});

// Contacts
$.wrappers.Contacts.prototype.init = function(object) {
	this[0] = $.MyContact();
	for (var e = new Enumerator(this.original), i = 1; !e.atEnd(); e.moveNext(), i++) {
		this[i] = $(e.item());
	}
	this.length = i + 1;
};

$.extend($.wrappers.Contacts.prototype, {
	GetContact: function (str) {
		if (str.toLowerCase() === Messenger.MyEmail.toLowerCase()) {
			return this[0];
		} else if (this.original.GetContact(str)) {
			return $(this.original.GetContact(str));
		} else {
			for (var i = 0; i < this.length; i++) {
				if (this[i].Name() === str) {
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
