//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// packages/rajit_bootstrap3-datepicker/lib/js/bootstrap-datepicker.js                                             //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
/*!                                                                                                                // 1
 * Datepicker for Bootstrap v1.5.1 (https://github.com/eternicode/bootstrap-datepicker)                            // 2
 *                                                                                                                 // 3
 * Copyright 2012 Stefan Petre                                                                                     // 4
 * Improvements by Andrew Rowls                                                                                    // 5
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)                             // 6
 */(function(factory){                                                                                             // 7
    if (typeof define === "function" && define.amd) {                                                              // 8
        define(["jquery"], factory);                                                                               // 9
    } else if (typeof exports === 'object') {                                                                      // 10
        factory(require('jquery'));                                                                                // 11
    } else {                                                                                                       // 12
        factory(jQuery);                                                                                           // 13
    }                                                                                                              // 14
}(function($, undefined){                                                                                          // 15
                                                                                                                   // 16
	function UTCDate(){                                                                                               // 17
		return new Date(Date.UTC.apply(Date, arguments));                                                                // 18
	}                                                                                                                 // 19
	function UTCToday(){                                                                                              // 20
		var today = new Date();                                                                                          // 21
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());                                          // 22
	}                                                                                                                 // 23
	function isUTCEquals(date1, date2) {                                                                              // 24
		return (                                                                                                         // 25
			date1.getUTCFullYear() === date2.getUTCFullYear() &&                                                            // 26
			date1.getUTCMonth() === date2.getUTCMonth() &&                                                                  // 27
			date1.getUTCDate() === date2.getUTCDate()                                                                       // 28
		);                                                                                                               // 29
	}                                                                                                                 // 30
	function alias(method){                                                                                           // 31
		return function(){                                                                                               // 32
			return this[method].apply(this, arguments);                                                                     // 33
		};                                                                                                               // 34
	}                                                                                                                 // 35
	function isValidDate(d) {                                                                                         // 36
		return d && !isNaN(d.getTime());                                                                                 // 37
	}                                                                                                                 // 38
                                                                                                                   // 39
	var DateArray = (function(){                                                                                      // 40
		var extras = {                                                                                                   // 41
			get: function(i){                                                                                               // 42
				return this.slice(i)[0];                                                                                       // 43
			},                                                                                                              // 44
			contains: function(d){                                                                                          // 45
				// Array.indexOf is not cross-browser;                                                                         // 46
				// $.inArray doesn't work with Dates                                                                           // 47
				var val = d && d.valueOf();                                                                                    // 48
				for (var i=0, l=this.length; i < l; i++)                                                                       // 49
					if (this[i].valueOf() === val)                                                                                // 50
						return i;                                                                                                    // 51
				return -1;                                                                                                     // 52
			},                                                                                                              // 53
			remove: function(i){                                                                                            // 54
				this.splice(i,1);                                                                                              // 55
			},                                                                                                              // 56
			replace: function(new_array){                                                                                   // 57
				if (!new_array)                                                                                                // 58
					return;                                                                                                       // 59
				if (!$.isArray(new_array))                                                                                     // 60
					new_array = [new_array];                                                                                      // 61
				this.clear();                                                                                                  // 62
				this.push.apply(this, new_array);                                                                              // 63
			},                                                                                                              // 64
			clear: function(){                                                                                              // 65
				this.length = 0;                                                                                               // 66
			},                                                                                                              // 67
			copy: function(){                                                                                               // 68
				var a = new DateArray();                                                                                       // 69
				a.replace(this);                                                                                               // 70
				return a;                                                                                                      // 71
			}                                                                                                               // 72
		};                                                                                                               // 73
                                                                                                                   // 74
		return function(){                                                                                               // 75
			var a = [];                                                                                                     // 76
			a.push.apply(a, arguments);                                                                                     // 77
			$.extend(a, extras);                                                                                            // 78
			return a;                                                                                                       // 79
		};                                                                                                               // 80
	})();                                                                                                             // 81
                                                                                                                   // 82
                                                                                                                   // 83
	// Picker object                                                                                                  // 84
                                                                                                                   // 85
	var Datepicker = function(element, options){                                                                      // 86
		$(element).data('datepicker', this);                                                                             // 87
		this._process_options(options);                                                                                  // 88
                                                                                                                   // 89
		this.dates = new DateArray();                                                                                    // 90
		this.viewDate = this.o.defaultViewDate;                                                                          // 91
		this.focusDate = null;                                                                                           // 92
                                                                                                                   // 93
		this.element = $(element);                                                                                       // 94
		this.isInline = false;                                                                                           // 95
		this.isInput = this.element.is('input');                                                                         // 96
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;                                             // 98
		if (this.component && this.component.length === 0)                                                               // 99
			this.component = false;                                                                                         // 100
                                                                                                                   // 101
		this.picker = $(DPGlobal.template);                                                                              // 102
		this._buildEvents();                                                                                             // 103
		this._attachEvents();                                                                                            // 104
                                                                                                                   // 105
		if (this.isInline){                                                                                              // 106
			this.picker.addClass('datepicker-inline').appendTo(this.element);                                               // 107
		}                                                                                                                // 108
		else {                                                                                                           // 109
			this.picker.addClass('datepicker-dropdown dropdown-menu');                                                      // 110
		}                                                                                                                // 111
                                                                                                                   // 112
		if (this.o.rtl){                                                                                                 // 113
			this.picker.addClass('datepicker-rtl');                                                                         // 114
		}                                                                                                                // 115
                                                                                                                   // 116
		this.viewMode = this.o.startView;                                                                                // 117
                                                                                                                   // 118
		if (this.o.calendarWeeks)                                                                                        // 119
			this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear')                                         // 120
						.attr('colspan', function(i, val){                                                                           // 121
							return parseInt(val) + 1;                                                                                   // 122
						});                                                                                                          // 123
                                                                                                                   // 124
		this._allow_update = false;                                                                                      // 125
                                                                                                                   // 126
		this.setStartDate(this._o.startDate);                                                                            // 127
		this.setEndDate(this._o.endDate);                                                                                // 128
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);                                                           // 129
		this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);                                                     // 130
		this.setDatesDisabled(this.o.datesDisabled);                                                                     // 131
                                                                                                                   // 132
		this.fillDow();                                                                                                  // 133
		this.fillMonths();                                                                                               // 134
                                                                                                                   // 135
		this._allow_update = true;                                                                                       // 136
                                                                                                                   // 137
		this.update();                                                                                                   // 138
		this.showMode();                                                                                                 // 139
                                                                                                                   // 140
		if (this.isInline){                                                                                              // 141
			this.show();                                                                                                    // 142
		}                                                                                                                // 143
	};                                                                                                                // 144
                                                                                                                   // 145
	Datepicker.prototype = {                                                                                          // 146
		constructor: Datepicker,                                                                                         // 147
                                                                                                                   // 148
		_process_options: function(opts){                                                                                // 149
			// Store raw options for reference                                                                              // 150
			this._o = $.extend({}, this._o, opts);                                                                          // 151
			// Processed options                                                                                            // 152
			var o = this.o = $.extend({}, this._o);                                                                         // 153
                                                                                                                   // 154
			// Check if "de-DE" style date is available, if not language should                                             // 155
			// fallback to 2 letter code eg "de"                                                                            // 156
			var lang = o.language;                                                                                          // 157
			if (!dates[lang]){                                                                                              // 158
				lang = lang.split('-')[0];                                                                                     // 159
				if (!dates[lang])                                                                                              // 160
					lang = defaults.language;                                                                                     // 161
			}                                                                                                               // 162
			o.language = lang;                                                                                              // 163
                                                                                                                   // 164
			switch (o.startView){                                                                                           // 165
				case 2:                                                                                                        // 166
				case 'decade':                                                                                                 // 167
					o.startView = 2;                                                                                              // 168
					break;                                                                                                        // 169
				case 1:                                                                                                        // 170
				case 'year':                                                                                                   // 171
					o.startView = 1;                                                                                              // 172
					break;                                                                                                        // 173
				default:                                                                                                       // 174
					o.startView = 0;                                                                                              // 175
			}                                                                                                               // 176
                                                                                                                   // 177
			switch (o.minViewMode){                                                                                         // 178
				case 1:                                                                                                        // 179
				case 'months':                                                                                                 // 180
					o.minViewMode = 1;                                                                                            // 181
					break;                                                                                                        // 182
				case 2:                                                                                                        // 183
				case 'years':                                                                                                  // 184
					o.minViewMode = 2;                                                                                            // 185
					break;                                                                                                        // 186
				default:                                                                                                       // 187
					o.minViewMode = 0;                                                                                            // 188
			}                                                                                                               // 189
                                                                                                                   // 190
			switch (o.maxViewMode) {                                                                                        // 191
				case 0:                                                                                                        // 192
				case 'days':                                                                                                   // 193
					o.maxViewMode = 0;                                                                                            // 194
					break;                                                                                                        // 195
				case 1:                                                                                                        // 196
				case 'months':                                                                                                 // 197
					o.maxViewMode = 1;                                                                                            // 198
					break;                                                                                                        // 199
				default:                                                                                                       // 200
					o.maxViewMode = 2;                                                                                            // 201
			}                                                                                                               // 202
                                                                                                                   // 203
			o.startView = Math.min(o.startView, o.maxViewMode);                                                             // 204
			o.startView = Math.max(o.startView, o.minViewMode);                                                             // 205
                                                                                                                   // 206
			// true, false, or Number > 0                                                                                   // 207
			if (o.multidate !== true){                                                                                      // 208
				o.multidate = Number(o.multidate) || false;                                                                    // 209
				if (o.multidate !== false)                                                                                     // 210
					o.multidate = Math.max(0, o.multidate);                                                                       // 211
			}                                                                                                               // 212
			o.multidateSeparator = String(o.multidateSeparator);                                                            // 213
                                                                                                                   // 214
			o.weekStart %= 7;                                                                                               // 215
			o.weekEnd = (o.weekStart + 6) % 7;                                                                              // 216
                                                                                                                   // 217
			var format = DPGlobal.parseFormat(o.format);                                                                    // 218
			if (o.startDate !== -Infinity){                                                                                 // 219
				if (!!o.startDate){                                                                                            // 220
					if (o.startDate instanceof Date)                                                                              // 221
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));                                              // 222
					else                                                                                                          // 223
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);                                           // 224
				}                                                                                                              // 225
				else {                                                                                                         // 226
					o.startDate = -Infinity;                                                                                      // 227
				}                                                                                                              // 228
			}                                                                                                               // 229
			if (o.endDate !== Infinity){                                                                                    // 230
				if (!!o.endDate){                                                                                              // 231
					if (o.endDate instanceof Date)                                                                                // 232
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));                                                  // 233
					else                                                                                                          // 234
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);                                               // 235
				}                                                                                                              // 236
				else {                                                                                                         // 237
					o.endDate = Infinity;                                                                                         // 238
				}                                                                                                              // 239
			}                                                                                                               // 240
                                                                                                                   // 241
			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];                                                                // 242
			if (!$.isArray(o.daysOfWeekDisabled))                                                                           // 243
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);                                                   // 244
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){                                                 // 245
				return parseInt(d, 10);                                                                                        // 246
			});                                                                                                             // 247
                                                                                                                   // 248
			o.daysOfWeekHighlighted = o.daysOfWeekHighlighted||[];                                                          // 249
			if (!$.isArray(o.daysOfWeekHighlighted))                                                                        // 250
				o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);                                             // 251
			o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function(d){                                           // 252
				return parseInt(d, 10);                                                                                        // 253
			});                                                                                                             // 254
                                                                                                                   // 255
			o.datesDisabled = o.datesDisabled||[];                                                                          // 256
			if (!$.isArray(o.datesDisabled)) {                                                                              // 257
				var datesDisabled = [];                                                                                        // 258
				datesDisabled.push(DPGlobal.parseDate(o.datesDisabled, format, o.language));                                   // 259
				o.datesDisabled = datesDisabled;                                                                               // 260
			}                                                                                                               // 261
			o.datesDisabled = $.map(o.datesDisabled,function(d){                                                            // 262
				return DPGlobal.parseDate(d, format, o.language);                                                              // 263
			});                                                                                                             // 264
                                                                                                                   // 265
			var plc = String(o.orientation).toLowerCase().split(/\s+/g),                                                    // 266
				_plc = o.orientation.toLowerCase();                                                                            // 267
			plc = $.grep(plc, function(word){                                                                               // 268
				return /^auto|left|right|top|bottom$/.test(word);                                                              // 269
			});                                                                                                             // 270
			o.orientation = {x: 'auto', y: 'auto'};                                                                         // 271
			if (!_plc || _plc === 'auto')                                                                                   // 272
				; // no action                                                                                                 // 273
			else if (plc.length === 1){                                                                                     // 274
				switch (plc[0]){                                                                                               // 275
					case 'top':                                                                                                   // 276
					case 'bottom':                                                                                                // 277
						o.orientation.y = plc[0];                                                                                    // 278
						break;                                                                                                       // 279
					case 'left':                                                                                                  // 280
					case 'right':                                                                                                 // 281
						o.orientation.x = plc[0];                                                                                    // 282
						break;                                                                                                       // 283
				}                                                                                                              // 284
			}                                                                                                               // 285
			else {                                                                                                          // 286
				_plc = $.grep(plc, function(word){                                                                             // 287
					return /^left|right$/.test(word);                                                                             // 288
				});                                                                                                            // 289
				o.orientation.x = _plc[0] || 'auto';                                                                           // 290
                                                                                                                   // 291
				_plc = $.grep(plc, function(word){                                                                             // 292
					return /^top|bottom$/.test(word);                                                                             // 293
				});                                                                                                            // 294
				o.orientation.y = _plc[0] || 'auto';                                                                           // 295
			}                                                                                                               // 296
			if (o.defaultViewDate) {                                                                                        // 297
				var year = o.defaultViewDate.year || new Date().getFullYear();                                                 // 298
				var month = o.defaultViewDate.month || 0;                                                                      // 299
				var day = o.defaultViewDate.day || 1;                                                                          // 300
				o.defaultViewDate = UTCDate(year, month, day);                                                                 // 301
			} else {                                                                                                        // 302
				o.defaultViewDate = UTCToday();                                                                                // 303
			}                                                                                                               // 304
		},                                                                                                               // 305
		_events: [],                                                                                                     // 306
		_secondaryEvents: [],                                                                                            // 307
		_applyEvents: function(evs){                                                                                     // 308
			for (var i=0, el, ch, ev; i < evs.length; i++){                                                                 // 309
				el = evs[i][0];                                                                                                // 310
				if (evs[i].length === 2){                                                                                      // 311
					ch = undefined;                                                                                               // 312
					ev = evs[i][1];                                                                                               // 313
				}                                                                                                              // 314
				else if (evs[i].length === 3){                                                                                 // 315
					ch = evs[i][1];                                                                                               // 316
					ev = evs[i][2];                                                                                               // 317
				}                                                                                                              // 318
				el.on(ev, ch);                                                                                                 // 319
			}                                                                                                               // 320
		},                                                                                                               // 321
		_unapplyEvents: function(evs){                                                                                   // 322
			for (var i=0, el, ev, ch; i < evs.length; i++){                                                                 // 323
				el = evs[i][0];                                                                                                // 324
				if (evs[i].length === 2){                                                                                      // 325
					ch = undefined;                                                                                               // 326
					ev = evs[i][1];                                                                                               // 327
				}                                                                                                              // 328
				else if (evs[i].length === 3){                                                                                 // 329
					ch = evs[i][1];                                                                                               // 330
					ev = evs[i][2];                                                                                               // 331
				}                                                                                                              // 332
				el.off(ev, ch);                                                                                                // 333
			}                                                                                                               // 334
		},                                                                                                               // 335
		_buildEvents: function(){                                                                                        // 336
            var events = {                                                                                         // 337
                keyup: $.proxy(function(e){                                                                        // 338
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)                              // 339
                        this.update();                                                                             // 340
                }, this),                                                                                          // 341
                keydown: $.proxy(this.keydown, this),                                                              // 342
                paste: $.proxy(this.paste, this)                                                                   // 343
            };                                                                                                     // 344
                                                                                                                   // 345
            if (this.o.showOnFocus === true) {                                                                     // 346
                events.focus = $.proxy(this.show, this);                                                           // 347
            }                                                                                                      // 348
                                                                                                                   // 349
            if (this.isInput) { // single input                                                                    // 350
                this._events = [                                                                                   // 351
                    [this.element, events]                                                                         // 352
                ];                                                                                                 // 353
            }                                                                                                      // 354
            else if (this.component && this.hasInput) { // component: input + button                               // 355
                this._events = [                                                                                   // 356
                    // For components that are not readonly, allow keyboard nav                                    // 357
                    [this.element.find('input'), events],                                                          // 358
                    [this.component, {                                                                             // 359
                        click: $.proxy(this.show, this)                                                            // 360
                    }]                                                                                             // 361
                ];                                                                                                 // 362
            }                                                                                                      // 363
			else if (this.element.is('div')){  // inline datepicker                                                         // 364
				this.isInline = true;                                                                                          // 365
			}                                                                                                               // 366
			else {                                                                                                          // 367
				this._events = [                                                                                               // 368
					[this.element, {                                                                                              // 369
						click: $.proxy(this.show, this)                                                                              // 370
					}]                                                                                                            // 371
				];                                                                                                             // 372
			}                                                                                                               // 373
			this._events.push(                                                                                              // 374
				// Component: listen for blur on element descendants                                                           // 375
				[this.element, '*', {                                                                                          // 376
					blur: $.proxy(function(e){                                                                                    // 377
						this._focused_from = e.target;                                                                               // 378
					}, this)                                                                                                      // 379
				}],                                                                                                            // 380
				// Input: listen for blur on element                                                                           // 381
				[this.element, {                                                                                               // 382
					blur: $.proxy(function(e){                                                                                    // 383
						this._focused_from = e.target;                                                                               // 384
					}, this)                                                                                                      // 385
				}]                                                                                                             // 386
			);                                                                                                              // 387
                                                                                                                   // 388
			if (this.o.immediateUpdates) {                                                                                  // 389
				// Trigger input updates immediately on changed year/month                                                     // 390
				this._events.push([this.element, {                                                                             // 391
					'changeYear changeMonth': $.proxy(function(e){                                                                // 392
						this.update(e.date);                                                                                         // 393
					}, this)                                                                                                      // 394
				}]);                                                                                                           // 395
			}                                                                                                               // 396
                                                                                                                   // 397
			this._secondaryEvents = [                                                                                       // 398
				[this.picker, {                                                                                                // 399
					click: $.proxy(this.click, this)                                                                              // 400
				}],                                                                                                            // 401
				[$(window), {                                                                                                  // 402
					resize: $.proxy(this.place, this)                                                                             // 403
				}],                                                                                                            // 404
				[$(document), {                                                                                                // 405
					mousedown: $.proxy(function(e){                                                                               // 406
						// Clicked outside the datepicker, hide it                                                                   // 407
						if (!(                                                                                                       // 408
							this.element.is(e.target) ||                                                                                // 409
							this.element.find(e.target).length ||                                                                       // 410
							this.picker.is(e.target) ||                                                                                 // 411
							this.picker.find(e.target).length ||                                                                        // 412
							this.picker.hasClass('datepicker-inline')                                                                   // 413
						)){                                                                                                          // 414
							this.hide();                                                                                                // 415
						}                                                                                                            // 416
					}, this)                                                                                                      // 417
				}]                                                                                                             // 418
			];                                                                                                              // 419
		},                                                                                                               // 420
		_attachEvents: function(){                                                                                       // 421
			this._detachEvents();                                                                                           // 422
			this._applyEvents(this._events);                                                                                // 423
		},                                                                                                               // 424
		_detachEvents: function(){                                                                                       // 425
			this._unapplyEvents(this._events);                                                                              // 426
		},                                                                                                               // 427
		_attachSecondaryEvents: function(){                                                                              // 428
			this._detachSecondaryEvents();                                                                                  // 429
			this._applyEvents(this._secondaryEvents);                                                                       // 430
		},                                                                                                               // 431
		_detachSecondaryEvents: function(){                                                                              // 432
			this._unapplyEvents(this._secondaryEvents);                                                                     // 433
		},                                                                                                               // 434
		_trigger: function(event, altdate){                                                                              // 435
			var date = altdate || this.dates.get(-1),                                                                       // 436
				local_date = this._utc_to_local(date);                                                                         // 437
                                                                                                                   // 438
			this.element.trigger({                                                                                          // 439
				type: event,                                                                                                   // 440
				date: local_date,                                                                                              // 441
				dates: $.map(this.dates, this._utc_to_local),                                                                  // 442
				format: $.proxy(function(ix, format){                                                                          // 443
					if (arguments.length === 0){                                                                                  // 444
						ix = this.dates.length - 1;                                                                                  // 445
						format = this.o.format;                                                                                      // 446
					}                                                                                                             // 447
					else if (typeof ix === 'string'){                                                                             // 448
						format = ix;                                                                                                 // 449
						ix = this.dates.length - 1;                                                                                  // 450
					}                                                                                                             // 451
					format = format || this.o.format;                                                                             // 452
					var date = this.dates.get(ix);                                                                                // 453
					return DPGlobal.formatDate(date, format, this.o.language);                                                    // 454
				}, this)                                                                                                       // 455
			});                                                                                                             // 456
		},                                                                                                               // 457
                                                                                                                   // 458
		show: function(){                                                                                                // 459
      var element = this.component ? this.element.find('input') : this.element;                                    // 460
			if (element.attr('readonly') && this.o.enableOnReadonly === false)                                              // 461
				return;                                                                                                        // 462
			if (!this.isInline)                                                                                             // 463
				this.picker.appendTo(this.o.container);                                                                        // 464
			this.place();                                                                                                   // 465
			this.picker.show();                                                                                             // 466
			this._attachSecondaryEvents();                                                                                  // 467
			this._trigger('show');                                                                                          // 468
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {         // 469
				$(this.element).blur();                                                                                        // 470
			}                                                                                                               // 471
			return this;                                                                                                    // 472
		},                                                                                                               // 473
                                                                                                                   // 474
		hide: function(){                                                                                                // 475
			if (this.isInline)                                                                                              // 476
				return this;                                                                                                   // 477
			if (!this.picker.is(':visible'))                                                                                // 478
				return this;                                                                                                   // 479
			this.focusDate = null;                                                                                          // 480
			this.picker.hide().detach();                                                                                    // 481
			this._detachSecondaryEvents();                                                                                  // 482
			this.viewMode = this.o.startView;                                                                               // 483
			this.showMode();                                                                                                // 484
                                                                                                                   // 485
			if (                                                                                                            // 486
				this.o.forceParse &&                                                                                           // 487
				(                                                                                                              // 488
					this.isInput && this.element.val() ||                                                                         // 489
					this.hasInput && this.element.find('input').val()                                                             // 490
				)                                                                                                              // 491
			)                                                                                                               // 492
				this.setValue();                                                                                               // 493
			this._trigger('hide');                                                                                          // 494
			return this;                                                                                                    // 495
		},                                                                                                               // 496
                                                                                                                   // 497
		remove: function(){                                                                                              // 498
			this.hide();                                                                                                    // 499
			this._detachEvents();                                                                                           // 500
			this._detachSecondaryEvents();                                                                                  // 501
			this.picker.remove();                                                                                           // 502
			delete this.element.data().datepicker;                                                                          // 503
			if (!this.isInput){                                                                                             // 504
				delete this.element.data().date;                                                                               // 505
			}                                                                                                               // 506
			return this;                                                                                                    // 507
		},                                                                                                               // 508
                                                                                                                   // 509
		paste: function(evt){                                                                                            // 510
			var dateString;                                                                                                 // 511
			if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types                                    // 512
				&& $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {                                    // 513
				dateString = evt.originalEvent.clipboardData.getData('text/plain');                                            // 514
			}                                                                                                               // 515
			else if (window.clipboardData) {                                                                                // 516
				dateString = window.clipboardData.getData('Text');                                                             // 517
			}                                                                                                               // 518
			else {                                                                                                          // 519
				return;                                                                                                        // 520
			}                                                                                                               // 521
			this.setDate(dateString);                                                                                       // 522
			this.update();                                                                                                  // 523
			evt.preventDefault();                                                                                           // 524
		},                                                                                                               // 525
                                                                                                                   // 526
		_utc_to_local: function(utc){                                                                                    // 527
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));                                        // 528
		},                                                                                                               // 529
		_local_to_utc: function(local){                                                                                  // 530
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));                                  // 531
		},                                                                                                               // 532
		_zero_time: function(local){                                                                                     // 533
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());                               // 534
		},                                                                                                               // 535
		_zero_utc_time: function(utc){                                                                                   // 536
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));                    // 537
		},                                                                                                               // 538
                                                                                                                   // 539
		getDates: function(){                                                                                            // 540
			return $.map(this.dates, this._utc_to_local);                                                                   // 541
		},                                                                                                               // 542
                                                                                                                   // 543
		getUTCDates: function(){                                                                                         // 544
			return $.map(this.dates, function(d){                                                                           // 545
				return new Date(d);                                                                                            // 546
			});                                                                                                             // 547
		},                                                                                                               // 548
                                                                                                                   // 549
		getDate: function(){                                                                                             // 550
			return this._utc_to_local(this.getUTCDate());                                                                   // 551
		},                                                                                                               // 552
                                                                                                                   // 553
		getUTCDate: function(){                                                                                          // 554
			var selected_date = this.dates.get(-1);                                                                         // 555
			if (typeof selected_date !== 'undefined') {                                                                     // 556
				return new Date(selected_date);                                                                                // 557
			} else {                                                                                                        // 558
				return null;                                                                                                   // 559
			}                                                                                                               // 560
		},                                                                                                               // 561
                                                                                                                   // 562
		clearDates: function(){                                                                                          // 563
			var element;                                                                                                    // 564
			if (this.isInput) {                                                                                             // 565
				element = this.element;                                                                                        // 566
			} else if (this.component) {                                                                                    // 567
				element = this.element.find('input');                                                                          // 568
			}                                                                                                               // 569
                                                                                                                   // 570
			if (element) {                                                                                                  // 571
				element.val('');                                                                                               // 572
			}                                                                                                               // 573
                                                                                                                   // 574
			this.update();                                                                                                  // 575
			this._trigger('changeDate');                                                                                    // 576
                                                                                                                   // 577
			if (this.o.autoclose) {                                                                                         // 578
				this.hide();                                                                                                   // 579
			}                                                                                                               // 580
		},                                                                                                               // 581
		setDates: function(){                                                                                            // 582
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;                                                  // 583
			this.update.apply(this, args);                                                                                  // 584
			this._trigger('changeDate');                                                                                    // 585
			this.setValue();                                                                                                // 586
			return this;                                                                                                    // 587
		},                                                                                                               // 588
                                                                                                                   // 589
		setUTCDates: function(){                                                                                         // 590
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;                                                  // 591
			this.update.apply(this, $.map(args, this._utc_to_local));                                                       // 592
			this._trigger('changeDate');                                                                                    // 593
			this.setValue();                                                                                                // 594
			return this;                                                                                                    // 595
		},                                                                                                               // 596
                                                                                                                   // 597
		setDate: alias('setDates'),                                                                                      // 598
		setUTCDate: alias('setUTCDates'),                                                                                // 599
                                                                                                                   // 600
		setValue: function(){                                                                                            // 601
			var formatted = this.getFormattedDate();                                                                        // 602
			if (!this.isInput){                                                                                             // 603
				if (this.component){                                                                                           // 604
					this.element.find('input').val(formatted);                                                                    // 605
				}                                                                                                              // 606
			}                                                                                                               // 607
			else {                                                                                                          // 608
				this.element.val(formatted);                                                                                   // 609
			}                                                                                                               // 610
			return this;                                                                                                    // 611
		},                                                                                                               // 612
                                                                                                                   // 613
		getFormattedDate: function(format){                                                                              // 614
			if (format === undefined)                                                                                       // 615
				format = this.o.format;                                                                                        // 616
                                                                                                                   // 617
			var lang = this.o.language;                                                                                     // 618
			return $.map(this.dates, function(d){                                                                           // 619
				return DPGlobal.formatDate(d, format, lang);                                                                   // 620
			}).join(this.o.multidateSeparator);                                                                             // 621
		},                                                                                                               // 622
                                                                                                                   // 623
		setStartDate: function(startDate){                                                                               // 624
			this._process_options({startDate: startDate});                                                                  // 625
			this.update();                                                                                                  // 626
			this.updateNavArrows();                                                                                         // 627
			return this;                                                                                                    // 628
		},                                                                                                               // 629
                                                                                                                   // 630
		setEndDate: function(endDate){                                                                                   // 631
			this._process_options({endDate: endDate});                                                                      // 632
			this.update();                                                                                                  // 633
			this.updateNavArrows();                                                                                         // 634
			return this;                                                                                                    // 635
		},                                                                                                               // 636
                                                                                                                   // 637
		setDaysOfWeekDisabled: function(daysOfWeekDisabled){                                                             // 638
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});                                                // 639
			this.update();                                                                                                  // 640
			this.updateNavArrows();                                                                                         // 641
			return this;                                                                                                    // 642
		},                                                                                                               // 643
                                                                                                                   // 644
		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){                                                       // 645
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});                                          // 646
			this.update();                                                                                                  // 647
			return this;                                                                                                    // 648
		},                                                                                                               // 649
                                                                                                                   // 650
		setDatesDisabled: function(datesDisabled){                                                                       // 651
			this._process_options({datesDisabled: datesDisabled});                                                          // 652
			this.update();                                                                                                  // 653
			this.updateNavArrows();                                                                                         // 654
		},                                                                                                               // 655
                                                                                                                   // 656
		place: function(){                                                                                               // 657
			if (this.isInline)                                                                                              // 658
				return this;                                                                                                   // 659
			var calendarWidth = this.picker.outerWidth(),                                                                   // 660
				calendarHeight = this.picker.outerHeight(),                                                                    // 661
				visualPadding = 10,                                                                                            // 662
				container = $(this.o.container),                                                                               // 663
				windowWidth = container.width(),                                                                               // 664
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),                     // 665
				appendOffset = container.offset();                                                                             // 666
                                                                                                                   // 667
			var parentsZindex = [];                                                                                         // 668
			this.element.parents().each(function(){                                                                         // 669
				var itemZIndex = $(this).css('z-index');                                                                       // 670
				if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));                       // 671
			});                                                                                                             // 672
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;                                         // 673
			var offset = this.component ? this.component.parent().offset() : this.element.offset();                         // 674
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);               // 675
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);                  // 676
			var left = offset.left - appendOffset.left,                                                                     // 677
				top = offset.top - appendOffset.top;                                                                           // 678
                                                                                                                   // 679
			if (this.o.container !== 'body') {                                                                              // 680
				top += scrollTop;                                                                                              // 681
			}                                                                                                               // 682
                                                                                                                   // 683
			this.picker.removeClass(                                                                                        // 684
				'datepicker-orient-top datepicker-orient-bottom '+                                                             // 685
				'datepicker-orient-right datepicker-orient-left'                                                               // 686
			);                                                                                                              // 687
                                                                                                                   // 688
			if (this.o.orientation.x !== 'auto'){                                                                           // 689
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);                                             // 690
				if (this.o.orientation.x === 'right')                                                                          // 691
					left -= calendarWidth - width;                                                                                // 692
			}                                                                                                               // 693
			// auto x orientation is best-placement: if it crosses a window                                                 // 694
			// edge, fudge it sideways                                                                                      // 695
			else {                                                                                                          // 696
				if (offset.left < 0) {                                                                                         // 697
					// component is outside the window on the left side. Move it into visible range                               // 698
					this.picker.addClass('datepicker-orient-left');                                                               // 699
					left -= offset.left - visualPadding;                                                                          // 700
				} else if (left + calendarWidth > windowWidth) {                                                               // 701
					// the calendar passes the widow right edge. Align it to component right side                                 // 702
					this.picker.addClass('datepicker-orient-right');                                                              // 703
					left += width - calendarWidth;                                                                                // 704
				} else {                                                                                                       // 705
					// Default to left                                                                                            // 706
					this.picker.addClass('datepicker-orient-left');                                                               // 707
				}                                                                                                              // 708
			}                                                                                                               // 709
                                                                                                                   // 710
			// auto y orientation is best-situation: top or bottom, no fudging,                                             // 711
			// decision based on which shows more of the calendar                                                           // 712
			var yorient = this.o.orientation.y,                                                                             // 713
				top_overflow;                                                                                                  // 714
			if (yorient === 'auto'){                                                                                        // 715
				top_overflow = -scrollTop + top - calendarHeight;                                                              // 716
				yorient = top_overflow < 0 ? 'bottom' : 'top';                                                                 // 717
			}                                                                                                               // 718
                                                                                                                   // 719
			this.picker.addClass('datepicker-orient-' + yorient);                                                           // 720
			if (yorient === 'top')                                                                                          // 721
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));                                              // 722
			else                                                                                                            // 723
				top += height;                                                                                                 // 724
                                                                                                                   // 725
			if (this.o.rtl) {                                                                                               // 726
				var right = windowWidth - (left + width);                                                                      // 727
				this.picker.css({                                                                                              // 728
					top: top,                                                                                                     // 729
					right: right,                                                                                                 // 730
					zIndex: zIndex                                                                                                // 731
				});                                                                                                            // 732
			} else {                                                                                                        // 733
				this.picker.css({                                                                                              // 734
					top: top,                                                                                                     // 735
					left: left,                                                                                                   // 736
					zIndex: zIndex                                                                                                // 737
				});                                                                                                            // 738
			}                                                                                                               // 739
			return this;                                                                                                    // 740
		},                                                                                                               // 741
                                                                                                                   // 742
		_allow_update: true,                                                                                             // 743
		update: function(){                                                                                              // 744
			if (!this._allow_update)                                                                                        // 745
				return this;                                                                                                   // 746
                                                                                                                   // 747
			var oldDates = this.dates.copy(),                                                                               // 748
				dates = [],                                                                                                    // 749
				fromArgs = false;                                                                                              // 750
			if (arguments.length){                                                                                          // 751
				$.each(arguments, $.proxy(function(i, date){                                                                   // 752
					if (date instanceof Date)                                                                                     // 753
						date = this._local_to_utc(date);                                                                             // 754
					dates.push(date);                                                                                             // 755
				}, this));                                                                                                     // 756
				fromArgs = true;                                                                                               // 757
			}                                                                                                               // 758
			else {                                                                                                          // 759
				dates = this.isInput                                                                                           // 760
						? this.element.val()                                                                                         // 761
						: this.element.data('date') || this.element.find('input').val();                                             // 762
				if (dates && this.o.multidate)                                                                                 // 763
					dates = dates.split(this.o.multidateSeparator);                                                               // 764
				else                                                                                                           // 765
					dates = [dates];                                                                                              // 766
				delete this.element.data().date;                                                                               // 767
			}                                                                                                               // 768
                                                                                                                   // 769
			dates = $.map(dates, $.proxy(function(date){                                                                    // 770
				return DPGlobal.parseDate(date, this.o.format, this.o.language);                                               // 771
			}, this));                                                                                                      // 772
			dates = $.grep(dates, $.proxy(function(date){                                                                   // 773
				return (                                                                                                       // 774
					!this.dateWithinRange(date) ||                                                                                // 775
					!date                                                                                                         // 776
				);                                                                                                             // 777
			}, this), true);                                                                                                // 778
			this.dates.replace(dates);                                                                                      // 779
                                                                                                                   // 780
			if (this.dates.length)                                                                                          // 781
				this.viewDate = new Date(this.dates.get(-1));                                                                  // 782
			else if (this.viewDate < this.o.startDate)                                                                      // 783
				this.viewDate = new Date(this.o.startDate);                                                                    // 784
			else if (this.viewDate > this.o.endDate)                                                                        // 785
				this.viewDate = new Date(this.o.endDate);                                                                      // 786
			else                                                                                                            // 787
				this.viewDate = this.o.defaultViewDate;                                                                        // 788
                                                                                                                   // 789
			if (fromArgs){                                                                                                  // 790
				// setting date by clicking                                                                                    // 791
				this.setValue();                                                                                               // 792
			}                                                                                                               // 793
			else if (dates.length){                                                                                         // 794
				// setting date by typing                                                                                      // 795
				if (String(oldDates) !== String(this.dates))                                                                   // 796
					this._trigger('changeDate');                                                                                  // 797
			}                                                                                                               // 798
			if (!this.dates.length && oldDates.length)                                                                      // 799
				this._trigger('clearDate');                                                                                    // 800
                                                                                                                   // 801
			this.fill();                                                                                                    // 802
			this.element.change();                                                                                          // 803
			return this;                                                                                                    // 804
		},                                                                                                               // 805
                                                                                                                   // 806
		fillDow: function(){                                                                                             // 807
			var dowCnt = this.o.weekStart,                                                                                  // 808
				html = '<tr>';                                                                                                 // 809
			if (this.o.calendarWeeks){                                                                                      // 810
				this.picker.find('.datepicker-days .datepicker-switch')                                                        // 811
					.attr('colspan', function(i, val){                                                                            // 812
						return parseInt(val) + 1;                                                                                    // 813
					});                                                                                                           // 814
				html += '<th class="cw">&#160;</th>';                                                                          // 815
			}                                                                                                               // 816
			while (dowCnt < this.o.weekStart + 7){                                                                          // 817
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';                               // 818
			}                                                                                                               // 819
			html += '</tr>';                                                                                                // 820
			this.picker.find('.datepicker-days thead').append(html);                                                        // 821
		},                                                                                                               // 822
                                                                                                                   // 823
		fillMonths: function(){                                                                                          // 824
			var html = '',                                                                                                  // 825
			i = 0;                                                                                                          // 826
			while (i < 12){                                                                                                 // 827
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';                              // 828
			}                                                                                                               // 829
			this.picker.find('.datepicker-months td').html(html);                                                           // 830
		},                                                                                                               // 831
                                                                                                                   // 832
		setRange: function(range){                                                                                       // 833
			if (!range || !range.length)                                                                                    // 834
				delete this.range;                                                                                             // 835
			else                                                                                                            // 836
				this.range = $.map(range, function(d){                                                                         // 837
					return d.valueOf();                                                                                           // 838
				});                                                                                                            // 839
			this.fill();                                                                                                    // 840
		},                                                                                                               // 841
                                                                                                                   // 842
		getClassNames: function(date){                                                                                   // 843
			var cls = [],                                                                                                   // 844
				year = this.viewDate.getUTCFullYear(),                                                                         // 845
				month = this.viewDate.getUTCMonth(),                                                                           // 846
				today = new Date();                                                                                            // 847
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){            // 848
				cls.push('old');                                                                                               // 849
			}                                                                                                               // 850
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){       // 851
				cls.push('new');                                                                                               // 852
			}                                                                                                               // 853
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())                                              // 854
				cls.push('focused');                                                                                           // 855
			// Compare internal UTC date with local today, not UTC today                                                    // 856
			if (this.o.todayHighlight &&                                                                                    // 857
				date.getUTCFullYear() === today.getFullYear() &&                                                               // 858
				date.getUTCMonth() === today.getMonth() &&                                                                     // 859
				date.getUTCDate() === today.getDate()){                                                                        // 860
				cls.push('today');                                                                                             // 861
			}                                                                                                               // 862
			if (this.dates.contains(date) !== -1)                                                                           // 863
				cls.push('active');                                                                                            // 864
			if (!this.dateWithinRange(date) || this.dateIsDisabled(date)){                                                  // 865
				cls.push('disabled');                                                                                          // 866
			}                                                                                                               // 867
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){                                          // 868
				cls.push('highlighted');                                                                                       // 869
			}                                                                                                               // 870
                                                                                                                   // 871
			if (this.range){                                                                                                // 872
				if (date > this.range[0] && date < this.range[this.range.length-1]){                                           // 873
					cls.push('range');                                                                                            // 874
				}                                                                                                              // 875
				if ($.inArray(date.valueOf(), this.range) !== -1){                                                             // 876
					cls.push('selected');                                                                                         // 877
				}                                                                                                              // 878
				if (date.valueOf() === this.range[0]){                                                                         // 879
          cls.push('range-start');                                                                                 // 880
        }                                                                                                          // 881
        if (date.valueOf() === this.range[this.range.length-1]){                                                   // 882
          cls.push('range-end');                                                                                   // 883
        }                                                                                                          // 884
			}                                                                                                               // 885
			return cls;                                                                                                     // 886
		},                                                                                                               // 887
                                                                                                                   // 888
		fill: function(){                                                                                                // 889
			var d = new Date(this.viewDate),                                                                                // 890
				year = d.getUTCFullYear(),                                                                                     // 891
				month = d.getUTCMonth(),                                                                                       // 892
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,                    // 893
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,                      // 894
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,                            // 895
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,                              // 896
				todaytxt = dates[this.o.language].today || dates['en'].today || '',                                            // 897
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',                                            // 898
				titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,                                   // 899
				tooltip;                                                                                                       // 900
			if (isNaN(year) || isNaN(month))                                                                                // 901
				return;                                                                                                        // 902
			this.picker.find('.datepicker-days thead .datepicker-switch')                                                   // 903
						.text(DPGlobal.formatDate(new UTCDate(year, month), titleFormat, this.o.language));                          // 904
			this.picker.find('tfoot .today')                                                                                // 905
						.text(todaytxt)                                                                                              // 906
						.toggle(this.o.todayBtn !== false);                                                                          // 907
			this.picker.find('tfoot .clear')                                                                                // 908
						.text(cleartxt)                                                                                              // 909
						.toggle(this.o.clearBtn !== false);                                                                          // 910
			this.picker.find('thead .datepicker-title')                                                                     // 911
						.text(this.o.title)                                                                                          // 912
						.toggle(this.o.title !== '');                                                                                // 913
			this.updateNavArrows();                                                                                         // 914
			this.fillMonths();                                                                                              // 915
			var prevMonth = UTCDate(year, month-1, 28),                                                                     // 916
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());                            // 917
			prevMonth.setUTCDate(day);                                                                                      // 918
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);                                   // 919
			var nextMonth = new Date(prevMonth);                                                                            // 920
			if (prevMonth.getUTCFullYear() < 100){                                                                          // 921
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());                                                      // 922
      }                                                                                                            // 923
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);                                                              // 924
			nextMonth = nextMonth.valueOf();                                                                                // 925
			var html = [];                                                                                                  // 926
			var clsName;                                                                                                    // 927
			while (prevMonth.valueOf() < nextMonth){                                                                        // 928
				if (prevMonth.getUTCDay() === this.o.weekStart){                                                               // 929
					html.push('<tr>');                                                                                            // 930
					if (this.o.calendarWeeks){                                                                                    // 931
						// ISO 8601: First week contains first thursday.                                                             // 932
						// ISO also states week starts on Monday, but we can be more abstract here.                                  // 933
						var                                                                                                          // 934
							// Start of current week: based on weekstart/current date                                                   // 935
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),                     // 936
							// Thursday of this week                                                                                    // 937
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),                                           // 938
							// First Thursday of year, year from thursday                                                               // 939
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),       // 940
							// Calendar week: ms between thursdays, div ms per day, div 7 days                                          // 941
							calWeek =  (th - yth) / 864e5 / 7 + 1;                                                                      // 942
						html.push('<td class="cw">'+ calWeek +'</td>');                                                              // 943
                                                                                                                   // 944
					}                                                                                                             // 945
				}                                                                                                              // 946
				clsName = this.getClassNames(prevMonth);                                                                       // 947
				clsName.push('day');                                                                                           // 948
                                                                                                                   // 949
				if (this.o.beforeShowDay !== $.noop){                                                                          // 950
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));                                             // 951
					if (before === undefined)                                                                                     // 952
						before = {};                                                                                                 // 953
					else if (typeof(before) === 'boolean')                                                                        // 954
						before = {enabled: before};                                                                                  // 955
					else if (typeof(before) === 'string')                                                                         // 956
						before = {classes: before};                                                                                  // 957
					if (before.enabled === false)                                                                                 // 958
						clsName.push('disabled');                                                                                    // 959
					if (before.classes)                                                                                           // 960
						clsName = clsName.concat(before.classes.split(/\s+/));                                                       // 961
					if (before.tooltip)                                                                                           // 962
						tooltip = before.tooltip;                                                                                    // 963
				}                                                                                                              // 964
                                                                                                                   // 965
				clsName = $.unique(clsName);                                                                                   // 966
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;                                                                                                // 968
				if (prevMonth.getUTCDay() === this.o.weekEnd){                                                                 // 969
					html.push('</tr>');                                                                                           // 970
				}                                                                                                              // 971
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);                                                                // 972
			}                                                                                                               // 973
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));                                       // 974
                                                                                                                   // 975
			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';                    // 976
			var months = this.picker.find('.datepicker-months')                                                             // 977
						.find('.datepicker-switch')                                                                                  // 978
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)                                                          // 979
							.end()                                                                                                      // 980
						.find('span').removeClass('active');                                                                         // 981
                                                                                                                   // 982
			$.each(this.dates, function(i, d){                                                                              // 983
				if (d.getUTCFullYear() === year)                                                                               // 984
					months.eq(d.getUTCMonth()).addClass('active');                                                                // 985
			});                                                                                                             // 986
                                                                                                                   // 987
			if (year < startYear || year > endYear){                                                                        // 988
				months.addClass('disabled');                                                                                   // 989
			}                                                                                                               // 990
			if (year === startYear){                                                                                        // 991
				months.slice(0, startMonth).addClass('disabled');                                                              // 992
			}                                                                                                               // 993
			if (year === endYear){                                                                                          // 994
				months.slice(endMonth+1).addClass('disabled');                                                                 // 995
			}                                                                                                               // 996
                                                                                                                   // 997
			if (this.o.beforeShowMonth !== $.noop){                                                                         // 998
				var that = this;                                                                                               // 999
				$.each(months, function(i, month){                                                                             // 1000
					if (!$(month).hasClass('disabled')) {                                                                         // 1001
						var moDate = new Date(year, i, 1);                                                                           // 1002
						var before = that.o.beforeShowMonth(moDate);                                                                 // 1003
						if (before === false)                                                                                        // 1004
							$(month).addClass('disabled');                                                                              // 1005
					}                                                                                                             // 1006
				});                                                                                                            // 1007
			}                                                                                                               // 1008
                                                                                                                   // 1009
			html = '';                                                                                                      // 1010
			year = parseInt(year/10, 10) * 10;                                                                              // 1011
			var yearCont = this.picker.find('.datepicker-years')                                                            // 1012
								.find('.datepicker-switch')                                                                                // 1013
									.text(year + '-' + (year + 9))                                                                            // 1014
									.end()                                                                                                    // 1015
								.find('td');                                                                                               // 1016
			year -= 1;                                                                                                      // 1017
			var years = $.map(this.dates, function(d){                                                                      // 1018
					return d.getUTCFullYear();                                                                                    // 1019
				}),                                                                                                            // 1020
				classes;                                                                                                       // 1021
			for (var i = -1; i < 11; i++){                                                                                  // 1022
				classes = ['year'];                                                                                            // 1023
				tooltip = null;                                                                                                // 1024
                                                                                                                   // 1025
				if (i === -1)                                                                                                  // 1026
					classes.push('old');                                                                                          // 1027
				else if (i === 10)                                                                                             // 1028
					classes.push('new');                                                                                          // 1029
				if ($.inArray(year, years) !== -1)                                                                             // 1030
					classes.push('active');                                                                                       // 1031
				if (year < startYear || year > endYear)                                                                        // 1032
					classes.push('disabled');                                                                                     // 1033
                                                                                                                   // 1034
				if (this.o.beforeShowYear !== $.noop) {                                                                        // 1035
					var yrBefore = this.o.beforeShowYear(new Date(year, 0, 1));                                                   // 1036
					if (yrBefore === undefined)                                                                                   // 1037
						yrBefore = {};                                                                                               // 1038
					else if (typeof(yrBefore) === 'boolean')                                                                      // 1039
						yrBefore = {enabled: yrBefore};                                                                              // 1040
					else if (typeof(yrBefore) === 'string')                                                                       // 1041
						yrBefore = {classes: yrBefore};                                                                              // 1042
					if (yrBefore.enabled === false)                                                                               // 1043
						classes.push('disabled');                                                                                    // 1044
					if (yrBefore.classes)                                                                                         // 1045
						classes = classes.concat(yrBefore.classes.split(/\s+/));                                                     // 1046
					if (yrBefore.tooltip)                                                                                         // 1047
						tooltip = yrBefore.tooltip;                                                                                  // 1048
				}                                                                                                              // 1049
                                                                                                                   // 1050
				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>' + year + '</span>';
				year += 1;                                                                                                     // 1052
			}                                                                                                               // 1053
			yearCont.html(html);                                                                                            // 1054
		},                                                                                                               // 1055
                                                                                                                   // 1056
		updateNavArrows: function(){                                                                                     // 1057
			if (!this._allow_update)                                                                                        // 1058
				return;                                                                                                        // 1059
                                                                                                                   // 1060
			var d = new Date(this.viewDate),                                                                                // 1061
				year = d.getUTCFullYear(),                                                                                     // 1062
				month = d.getUTCMonth();                                                                                       // 1063
			switch (this.viewMode){                                                                                         // 1064
				case 0:                                                                                                        // 1065
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});                                                       // 1067
					}                                                                                                             // 1068
					else {                                                                                                        // 1069
						this.picker.find('.prev').css({visibility: 'visible'});                                                      // 1070
					}                                                                                                             // 1071
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});                                                       // 1073
					}                                                                                                             // 1074
					else {                                                                                                        // 1075
						this.picker.find('.next').css({visibility: 'visible'});                                                      // 1076
					}                                                                                                             // 1077
					break;                                                                                                        // 1078
				case 1:                                                                                                        // 1079
				case 2:                                                                                                        // 1080
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2){   // 1081
						this.picker.find('.prev').css({visibility: 'hidden'});                                                       // 1082
					}                                                                                                             // 1083
					else {                                                                                                        // 1084
						this.picker.find('.prev').css({visibility: 'visible'});                                                      // 1085
					}                                                                                                             // 1086
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2){        // 1087
						this.picker.find('.next').css({visibility: 'hidden'});                                                       // 1088
					}                                                                                                             // 1089
					else {                                                                                                        // 1090
						this.picker.find('.next').css({visibility: 'visible'});                                                      // 1091
					}                                                                                                             // 1092
					break;                                                                                                        // 1093
			}                                                                                                               // 1094
		},                                                                                                               // 1095
                                                                                                                   // 1096
		click: function(e){                                                                                              // 1097
			e.preventDefault();                                                                                             // 1098
			e.stopPropagation();                                                                                            // 1099
			var target = $(e.target).closest('span, td, th'),                                                               // 1100
				year, month, day;                                                                                              // 1101
			if (target.length === 1){                                                                                       // 1102
				switch (target[0].nodeName.toLowerCase()){                                                                     // 1103
					case 'th':                                                                                                    // 1104
						switch (target[0].className){                                                                                // 1105
							case 'datepicker-switch':                                                                                   // 1106
								this.showMode(1);                                                                                          // 1107
								break;                                                                                                     // 1108
							case 'prev':                                                                                                // 1109
							case 'next':                                                                                                // 1110
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);               // 1111
								switch (this.viewMode){                                                                                    // 1112
									case 0:                                                                                                   // 1113
										this.viewDate = this.moveMonth(this.viewDate, dir);                                                      // 1114
										this._trigger('changeMonth', this.viewDate);                                                             // 1115
										break;                                                                                                   // 1116
									case 1:                                                                                                   // 1117
									case 2:                                                                                                   // 1118
										this.viewDate = this.moveYear(this.viewDate, dir);                                                       // 1119
										if (this.viewMode === 1)                                                                                 // 1120
											this._trigger('changeYear', this.viewDate);                                                             // 1121
										break;                                                                                                   // 1122
								}                                                                                                          // 1123
								this.fill();                                                                                               // 1124
								break;                                                                                                     // 1125
							case 'today':                                                                                               // 1126
								this.showMode(-2);                                                                                         // 1127
								var which = this.o.todayBtn === 'linked' ? null : 'view';                                                  // 1128
								this._setDate(UTCToday(), which);                                                                          // 1129
								break;                                                                                                     // 1130
							case 'clear':                                                                                               // 1131
								this.clearDates();                                                                                         // 1132
								break;                                                                                                     // 1133
						}                                                                                                            // 1134
						break;                                                                                                       // 1135
					case 'span':                                                                                                  // 1136
						if (!target.hasClass('disabled')){                                                                           // 1137
							this.viewDate.setUTCDate(1);                                                                                // 1138
							if (target.hasClass('month')){                                                                              // 1139
								day = 1;                                                                                                   // 1140
								month = target.parent().find('span').index(target);                                                        // 1141
								year = this.viewDate.getUTCFullYear();                                                                     // 1142
								this.viewDate.setUTCMonth(month);                                                                          // 1143
								this._trigger('changeMonth', this.viewDate);                                                               // 1144
								if (this.o.minViewMode === 1){                                                                             // 1145
									this._setDate(UTCDate(year, month, day));                                                                 // 1146
									this.showMode();                                                                                          // 1147
								} else {                                                                                                   // 1148
									this.showMode(-1);                                                                                        // 1149
								}                                                                                                          // 1150
							}                                                                                                           // 1151
							else {                                                                                                      // 1152
								day = 1;                                                                                                   // 1153
								month = 0;                                                                                                 // 1154
								year = parseInt(target.text(), 10)||0;                                                                     // 1155
								this.viewDate.setUTCFullYear(year);                                                                        // 1156
								this._trigger('changeYear', this.viewDate);                                                                // 1157
								if (this.o.minViewMode === 2){                                                                             // 1158
									this._setDate(UTCDate(year, month, day));                                                                 // 1159
								}                                                                                                          // 1160
								this.showMode(-1);                                                                                         // 1161
							}                                                                                                           // 1162
							this.fill();                                                                                                // 1163
						}                                                                                                            // 1164
						break;                                                                                                       // 1165
					case 'td':                                                                                                    // 1166
						if (target.hasClass('day') && !target.hasClass('disabled')){                                                 // 1167
							day = parseInt(target.text(), 10)||1;                                                                       // 1168
							year = this.viewDate.getUTCFullYear();                                                                      // 1169
							month = this.viewDate.getUTCMonth();                                                                        // 1170
							if (target.hasClass('old')){                                                                                // 1171
								if (month === 0){                                                                                          // 1172
									month = 11;                                                                                               // 1173
									year -= 1;                                                                                                // 1174
								}                                                                                                          // 1175
								else {                                                                                                     // 1176
									month -= 1;                                                                                               // 1177
								}                                                                                                          // 1178
							}                                                                                                           // 1179
							else if (target.hasClass('new')){                                                                           // 1180
								if (month === 11){                                                                                         // 1181
									month = 0;                                                                                                // 1182
									year += 1;                                                                                                // 1183
								}                                                                                                          // 1184
								else {                                                                                                     // 1185
									month += 1;                                                                                               // 1186
								}                                                                                                          // 1187
							}                                                                                                           // 1188
							this._setDate(UTCDate(year, month, day));                                                                   // 1189
						}                                                                                                            // 1190
						break;                                                                                                       // 1191
				}                                                                                                              // 1192
			}                                                                                                               // 1193
			if (this.picker.is(':visible') && this._focused_from){                                                          // 1194
				$(this._focused_from).focus();                                                                                 // 1195
			}                                                                                                               // 1196
			delete this._focused_from;                                                                                      // 1197
		},                                                                                                               // 1198
                                                                                                                   // 1199
		_toggle_multidate: function(date){                                                                               // 1200
			var ix = this.dates.contains(date);                                                                             // 1201
			if (!date){                                                                                                     // 1202
				this.dates.clear();                                                                                            // 1203
			}                                                                                                               // 1204
                                                                                                                   // 1205
			if (ix !== -1){                                                                                                 // 1206
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){                                 // 1207
					this.dates.remove(ix);                                                                                        // 1208
				}                                                                                                              // 1209
			} else if (this.o.multidate === false) {                                                                        // 1210
				this.dates.clear();                                                                                            // 1211
				this.dates.push(date);                                                                                         // 1212
			}                                                                                                               // 1213
			else {                                                                                                          // 1214
				this.dates.push(date);                                                                                         // 1215
			}                                                                                                               // 1216
                                                                                                                   // 1217
			if (typeof this.o.multidate === 'number')                                                                       // 1218
				while (this.dates.length > this.o.multidate)                                                                   // 1219
					this.dates.remove(0);                                                                                         // 1220
		},                                                                                                               // 1221
                                                                                                                   // 1222
		_setDate: function(date, which){                                                                                 // 1223
			if (!which || which === 'date')                                                                                 // 1224
				this._toggle_multidate(date && new Date(date));                                                                // 1225
			if (!which || which === 'view')                                                                                 // 1226
				this.viewDate = date && new Date(date);                                                                        // 1227
                                                                                                                   // 1228
			this.fill();                                                                                                    // 1229
			this.setValue();                                                                                                // 1230
			if (!which || which !== 'view') {                                                                               // 1231
				this._trigger('changeDate');                                                                                   // 1232
			}                                                                                                               // 1233
			var element;                                                                                                    // 1234
			if (this.isInput){                                                                                              // 1235
				element = this.element;                                                                                        // 1236
			}                                                                                                               // 1237
			else if (this.component){                                                                                       // 1238
				element = this.element.find('input');                                                                          // 1239
			}                                                                                                               // 1240
			if (element){                                                                                                   // 1241
				element.change();                                                                                              // 1242
			}                                                                                                               // 1243
			if (this.o.autoclose && (!which || which === 'date')){                                                          // 1244
				this.hide();                                                                                                   // 1245
			}                                                                                                               // 1246
		},                                                                                                               // 1247
                                                                                                                   // 1248
		moveDay: function(date, dir){                                                                                    // 1249
			var newDate = new Date(date);                                                                                   // 1250
			newDate.setUTCDate(date.getUTCDate() + dir);                                                                    // 1251
                                                                                                                   // 1252
			return newDate;                                                                                                 // 1253
		},                                                                                                               // 1254
                                                                                                                   // 1255
		moveWeek: function(date, dir){                                                                                   // 1256
			return this.moveDay(date, dir * 7);                                                                             // 1257
		},                                                                                                               // 1258
                                                                                                                   // 1259
		moveMonth: function(date, dir){                                                                                  // 1260
			if (!isValidDate(date))                                                                                         // 1261
				return this.o.defaultViewDate;                                                                                 // 1262
			if (!dir)                                                                                                       // 1263
				return date;                                                                                                   // 1264
			var new_date = new Date(date.valueOf()),                                                                        // 1265
				day = new_date.getUTCDate(),                                                                                   // 1266
				month = new_date.getUTCMonth(),                                                                                // 1267
				mag = Math.abs(dir),                                                                                           // 1268
				new_month, test;                                                                                               // 1269
			dir = dir > 0 ? 1 : -1;                                                                                         // 1270
			if (mag === 1){                                                                                                 // 1271
				test = dir === -1                                                                                              // 1272
					// If going back one month, make sure month is not current month                                              // 1273
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)                                                               // 1274
					? function(){                                                                                                 // 1275
						return new_date.getUTCMonth() === month;                                                                     // 1276
					}                                                                                                             // 1277
					// If going forward one month, make sure month is as expected                                                 // 1278
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)                                                               // 1279
					: function(){                                                                                                 // 1280
						return new_date.getUTCMonth() !== new_month;                                                                 // 1281
					};                                                                                                            // 1282
				new_month = month + dir;                                                                                       // 1283
				new_date.setUTCMonth(new_month);                                                                               // 1284
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11                                           // 1285
				if (new_month < 0 || new_month > 11)                                                                           // 1286
					new_month = (new_month + 12) % 12;                                                                            // 1287
			}                                                                                                               // 1288
			else {                                                                                                          // 1289
				// For magnitudes >1, move one month at a time...                                                              // 1290
				for (var i=0; i < mag; i++)                                                                                    // 1291
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...                                             // 1292
					new_date = this.moveMonth(new_date, dir);                                                                     // 1293
				// ...then reset the day, keeping it in the new month                                                          // 1294
				new_month = new_date.getUTCMonth();                                                                            // 1295
				new_date.setUTCDate(day);                                                                                      // 1296
				test = function(){                                                                                             // 1297
					return new_month !== new_date.getUTCMonth();                                                                  // 1298
				};                                                                                                             // 1299
			}                                                                                                               // 1300
			// Common date-resetting loop -- if date is beyond end of month, make it                                        // 1301
			// end of month                                                                                                 // 1302
			while (test()){                                                                                                 // 1303
				new_date.setUTCDate(--day);                                                                                    // 1304
				new_date.setUTCMonth(new_month);                                                                               // 1305
			}                                                                                                               // 1306
			return new_date;                                                                                                // 1307
		},                                                                                                               // 1308
                                                                                                                   // 1309
		moveYear: function(date, dir){                                                                                   // 1310
			return this.moveMonth(date, dir*12);                                                                            // 1311
		},                                                                                                               // 1312
                                                                                                                   // 1313
		moveAvailableDate: function(date, dir, fn){                                                                      // 1314
			do {                                                                                                            // 1315
				date = this[fn](date, dir);                                                                                    // 1316
                                                                                                                   // 1317
				if (!this.dateWithinRange(date))                                                                               // 1318
					return false;                                                                                                 // 1319
                                                                                                                   // 1320
				fn = 'moveDay';                                                                                                // 1321
			}                                                                                                               // 1322
			while (this.dateIsDisabled(date));                                                                              // 1323
                                                                                                                   // 1324
			return date;                                                                                                    // 1325
		},                                                                                                               // 1326
                                                                                                                   // 1327
		weekOfDateIsDisabled: function(date){                                                                            // 1328
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;                                           // 1329
		},                                                                                                               // 1330
                                                                                                                   // 1331
		dateIsDisabled: function(date){                                                                                  // 1332
			return (                                                                                                        // 1333
				this.weekOfDateIsDisabled(date) ||                                                                             // 1334
				$.grep(this.o.datesDisabled, function(d){                                                                      // 1335
					return isUTCEquals(date, d);                                                                                  // 1336
				}).length > 0                                                                                                  // 1337
			);                                                                                                              // 1338
		},                                                                                                               // 1339
                                                                                                                   // 1340
		dateWithinRange: function(date){                                                                                 // 1341
			return date >= this.o.startDate && date <= this.o.endDate;                                                      // 1342
		},                                                                                                               // 1343
                                                                                                                   // 1344
		keydown: function(e){                                                                                            // 1345
			if (!this.picker.is(':visible')){                                                                               // 1346
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker                                    // 1347
					this.show();                                                                                                  // 1348
					e.stopPropagation();                                                                                          // 1349
        }                                                                                                          // 1350
				return;                                                                                                        // 1351
			}                                                                                                               // 1352
			var dateChanged = false,                                                                                        // 1353
				dir, newViewDate,                                                                                              // 1354
				focusDate = this.focusDate || this.viewDate;                                                                   // 1355
			switch (e.keyCode){                                                                                             // 1356
				case 27: // escape                                                                                             // 1357
					if (this.focusDate){                                                                                          // 1358
						this.focusDate = null;                                                                                       // 1359
						this.viewDate = this.dates.get(-1) || this.viewDate;                                                         // 1360
						this.fill();                                                                                                 // 1361
					}                                                                                                             // 1362
					else                                                                                                          // 1363
						this.hide();                                                                                                 // 1364
					e.preventDefault();                                                                                           // 1365
					e.stopPropagation();                                                                                          // 1366
					break;                                                                                                        // 1367
				case 37: // left                                                                                               // 1368
				case 38: // up                                                                                                 // 1369
				case 39: // right                                                                                              // 1370
				case 40: // down                                                                                               // 1371
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)                                     // 1372
						break;                                                                                                       // 1373
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;                                                          // 1374
					if (e.ctrlKey){                                                                                               // 1375
						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');                                            // 1376
                                                                                                                   // 1377
						if (newViewDate)                                                                                             // 1378
							this._trigger('changeYear', this.viewDate);                                                                 // 1379
					}                                                                                                             // 1380
					else if (e.shiftKey){                                                                                         // 1381
						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');                                           // 1382
                                                                                                                   // 1383
						if (newViewDate)                                                                                             // 1384
							this._trigger('changeMonth', this.viewDate);                                                                // 1385
					}                                                                                                             // 1386
					else if (e.keyCode === 37 || e.keyCode === 39){                                                               // 1387
						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');                                             // 1388
					}                                                                                                             // 1389
					else if (!this.weekOfDateIsDisabled(focusDate)){                                                              // 1390
						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');                                            // 1391
					}                                                                                                             // 1392
					if (newViewDate){                                                                                             // 1393
						this.focusDate = this.viewDate = newViewDate;                                                                // 1394
						this.setValue();                                                                                             // 1395
						this.fill();                                                                                                 // 1396
						e.preventDefault();                                                                                          // 1397
					}                                                                                                             // 1398
					break;                                                                                                        // 1399
				case 13: // enter                                                                                              // 1400
					if (!this.o.forceParse)                                                                                       // 1401
						break;                                                                                                       // 1402
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;                                            // 1403
					if (this.o.keyboardNavigation) {                                                                              // 1404
						this._toggle_multidate(focusDate);                                                                           // 1405
						dateChanged = true;                                                                                          // 1406
					}                                                                                                             // 1407
					this.focusDate = null;                                                                                        // 1408
					this.viewDate = this.dates.get(-1) || this.viewDate;                                                          // 1409
					this.setValue();                                                                                              // 1410
					this.fill();                                                                                                  // 1411
					if (this.picker.is(':visible')){                                                                              // 1412
						e.preventDefault();                                                                                          // 1413
						e.stopPropagation();                                                                                         // 1414
						if (this.o.autoclose)                                                                                        // 1415
							this.hide();                                                                                                // 1416
					}                                                                                                             // 1417
					break;                                                                                                        // 1418
				case 9: // tab                                                                                                 // 1419
					this.focusDate = null;                                                                                        // 1420
					this.viewDate = this.dates.get(-1) || this.viewDate;                                                          // 1421
					this.fill();                                                                                                  // 1422
					this.hide();                                                                                                  // 1423
					break;                                                                                                        // 1424
			}                                                                                                               // 1425
			if (dateChanged){                                                                                               // 1426
				if (this.dates.length)                                                                                         // 1427
					this._trigger('changeDate');                                                                                  // 1428
				else                                                                                                           // 1429
					this._trigger('clearDate');                                                                                   // 1430
				var element;                                                                                                   // 1431
				if (this.isInput){                                                                                             // 1432
					element = this.element;                                                                                       // 1433
				}                                                                                                              // 1434
				else if (this.component){                                                                                      // 1435
					element = this.element.find('input');                                                                         // 1436
				}                                                                                                              // 1437
				if (element){                                                                                                  // 1438
					element.change();                                                                                             // 1439
				}                                                                                                              // 1440
			}                                                                                                               // 1441
		},                                                                                                               // 1442
                                                                                                                   // 1443
		showMode: function(dir){                                                                                         // 1444
			if (dir){                                                                                                       // 1445
				this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));               // 1446
			}                                                                                                               // 1447
			this.picker                                                                                                     // 1448
				.children('div')                                                                                               // 1449
				.hide()                                                                                                        // 1450
				.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)                                                // 1451
					.show();                                                                                                      // 1452
			this.updateNavArrows();                                                                                         // 1453
		}                                                                                                                // 1454
	};                                                                                                                // 1455
                                                                                                                   // 1456
	var DateRangePicker = function(element, options){                                                                 // 1457
		$(element).data('datepicker', this);                                                                             // 1458
		this.element = $(element);                                                                                       // 1459
		this.inputs = $.map(options.inputs, function(i){                                                                 // 1460
			return i.jquery ? i[0] : i;                                                                                     // 1461
		});                                                                                                              // 1462
		delete options.inputs;                                                                                           // 1463
                                                                                                                   // 1464
		datepickerPlugin.call($(this.inputs), options)                                                                   // 1465
			.on('changeDate', $.proxy(this.dateUpdated, this));                                                             // 1466
                                                                                                                   // 1467
		this.pickers = $.map(this.inputs, function(i){                                                                   // 1468
			return $(i).data('datepicker');                                                                                 // 1469
		});                                                                                                              // 1470
		this.updateDates();                                                                                              // 1471
	};                                                                                                                // 1472
	DateRangePicker.prototype = {                                                                                     // 1473
		updateDates: function(){                                                                                         // 1474
			this.dates = $.map(this.pickers, function(i){                                                                   // 1475
				return i.getUTCDate();                                                                                         // 1476
			});                                                                                                             // 1477
			this.updateRanges();                                                                                            // 1478
		},                                                                                                               // 1479
		updateRanges: function(){                                                                                        // 1480
			var range = $.map(this.dates, function(d){                                                                      // 1481
				return d.valueOf();                                                                                            // 1482
			});                                                                                                             // 1483
			$.each(this.pickers, function(i, p){                                                                            // 1484
				p.setRange(range);                                                                                             // 1485
			});                                                                                                             // 1486
		},                                                                                                               // 1487
		dateUpdated: function(e){                                                                                        // 1488
			// `this.updating` is a workaround for preventing infinite recursion                                            // 1489
			// between `changeDate` triggering and `setUTCDate` calling.  Until                                             // 1490
			// there is a better mechanism.                                                                                 // 1491
			if (this.updating)                                                                                              // 1492
				return;                                                                                                        // 1493
			this.updating = true;                                                                                           // 1494
                                                                                                                   // 1495
			var dp = $(e.target).data('datepicker');                                                                        // 1496
                                                                                                                   // 1497
			if (typeof(dp) === "undefined") {                                                                               // 1498
				return;                                                                                                        // 1499
			}                                                                                                               // 1500
                                                                                                                   // 1501
			var new_date = dp.getUTCDate(),                                                                                 // 1502
				i = $.inArray(e.target, this.inputs),                                                                          // 1503
				j = i - 1,                                                                                                     // 1504
				k = i + 1,                                                                                                     // 1505
				l = this.inputs.length;                                                                                        // 1506
			if (i === -1)                                                                                                   // 1507
				return;                                                                                                        // 1508
                                                                                                                   // 1509
			$.each(this.pickers, function(i, p){                                                                            // 1510
				if (!p.getUTCDate())                                                                                           // 1511
					p.setUTCDate(new_date);                                                                                       // 1512
			});                                                                                                             // 1513
                                                                                                                   // 1514
			if (new_date < this.dates[j]){                                                                                  // 1515
				// Date being moved earlier/left                                                                               // 1516
				while (j >= 0 && new_date < this.dates[j]){                                                                    // 1517
					this.pickers[j--].setUTCDate(new_date);                                                                       // 1518
				}                                                                                                              // 1519
			}                                                                                                               // 1520
			else if (new_date > this.dates[k]){                                                                             // 1521
				// Date being moved later/right                                                                                // 1522
				while (k < l && new_date > this.dates[k]){                                                                     // 1523
					this.pickers[k++].setUTCDate(new_date);                                                                       // 1524
				}                                                                                                              // 1525
			}                                                                                                               // 1526
			this.updateDates();                                                                                             // 1527
                                                                                                                   // 1528
			delete this.updating;                                                                                           // 1529
		},                                                                                                               // 1530
		remove: function(){                                                                                              // 1531
			$.map(this.pickers, function(p){ p.remove(); });                                                                // 1532
			delete this.element.data().datepicker;                                                                          // 1533
		}                                                                                                                // 1534
	};                                                                                                                // 1535
                                                                                                                   // 1536
	function opts_from_el(el, prefix){                                                                                // 1537
		// Derive options from element data-attrs                                                                        // 1538
		var data = $(el).data(),                                                                                         // 1539
			out = {}, inkey,                                                                                                // 1540
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');                                                   // 1541
		prefix = new RegExp('^' + prefix.toLowerCase());                                                                 // 1542
		function re_lower(_,a){                                                                                          // 1543
			return a.toLowerCase();                                                                                         // 1544
		}                                                                                                                // 1545
		for (var key in data)                                                                                            // 1546
			if (prefix.test(key)){                                                                                          // 1547
				inkey = key.replace(replace, re_lower);                                                                        // 1548
				out[inkey] = data[key];                                                                                        // 1549
			}                                                                                                               // 1550
		return out;                                                                                                      // 1551
	}                                                                                                                 // 1552
                                                                                                                   // 1553
	function opts_from_locale(lang){                                                                                  // 1554
		// Derive options from locale plugins                                                                            // 1555
		var out = {};                                                                                                    // 1556
		// Check if "de-DE" style date is available, if not language should                                              // 1557
		// fallback to 2 letter code eg "de"                                                                             // 1558
		if (!dates[lang]){                                                                                               // 1559
			lang = lang.split('-')[0];                                                                                      // 1560
			if (!dates[lang])                                                                                               // 1561
				return;                                                                                                        // 1562
		}                                                                                                                // 1563
		var d = dates[lang];                                                                                             // 1564
		$.each(locale_opts, function(i,k){                                                                               // 1565
			if (k in d)                                                                                                     // 1566
				out[k] = d[k];                                                                                                 // 1567
		});                                                                                                              // 1568
		return out;                                                                                                      // 1569
	}                                                                                                                 // 1570
                                                                                                                   // 1571
	var old = $.fn.datepicker;                                                                                        // 1572
	var datepickerPlugin = function(option){                                                                          // 1573
		var args = Array.apply(null, arguments);                                                                         // 1574
		args.shift();                                                                                                    // 1575
		var internal_return;                                                                                             // 1576
		this.each(function(){                                                                                            // 1577
			var $this = $(this),                                                                                            // 1578
				data = $this.data('datepicker'),                                                                               // 1579
				options = typeof option === 'object' && option;                                                                // 1580
			if (!data){                                                                                                     // 1581
				var elopts = opts_from_el(this, 'date'),                                                                       // 1582
					// Preliminary otions                                                                                         // 1583
					xopts = $.extend({}, defaults, elopts, options),                                                              // 1584
					locopts = opts_from_locale(xopts.language),                                                                   // 1585
					// Options priority: js args, data-attrs, locales, defaults                                                   // 1586
					opts = $.extend({}, defaults, locopts, elopts, options);                                                      // 1587
				if ($this.hasClass('input-daterange') || opts.inputs){                                                         // 1588
					$.extend(opts, {                                                                                              // 1589
						inputs: opts.inputs || $this.find('input').toArray()                                                         // 1590
					});                                                                                                           // 1591
					data = new DateRangePicker(this, opts);                                                                       // 1592
				}                                                                                                              // 1593
				else {                                                                                                         // 1594
					data = new Datepicker(this, opts);                                                                            // 1595
				}                                                                                                              // 1596
				$this.data('datepicker', data);                                                                                // 1597
			}                                                                                                               // 1598
			if (typeof option === 'string' && typeof data[option] === 'function'){                                          // 1599
				internal_return = data[option].apply(data, args);                                                              // 1600
			}                                                                                                               // 1601
		});                                                                                                              // 1602
                                                                                                                   // 1603
		if (                                                                                                             // 1604
			internal_return === undefined ||                                                                                // 1605
			internal_return instanceof Datepicker ||                                                                        // 1606
			internal_return instanceof DateRangePicker                                                                      // 1607
		)                                                                                                                // 1608
			return this;                                                                                                    // 1609
                                                                                                                   // 1610
		if (this.length > 1)                                                                                             // 1611
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');         // 1612
		else                                                                                                             // 1613
			return internal_return;                                                                                         // 1614
	};                                                                                                                // 1615
	$.fn.datepicker = datepickerPlugin;                                                                               // 1616
                                                                                                                   // 1617
	var defaults = $.fn.datepicker.defaults = {                                                                       // 1618
		autoclose: false,                                                                                                // 1619
		beforeShowDay: $.noop,                                                                                           // 1620
		beforeShowMonth: $.noop,                                                                                         // 1621
		beforeShowYear: $.noop,                                                                                          // 1622
		calendarWeeks: false,                                                                                            // 1623
		clearBtn: false,                                                                                                 // 1624
		toggleActive: false,                                                                                             // 1625
		daysOfWeekDisabled: [],                                                                                          // 1626
		daysOfWeekHighlighted: [],                                                                                       // 1627
		datesDisabled: [],                                                                                               // 1628
		endDate: Infinity,                                                                                               // 1629
		forceParse: true,                                                                                                // 1630
		format: 'mm/dd/yyyy',                                                                                            // 1631
		keyboardNavigation: true,                                                                                        // 1632
		language: 'en',                                                                                                  // 1633
		minViewMode: 0,                                                                                                  // 1634
		maxViewMode: 2,                                                                                                  // 1635
		multidate: false,                                                                                                // 1636
		multidateSeparator: ',',                                                                                         // 1637
		orientation: "auto",                                                                                             // 1638
		rtl: false,                                                                                                      // 1639
		startDate: -Infinity,                                                                                            // 1640
		startView: 0,                                                                                                    // 1641
		todayBtn: false,                                                                                                 // 1642
		todayHighlight: false,                                                                                           // 1643
		weekStart: 0,                                                                                                    // 1644
		disableTouchKeyboard: false,                                                                                     // 1645
		enableOnReadonly: true,                                                                                          // 1646
		showOnFocus: true,                                                                                               // 1647
		zIndexOffset: 10,                                                                                                // 1648
		container: 'body',                                                                                               // 1649
		immediateUpdates: false,                                                                                         // 1650
		title: ''                                                                                                        // 1651
	};                                                                                                                // 1652
	var locale_opts = $.fn.datepicker.locale_opts = [                                                                 // 1653
		'format',                                                                                                        // 1654
		'rtl',                                                                                                           // 1655
		'weekStart'                                                                                                      // 1656
	];                                                                                                                // 1657
	$.fn.datepicker.Constructor = Datepicker;                                                                         // 1658
	var dates = $.fn.datepicker.dates = {                                                                             // 1659
		en: {                                                                                                            // 1660
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],                           // 1661
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],                                                   // 1662
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],                                                            // 1663
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],              // 1665
			today: "Today",                                                                                                 // 1666
			clear: "Clear",                                                                                                 // 1667
			titleFormat: "MM yyyy"                                                                                          // 1668
		}                                                                                                                // 1669
	};                                                                                                                // 1670
                                                                                                                   // 1671
	var DPGlobal = {                                                                                                  // 1672
		modes: [                                                                                                         // 1673
			{                                                                                                               // 1674
				clsName: 'days',                                                                                               // 1675
				navFnc: 'Month',                                                                                               // 1676
				navStep: 1                                                                                                     // 1677
			},                                                                                                              // 1678
			{                                                                                                               // 1679
				clsName: 'months',                                                                                             // 1680
				navFnc: 'FullYear',                                                                                            // 1681
				navStep: 1                                                                                                     // 1682
			},                                                                                                              // 1683
			{                                                                                                               // 1684
				clsName: 'years',                                                                                              // 1685
				navFnc: 'FullYear',                                                                                            // 1686
				navStep: 10                                                                                                    // 1687
		}],                                                                                                              // 1688
		isLeapYear: function(year){                                                                                      // 1689
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));                                        // 1690
		},                                                                                                               // 1691
		getDaysInMonth: function(year, month){                                                                           // 1692
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];              // 1693
		},                                                                                                               // 1694
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,                                                                        // 1695
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,                                                        // 1696
		parseFormat: function(format){                                                                                   // 1697
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')                             // 1698
                return format;                                                                                     // 1699
            // IE treats \0 as a string end in inputs (truncating the value),                                      // 1700
			// so it's a bad format delimiter, anyway                                                                       // 1701
			var separators = format.replace(this.validParts, '\0').split('\0'),                                             // 1702
				parts = format.match(this.validParts);                                                                         // 1703
			if (!separators || !separators.length || !parts || parts.length === 0){                                         // 1704
				throw new Error("Invalid date format.");                                                                       // 1705
			}                                                                                                               // 1706
			return {separators: separators, parts: parts};                                                                  // 1707
		},                                                                                                               // 1708
		parseDate: function(date, format, language){                                                                     // 1709
			if (!date)                                                                                                      // 1710
				return undefined;                                                                                              // 1711
			if (date instanceof Date)                                                                                       // 1712
				return date;                                                                                                   // 1713
			if (typeof format === 'string')                                                                                 // 1714
				format = DPGlobal.parseFormat(format);                                                                         // 1715
			if (format.toValue)                                                                                             // 1716
                return format.toValue(date, format, language);                                                     // 1717
            var part_re = /([\-+]\d+)([dmwy])/,                                                                    // 1718
				parts = date.match(/([\-+]\d+)([dmwy])/g),                                                                     // 1719
				fn_map = {                                                                                                     // 1720
					d: 'moveDay',                                                                                                 // 1721
					m: 'moveMonth',                                                                                               // 1722
					w: 'moveWeek',                                                                                                // 1723
					y: 'moveYear'                                                                                                 // 1724
				},                                                                                                             // 1725
				part, dir, i, fn;                                                                                              // 1726
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){                                                      // 1727
				date = new Date();                                                                                             // 1728
				for (i=0; i < parts.length; i++){                                                                              // 1729
					part = part_re.exec(parts[i]);                                                                                // 1730
					dir = parseInt(part[1]);                                                                                      // 1731
					fn = fn_map[part[2]];                                                                                         // 1732
					date = Datepicker.prototype[fn](date, dir);                                                                   // 1733
				}                                                                                                              // 1734
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());                                  // 1735
			}                                                                                                               // 1736
			parts = date && date.match(this.nonpunctuation) || [];                                                          // 1737
			date = new Date();                                                                                              // 1738
			var parsed = {},                                                                                                // 1739
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],                                               // 1740
				setters_map = {                                                                                                // 1741
					yyyy: function(d,v){                                                                                          // 1742
						return d.setUTCFullYear(v);                                                                                  // 1743
					},                                                                                                            // 1744
					yy: function(d,v){                                                                                            // 1745
						return d.setUTCFullYear(2000+v);                                                                             // 1746
					},                                                                                                            // 1747
					m: function(d,v){                                                                                             // 1748
						if (isNaN(d))                                                                                                // 1749
							return d;                                                                                                   // 1750
						v -= 1;                                                                                                      // 1751
						while (v < 0) v += 12;                                                                                       // 1752
						v %= 12;                                                                                                     // 1753
						d.setUTCMonth(v);                                                                                            // 1754
						while (d.getUTCMonth() !== v)                                                                                // 1755
							d.setUTCDate(d.getUTCDate()-1);                                                                             // 1756
						return d;                                                                                                    // 1757
					},                                                                                                            // 1758
					d: function(d,v){                                                                                             // 1759
						return d.setUTCDate(v);                                                                                      // 1760
					}                                                                                                             // 1761
				},                                                                                                             // 1762
				val, filtered;                                                                                                 // 1763
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];                                    // 1764
			setters_map['dd'] = setters_map['d'];                                                                           // 1765
			date = UTCToday();                                                                                              // 1766
			var fparts = format.parts.slice();                                                                              // 1767
			// Remove noop parts                                                                                            // 1768
			if (parts.length !== fparts.length){                                                                            // 1769
				fparts = $(fparts).filter(function(i,p){                                                                       // 1770
					return $.inArray(p, setters_order) !== -1;                                                                    // 1771
				}).toArray();                                                                                                  // 1772
			}                                                                                                               // 1773
			// Process remainder                                                                                            // 1774
			function match_part(){                                                                                          // 1775
				var m = this.slice(0, parts[i].length),                                                                        // 1776
					p = parts[i].slice(0, m.length);                                                                              // 1777
				return m.toLowerCase() === p.toLowerCase();                                                                    // 1778
			}                                                                                                               // 1779
			if (parts.length === fparts.length){                                                                            // 1780
				var cnt;                                                                                                       // 1781
				for (i=0, cnt = fparts.length; i < cnt; i++){                                                                  // 1782
					val = parseInt(parts[i], 10);                                                                                 // 1783
					part = fparts[i];                                                                                             // 1784
					if (isNaN(val)){                                                                                              // 1785
						switch (part){                                                                                               // 1786
							case 'MM':                                                                                                  // 1787
								filtered = $(dates[language].months).filter(match_part);                                                   // 1788
								val = $.inArray(filtered[0], dates[language].months) + 1;                                                  // 1789
								break;                                                                                                     // 1790
							case 'M':                                                                                                   // 1791
								filtered = $(dates[language].monthsShort).filter(match_part);                                              // 1792
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;                                             // 1793
								break;                                                                                                     // 1794
						}                                                                                                            // 1795
					}                                                                                                             // 1796
					parsed[part] = val;                                                                                           // 1797
				}                                                                                                              // 1798
				var _date, s;                                                                                                  // 1799
				for (i=0; i < setters_order.length; i++){                                                                      // 1800
					s = setters_order[i];                                                                                         // 1801
					if (s in parsed && !isNaN(parsed[s])){                                                                        // 1802
						_date = new Date(date);                                                                                      // 1803
						setters_map[s](_date, parsed[s]);                                                                            // 1804
						if (!isNaN(_date))                                                                                           // 1805
							date = _date;                                                                                               // 1806
					}                                                                                                             // 1807
				}                                                                                                              // 1808
			}                                                                                                               // 1809
			return date;                                                                                                    // 1810
		},                                                                                                               // 1811
		formatDate: function(date, format, language){                                                                    // 1812
			if (!date)                                                                                                      // 1813
				return '';                                                                                                     // 1814
			if (typeof format === 'string')                                                                                 // 1815
				format = DPGlobal.parseFormat(format);                                                                         // 1816
			if (format.toDisplay)                                                                                           // 1817
                return format.toDisplay(date, format, language);                                                   // 1818
            var val = {                                                                                            // 1819
				d: date.getUTCDate(),                                                                                          // 1820
				D: dates[language].daysShort[date.getUTCDay()],                                                                // 1821
				DD: dates[language].days[date.getUTCDay()],                                                                    // 1822
				m: date.getUTCMonth() + 1,                                                                                     // 1823
				M: dates[language].monthsShort[date.getUTCMonth()],                                                            // 1824
				MM: dates[language].months[date.getUTCMonth()],                                                                // 1825
				yy: date.getUTCFullYear().toString().substring(2),                                                             // 1826
				yyyy: date.getUTCFullYear()                                                                                    // 1827
			};                                                                                                              // 1828
			val.dd = (val.d < 10 ? '0' : '') + val.d;                                                                       // 1829
			val.mm = (val.m < 10 ? '0' : '') + val.m;                                                                       // 1830
			date = [];                                                                                                      // 1831
			var seps = $.extend([], format.separators);                                                                     // 1832
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){                                                        // 1833
				if (seps.length)                                                                                               // 1834
					date.push(seps.shift());                                                                                      // 1835
				date.push(val[format.parts[i]]);                                                                               // 1836
			}                                                                                                               // 1837
			return date.join('');                                                                                           // 1838
		},                                                                                                               // 1839
		headTemplate: '<thead>'+                                                                                         // 1840
			              '<tr>'+                                                                                           // 1841
			                '<th colspan="7" class="datepicker-title"></th>'+                                               // 1842
			              '</tr>'+                                                                                          // 1843
							'<tr>'+                                                                                                     // 1844
								'<th class="prev">&#171;</th>'+                                                                            // 1845
								'<th colspan="5" class="datepicker-switch"></th>'+                                                         // 1846
								'<th class="next">&#187;</th>'+                                                                            // 1847
							'</tr>'+                                                                                                    // 1848
						'</thead>',                                                                                                  // 1849
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',                                                   // 1850
		footTemplate: '<tfoot>'+                                                                                         // 1851
							'<tr>'+                                                                                                     // 1852
								'<th colspan="7" class="today"></th>'+                                                                     // 1853
							'</tr>'+                                                                                                    // 1854
							'<tr>'+                                                                                                     // 1855
								'<th colspan="7" class="clear"></th>'+                                                                     // 1856
							'</tr>'+                                                                                                    // 1857
						'</tfoot>'                                                                                                   // 1858
	};                                                                                                                // 1859
	DPGlobal.template = '<div class="datepicker">'+                                                                   // 1860
							'<div class="datepicker-days">'+                                                                            // 1861
								'<table class=" table-condensed">'+                                                                        // 1862
									DPGlobal.headTemplate+                                                                                    // 1863
									'<tbody></tbody>'+                                                                                        // 1864
									DPGlobal.footTemplate+                                                                                    // 1865
								'</table>'+                                                                                                // 1866
							'</div>'+                                                                                                   // 1867
							'<div class="datepicker-months">'+                                                                          // 1868
								'<table class="table-condensed">'+                                                                         // 1869
									DPGlobal.headTemplate+                                                                                    // 1870
									DPGlobal.contTemplate+                                                                                    // 1871
									DPGlobal.footTemplate+                                                                                    // 1872
								'</table>'+                                                                                                // 1873
							'</div>'+                                                                                                   // 1874
							'<div class="datepicker-years">'+                                                                           // 1875
								'<table class="table-condensed">'+                                                                         // 1876
									DPGlobal.headTemplate+                                                                                    // 1877
									DPGlobal.contTemplate+                                                                                    // 1878
									DPGlobal.footTemplate+                                                                                    // 1879
								'</table>'+                                                                                                // 1880
							'</div>'+                                                                                                   // 1881
						'</div>';                                                                                                    // 1882
                                                                                                                   // 1883
	$.fn.datepicker.DPGlobal = DPGlobal;                                                                              // 1884
                                                                                                                   // 1885
                                                                                                                   // 1886
	/* DATEPICKER NO CONFLICT                                                                                         // 1887
	* =================== */                                                                                          // 1888
                                                                                                                   // 1889
	$.fn.datepicker.noConflict = function(){                                                                          // 1890
		$.fn.datepicker = old;                                                                                           // 1891
		return this;                                                                                                     // 1892
	};                                                                                                                // 1893
                                                                                                                   // 1894
	/* DATEPICKER VERSION                                                                                             // 1895
	 * =================== */                                                                                         // 1896
	$.fn.datepicker.version = '1.5.1';                                                                                // 1897
                                                                                                                   // 1898
	/* DATEPICKER DATA-API                                                                                            // 1899
	* ================== */                                                                                           // 1900
                                                                                                                   // 1901
	$(document).on(                                                                                                   // 1902
		'focus.datepicker.data-api click.datepicker.data-api',                                                           // 1903
		'[data-provide="datepicker"]',                                                                                   // 1904
		function(e){                                                                                                     // 1905
			var $this = $(this);                                                                                            // 1906
			if ($this.data('datepicker'))                                                                                   // 1907
				return;                                                                                                        // 1908
			e.preventDefault();                                                                                             // 1909
			// component click requires us to explicitly show it                                                            // 1910
			datepickerPlugin.call($this, 'show');                                                                           // 1911
		}                                                                                                                // 1912
	);                                                                                                                // 1913
	$(function(){                                                                                                     // 1914
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));                                                  // 1915
	});                                                                                                               // 1916
                                                                                                                   // 1917
}));                                                                                                               // 1918
                                                                                                                   // 1919
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rajit:bootstrap3-datepicker'] = {};

})();
