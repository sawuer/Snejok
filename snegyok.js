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
				var reg = new RegExp('\\(\\* ' + key(i) + ' \\*\\)', 'g')
			  view = view.replace(reg, data[key(i)]);
			}
			entry.innerHTML = view;
		}


		/* * * * * * * Looper * * * * * * */

		function looper(entry, data) {
			var dataArray = Object.keys(data);
			var entry = document.querySelector(entry);
			var view = entry.innerHTML;
			var pattern = /\(\* for[\s\S]*?endfor \*\)/gm;

			var allLoopsArray = view.match(pattern);
			var removeEnds = allLoopsArray.map(i => {
				return i
					.replace('(* endfor *)', '')
					.replace('(* for', '');
			});



			console.log(removeEnds);
		}


		templater(this.entry, this.data);
		looper(this.entry, this.data);


	}

	return templaCtor;

}());