/* * * * * * * 
  * * * * * * * 
 * * * * * * */

this.Snegyok = (function() {

	function templaCtor(entry, confs) {
		var self = this;

		// Public methods
		this.entry = entry;
		this.data = confs;
		
		// Private data
		var view = document.querySelector(this.entry).innerHTML;

		/* * * * * * * Templater * * * * * * */

		function templater(entry, data) {
			var 
				dataArray = Object.keys(data),
				entry = document.querySelector(entry);
			function key(index) {
				return Object.keys(data)[index];
			}
			for (var i = 0; i < dataArray.length; i++) {
				var pat = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g')
			  view = view.replace(pat, data[key(i)]);
			}
		}

		function booler(entry, data) {
			
		}

		/* * * * * * * * *
		* * * Looper * * *
		 * * * * * * * */

		function looper(entry, data) {
			var 
				dataArray = Object.keys(data);
				entry = document.querySelector(entry),
				pat = /\(\* for[\s\S]*?endfor \*\)/gm,
				splittedArrays = [],
				allLoopsArray = view.match(pat),

				removeEnds = allLoopsArray.map(function(i) {
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
				var 
					currentList = splittedArrays[i][0][0].replace(/\s*/g,''),
					currentHTML = splittedArrays[i][0][1],
					inpat = new RegExp(
						'\\(\\* for ' + currentList + ' [\\s\\S]*?endfor \\*\\)', 'g'
					),
					newHTML = '';

				for (var j = 0; j < self.data[currentList].length; j++) {
					var currentItemInList = self.data[currentList][j];
					newHTML += currentHTML.replace('(* this *)', currentItemInList);
				}

				view = view.replace(inpat, newHTML);
			}
			
			entry.innerHTML = view;
		}



		booler(this.entry, this.data);
		templater(this.entry, this.data);
		looper(this.entry, this.data);

	}

	return templaCtor;

}());