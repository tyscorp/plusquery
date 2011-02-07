/*!
 * plusQuery JavaScript Library @VERSION
 * https://github.com/tyscorp/plusquery/
 *
 * Copyright (C) 2011 by Tyson Cleary
 * 
 * Licensed under the MIT license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * Date: @DATE
 */
 
//make sure that the $ we're dealing with is plusQuery
(function ($) {

	// Debug
	$.extend($.customObjects.Debug.prototype, {
		Enabled: true,
		
		Trace: function (Text) {
			if (this.Enabled) {
				this.original.Trace(Text);
			}
		}
	});
	
	// Messenger
	$.customObjects.Messenger = function (obj) {
		this.original = obj;

		this.Version = obj.Version;
		this.VersionBuild = obj.VersionBuild;
		this.ContactListWndHandle = obj.ContactListWndHandle;	
		this.ReceiveFileDir = obj.ReceiveFileDir;
		this.MyEmail = obj.MyEmail;
		this.MyUserId = obj.MyUserId;
		this.MyStatus = obj.MyStatus;
		this.MyName = obj.MyName;
		this.MyPersonalMessage = obj.MyPersonalMessage;
		this.MyCurrentMedia = obj.MyCurrentMedia;
		this.MyDisplayPicture = obj.MyDisplayPicture;
		
		// Extend these three to become plusQuery objects
		this.CurrentChats = $(obj.CurrentChats);
		this.MyContacts = $(obj.MyContacts);
		this.CustomEmoticons = $(obj.CustomEmoticons);
		
		return this;
	};
	
	// MsgPlus
	$.extend($.customObjects.MsgPlus.prototype, {
		// The default DisplayToast function only allows a string as a callback.
		// Apparently the callback function has to be in global scope, too. :(
		// Silly Patchou. I cannot fathom why he would code it like this...
		DisplayToast: function (Title, Message, SoundFile, Callback,
			CallbackParam) {
			if ($.isFunction(Callback)) {
				return this.original.DisplayToast(Title, Message, (SoundFile || ""),
					"DisplayToastCallback", [Callback, CallbackParam]);
			}
			
			return this.original.DisplayToast(Title, Message, SoundFile, Callback,
				CallbackParam);
		},
		
		// Pretty much the same as above, but with the contact toast.
		DisplayToastContact: function (Title, ContactName, Message,
			SoundFile, Callback, CallbackParam, Contact) {
			
			if ($.isFunction(Callback)) {
				return this.original.DisplayToastContact(Title, ContactName, Message,
					(SoundFile || ""), "DisplayToastCallback", [Callback, CallbackParam], Contact);
			}
			
			return this.original.DisplayToastContact(Title, ContactName, Message,
				SoundFile, Callback, CallbackParam, Contact);
		}
	});

	// ChatWnds
	$.customObjects.ChatWnds = function (obj) {
		this.original = obj;
		for (var e = new Enumerator(obj), i = 0; !e.atEnd(); e.moveNext(), i++) {
			this[i] = $(e.item());
		}
		this.length = i+1;
	};
	
	// ChatWnd
	$.extend($.customObjects.ChatWnd.prototype, {
		
	});

	// Contacts
	$.customObjects.Contacts = function(obj) {
		this.original = obj;
		this[0] = $({
			Email: Messenger.MyEmail,
			Network: 1,
			Status: Messenger.MyStatus,
			Name: Messenger.MyName,
			PersonalMessage: Messenger.MyPersonalMessage,
			CurrentMedia: Messenger.MyCurrentMedia,
			Blocked: false,
			DisplayPicture: Messenger.MyDisplayPicture,
			IsFloating: false,
			ProfileColor: 0
		});
		for (var e = new Enumerator(obj), i = 1; !e.atEnd(); e.moveNext(), i++) {
			this[i] = $(e.item());
		}
		this.length = i+1;
	};

	$.customObjects.Contacts.prototype.GetContact = function (str) {
		if (str.toLowerCase() === Messenger.MyEmail.toLowerCase()) {
			return this[0];
		}
		else if (this.original.GetContact(str)) {
			return this.original.GetContact(str);
		}
		else {
			for (var i = 0; i < this.length; i++) {
				if (this[i].Name === str) {
					return this[i]; // Only returns the first match
				}
			}
		}
		
		return null;
	};

})(plusQuery);

// Ugh, polluting my global object!
var DisplayToastCallback = function () {
	arguments[0][0].call(this, arguments[0][1]);
}

