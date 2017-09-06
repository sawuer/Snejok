var Header = new Snegyok('Header', {
	title: 'Component Two',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	music: ['some1', 'some2'],
	
	template: `
		<h2>(* title *)</h2>
		<p>(* text *)</p>
		<ul>
			(* for music *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>
		<ul>
			(* for music *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>
	`
});
