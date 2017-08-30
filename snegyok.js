this.Snegyok = (function() {

	function ctor(entry, confs) {

		// Public methods
		this.entry = entry;
		this.data = confs;
		
		// Private data
		var	entry = document.querySelector(this.entry);
		var view = entry.innerHTML;
		var data = this.data;
		var dataArray = Object.keys(data);

		/* * * * * * * Templater * * * * * * */

		function templater() {
			function key(index) {
				return Object.keys(data)[index];
			}
			for (var i = 0; i < dataArray.length; i++) {
				var pattern = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g')
			  view = view.replace(pattern, data[key(i)]);
			}
			return view;
		}


		/* * * * * * * * *
		* * * Looper * * *
		 * * * * * * * */

		function looper() {
			var	splittedArrays = [];
			var	allLoopsArray = view.match(/\(\* for[\s\S]*?endfor \*\)/gm);
			if (allLoopsArray === null) {
				return;
			}
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
				var currentList = splittedArrays[i][0][0].replace(/\s*/g,'');
				var	currentHTML = splittedArrays[i][0][1];
				var	pattern = new RegExp(
					'\\(\\* for ' + currentList + ' [\\s\\S]*?endfor \\*\\)', 'g'
				);
				var newHTML = '';
				for (var j = 0; j < (data[currentList] ? data[currentList].length : null); j++) {
					var currentItemInList = data[currentList][j];
					newHTML += currentHTML.replace('(* this *)', currentItemInList);
				}
				view = view.replace(pattern, newHTML);
			}
			return view;
		}


		this.render = function() {
			looper();
			templater();
			entry.innerHTML = view;
		}

		this.render();

	}

	return ctor;

}());