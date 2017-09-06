var Main = new Snegyok('Main', {
	showTitle: true,
	title: 'Main title',

	description: {
		name: 'New app',
		date: '"nedavno"'
	},

	template: `

		(* if showTitle *)
			(* title *)
		(* endif *)

		<ul>
			(* obj description *)
				<li>(* prop *) - (* val *)</li>
			(* endobj *)
		</ul>

		<Header class="bg2"></Header>
		<Content class="bg2"></Content>
		
	`
});
