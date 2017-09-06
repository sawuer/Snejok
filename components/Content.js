var Content = new Snegyok('Content', {
	title: 'Content',
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ipsam!',
	list: ['some1', 'some2', 'some3', 'some4'],
	list2: ['somelist1', 'somelist2', 'somelist3', 'somelist4', 'somelist6', 'somelist2', 'somelist3'],
	template: `
		<h2>(* title *)</h2>
		<p>(* text *)</p>
		<ul>
			(* for list *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>
		<ul>
			(* for list2 *)
				<li><a href="">(* item *)</a></li>
			(* endfor *)
		</ul>
	`
});
