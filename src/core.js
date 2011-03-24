/*
 *
 */
plusQuery = (function () {

// Define a local copy of plusQuery
var plusQuery = function (object) {
	return new plusQuery.fn.init(object);
};

// Static functions
plusQuery.extend({
	noop: function () {},

	// A GUID counter for objects
	guid: 1,

	// Current time in MS
	now: function () {
		return (new Date()).getTime();
	},
	
	MyContact: function () {
		return $({
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
	},
	
	$A: function (iterable) {
		if (!iterable) {
			return [];
		}

		if(iterable.toArray) {
			return iterable.toArray();
		}

		var length = iterable.length || 0;
		var results = new Array(length);

		while (length--) {
			results[length] = iterable[length];
		}

		return results;
	}
});

plusQuery.fn = plusQuery.prototype = {
	constructor: plusQuery,
	// This acts as the constructor.
	init: function (object) {
	
		// HANDLE: $(falsey) and $(plusQuery)
		if (!object || object instanceof plusQuery) {
			return this;
		}

		/*  We can test for all of the Messenger Plus! objects with
		 *  reasonable certainty because the typeof the functions are
		 *  "unknown", not "function".
		 *  For those without functions, (Contact and Emoticon) we do a bit
		 *  more testing just in case.
		 */
		
		// HANDLE: $(Debug)
		if (typeof object.Trace === "unknown") {
			return this.extend(new plusQuery.interfaces.Debug(object));
		}
		
		// HANDLE: $(Messenger)
		if (typeof object.AutoSignin === "unknown") {
			return this.extend(new plusQuery.interfaces.Messenger(object));
		}
		
		// HANDLE: $(MsgPlus)
		if (typeof object.LockMessenger === "unknown") {
			return this.extend(new plusQuery.interfaces.MsgPlus(object));
		}
		
		// HANDLE: $(Contacts)
		if (typeof object.GetContact === "unknown") {
			return this.extend(new plusQuery.interfaces.Contacts(object));
		}
		
		// HANDLE: $(Emoticons)
		if (typeof object.GetEmoticons === "unknown") {
			return this.extend(new plusQuery.interfaces.Emoticons(object));
		}
		
		// Handle $(ChatWnds)
		if (object.Count) {
			return this.extend(new plusQuery.interfaces.ChatWnds(object));
		}
		
		// Handle $(ChatWnd)
		if (typeof object.SendMessage === "unknown") {
			return this.extend(new plusQuery.interfaces.ChatWnd(object));
		}
		
		// HANDLE: $(Contact)
		if (typeof object.Email !== "undefined" &&
			typeof object.Network !== "undefined" &&
			typeof object.Status !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PersonalMessage !== "undefined" &&
			typeof object.CurrentMedia !== "undefined" &&
			typeof object.DisplayPicture !== "undefined") {
			
			return this.extend(new plusQuery.interfaces.Contact(object));
		}
		
		// HANDLE: $(Emoticon)
		if (typeof object.Shortcut !== "undefined" &&
			typeof object.Name !== "undefined" &&
			typeof object.PictureFile !== "undefined") {
			
			return this.extend(new plusQuery.interfaces.Emoticon(object));
		}
		
		// HANDLE: $(PlusWnd)
		if (typeof object.Close === "unknown") {
			return this.extend(new plusQuery.interfaces.PlusWnd(object));
		}
		
		// HANDLE: $(Interop)
		if (typeof object.Call === "unknown") {
			return this.extend(new plusQuery.interfaces.Interop(object));
		}
		
		// HANDLE: $(DataBloc)
		if (typeof object.SetAt === "unknown") {
			return this.extend(new plusQuery.interfaces.DataBloc(object));
		}
		
		return this;
	},
	
	// The default length of a plusQuery object is 0
	length: 0,
	
	// The number of elements contained in the matched element set
	size: function () {
		return this.length;
	},

	// Converts the object to an array
	toArray: function () {
		return Array.prototype.slice.call(this, 0);
	},
	
	type: "PlusQuery",
	
	toString: function () {
		return "[object " + this.type + "]";
	}
};

// Give the init function the plusQuery prototype for later instantiation
plusQuery.fn.init.prototype = plusQuery.fn;

$ = plusQuery;

return plusQuery;
})();
