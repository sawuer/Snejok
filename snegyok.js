this.Snegyok = (function() {

	return function(entry, confs) {

		var self = this;

		// Public methods
		this.entry = entry;
		this.data = confs;

		
		// Private data
		var	entry = document.querySelector(this.entry);
		var startHTML = document.querySelector(this.entry).innerHTML;
		var view = startHTML;
		var dataArray = Object.keys(this.data);


		// Props substitution

		this.templater = function() {
			view = startHTML;
			console.log(view)
			function key(index) {
				return Object.keys(self.data)[index];
			}
			for (var i = 0; i < dataArray.length; i++) {
				var pattern = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g');
			  view = view.replace(pattern, self.data[key(i)]);
			}
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
			return view;
		}


		// For-loop for arrays

		this.looper = function() {
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



		// this.ifElse = function() {
		// 	return view;
		// }








		this.render = function() {
			this.templater();
			this.looper();
			// this.ifElse();
			entry.innerHTML = view;
		};

		this.change = function(input, output) {
			this.data[input] = output;
			this.render();
			console.log(this.data[input])
			return view;
		}

		this.exec = function(callback) {
			callback();
			this.render();
		}

		this.render();

	}



}());