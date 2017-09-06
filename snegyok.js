this.Snegyok = (function() {

	return function(entry, confs) {
		var self = this;

		// Public props
		this.entry = entry;
		this.data = confs;
		this.template = confs.template;

		
		// Private data
		var	entry = document.querySelector(this.entry);
		var startHTML = this.template;
		var view = startHTML;
		var dataArray = Object.keys(this.data);


		// Props substitution
		this.propsSubst = function() {
			view = startHTML;
			function key(index) {
				return Object.keys(self.data)[index];
			}
			for (var i = 0; i < dataArray.length; i++) {
				var pattern = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g');
				if (typeof view === 'undefined') {
					throw new Error('"template" prop of current instance does not exist or it is empty!');
				}
			  view = view.replace(pattern, self.data[key(i)]);
			}
			return view;
		}


		// Loop for arrays
		this.forArray = function() {
			var	splittedArrays = [];
			var	allLoopsArray = view.match(/\(\* for[\s\S]*?endfor \*\)/gm);
			if (allLoopsArray === null) return;
			var	removeEnds = allLoopsArray.map(function(i) {
				return i
					.replace(['(* endfor *)'], '')
					.replace('(* for', '');
			});
			for (var i = 0; i < removeEnds.length; i++) {
				var newArr = [];
				newArr.push(removeEnds[i].trim().split(/\*\)$/gm));
				splittedArrays.push(newArr);
			}
			for (var i = 0; i < splittedArrays.length; i++) {
				var curList = splittedArrays[i][0][0].replace(/\s*/g,'');
				var	curHTML = splittedArrays[i][0][1];
				var dataList = self.data[curList];
				var newHTML = '';
				var	pattern = new RegExp(
					'\\(\\* for ' + curList + ' [\\s\\S]*?endfor \\*\\)', 'g'
				);
				for (var j = 0; j < (dataList ? dataList.length : null); j++) {
					var currentItemInList = dataList[j];
					newHTML += curHTML.replace('(* item *)', currentItemInList);
				}
				view = view.replace(pattern, newHTML);
			}
			return view;
		};


		// Loop for objects
		this.forObj = function() {
			var	splittedArrays = [];
			var	allLoopsArray = view.match(/\(\* obj[\s\S]*?endobj \*\)/gm);
			if (allLoopsArray === null) return;
			var	removeEnds = allLoopsArray.map(function(i) {
				return i
					.replace(['(* endobj *)'], '')
					.replace('(* obj', '');
			});
			for (var i = 0; i < removeEnds.length; i++) {
				var newArr = [];
				newArr.push(removeEnds[i].trim().split(/\*\)$/gm));
				splittedArrays.push(newArr);
			}
			for (var i = 0; i < splittedArrays.length; i++) {
				var curList = splittedArrays[i][0][0].replace(/\s*/g,'');
				var	curHTML = splittedArrays[i][0][1];
				var dataList = self.data[curList];
				var newHTML = '';
				var	pattern = new RegExp(
					'\\(\\* obj ' + curList + ' [\\s\\S]*?endobj \\*\\)', 'g'
				);
				for (var j = 0; j < (dataList ? Object.keys(dataList).length : null); j++) {
					var currentItemInList = dataList[j];
					var val = dataList[Object.keys(dataList)[j]];
					var prop = Object.keys(dataList)[j];
					newHTML += curHTML
						.replace('(* val *)', val)
						.replace('(* prop *)', prop);
				}
				view = view.replace(pattern, newHTML);
			}
			return view;
		}


		// If else
		this.ifElse = function() {
			var	splittedArrays = [];
			var	allLoopsArray = view.match(/\(\* if[\s\S]*?endif \*\)/gm);
			if (allLoopsArray === null) return;
			var	removeEnds = allLoopsArray.map(function(i) {
				return i
					.replace(['(* endif *)'], '')
					.replace('(* if', '');
			});
			for (var i = 0; i < removeEnds.length; i++) {
				var newArr = [];
				newArr.push(removeEnds[i].trim().split(/\*\)$/gm));
				splittedArrays.push(newArr);
			}
			for (var i = 0; i < splittedArrays.length; i++) {
				var curList = splittedArrays[i][0][0].replace(/\s*/g,'');
				var dataList = self.data[curList];
				if (dataList) {
					var deleteItems = ['(* endif *)', '(* if ', '*)', curList];
					for (var i = 0; i < deleteItems.length; i++) {
						view = view.replace(deleteItems[i], '');
					}
				} else {
					var	pattern = new RegExp(
						'\\(\\* if ' + curList + ' [\\s\\S]*?endif \\*\\)', 'g'
					);
					view = view.replace(pattern, '');
				}
			}
			return view;
		}


		// For instance
		this.render = function() {
			this.propsSubst();
			this.forArray();
			this.forObj();
			this.ifElse();
			entry.innerHTML = view;
		};


		// this.change = function(input, output) {
		// 	this.data[input] = output;
		// 	this.render();
		// 	return view;
		// }


		// this.exec = function(callback) {
		// 	callback();
		// 	this.render();
		// }


		this.render();


	}
}());