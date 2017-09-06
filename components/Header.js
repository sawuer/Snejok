var Header = new Snegyok('Header', {
	title: 'Header',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	nav: ['About', 'FAQ', 'Contacts'],
	
	template: `
		<h2>(* title *)</h2>
		<p>(* text *)</p>
		<ul>
			(* for nav *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>
	`
});
