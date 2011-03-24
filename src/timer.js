(function ($) {

	var Timer = function (callback, delay, repeat) {
		this.callback = callback;
		this.delay = delay;
		this.repeat = repeat;
		this.id = "TYSCRIPT#" + TYSCRIPT.guid++;
		Timer.CACHE[this.id] = this;
	};
	
	Timer.CACHE = {};
	
	Timer.prototype.extend({
		start: function () {
			if (this.delay < 300) {
				this.trigger();
			} else {
				MsgPlus.AddTimer(this.id, this.delay);
			}
			return this;
		},
		
		cancel: function () {
			MsgPlus.CancelTimer(this.id);
			delete Timer.CACHE[this.id];
			return this;
		},
		
		trigger: function () {
			this.callback.apply(this);
			if(this.repeat) {
				this.start();
			}
		}
	});
	
	$.extend({
		setTimeout: function (callback, delay) {
			return (new Timer(callback, delay, false)).start();
		},
		
		setInterval: function (callback, delay) {
			return (new Timer(callback, delay, true)).start();
		},
		
		clearTimeout: function (timer) {
			if (timer.id) {
				Timer.CACHE[timer.id].cancel();
			} else {
				Timer.CACHE[timer].cancel();
			}
			
		},
		
		clearInterval: this.clearTimeout
	});
	
	$.addEventListener('Timer', function(timerId) {
		if(timerId.match(/TYSCRIPT#(\d+)/) && Timer.CACHE[timerId].callback)
		{
			Timer.CACHE[this.id].trigger();
		}
	});

})(plusQuery);