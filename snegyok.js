/* * * * * * * 
  * * * * * * * 
 * * * * * * */

this.Snegyok = (function() {

	function templaCtor(entry, confs) {
		var self = this;

		// Public methods
		this.entry = entry;
		this.data = confs;

		
		/* * * * * * * Templater * * * * * * */

		function templater(entry, data) {
			var dataArray = Object.keys(data);
			var entry = document.querySelector(entry);
			var view = entry.innerHTML;
			function key(index) {
				return Object.keys(data)[index];
			}
			for (var i = 0; i < dataArray.length; i++) {
				var pat = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g')
			  view = view.replace(pat, data[key(i)]);
			}
			entry.innerHTML = view;
		}


		/* * * * * * * * *
		* * * Looper * * *
		 * * * * * * * */

		function looper(entry, data) {
			var dataArray = Object.keys(data);
			var entry = document.querySelector(entry);
			var view = entry.innerHTML;
			var pat = /\(\* for[\s\S]*?endfor \*\)/gm;

			var allLoopsArray = view.match(pat);
			var removeEnds = allLoopsArray.map(function(i) {
				return i
					.replace(['(* endfor *)'], '')
					.replace('(* for', '');
			});

			var splittedArrays = [];

			for (var i = 0; i < removeEnds.length; i++) {
				var newArr = [];
				newArr.push(removeEnds[i].trim().split(/\*\)$/gm));
				splittedArrays.push(newArr);
			}

			for (var i = 0; i < splittedArrays.length; i++) {
				var currentList = splittedArrays[i][0][0].replace(/\s*/g,'');
				var currentHTML = splittedArrays[i][0][1];
				var inpat = new RegExp('\\(\\* for ' + currentList + ' [\\s\\S]*?endfor \\*\\)', 'g')
				var newHTML = '';

				for (var j = 0; j < self.data[currentList].length; j++) {
					var currentItemInList = self.data[currentList][j];
					newHTML += currentHTML.replace('(* this *)', currentItemInList);
				}

				view = view.replace(inpat, newHTML);
			}
			
			entry.innerHTML = view;
		}


		templater(this.entry, this.data);
		looper(this.entry, this.data);


	}

	return templaCtor;

}());