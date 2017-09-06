var Header = new Snegyok('Header', {
	title: 'Header',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	nav: ['About', 'FAQ', 'Contacts'],
	user: {
		name: 'Ramona',
		age: 21
	},
	info: {
		name: 'Sowyer',
		age: 23
	},
	
	template: `
		<h2>(* title *)</h2>
		<p>(* text *)</p>
		<ul>
			(* for nav *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>

		<ul>
			(* obj user *)
				<li>(* prop *) : (* val *)</li>
			(* endobj *)
		</ul>

		<ul>
			(* obj info *)
				<li>(* prop *) : (* val *)</li>
			(* endobj *)
		</ul>
	`
});
