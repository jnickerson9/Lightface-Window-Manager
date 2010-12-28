// 
// Requires: LightFace.js, LightFace.Request.js
//
// Usage: 
// createwindow - method for creating with a Lightface request
// createstaticwindow - method for creating a generic Lightface popup
//
// this.windowid = window.winmanager.createwindow({
//		.. put the standard parameters object here ..
// 	});
//
//		// then open
// if (this.windowid != null) {
// 	window.winmanager.getwindow(this.windowid).open();				
// }


var UI = {};

UI.WindowManager = new Class({
	Implements: [Options],
	options: {
		windowmax:1
	},
	initialize: function(options) {
		this.setOptions(options);
		this.windows = [];
		this.windownum = 0;
	},
	createstaticwindow: function(config) {
		if (this.windownum >= this.options.windowmax) {
			this.destroywindows();
		}
		this.windows[this.windownum++] = new LightFace(config);
		return this.windownum-1;
	},
	createwindow: function(config) {
		if (this.windownum >= this.options.windowmax) {
			this.destroywindows();
		}
		this.windows[this.windownum++] = new LightFace.Request(config);
		return this.windownum-1;
	},
	removewindow: function(index) {
		this.windows[index].close();
	},
	getwindow: function(index) {
		return this.windows[index];
	},
	destroywindows: function() { 
		this.windows.each(function(w,i) {
			w.destroy();
		});
		this.windownum = 0;
	}
});


window.addEvent('domready', function() {
	window.winmanager = new UI.WindowManager();
});